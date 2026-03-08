import { createApp, reactive } from 'vue';
import UserscriptApp from '../components/UserscriptApp.vue';
import { BiliDanmakuPlayer } from '../core/player';
import { createDanmakuData } from './danmaku-data';
import { dmStore } from './dm-store';
import { urlRules } from './url-rules';

const controller = {
  panelId: 'dmplayer-ctl-panel',
  dmPlayer: null,
  BDM: null,
  dmStore,
  autoBind: dmStore.getLocal('autoBind', false),
  videoId: null,
  data: {},
  panelApp: null,
  fileInput: null,
  hotkeyBound: false,
  uiState: reactive({
    showing: true,
    binded: false,
    uiTheme: dmStore.getLocal('ui.theme', 'light'),
    showControlPanel: true,
    showSearch: false,
    showConfig: false,
    showUrlRuleSettings: false,
  }),
};

function pickVideo() {
  const videos = Array.from(document.querySelectorAll('video'));
  if (!videos.length) return null;

  let bestVideo = null;
  let bestScore = -1;
  for (const video of videos) {
    const rect = video.getBoundingClientRect();
    const area = rect.width * rect.height;
    if (area <= 0) continue;

    const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    const visibleArea = visibleWidth * visibleHeight;
    const score = visibleArea > 0 ? visibleArea : area * 0.01;

    if (score > bestScore) {
      bestScore = score;
      bestVideo = video;
    }
  }

  return bestVideo || videos[0];
}

function setUITheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  controller.dmStore.setLocal('ui.theme', next);
  controller.uiState.uiTheme = next;
}

function bindHotkey() {
  if (controller.hotkeyBound) return;
  controller.hotkeyBound = true;

  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    if (isTyping) return;

    const key = e.key.toLowerCase();
    if (key === 'd') {
      toggleDanmaku();
    } else if (key === 's') {
      controller.uiState.showSearch = true;
    }
  });
}

function toggleDanmaku() {
  controller.dmPlayer.toggle();
  controller.uiState.showing = !!controller.dmPlayer.showing;
}

function openFileInput() {
  controller.fileInput?.click();
}

function getVideoFingerprint(video = pickVideo()) {
  if (!video) return '';
  const src = video.currentSrc || video.src || '';
  const width = Number.isFinite(video.videoWidth) ? video.videoWidth : 0;
  const height = Number.isFinite(video.videoHeight) ? video.videoHeight : 0;
  const duration = Number.isFinite(video.duration) ? Math.round(video.duration) : 0;
  return `${src}|${width}x${height}|${duration}`;
}

async function searchBiliVideos(keyword, search_type = 'video') {
  const searchRes = await controller.BDM.client.request({
    url: 'https://api.bilibili.com/x/web-interface/search/type',
    params: { search_type, keyword, page: 1 },
    sign: true,
    desc: `搜索${search_type} ${keyword}`,
  });
  return searchRes.data?.result || [];
}

function showUrlRuleSettingsPanel() {
  controller.uiState.showUrlRuleSettings = true;
}

function getCurrentInfo(video = pickVideo()) {
  const matchedRule = urlRules.matchCurrent(location.href);
  if (matchedRule?.rule) {
    return {
      id: matchedRule.videoId || null,
      url: matchedRule.normalizedUrl || location.href,
      title: urlRules.applyTitle(document.title, matchedRule.rule),
    };
  }
  return { id: null, url: location.href, title: document.title.trim() };
}

function observeVideoChange() {
  let href = null;
  let videoFingerprint = '';

  const updateVideoId = () => {
    const video = pickVideo();
    if (!video) return;

    const currentFingerprint = getVideoFingerprint(video);
    const hrefChanged = location.href !== href;
    const videoChanged = currentFingerprint !== videoFingerprint;
    if (!hrefChanged && !videoChanged) return;

    href = location.href;
    videoFingerprint = currentFingerprint;

    const currentInfo = getCurrentInfo(video);
    const newId = currentInfo.id;
    controller.uiState.showControlPanel = !!newId;
    if (newId && newId !== controller.videoId) {
      controller.dmPlayer.clear();
      setTimeout(() => update(newId), 100);
    } else if (!newId) {
      controller.dmPlayer.clear();
      controller.videoId = null;
    }
  };

  const observer = new MutationObserver(updateVideoId);
  observer.observe(document.body, { childList: true, subtree: true });
  updateVideoId();
}

function showTip(message, { duration = 3000 } = {}) {
  const dark = controller.uiState.uiTheme !== 'light';
  const tip = document.createElement('div');
  tip.textContent = message;
  Object.assign(tip.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 14px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    zIndex: 9999,
    whiteSpace: 'pre-line',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    background: dark ? 'rgba(50, 50, 50, 0.9)' : '#f0f0f0',
    color: dark ? '#fff' : '#000',
    border: dark ? '1px solid #444' : '1px solid #ccc',
  });
  document.body.appendChild(tip);
  requestAnimationFrame(() => {
    tip.style.opacity = '1';
  });
  setTimeout(() => {
    tip.style.opacity = '0';
    tip.addEventListener('transitionend', () => tip.remove());
  }, duration);
}

