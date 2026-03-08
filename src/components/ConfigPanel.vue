<script setup>
import { computed, inject, reactive, ref } from 'vue';

const emit = defineEmits(['close']);

const state = inject('dmState');
const actions = inject('dmActions');
const services = inject('dmServices');
const dataMap = inject('dmDataMap');
const getVideoId = inject('dmVideoId');

const activeTab = ref('display');
const previewing = ref(false);
const currentData = computed(() => dataMap[getVideoId()]);

const options = services.dmPlayer.options;
const settings = reactive({
  opacity: services.dmStore.get('settings.opacity', options.opacity.value),
  displayArea: services.dmStore.get('settings.displayArea', options.displayArea.value),
  speed: services.dmStore.get('settings.speed', options.speed.value),
  density: services.dmStore.get('settings.density', options.density.value),
  syncRate: services.dmStore.get('settings.syncRate', options.syncRate.value),
  mergeRepeats: services.dmStore.get('settings.mergeRepeats', options.mergeRepeats.value),
  overlap: services.dmStore.get('settings.overlap', options.overlap.value),
});

const autoBind = ref(services.dmStore.getLocal('autoBind', false));
const serverInput = ref(services.dmStore.get('server', ''));
const uiTheme = ref(services.dmStore.getLocal('ui.theme', 'light'));

const panelTheme = computed(() => (state.uiTheme === 'light' ? 'light' : 'dark'));

const shadowPresets = {
  重墨: [{ type: 0, offset: 1, radius: 1, repeat: 1 }],
  描边: [{ type: 1, offset: 0, radius: 1, repeat: 3 }],
  '45°投影': [
    { type: 1, offset: 0, radius: 1, repeat: 1 },
    { type: 2, offset: 1, radius: 2, repeat: 1 },
  ],
};
const shadowConfig = ref(
  JSON.parse(
    JSON.stringify(
      services.dmPlayer.options?.shadowEffect?.value || [{ type: 0, offset: 1, radius: 1, repeat: 1 }],
    ),
  ),
);
const shadowPreset = ref('自定义');

const alignment = ref(JSON.parse(JSON.stringify(currentData.value?.alignData || [])));

const cacheList = ref([]);
const bindedList = ref([]);

function refreshLists() {
  bindedList.value = services.dmStore.binded.list();
  cacheList.value = services.dmStore.cache.list();
  const currentVideoId = getVideoId();
  state.binded = !!(currentVideoId && services.dmStore.binded.get(currentVideoId));
}

function saveSetting(key) {
  const val = settings[key];
  services.dmStore.set(`settings.${key}`, val);
  services.dmPlayer.setOptions(val, key);
  actions.showTip(`✅ 已保存 ${key}：${val}`);
}

function saveShadow() {
  services.dmStore.set('settings.shadowEffect', shadowConfig.value);
  services.dmPlayer.setOptions(shadowConfig.value, 'shadowEffect');
  actions.showTip('✅ 已保存阴影设置');
}

function applyShadowPreset() {
  if (shadowPreset.value === '自定义') return;
  shadowConfig.value = JSON.parse(JSON.stringify(shadowPresets[shadowPreset.value]));
}

function initShadowPreset() {
  for (const [name, list] of Object.entries(shadowPresets)) {
    if (JSON.stringify(list) === JSON.stringify(shadowConfig.value)) {
      shadowPreset.value = name;
      return;
    }
  }
  shadowPreset.value = '自定义';
}

function saveServer() {
  services.dmStore.set('server', serverInput.value.trim());
  actions.showTip('✅ 地址已保存');
}

function setAutoBind() {
  services.dmStore.setLocal('autoBind', autoBind.value);
}

function applyUITheme() {
  actions.setUITheme(uiTheme.value);
}

function createInfoTitle(info) {
  return info?.title || '未知';
}

function createInfoMeta(info, name = '视频') {
  if (!info) {
    return {
      label: `❌ 未知${name}`,
      title: `未知${name}`,
      href: '',
      clickable: false,
    };
  }
  const id = info.id || '未知ID';
  return {
    label: `${name} [▶️ ${id}]`,
    title: createInfoTitle(info),
    href: info.url || '',
    clickable: !!info.url,
  };
}

function clearBinded() {
  if (!confirm('确定要清空所有绑定视频吗？')) return;
  services.dmStore.binded.clear();
  refreshLists();
  actions.showTip('🧹 所有绑定视频已清空');
}

function clearCache() {
  if (!confirm('确定要清空所有缓存弹幕吗？')) return;
  services.dmStore.cache.clear();
  refreshLists();
  actions.showTip('🧹 所有缓存弹幕已清空');
}

