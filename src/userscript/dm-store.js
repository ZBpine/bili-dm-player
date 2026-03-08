export const dmStore = {
  key: 'dm-player',
  GMCache: GM_getValue('cache', {}),
  getConfig() {
    const cfg = GM_getValue(dmStore.key, {});
    return cfg && typeof cfg === 'object' ? cfg : {};
  },
  setConfig(obj) {
    GM_setValue(dmStore.key, obj && typeof obj === 'object' ? obj : {});
  },
  getLocalConfig() {
    try {
      const cfg = JSON.parse(localStorage.getItem(dmStore.key) || '{}');
      return cfg && typeof cfg === 'object' ? cfg : {};
    } catch {
      return {};
    }
  },
  setLocalConfig(obj) {
    localStorage.setItem(dmStore.key, JSON.stringify(obj && typeof obj === 'object' ? obj : {}));
  },
  getLocal(key, def) {
    const cfg = dmStore.getLocalConfig();
    return key.split('.').reduce((o, k) => (o || {})[k], cfg) ?? def;
  },
  setLocal(key, value) {
    const cfg = dmStore.getLocalConfig();
    const keys = key.split('.');
    let obj = cfg;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = obj[keys[i]] || {};
      obj = obj[keys[i]];
    }
    obj[keys.at(-1)] = value;
    dmStore.setLocalConfig(cfg);
  },
  get(key, def) {
    const cfg = dmStore.getConfig();
    return key.split('.').reduce((o, k) => (o || {})[k], cfg) ?? def;
  },
  set(key, value) {
    const cfg = dmStore.getConfig();
    const keys = key.split('.');
    let obj = cfg;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = obj[keys[i]] || {};
      obj = obj[keys[i]];
    }
    obj[keys.at(-1)] = value;
    dmStore.setConfig(cfg);
  },
};

dmStore.cache = {
  get(id) {
    return dmStore.GMCache?.[id];
  },
  set(id, data) {
    dmStore.GMCache[id] = data;
    GM_setValue('cache', dmStore.GMCache);
  },
  remove(id) {
    if (dmStore.GMCache) delete dmStore.GMCache[id];
    GM_setValue('cache', dmStore.GMCache);
  },
  list() {
    return Object.entries(dmStore.GMCache);
  },
  clear() {
    dmStore.GMCache = {};
    GM_setValue('cache', dmStore.GMCache);
  },
};

dmStore.binded = {
  get(id) {
    return dmStore.getLocalConfig().binded?.[id];
  },
  set(id, data) {
    const cfg = dmStore.getLocalConfig();
    cfg.binded = cfg.binded || {};
    cfg.binded[id] = data;
    dmStore.setLocalConfig(cfg);
  },
  remove(id) {
    const cfg = dmStore.getLocalConfig();
    if (cfg.binded) delete cfg.binded[id];
    dmStore.setLocalConfig(cfg);
  },
  list() {
    const binded = dmStore.getLocalConfig().binded || {};
    return Object.entries(binded);
  },
  clear() {
    const cfg = dmStore.getLocalConfig();
    delete cfg.binded;
    dmStore.setLocalConfig(cfg);
  },
};