function logError(desc, err) {
  showTip(`${desc}：${err.message}`);
  controller.BDM.logger?.error(desc, err);
}

function parseArchiveUrl(url) {
  if (!url) return null;
  const parsed = controller.BDM?.BiliArchive?.parseUrl?.(String(url));
  if (!parsed?.id) return null;
  return parsed;
}

function init() {
  if (document.getElementById(controller.panelId)) return;
  controller.dmPlayer.setOptions(controller.dmStore.get('settings', {}));
  controller.uiState.showControlPanel = !!getCurrentInfo().id;

  const panelRoot = document.createElement('div');
  panelRoot.id = controller.panelId;
  document.body.appendChild(panelRoot);
  controller.panelApp = createApp(UserscriptApp);
  controller.panelApp.provide('dmState', controller.uiState);
  controller.panelApp.provide('dmActions', {
    setUITheme,
    getCurrentInfo,
    searchBiliVideos,
    parseArchiveUrl,
    loadData,
    showTip,
    logError,
    bindVideoID,
    saveRules: urlRules.save,
    toggleDanmaku,
    cacheData,
    openFileInput,
  });
  controller.panelApp.provide('dmServices', {
    dmPlayer: controller.dmPlayer,
    dmStore: controller.dmStore,
  });
  controller.panelApp.provide('dmDataMap', controller.data);
  controller.panelApp.provide('dmVideoId', () => controller.videoId);
  controller.panelApp.provide('dmUrlRules', urlRules);
  controller.panelApp.mount(panelRoot);

  controller.fileInput = document.createElement('input');
  controller.fileInput.type = 'file';
  controller.fileInput.accept = '.json,.xml';
  controller.fileInput.style.display = 'none';
  controller.fileInput.id = 'dm-input-file';
  controller.fileInput.onchange = (e) => {
    const file = e.target.files[0];
    controller.fileInput.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        const data = createDanmakuData(controller.BDM);
        const load = {};
        if (text.startsWith('<')) {
          load.danmakuData = controller.BDM.BiliDanmaku.parseXml(text);
        } else {
          const json = JSON.parse(text);
          if (Array.isArray(json)) load.danmakuData = json;
          else if (json.danmakuData) Object.assign(load, json);
          else throw new Error('不支持的 JSON 格式');
        }
        if (!load.danmakuData?.length) throw new Error('弹幕数据为空');

        const current = getCurrentInfo();
        load.id ??= current.id;
        load.url ??= current.url;
        load.title ??= current.title;
        data.source = 'local';
        data.setData(load);
        loadDanmakuSuccess(data);
      } catch (err) {
        logError('❌ 加载失败', err);
      }
    };
    reader.readAsText(file);
  };
  document.body.appendChild(controller.fileInput);

  controller.dmPlayer.init();
  controller.dmPlayer.update();
  bindHotkey();
}

function update(videoId) {
  if (!videoId) return;
  controller.videoId = videoId;
  controller.dmPlayer.update();
  controller.BDM.logger?.log(`当前视频：${videoId}`);

  bindVideoID(false);
  const data = controller.data[videoId];
  if (data?.dmList?.length) {
    controller.dmPlayer.load(data.dmList);
    return;
  }
  const bindInfo = controller.dmStore.binded.get(videoId);
  if (bindInfo) loadData(bindInfo, true);
}

function loadDanmakuSuccess(data) {
  controller.data[controller.videoId] = data;
  controller.dmPlayer.load(data.getDanmakuData());
  controller.uiState.showing = !!controller.dmPlayer.showing;
  const info = data.info;
  const title = info?.title || '（未知标题）';
  const time = info?.fetchtime ? new Date(info.fetchtime * 1000).toLocaleString('zh-CN', { hour12: false }) : '（未知）';
  showTip(`🎉 成功载入${data.source}数据：\n🎬 ${title}\n💬 共 ${data.dmCount} 条弹幕\n🕒 抓取时间：${time}`);
}