function removeBinded(id) {
  services.dmStore.binded.remove(id);
  refreshLists();
  actions.showTip(`🗑 已删除绑定视频：${id}`);
}

function removeCache(id) {
  services.dmStore.cache.remove(id);
  refreshLists();
  actions.showTip(`🗑 已删除缓存弹幕：${id}`);
}

function downloadCache(item) {
  const info = item.info;
  const json = JSON.stringify(item.data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = info.id.replace(/[\\/:*?"<>|]/g, '_') + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parseTimeToMs(text) {
  if (!text.includes(':')) return 0;
  const [min, sec] = text.trim().split(':');
  return Math.round((parseInt(min, 10) * 60 + parseFloat(sec)) * 1000);
}

function formatMsToTime(ms) {
  const min = Math.floor(ms / 60000);
  const sec = (ms % 60000) / 1000;
  return `${min}:${sec}`;
}

function addAlignment() {
  alignment.value.push({
    source: { start: 0, end: 0 },
    target: { start: 0, end: 0 },
    mode: 'shift',
    comment: '',
  });
}

function removeAlignment(index) {
  alignment.value.splice(index, 1);
}

async function pasteAlignment() {
  try {
    const text = await navigator.clipboard.readText();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) throw new Error('剪贴板内容不是有效的数组');
    const valid = parsed.every((item) => item.source && item.target && item.mode);
    if (!valid) throw new Error('剪贴板内容不是有效的对齐数据');
    alignment.value = parsed;
    actions.showTip('📋 成功粘贴对齐设置');
  } catch (err) {
    actions.logError('❌ 粘贴失败', err);
  }
}

function copyAlignment() {
  navigator.clipboard
    .writeText(JSON.stringify(alignment.value, null))
    .then(() => actions.showTip('✅ 已复制所有对齐设置'))
    .catch(() => actions.showTip('❌ 复制失败'));
}

function saveAlignment() {
  const data = currentData.value;
  if (!data) {
    actions.showTip('未有弹幕数据');
    return;
  }
  data.alignData = alignment.value;
  if (data.binded) actions.bindVideoID(true, true);
  services.dmPlayer.load(data.getDanmakuData());
  actions.showTip('✅ 对齐设置已保存');
}

function saveNumberSetting(key, min, max) {
  const val = Number(settings[key]);
  if (Number.isNaN(val) || val < min || val > max) {
    actions.showTip('❌ 输入不合法');
    return;
  }
  settings[key] = val;
  saveSetting(key);
}

initShadowPreset();
refreshLists();
</script>

<template>
  <div
    class="dm-config-overlay"
    :style="{ background: 'rgba(0, 0, 0, 0.4)', opacity: previewing ? 0 : 1 }"
    @click.self="emit('close')"
  >
    <div class="dm-config-panel" :class="panelTheme">
      <div class="dm-config-header">⚙️ 设置</div>
      <div class="dm-config-tabs">
        <button :class="{ active: activeTab === 'display' }" @click="activeTab = 'display'">📺 弹幕显示</button>
        <button :class="{ active: activeTab === 'cache' }" @click="activeTab = 'cache'">📦 缓存管理</button>
        <button :class="{ active: activeTab === 'server' }" @click="activeTab = 'server'">🌐 服务器设置</button>
        <button :class="{ active: activeTab === 'alignment' }" @click="activeTab = 'alignment'">🎯 视频对齐</button>
      </div>

      <div v-if="activeTab === 'display'" class="dm-config-tab-body">
        <div class="dm-config-section-head">
          <span class="dm-config-section-title">🎨 面板主题</span>
          <div class="dm-config-section-control">
            <select v-model="uiTheme" @change="applyUITheme">
              <option value="dark">深色</option>
              <option value="light">浅色</option>
            </select>
          </div>
        </div>

        <div class="dm-config-section-head">
          <span class="dm-config-section-title">📺 弹幕显示设置</span>
          <div class="dm-config-section-control">
            <button @mousedown="previewing = true" @mouseup="previewing = false" @mouseleave="previewing = false">👁️ 预览</button>
          </div>
        </div>

        <div class="dm-config-row">
          <span class="dm-config-row-label">🌫️ 不透明度</span>
          <div class="dm-config-row-main">
            <input v-model.number="settings.opacity" type="number" min="0.1" max="1" step="0.1" />
            <button @click="saveNumberSetting('opacity', 0.1, 1)">💾 保存</button>
          </div>
          <span class="dm-config-row-desc">设置弹幕透明度（0.1 ~ 1.0）越小越透明</span>
        </div>
        <div class="dm-config-row">
          <span class="dm-config-row-label">📐 显示区域</span>
          <div class="dm-config-row-main">
            <input v-model.number="settings.displayArea" type="number" min="0.1" max="1" step="0.1" />
            <button @click="saveNumberSetting('displayArea', 0.1, 1)">💾 保存</button>
          </div>
          <span class="dm-config-row-desc">允许弹幕占屏幕高度范围，1.0 全屏</span>
        </div>
        <div class="dm-config-row">
          <span class="dm-config-row-label">🚀 弹幕速度</span>
          <div class="dm-config-row-main">
            <input v-model.number="settings.speed" type="number" min="3" max="9" step="1" />
            <button @click="saveNumberSetting('speed', 3, 9)">💾 保存</button>
          </div>
          <span class="dm-config-row-desc">影响弹幕持续时间以及滚动弹幕的速度</span>
        </div>
        <div class="dm-config-row">
          <span class="dm-config-row-label">📚 弹幕密度</span>
          <div class="dm-config-row-main">
            <input v-model.number="settings.density" type="number" min="0" max="10" step="1" />
            <button @click="saveNumberSetting('density', 0, 10)">💾 保存</button>
          </div>
          <span class="dm-config-row-desc">0~10，越大行高越小、轨道间隔越小</span>
        </div>
        <label class="dm-config-row">
          <span class="dm-config-row-label">⏩ 同步倍速</span>
          <div class="dm-config-row-main"><input v-model="settings.syncRate" type="checkbox" @change="saveSetting('syncRate')" /></div>
          <span class="dm-config-row-desc">弹幕速度同步视频播放倍速</span>
        </label>
        <label class="dm-config-row">
          <span class="dm-config-row-label">🔁 合并重复</span>
          <div class="dm-config-row-main"><input v-model="settings.mergeRepeats" type="checkbox" @change="saveSetting('mergeRepeats')" /></div>
          <span class="dm-config-row-desc">是否合并内容相同且时间接近的弹幕</span>
        </label>
        <label class="dm-config-row">
          <span class="dm-config-row-label">🔀 允许重叠</span>
          <div class="dm-config-row-main"><input v-model="settings.overlap" type="checkbox" @change="saveSetting('overlap')" /></div>
          <span class="dm-config-row-desc">开启则允许弹幕重叠，否则丢弃会重叠的弹幕</span>
        </label>

        <div class="dm-config-section-head">
          <span class="dm-config-section-title">🌑 弹幕阴影设置</span>
          <div class="dm-config-section-control">
            <button @click="saveShadow">💾 保存</button>
          </div>
        </div>
        <div class="dm-config-shadow-preset">
          <select v-model="shadowPreset" @change="applyShadowPreset">
            <option>重墨</option>
            <option>描边</option>
            <option>45°投影</option>
            <option>自定义</option>
          </select>
        </div>

        <template v-if="shadowPreset === '自定义'">
          <div v-for="(item, index) in shadowConfig" :key="index" class="dm-config-shadow-row">
            <span>类型:</span>
            <select v-model.number="item.type"><option :value="0">重墨</option><option :value="1">描边</option><option :value="2">45°投影</option></select>
            <span>偏移:</span>
            <select v-model.number="item.offset"><option :value="-1">递增</option><option v-for="n in 11" :key="`o-${n}`" :value="n - 1">{{ n - 1 }}px</option></select>
            <span>半径:</span>
            <select v-model.number="item.radius"><option :value="-1">递增</option><option v-for="n in 11" :key="`r-${n}`" :value="n - 1">{{ n - 1 }}px</option></select>
            <span>重复:</span>
            <select v-model.number="item.repeat"><option v-for="n in 10" :key="`p-${n}`" :value="n">{{ n }}</option></select>
            <button @click="shadowConfig.splice(index, 1)">删除</button>
          </div>
          <button class="dm-config-shadow-add" @click="shadowConfig.push({ type: 0, offset: 1, radius: 1, repeat: 1 })">➕ 添加阴影项</button>
        </template>
      </div>

      <div v-if="activeTab === 'cache'" class="dm-config-tab-body">
        <label class="dm-config-row">
          <span class="dm-config-row-label">自动绑定视频（载入/缓存数据时）</span>
          <input v-model="autoBind" type="checkbox" @change="setAutoBind" />
        </label>

        <div class="dm-config-section-head">
          <span class="dm-config-section-title">📦 绑定视频</span>
          <div class="dm-config-section-control">
            <button @click="clearBinded">🧹 清空绑定视频</button>
          </div>
        </div>
        <div v-if="!bindedList.length">📭 当前没有绑定视频</div>
        <div v-for="([id, item]) in bindedList" :key="id" class="dm-config-list-row">
          <div class="dm-config-meta">
            <a
              v-if="createInfoMeta(item.target, '当前').clickable"
              class="dm-config-meta-id"
              :href="createInfoMeta(item.target, '当前').href"
              target="_blank"
              rel="noreferrer"
            >
              {{ createInfoMeta(item.target, '当前').label }}
            </a>
            <span v-else class="dm-config-meta-id">{{ createInfoMeta(item.target, '当前').label }}</span>
            <div class="dm-config-meta-title" :title="createInfoMeta(item.target, '当前').title">{{ createInfoMeta(item.target, '当前').title }}</div>
          </div>
          <div class="dm-config-meta">
            <a
              v-if="createInfoMeta(item.source, item.source?.from || '来源').clickable"
              class="dm-config-meta-id"
              :href="createInfoMeta(item.source, item.source?.from || '来源').href"
              target="_blank"
              rel="noreferrer"
            >
              {{ createInfoMeta(item.source, item.source?.from || '来源').label }}
            </a>
            <span v-else class="dm-config-meta-id">{{ createInfoMeta(item.source, item.source?.from || '来源').label }}</span>
            <div class="dm-config-meta-title" :title="createInfoMeta(item.source, item.source?.from || '来源').title">{{ createInfoMeta(item.source, item.source?.from || '来源').title }}</div>
          </div>
          <button @click="removeBinded(id)">🗑 删除</button>
        </div>

        <div class="dm-config-section-head">
          <span class="dm-config-section-title">📦 缓存弹幕</span>
          <div class="dm-config-section-control">
            <button @click="clearCache">🧹 清空缓存弹幕</button>
          </div>
        </div>
        <div v-if="!cacheList.length">📭 当前没有缓存弹幕</div>
        <div v-for="([id, item]) in cacheList" :key="id" class="dm-config-list-row">
          <div class="dm-config-meta">
            <a
              v-if="createInfoMeta(item.info, '缓存').clickable"
              class="dm-config-meta-id"
              :href="createInfoMeta(item.info, '缓存').href"
              target="_blank"
              rel="noreferrer"
            >
              {{ createInfoMeta(item.info, '缓存').label }}
            </a>
            <span v-else class="dm-config-meta-id">{{ createInfoMeta(item.info, '缓存').label }}</span>
            <div class="dm-config-meta-title" :title="createInfoMeta(item.info, '缓存').title">{{ createInfoMeta(item.info, '缓存').title }}</div>
          </div>
          <button @click="downloadCache(item)">下载</button>
          <button @click="removeCache(id)">🗑 删除</button>
        </div>
      </div>

      <div v-if="activeTab === 'server'" class="dm-config-tab-body">
        <div class="dm-config-section-head">
          <span class="dm-config-section-title">🌐 服务器地址</span>
          <div class="dm-config-section-control">
            <button @click="saveServer">💾 保存</button>
          </div>
        </div>
        <input v-model="serverInput" type="text" />
      </div>

      <div v-if="activeTab === 'alignment'" class="dm-config-tab-body">
        <div class="dm-config-desc">
          <div>⚠️ 对齐设置说明：</div>
          <hr />
          <div>当原视频和新视频的时间段不一致（如删减/增加片段）时，可通过设置对齐项同步弹幕。</div>
          <div><span class="dm-config-desc-key">• 映射：</span>将原时间段线性映射到新时间段。</div>
          <div><span class="dm-config-desc-key">• 顺移：</span>平移时间，超出新时间段的丢弃。</div>
          <div><span class="dm-config-desc-key">• 附言：</span>可插入一条左上角弹幕提示观众。</div>
          <div>时间格式为 分:秒 或 分:秒.毫秒</div>
        </div>
        <div v-for="(entry, index) in alignment" :key="index" class="dm-config-align-row">
          <div class="dm-config-row-inline">
            <span>原视频：</span>
            <input :value="formatMsToTime(entry.source?.start || 0)" @change="entry.source.start = parseTimeToMs($event.target.value)" />
            <span>~</span>
            <input :value="formatMsToTime(entry.source?.end || 0)" @change="entry.source.end = parseTimeToMs($event.target.value)" />
          </div>
          <div class="dm-config-row-inline">
            <span>现视频：</span>
            <input :value="formatMsToTime(entry.target?.start || 0)" @change="entry.target.start = parseTimeToMs($event.target.value)" />
            <span>~</span>
            <input :value="formatMsToTime(entry.target?.end || 0)" @change="entry.target.end = parseTimeToMs($event.target.value)" />
          </div>
          <div class="dm-config-row-inline">
            <select v-model="entry.mode"><option value="map">映射</option><option value="shift">顺移</option></select>
            <input v-model="entry.comment" class="dm-config-comment-input" placeholder="附言" />
            <button @click="removeAlignment(index)">🗑 删除</button>
          </div>
        </div>
        <div class="dm-config-actions">
          <button @click="addAlignment">➕ 添加对齐片段</button>
          <button @click="pasteAlignment">📋 粘贴设置</button>
          <button @click="copyAlignment">📋 复制设置</button>
          <button @click="saveAlignment">💾 保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dm-config-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s ease;
}

.dm-config-panel {
  background: #fff;
  width: 500px;
  max-width: calc(100vw - 24px);
  box-sizing: content-box;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dm-config-panel.dark {
  background: #2b2b2b;
  color: #efefef;
}

.dm-config-panel.dark .dm-config-tabs {
  border-bottom-color: #444;
}

.dm-config-panel.dark .dm-config-desc,
.dm-config-panel.dark .dm-config-align-row {
  background: #2a2a2a;
  border-color: #555;
}

.dm-config-panel.dark input,
.dm-config-panel.dark select,
.dm-config-panel.dark button {
  background: #3a3a3a;
  color: #f0f0f0;
  border-color: #555;
}

.dm-config-header {
  font-size: 18px;
  font-weight: bold;
}

.dm-config-tabs {
  display: flex;
  gap: 6px;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
}

.dm-config-tabs button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}

.dm-config-tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid #0077cc;
}

