<script setup>
import { computed, inject, ref } from 'vue';

const emit = defineEmits(['close']);

const state = inject('dmState');
const actions = inject('dmActions');
const urlRules = inject('dmUrlRules');

const resultText = ref('');
const draftRules = ref(urlRules.get().map((rule) => ({ ...rule })));
const panelTheme = computed(() => (state.uiTheme === 'light' ? 'light' : 'dark'));

function normalizeDraftRule(rule, fallbackIndex) {
  return {
    id: String(rule?.id || `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
    name: String(rule?.name || `规则${fallbackIndex + 1}`),
    enabled: rule?.enabled !== false,
    urlMatch: String(rule?.urlMatch || '').trim(),
    extractRegex: String(rule?.extractRegex || ''),
    urlTemplate: String(rule?.urlTemplate || '{{ID}}'),
    titleExtractRegex: String(rule?.titleExtractRegex || ''),
    order: Number.isFinite(Number(rule?.order)) ? Number(rule.order) : fallbackIndex,
  };
}

function normalizeRuleList(input) {
  if (Array.isArray(input)) {
    return input.map((rule, index) => normalizeDraftRule(rule, index));
  }
  if (input && typeof input === 'object') {
    if (Array.isArray(input.rules)) {
      return input.rules.map((rule, index) => normalizeDraftRule(rule, index));
    }
    return [normalizeDraftRule(input, 0)];
  }
  throw new Error('剪贴板内容不是有效的规则 JSON（需为 [] 或 {}）');
}

function createEmptyRule() {
  const hrefWithoutQuery = `${location.origin}${location.pathname}`;
  return {
    id: `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: '新规则',
    enabled: true,
    urlMatch: hrefWithoutQuery,
    extractRegex: '',
    urlTemplate: '{{ID}}',
    titleExtractRegex: '',
    order: draftRules.value.length,
  };
}

function validateRules() {
  for (const rule of draftRules.value) {
    if (!rule.urlMatch) throw new Error(`规则「${rule.name}」缺少URL匹配`);
    if (!rule.extractRegex) throw new Error(`规则「${rule.name}」缺少ID提取正则`);
    new RegExp(rule.extractRegex);
    if (rule.titleExtractRegex) new RegExp(rule.titleExtractRegex);
  }
}

function addRule() {
  draftRules.value.push(createEmptyRule());
}

function removeRule(index) {
  draftRules.value.splice(index, 1);
}

function restoreDefault() {
  draftRules.value = urlRules.getDefault().map((rule) => ({ ...rule }));
}

function testCurrentPage() {
  try {
    validateRules();
  } catch (err) {
    resultText.value = `❌ ${err.message}`;
    return;
  }
  const ordered = draftRules.value.map((rule) => ({ ...rule }));

  let matched = null;
  for (const rule of ordered) {
    if (!rule.enabled) continue;
    const test = urlRules.test(rule, location.href);
    if (test) {
      matched = { rule, ...test };
      break;
    }
  }

  if (matched) {
    const transformedTitle = urlRules.applyTitle(document.title, matched.rule);
    resultText.value = `✅ 命中规则：${matched.rule.name}\n🆔 视频ID：${matched.videoId}\n🔗 视频链接：${matched.normalizedUrl}\n🏷 标题：${transformedTitle}`;
  } else {
    resultText.value = '⚠ 未命中规则';
  }
}

function saveRules() {
  try {
    validateRules();
    actions.saveRules(draftRules.value);
    actions.showTip('✅ URL匹配规则已保存');
    emit('close');
  } catch (err) {
    resultText.value = `❌ ${err.message}`;
  }
}

function closePanel() {
  emit('close');
}

function copyRule(rule) {
  navigator.clipboard
    .writeText(JSON.stringify(rule, null, 2))
    .then(() => actions.showTip(`✅ 已复制规则：${rule.name || '未命名规则'}`))
    .catch(() => actions.showTip('❌ 复制失败'));
}

function copyAllRules() {
  navigator.clipboard
    .writeText(JSON.stringify(draftRules.value, null, 2))
    .then(() => actions.showTip('✅ 已复制全部 URL 规则'))
    .catch(() => actions.showTip('❌ 复制失败'));
}

async function readRulesFromClipboard() {
  const text = await navigator.clipboard.readText();
  const parsed = JSON.parse(text);
  const next = normalizeRuleList(parsed);
  if (!next.length) throw new Error('规则列表不能为空');
  return next;
}

async function pasteReplaceRules() {
  try {
    const next = await readRulesFromClipboard();
    draftRules.value = next.map((rule, index) => ({ ...rule, order: index }));
    actions.showTip(`✅ 已覆盖导入 ${next.length} 条规则`);
  } catch (err) {
    resultText.value = `❌ 粘贴覆盖失败：${err.message || String(err)}`;
  }
}

async function pasteAppendRules() {
  try {
    const next = await readRulesFromClipboard();
    const base = draftRules.value.length;
    draftRules.value = [
      ...draftRules.value,
      ...next.map((rule, index) => ({ ...rule, order: base + index })),
    ];
    actions.showTip(`✅ 已追加导入 ${next.length} 条规则`);
  } catch (err) {
    resultText.value = `❌ 粘贴添加失败：${err.message || String(err)}`;
  }
}
</script>

<template>
  <div class="dm-urlrule-overlay" @click.self="closePanel">
    <div class="dm-urlrule-panel" :class="panelTheme">
      <div class="dm-urlrule-title">🔗 URL匹配设置</div>
      <div class="dm-urlrule-tip">字段：URL匹配(支持*)、ID提取正则(第1捕获组)、链接模板({{ID}} 或 *)、标题清理正则(匹配后删除)</div>
      <div class="dm-urlrule-tip">示例：标题清理正则填 <code> - YouTube$</code>，会删除标题后缀</div>

        <div class="dm-urlrule-toolbar">
          <div class="dm-urlrule-toolbar-left">
            <button @click="addRule">➕ 添加规则</button>
            <button @click="restoreDefault">♻ 恢复默认</button>
            <button @click="testCurrentPage">🧪 测试当前页面</button>
          </div>
          <div class="dm-urlrule-toolbar-right">
            <button @click="saveRules">💾 保存</button>
          </div>
      </div>

      <div v-if="resultText" class="dm-urlrule-result">{{ resultText }}</div>

      <div class="dm-urlrule-list">
        <div v-if="!draftRules.length" class="dm-urlrule-empty">暂无规则</div>
        <div v-for="(rule, index) in draftRules" :key="rule.id || index" class="dm-urlrule-card">
          <div class="dm-urlrule-label">名称</div>
          <input v-model="rule.name" class="dm-urlrule-input" />
          <div class="dm-urlrule-ops">
            <button @click="copyRule(rule)">📋 复制配置</button>
            <button @click="removeRule(index)">删除</button>
          </div>

          <div class="dm-urlrule-label">启用</div>
          <div class="dm-urlrule-inline">
            <input v-model="rule.enabled" type="checkbox" />
          </div>
          <div></div>

          <div class="dm-urlrule-label">URL匹配</div>
          <input v-model="rule.urlMatch" class="dm-urlrule-input" placeholder="如：https://www.youtube.com/watch*" />
          <div></div>

          <div class="dm-urlrule-label">ID提取正则</div>
          <input v-model="rule.extractRegex" class="dm-urlrule-input" placeholder="如：[?&]v=([^&]+)" />
          <div></div>

          <div class="dm-urlrule-label">链接模板</div>
          <input v-model="rule.urlTemplate" class="dm-urlrule-input" placeholder="如：https://www.youtube.com/watch?v={{ID}} 或 https://.../*" />
          <div></div>

          <div class="dm-urlrule-label">标题清理正则</div>
          <input v-model="rule.titleExtractRegex" class="dm-urlrule-input" placeholder="匹配要处理的标题片段，如： - YouTube$" />
          <div></div>
        </div>
      </div>

      <div class="dm-urlrule-bottom-actions">
        <div class="dm-urlrule-bottom-actions-left">
          <button @click="copyAllRules">📋 复制所有</button>
          <button @click="pasteReplaceRules">📥 粘贴覆盖</button>
          <button @click="pasteAppendRules">➕ 粘贴添加</button>
        </div>
        <div class="dm-urlrule-bottom-actions-right">
          <button @click="saveRules">💾 保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dm-urlrule-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10005;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dm-urlrule-panel {
  background: #fff;
  width: 940px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 10px;
  padding: 16px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dm-urlrule-panel.dark {
  background: #1f1f1f;
  color: #e9e9e9;
}

.dm-urlrule-panel.dark .dm-urlrule-card {
  border-color: #555;
  background: #2a2a2a;
}

.dm-urlrule-panel.dark .dm-urlrule-tip,
.dm-urlrule-panel.dark .dm-urlrule-empty,
.dm-urlrule-panel.dark .dm-urlrule-result {
  color: #cfcfcf;
}

.dm-urlrule-panel.dark .dm-urlrule-input,
.dm-urlrule-panel.dark button {
  background: #2e2e2e;
  color: #f0f0f0;
  border-color: #666;
}

.dm-urlrule-title {
  font-size: 18px;
  font-weight: 700;
}

.dm-urlrule-tip {
  color: #666;
}

.dm-urlrule-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.dm-urlrule-toolbar-left,
.dm-urlrule-toolbar-right,
.dm-urlrule-inline,
.dm-urlrule-ops {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.dm-urlrule-result {
  color: #444;
  white-space: pre-line;
}

.dm-urlrule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dm-urlrule-bottom-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.dm-urlrule-bottom-actions-left,
.dm-urlrule-bottom-actions-right {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.dm-urlrule-empty {
  color: #888;
}

.dm-urlrule-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: grid;
  grid-template-columns: 110px 1fr 1fr;
  gap: 8px;
  align-items: center;
}

.dm-urlrule-label {
  font-weight: 600;
}

.dm-urlrule-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
}

button {
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f5f5f5;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
