<script setup>
import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['close']);

const actions = inject('dmActions');
const services = inject('dmServices');

const tabs = [
  { key: 'video', label: '视频' },
  { key: 'bangumi', label: '番剧' },
  { key: 'movie', label: '电影' },
];

const keyword = ref('');
const loading = ref(false);
const errorText = ref('');
const activeTab = ref('video');
const groupsByTab = ref({ video: [], bangumi: [], movie: [] });
const expandedBangumiKey = ref('');
let searchSeq = 0;

function currentGroups() {
  return groupsByTab.value[activeTab.value] || [];
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, '');
}

function formatCount(n) {
  const parsed = parseInt(n || '0', 10);
  if (Number.isNaN(parsed)) return '0';
  if (parsed >= 1e8) return `${(parsed / 1e8).toFixed(1)}亿`;
  if (parsed >= 1e4) return `${(parsed / 1e4).toFixed(1)}万`;
  return String(parsed);
}

function normalizeTimeStr(duration) {
  if (typeof duration === 'number' && !Number.isNaN(duration)) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  if (typeof duration === 'string' && /^\d+:\d{1,2}$/.test(duration)) {
    const [min, sec] = duration.split(':').map(Number);
    if (Number.isNaN(min) || Number.isNaN(sec)) return duration;
    if (min > 99) {
      const hours = Math.floor(min / 60);
      const minutes = min % 60;
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  return duration;
}

function similar(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const lcs = dp[m][n];
  return (2 * lcs) / (m + n);
}

function isVideoId(id) {
  return String(id || '').startsWith('video/');
}

function parseByUrl(url) {
  return actions.parseArchiveUrl?.(url);
}

function normalizeBiliItem(raw, kind) {
  const normalizedUrl =
    kind === 'video'
      ? (raw?.bvid ? `https://www.bilibili.com/video/${raw.bvid}` : raw?.url)
      : raw?.url;
  const parsed = parseByUrl(normalizedUrl);
  if (!parsed?.id) return null;

  const tab = kind === 'video' ? 'video' : kind === 'media_ft' ? 'movie' : 'bangumi';
  const eps =
    kind === 'media_bangumi'
      ? (raw?.eps || [])
          .map((ep) => {
            const epParsed = parseByUrl(ep?.url);
            if (!epParsed?.id) return null;
            return {
              id: epParsed.id,
              title: `${ep.index_title || ep.title || ''}${ep.long_title ? ` ${ep.long_title}` : ''}`.trim(),
              url: ep.url,
            };
          })
          .filter(Boolean)
      : [];

  const author =
    kind === 'video'
      ? raw?.author || raw?.up_name || raw?.uname || raw?.owner?.name || ''
      : raw?.season_type_name || raw?.areas || raw?.author || '';

  return {
    id: parsed.id,
    title: stripHtml(raw?.title),
    author,
    play: raw?.play,
    video_review: raw?.video_review,
    duration: raw?.duration,
    url: normalizedUrl,
    tab,
    origin: kind,
    eps,
    epSize: raw?.ep_size || eps.length,
  };
}

async function search() {
  const kw = keyword.value.trim();
  if (!kw) return;

  if (kw.startsWith('url=')) {
    const url = kw.slice(4).trim();
    const parsed = parseByUrl(url);
    if (parsed?.id) {
      actions.loadData({ source: { id: parsed.id, from: 'bilibili' } });
      emit('close');
      return;
    }
    errorText.value = '❌ 无效的链接';
    return;
  }

  loading.value = true;
  errorText.value = '';
  expandedBangumiKey.value = '';
  const tab = activeTab.value;
  groupsByTab.value = { ...groupsByTab.value, [tab]: [] };
  const seq = ++searchSeq;

  try {
    const tabGroups = [];

    if (tab !== 'movie') {
      const cacheList = [];
      services.dmStore.cache.list().forEach(([, data]) => {
        const info = data?.info;
        if (!info?.title || !info?.id) return;
        const title = info.title + (info.subtitle ? ` ${info.subtitle}` : '');
        const score = similar(title, kw);
        if (score <= 0.3) return;
        const isVideo = isVideoId(info.id);
        if ((tab === 'video' && !isVideo) || (tab === 'bangumi' && isVideo)) return;
        cacheList.push({
          score,
          id: info.id,
          title,
          author: info.owner?.name || '',
          play: info.stat?.view,
          video_review: info.stat?.danmaku,
          duration: info.duration,
          url: info.url,
        });
      });
      cacheList.sort((a, b) => b.score - a.score);
      if (cacheList.length) tabGroups.push({ title: '📦 本地缓存', list: cacheList, source: 'cache' });

      const server = services.dmStore.get('server');
      if (server) {
        const serverList = await fetch(`${server}/search?keyword=${encodeURIComponent(kw)}&type=video`)
          .then((res) => res.json())
          .then((list) =>
            (list || [])
              .map((item) => {
                const url = item?.bvid ? `https://www.bilibili.com/video/${item.bvid}` : item?.url || '';
                const parsed = parseByUrl(url);
                if (!parsed?.id) return null;
                const isVideo = isVideoId(parsed.id);
                if ((tab === 'video' && !isVideo) || (tab === 'bangumi' && isVideo)) return null;
                return {
                  ...item,
                  id: parsed.id,
                  title: stripHtml(item?.title),
                  url,
                };
              })
              .filter(Boolean),
          )
          .catch(() => {
            actions.showTip('⚠ 请检查服务器是否正确');
            return [];
          });
        if (serverList.length) tabGroups.push({ title: '🌐 服务器数据', list: serverList, source: 'server' });
      }
    }

    if (tab === 'video') {
      const list = await actions
        .searchBiliVideos(kw, 'video')
        .then((items) =>
          items
            .map((item) => ({ ...item, url: item?.bvid ? `https://www.bilibili.com/video/${item.bvid}` : item?.url || '' }))
            .map((item) => normalizeBiliItem(item, 'video'))
            .filter(Boolean),
        );
      if (list.length) tabGroups.push({ title: '📺 B站视频', list, source: 'bilibili' });
    } else if (tab === 'bangumi') {
      const list = await actions
        .searchBiliVideos(kw, 'media_bangumi')
        .then((items) => items.map((item) => normalizeBiliItem(item, 'media_bangumi')).filter(Boolean));
      if (list.length) tabGroups.push({ title: '📼 B站番剧', list, source: 'bilibili' });
    } else {
      const list = await actions
        .searchBiliVideos(kw, 'media_ft')
        .then((items) => items.map((item) => normalizeBiliItem(item, 'media_ft')).filter(Boolean));
      if (list.length) tabGroups.push({ title: '🎬 B站电影', list, source: 'bilibili' });
    }

    if (seq !== searchSeq) return;
    groupsByTab.value = { ...groupsByTab.value, [tab]: tabGroups };

    if (!tabGroups.length) {
      errorText.value = '❌ 没有找到相关内容';
    }
  } catch (err) {
    if (seq === searchSeq) errorText.value = `❌ 搜索失败：${err.message}`;
  } finally {
    if (seq === searchSeq) loading.value = false;
  }
}

function switchTab(tabKey) {
  if (activeTab.value === tabKey) return;
  activeTab.value = tabKey;
  expandedBangumiKey.value = '';
  errorText.value = '';
  if (keyword.value.trim()) search();
}

function selectItem(item, source) {
  actions.loadData({ source: { id: item.id, from: source } });
  emit('close');
}

function toggleBangumiEpisodes(item, group, index) {
  if (group.source !== 'bilibili' || item.origin !== 'media_bangumi' || !item.eps?.length) {
    selectItem(item, group.source);
    return;
  }
  const key = `${group.source}-${item.id}-${index}`;
  expandedBangumiKey.value = expandedBangumiKey.value === key ? '' : key;
}

function isBangumiExpanded(item, group, index) {
  return expandedBangumiKey.value === `${group.source}-${item.id}-${index}`;
}

onMounted(() => {
  keyword.value = actions.getCurrentInfo().title;
  search();
});
</script>

<template>
  <div class="dm-search-overlay" @click.self="emit('close')">
    <div class="dm-search-panel">
      <div class="dm-search-title">搜索内容并载入弹幕：</div>
      <input v-model="keyword" type="text" @keydown.enter="search" />

      <div class="dm-search-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="dm-search-tab"
          :class="{ active: activeTab === tab.key }"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="dm-search-results">
        <div v-if="loading" class="dm-search-status">🔍 搜索中...</div>
        <div v-if="errorText" class="dm-search-status">{{ errorText }}</div>

        <template v-if="!loading && !errorText && !currentGroups().length">
          <div class="dm-search-status">暂无该分类结果</div>
        </template>

        <template v-for="group in currentGroups()" :key="`${activeTab}-${group.title}`">
          <div class="dm-search-group-title">{{ group.title }}</div>
          <template v-for="(item, index) in group.list" :key="`${group.source}-${item.id}-${index}`">
            <div
              class="dm-search-row"
              @click="activeTab === 'bangumi' ? toggleBangumiEpisodes(item, group, index) : selectItem(item, group.source)"
            >
              <div class="dm-search-line1">
                <span>{{ activeTab === 'movie' ? '🎬' : activeTab === 'bangumi' ? '📼' : '📺' }}</span>
                <span>{{ item.title }}</span>
                <span v-if="activeTab === 'bangumi' && item.eps?.length" class="dm-search-ep-hint">{{ isBangumiExpanded(item, group, index) ? '收起剧集' : `展开剧集(${item.epSize || item.eps.length})` }}</span>
              </div>
              <div class="dm-search-line2">
                <span v-if="item.author">👤 {{ item.author }}</span>
                <span v-if="item.play">👁 {{ formatCount(item.play) }}</span>
                <span v-if="item.video_review">💬 {{ formatCount(item.video_review) }}</span>
                <span v-if="item.duration">🕒 {{ normalizeTimeStr(item.duration) }}</span>
                <a v-if="item.url" :href="item.url" target="_blank" @click.stop>🔗 打开</a>
              </div>
            </div>

            <div v-if="activeTab === 'bangumi' && isBangumiExpanded(item, group, index)" class="dm-search-eps">
              <button
                v-for="ep in item.eps"
                :key="ep.id"
                class="dm-search-ep-btn"
                @click="selectItem(ep, group.source)"
              >
                {{ ep.title }}
              </button>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dm-search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dm-search-panel {
  background: #fff;
  width: 600px;
  max-width: calc(100vw - 24px);
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dm-search-title {
  font-weight: 700;
  font-size: 16px;
}

.dm-search-panel input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.dm-search-tabs {
  display: flex;
  gap: 8px;
}

.dm-search-tab {
  border: 1px solid #ddd;
  background: #f6f6f6;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
}

.dm-search-tab.active {
  background: #1976d2;
  border-color: #1976d2;
  color: #fff;
}

.dm-search-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dm-search-group-title {
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 4px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
}

.dm-search-row {
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dm-search-row:hover {
  background: #e0e0e0;
}

.dm-search-line1 {
  font-weight: 500;
  display: flex;
  gap: 6px;
  align-items: center;
}

.dm-search-ep-hint {
  margin-left: auto;
  font-size: 12px;
  color: #1976d2;
}

.dm-search-line2 {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #666;
}

.dm-search-line2 a {
  color: #1a73e8;
  text-decoration: none;
}

.dm-search-eps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 6px;
  padding: 4px 0 8px;
}

.dm-search-ep-btn {
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  padding: 6px 8px;
  text-align: left;
  cursor: pointer;
}

.dm-search-ep-btn:hover {
  background: #f5f7ff;
  border-color: #adc5ee;
}

.dm-search-status {
  color: #444;
}
</style>