async function loadData({ source, target }, binded = false) {
  try {
    const id = source.id;
    if (!id) return;
    const data = createDanmakuData(controller.BDM);

    const executeBind = () => {
      if(!controller.videoId) return;
      if (binded) {
        data.binded = true;
        bindVideoID(false);
      } else if (controller.autoBind) {
        bindVideoID(true, true);
      }
    };

    const from = source.from;
    data.source = from;
    if (target) Object.assign(data, target);

    switch (from) {
      case 'cache': {
        const cache = await controller.dmStore.cache.get(id);
        if (cache?.data) {
          data.setData(cache.data);
          loadDanmakuSuccess(data);
          executeBind();
        } else {
          showTip('⚠ 缓存数据不存在');
        }
        break;
      }
      case 'server': {
        const server = controller.dmStore.get('server');
        if (server) {
          const params = new URLSearchParams({ id: String(id) });
          try {
            const res = await fetch(`${server}/video?${params.toString()}`);
            const json = await res.json();
            data.setData(json);
            loadDanmakuSuccess(data);
            executeBind();
          } catch (err) {
            logError('❌ 请检查服务器', err);
          }
        }
        break;
      }
      default: {
        await data.getData(id);
        await data.getDanmakuXml();
        loadDanmakuSuccess(data);
        executeBind();
        const newDm = await data.getDanmakuPb();
        if (newDm > 0) loadDanmakuSuccess(data);
        break;
      }
    }
  } catch (err) {
    logError('❌ 弹幕数据加载失败', err);
  }
}

function cacheData() {
  const data = controller.data[controller.videoId];
  if (!data) {
    showTip('⚠ 未有弹幕数据');
    return;
  }
  const id = data.info?.id;
  if (!id) {
    showTip('⚠ 未知弹幕数据');
    return;
  }
  controller.dmStore.cache.set(id, { info: data.info, data: data.data });
  data.source = 'cache';
  bindVideoID(true, true);
  showTip('✅ 弹幕数据已缓存');
}

function bindVideoID(toggle = true, force = false) {
  const data = controller.data[controller.videoId];
  if (toggle) {
    if (!data) {
      showTip('⚠ 未有弹幕数据');
      return;
    }
    data.binded = !data.binded;
    if (force) data.binded = true;
    if (data.binded) {
      try {
        const info = data.info;
        const current = getCurrentInfo();
        const bindData = {
          source: {
            id: info.id,
            url: info.url,
            title: info.title + (info.subtitle ? ` ${info.subtitle}` : ''),
            from: data.source,
          },
          target: {
            id: current.id,
            url: current.url,
            title: current.title,
            alignData: data.alignData,
          },
        };
        controller.dmStore.binded.set(controller.videoId, bindData);
      } catch (err) {
        logError('❌ 绑定视频失败', err);
      }
    } else {
      controller.dmStore.binded.remove(controller.videoId);
    }
  }
  controller.uiState.binded = !!data?.binded;
}

async function waitForVideo(timeout = 10000) {
  return new Promise((resolve, reject) => {
    let observer = null;
    let timer = null;

    const cleanup = () => {
      if (observer) observer.disconnect();
      if (timer) clearTimeout(timer);
    };

    const tryResolve = () => {
      const video = pickVideo();
      if (video) {
        cleanup();
        resolve(video);
        return true;
      }
      return false;
    };

    if (tryResolve()) return;

    observer = new MutationObserver(() => {
      tryResolve();
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

    timer = setTimeout(() => {
      cleanup();
      reject(new Error('⏰ 超时：未检测到 <video> 元素'));
    }, timeout);
  });
}

export async function bootstrap() {
  if (window.top !== window.self) {
    return;
  }

  try {
    const BDMGlobal = globalThis.BiliDataManager || unsafeWindow?.BiliDataManager;
    if (!BDMGlobal?.create) {
      throw new Error('BiliDataManager 未加载，请检查 @require');
    }

    controller.BDM = BDMGlobal.create({
      httpRequest: GM_xmlhttpRequest,
      name: 'Danmaku Player',
      isLog: true,
    });
    controller.dmPlayer = new BiliDanmakuPlayer();
    controller.autoBind = controller.dmStore.getLocal('autoBind', false);
    urlRules.ensure();

    controller.dmPlayer.domAdapter.injectStyle('dmplayer-danmaku-mark', `
      @keyframes dmplayer-animate-mark {
        0%   { opacity: 0; }
        5%   { opacity: 0.6; }
        95%  { opacity: 0.4; }
        100% { opacity: 0; }
      }
      .dmplayer-danmaku-mark {
        left: 10px;
        top: 10px;
        animation-name: dmplayer-animate-mark;
        animation-timing-function: cubic-bezier(0,1,1,0) !important;
      }
    `);

    unsafeWindow.dmPlayerCtl = controller;

    if (typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand('🔗 URL匹配设置', () => {
        const video = pickVideo();
        if (!video) {
          showTip('⚠ 当前页面未检测到 <video> 元素');
          return;
        }
        showUrlRuleSettingsPanel();
      });
      GM_registerMenuCommand('🔍 搜索弹幕', () => {
        const video = pickVideo();
        if (!video) {
          showTip('⚠ 当前页面未检测到 <video> 元素');
          return;
        }
        controller.uiState.showSearch = true;
      });
    }
  } catch (err) {
    console.error('加载失败:', err);
    return;
  }

  try {
    await waitForVideo();
    init();
    observeVideoChange();
  } catch (err) {
    console.warn(err);
  }
}