.dm-config-tab-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.dm-config-section-title {
  font-size: 16px;
  font-weight: bold;
}

.dm-config-section-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dm-config-section-control > button,
.dm-config-section-control > select {
  width: 130px;
}

.dm-config-section-head {
  margin-top: 8px;
}

.dm-config-row,
.dm-config-shadow-row,
.dm-config-list-row,
.dm-config-row-inline,
.dm-config-section-head,
.dm-config-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dm-config-row,
.dm-config-section-head,
.dm-config-list-row,
.dm-config-actions {
  justify-content: space-between;
}

.dm-config-row {
  min-height: 36px;
  gap: 18px;
}

.dm-config-shadow-preset {
  margin-bottom: 6px;
}

.dm-config-shadow-preset select {
  width: 100%;
  box-sizing: border-box;
}

.dm-config-shadow-row {
  border: 1px solid #ccc;
  padding: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.dm-config-shadow-row span {
  font-weight: bold;
}

.dm-config-shadow-add {
  width: 120px;
  padding: 4px;
}

.dm-config-row-label {
  flex-shrink: 0;
}

.dm-config-desc-key {
  font-weight: bold;
}

.dm-config-row-main {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dm-config-row-desc {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.dm-config-meta {
  flex: 1;
  min-width: 0;
}

.dm-config-meta-id {
  display: inline-block;
  font-size: 13px;
  color: #1a73e8;
  text-decoration: none;
  margin-bottom: 2px;
  white-space: nowrap;
}

.dm-config-meta-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dm-config-panel.dark .dm-config-meta-id {
  color: #86b7ff;
}

.dm-config-panel.dark .dm-config-row-desc {
  color: #bbb;
}

.dm-config-align-row {
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dm-config-row-inline input {
  width: 80px;
}

.dm-config-comment-input {
  width: 200px !important;
}

.dm-config-desc {
  font-size: 13px;
  line-height: 1.6;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.dm-config-desc hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 6px 0;
}

.dm-config-panel.dark .dm-config-desc hr {
  border-top-color: #555;
}

.dm-config-panel input,
.dm-config-panel select {
  font-size: 14px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dm-config-panel input[type='number'] {
  width: 60px;
  height: 20px;
  padding: 0;
  text-align: center;
}

.dm-config-panel input[type='checkbox'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.dm-config-panel button {
  height: 28px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f0f0f0;
  cursor: pointer;
}

.dm-config-tabs button {
  height: auto;
  padding: 8px 12px;
  border: none;
  border-radius: 0;
  background: none;
}

.dm-config-panel.dark .dm-config-tabs button {
  background: none;
  border: none;
}

.dm-config-actions button {
  width: 120px;
  padding: 4px;
}
</style>
