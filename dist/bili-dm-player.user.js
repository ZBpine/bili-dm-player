// ==UserScript==
// @name         B站弹幕播放器
// @namespace    https://github.com/ZBpine/bili-dm-player/
// @version      2.0.0
// @author       ZBpine
// @description  在任意网页视频页面加载B站弹幕
// @license      MIT
// @icon         https://www.bilibili.com/favicon.ico
// @match        *://*/*
// @require      https://cdn.jsdelivr.net/gh/ZBpine/bili-data-manager@e34a513d8a988fea5ac353d5a986ad9d03a0459f/dist/bili-data-manager.min.js
// @connect      api.bilibili.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  const d=new Set;const a = async e=>{d.has(e)||(d.add(e),(t=>{typeof GM_addStyle=="function"?GM_addStyle(t):(document.head||document.documentElement).appendChild(document.createElement("style")).append(t);})(e));};

  a(" .dmplayer-ctl-panel[data-v-d0c0fe86]{position:fixed;left:0;bottom:40px;transform:translate(calc(-100% + 20px));z-index:10000;transition:transform .3s ease-in-out,opacity .3s ease;opacity:.2;background:#333;border-radius:0 20px 20px 0;padding:10px 20px 10px 10px;display:grid;grid-auto-flow:column;grid-auto-columns:36px;grid-template-rows:36px 36px;gap:6px}.dmplayer-ctl-panel.light[data-v-d0c0fe86]{background:#ccc}.dmplayer-ctl-panel[data-v-d0c0fe86]:hover{transform:translate(0);opacity:1}.dmplayer-ctl-panel button[data-v-d0c0fe86]{padding:6px;border:none;border-radius:4px;cursor:pointer;font-size:14px;width:100%;background:#555;color:#fff}.dmplayer-ctl-panel.light button[data-v-d0c0fe86]{background:#eee;color:#000}.dm-search-overlay[data-v-44a074b9]{position:fixed;inset:0;background:#0006;z-index:10001;display:flex;align-items:center;justify-content:center}.dm-search-panel[data-v-44a074b9]{background:#fff;width:600px;max-width:calc(100vw - 24px);max-height:80vh;overflow-y:auto;padding:20px;border-radius:8px;box-shadow:0 4px 12px #0000004d;font-size:14px;font-family:sans-serif;display:flex;flex-direction:column;gap:12px}.dm-search-title[data-v-44a074b9]{font-weight:700;font-size:16px}.dm-search-panel input[data-v-44a074b9]{padding:6px 10px;font-size:14px;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box}.dm-search-tabs[data-v-44a074b9]{display:flex;gap:8px}.dm-search-tab[data-v-44a074b9]{border:1px solid #ddd;background:#f6f6f6;border-radius:6px;padding:4px 12px;cursor:pointer}.dm-search-tab.active[data-v-44a074b9]{background:#1976d2;border-color:#1976d2;color:#fff}.dm-search-results[data-v-44a074b9]{display:flex;flex-direction:column;gap:6px}.dm-search-group-title[data-v-44a074b9]{font-weight:700;margin-top:10px;margin-bottom:4px;border-bottom:1px solid #ccc;padding-bottom:4px}.dm-search-row[data-v-44a074b9]{padding:8px 10px;border-radius:6px;cursor:pointer;background:#f8f8f8;display:flex;flex-direction:column;gap:4px}.dm-search-row[data-v-44a074b9]:hover{background:#e0e0e0}.dm-search-line1[data-v-44a074b9]{font-weight:500;display:flex;gap:6px;align-items:center}.dm-search-ep-hint[data-v-44a074b9]{margin-left:auto;font-size:12px;color:#1976d2}.dm-search-line2[data-v-44a074b9]{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:#666}.dm-search-line2 a[data-v-44a074b9]{color:#1a73e8;text-decoration:none}.dm-search-eps[data-v-44a074b9]{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;padding:4px 0 8px}.dm-search-ep-btn[data-v-44a074b9]{border:1px solid #ddd;background:#fff;border-radius:6px;padding:6px 8px;text-align:left;cursor:pointer}.dm-search-ep-btn[data-v-44a074b9]:hover{background:#f5f7ff;border-color:#adc5ee}.dm-search-status[data-v-44a074b9]{color:#444}.dm-config-overlay[data-v-05515f64]{position:fixed;inset:0;background:#0006;z-index:10001;display:flex;align-items:center;justify-content:center;transition:opacity .15s ease}.dm-config-panel[data-v-05515f64]{background:#fff;width:500px;max-width:calc(100vw - 24px);box-sizing:content-box;max-height:80vh;overflow-y:auto;scrollbar-gutter:stable;padding:20px;border-radius:8px;box-shadow:0 4px 12px #0000004d;font-size:14px;font-family:sans-serif;display:flex;flex-direction:column;gap:16px}.dm-config-panel.dark[data-v-05515f64]{background:#2b2b2b;color:#efefef}.dm-config-panel.dark .dm-config-tabs[data-v-05515f64]{border-bottom-color:#444}.dm-config-panel.dark .dm-config-desc[data-v-05515f64],.dm-config-panel.dark .dm-config-align-row[data-v-05515f64]{background:#2a2a2a;border-color:#555}.dm-config-panel.dark input[data-v-05515f64],.dm-config-panel.dark select[data-v-05515f64],.dm-config-panel.dark button[data-v-05515f64]{background:#3a3a3a;color:#f0f0f0;border-color:#555}.dm-config-header[data-v-05515f64]{font-size:18px;font-weight:700}.dm-config-tabs[data-v-05515f64]{display:flex;gap:6px;border-bottom:1px solid #ccc;margin:10px 0}.dm-config-tabs button[data-v-05515f64]{background:none;border:none;padding:8px 12px;cursor:pointer;font-size:14px}.dm-config-tabs button.active[data-v-05515f64]{font-weight:700;border-bottom:2px solid #0077cc}.dm-config-tab-body[data-v-05515f64]{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.dm-config-section-title[data-v-05515f64]{font-size:16px;font-weight:700}.dm-config-section-control[data-v-05515f64]{display:flex;align-items:center;gap:6px}.dm-config-section-control>button[data-v-05515f64],.dm-config-section-control>select[data-v-05515f64]{width:130px}.dm-config-section-head[data-v-05515f64]{margin-top:8px}.dm-config-row[data-v-05515f64],.dm-config-shadow-row[data-v-05515f64],.dm-config-list-row[data-v-05515f64],.dm-config-row-inline[data-v-05515f64],.dm-config-section-head[data-v-05515f64],.dm-config-actions[data-v-05515f64]{display:flex;align-items:center;gap:6px}.dm-config-row[data-v-05515f64],.dm-config-section-head[data-v-05515f64],.dm-config-list-row[data-v-05515f64],.dm-config-actions[data-v-05515f64]{justify-content:space-between}.dm-config-row[data-v-05515f64]{min-height:36px;gap:18px}.dm-config-shadow-preset[data-v-05515f64]{margin-bottom:6px}.dm-config-shadow-preset select[data-v-05515f64]{width:100%;box-sizing:border-box}.dm-config-shadow-row[data-v-05515f64]{border:1px solid #ccc;padding:6px;align-items:center;flex-wrap:wrap}.dm-config-shadow-row span[data-v-05515f64]{font-weight:700}.dm-config-shadow-add[data-v-05515f64]{width:120px;padding:4px}.dm-config-row-label[data-v-05515f64]{flex-shrink:0}.dm-config-desc-key[data-v-05515f64]{font-weight:700}.dm-config-row-main[data-v-05515f64]{display:flex;align-items:center;gap:6px}.dm-config-row-desc[data-v-05515f64]{margin-left:auto;font-size:12px;color:#666}.dm-config-meta[data-v-05515f64]{flex:1;min-width:0}.dm-config-meta-id[data-v-05515f64]{display:inline-block;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:2px;white-space:nowrap}.dm-config-meta-title[data-v-05515f64]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dm-config-panel.dark .dm-config-meta-id[data-v-05515f64]{color:#86b7ff}.dm-config-panel.dark .dm-config-row-desc[data-v-05515f64]{color:#bbb}.dm-config-align-row[data-v-05515f64]{border:1px solid #ccc;padding:10px;display:flex;flex-direction:column;gap:6px}.dm-config-row-inline input[data-v-05515f64]{width:80px}.dm-config-comment-input[data-v-05515f64]{width:200px!important}.dm-config-desc[data-v-05515f64]{font-size:13px;line-height:1.6;background:#f9f9f9;padding:10px;border:1px solid #ccc;border-radius:6px}.dm-config-desc hr[data-v-05515f64]{border:0;border-top:1px solid #ccc;margin:6px 0}.dm-config-panel.dark .dm-config-desc hr[data-v-05515f64]{border-top-color:#555}.dm-config-panel input[data-v-05515f64],.dm-config-panel select[data-v-05515f64]{font-size:14px;padding:4px 6px;border:1px solid #ccc;border-radius:4px}.dm-config-panel input[type=number][data-v-05515f64]{width:60px;height:20px;padding:0;text-align:center}.dm-config-panel input[type=checkbox][data-v-05515f64]{width:20px;height:20px;cursor:pointer}.dm-config-panel button[data-v-05515f64]{height:28px;padding:0 10px;font-size:14px;border:1px solid #ccc;border-radius:4px;background:#f0f0f0;cursor:pointer}.dm-config-tabs button[data-v-05515f64]{height:auto;padding:8px 12px;border:none;border-radius:0;background:none}.dm-config-panel.dark .dm-config-tabs button[data-v-05515f64]{background:none;border:none}.dm-config-actions button[data-v-05515f64]{width:120px;padding:4px}.dm-urlrule-overlay[data-v-30c482c0]{position:fixed;inset:0;background:#00000073;z-index:10005;display:flex;align-items:center;justify-content:center}.dm-urlrule-panel[data-v-30c482c0]{background:#fff;width:940px;max-height:85vh;overflow-y:auto;border-radius:10px;padding:16px;font-size:14px;display:flex;flex-direction:column;gap:10px}.dm-urlrule-panel.dark[data-v-30c482c0]{background:#1f1f1f;color:#e9e9e9}.dm-urlrule-panel.dark .dm-urlrule-card[data-v-30c482c0]{border-color:#555;background:#2a2a2a}.dm-urlrule-panel.dark .dm-urlrule-tip[data-v-30c482c0],.dm-urlrule-panel.dark .dm-urlrule-empty[data-v-30c482c0],.dm-urlrule-panel.dark .dm-urlrule-result[data-v-30c482c0]{color:#cfcfcf}.dm-urlrule-panel.dark .dm-urlrule-input[data-v-30c482c0],.dm-urlrule-panel.dark button[data-v-30c482c0]{background:#2e2e2e;color:#f0f0f0;border-color:#666}.dm-urlrule-title[data-v-30c482c0]{font-size:18px;font-weight:700}.dm-urlrule-tip[data-v-30c482c0]{color:#666}.dm-urlrule-toolbar[data-v-30c482c0]{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}.dm-urlrule-toolbar-left[data-v-30c482c0],.dm-urlrule-toolbar-right[data-v-30c482c0],.dm-urlrule-inline[data-v-30c482c0],.dm-urlrule-ops[data-v-30c482c0]{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.dm-urlrule-result[data-v-30c482c0]{color:#444;white-space:pre-line}.dm-urlrule-list[data-v-30c482c0]{display:flex;flex-direction:column;gap:8px}.dm-urlrule-bottom-actions[data-v-30c482c0]{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}.dm-urlrule-bottom-actions-left[data-v-30c482c0],.dm-urlrule-bottom-actions-right[data-v-30c482c0]{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.dm-urlrule-empty[data-v-30c482c0]{color:#888}.dm-urlrule-card[data-v-30c482c0]{border:1px solid #ddd;border-radius:8px;padding:10px;display:grid;grid-template-columns:110px 1fr 1fr;gap:8px;align-items:center}.dm-urlrule-label[data-v-30c482c0]{font-weight:600}.dm-urlrule-input[data-v-30c482c0]{border:1px solid #ccc;border-radius:4px;padding:6px 8px;width:100%;box-sizing:border-box}button[data-v-30c482c0]{border:1px solid #ccc;border-radius:6px;background:#f5f5f5;padding:5px 10px;cursor:pointer} ");
function makeMap(str) {
    const map = Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 &&
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = makeMap(
",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    });
  };
  const camelizeRE = /-\w/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  const isRef$1 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef$1(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a;
    return (

isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
    );
  };
  let activeEffectScope;
  class EffectScope {
constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.__v_skip = true;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].pause();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].pause();
        }
      }
    }
resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i, l;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].resume();
            }
          }
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        this.effects.length = 0;
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  let activeSub;
  const pausedQueueEffects = new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      this.__v_skip = true;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (false) ;
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l = computed2.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      link.dep.subs = link;
    }
  }
  const targetMap = new WeakMap();
  const ITERATE_KEY = Symbol(
    ""
  );
  const MAP_KEY_ITERATE_KEY = Symbol(
    ""
  );
  const ARRAY_ITERATE_KEY = Symbol(
    ""
  );
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      {
        dep.track();
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target, item) {
    if ( isReadonly(target)) {
      return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(
        this,
        "filter",
        fn,
        thisArg,
        (v) => v.map((item) => toWrapped(this, item)),
        arguments
      );
    },
    find(fn, thisArg) {
      return apply(
        this,
        "find",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(
        this,
        "findLast",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && ! isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (!result.done) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && ! isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    if (arr !== self2) {
      if (! isShallow(self2)) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    return arr[method](wrappedFn, ...args);
  }
  function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
      args[0] = toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = ( toRaw(self2))[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) ||

Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(
        target,
        key,



isRef(target) ? target : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if ( isRef(res)) {
        const value = targetIsArray && isIntegerKey(key) ? res : res.value;
        return isReadonly2 && isObject(value) ? readonly(value) : value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (! isShallow(value) && ! isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArrayWithIntegerKey && isRef(oldValue) && ! isRef(value)) {
          if (isOldValueReadonly) {
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
isRef(target) ? target : receiver
      );
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = new MutableReactiveHandler();
  const readonlyHandlers = new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return extend(
Object.create(innerIterator),
        {
next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          }
        }
      );
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly2 && track( toRaw(target), "iterate", ITERATE_KEY);
        return target.size;
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          if (!shallow && ! isShallow(value) && ! isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const proto = getProto(target);
          const hadKey = proto.has.call(target, value);
          if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && ! isShallow(value) && ! isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          }
          const oldValue = get.call(target, key);
          target.set(key, value);
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
          return this;
        },
        delete(key) {
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          }
          get ? get.call(target, key) : void 0;
          const result = target.delete(key);
          if (hadKey) {
            trigger(target, "delete", key, void 0);
          }
          return result;
        },
        clear() {
          const target = toRaw(this);
          const hadItems = target.size !== 0;
          const result = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, true)
  };
  const reactiveMap = new WeakMap();
  const shallowReactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  const shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
function reactive(target) {
    if ( isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
function isReactive(value) {
    if ( isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if ( isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track();
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
      newValue = useDirectValue ? newValue : toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger();
        }
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if ( isRef(oldValue) && ! isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
notify() {
      this.flags |= 16;
      if (!(this.flags & 8) &&
activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link = this.dep.track();
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      }
    }
  }
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if ( isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if ( isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if ( isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if ( isRef(s)) {
          return s.value;
        } else if ( isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : (
cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups) cleanup2();
        }
        cleanupMap.delete(effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || new Map();
    if ((seen.get(value) || 0) >= depth) {
      return value;
    }
    seen.set(value, depth);
    depth--;
    if ( isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }
  const stack = [];
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
msg + args.map((a) => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length &&
true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if ( isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError$1(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError$1(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (throwInProd) {
      throw err;
    } else {
      console.error(err);
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob ||
!(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (false) ;
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs();
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key, value) {
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = getCurrentInstance();
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else ;
    }
  }
  const ssrContextKey = Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    const baseWatchOptions = extend({}, options);
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  const TeleportEndKey = Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const leaveCbKey = Symbol("_leaveCb");
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  function isTemplateRefKey(refs, key) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
  }
  const pendingSetRefMap = new WeakMap();
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
      if (isTemplateRefKey(refs, key)) {
        return false;
      }
      return hasOwn(rawSetupState, key);
    };
    const canSetRef = (ref22, key) => {
      if (key && isTemplateRefKey(refs, key)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref3) {
      invalidatePendingSetRef(oldRawRef);
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if ( isRef(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref3, rawRef.k)) {
                    ref3.value = newVal;
                  }
                  if (rawRef.k) refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref3, rawRef.k)) {
              ref3.value = value;
            }
            if (rawRef.k) refs[rawRef.k] = value;
          } else ;
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache;
    const sourceIsArray = isArray(source);
    if (sourceIsArray || isString(source)) {
      const sourceIsReactiveArray = sourceIsArray && isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = ! isShallow(source);
        isReadonlySource = isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
          i,
          void 0,
          cached
        );
      }
    } else if (typeof source === "number") {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached);
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i) => renderItem(item, i, void 0, cached)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  const getPublicInstance = (i) => {
    if (!i) return null;
    if (isStatefulComponent(i)) return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (


extend( Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $host: (i) => i.ce,
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => {
        queueJob(i.update);
      }),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (hasOwn(props, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
        }
        return publicGetter(instance);
      } else if (
(cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, props, type }
    }, key) {
      let cssModules;
      return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    const {
data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
expose,
      inheritAttrs,
components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject(data)) ;
      else {
        instance.data = reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val,
            enumerable: true
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if ( isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        {
          watch(getter, handler);
        }
      }
    } else if (isFunction(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else ;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
methods: mergeObjectOptions,
    computed: mergeObjectOptions,
beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
components: mergeObjectOptions,
    directives: mergeObjectOptions,
watch: mergeWatchOptions,
provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend( Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [... new Set([...to, ...from])];
      }
      return extend(
Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend( Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              render(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app._instance,
              16
            );
            render(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] ||
props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  const mixinEmitsCache = new WeakMap();
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render.call(
            thisProxy,
            proxyToUse,
            renderCache,
            false ? shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (false) ;
        result = normalizeVNode(
          render2.length > 1 ? render2(
            false ? shallowReadonly(props) : props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render2(
            false ? shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      setTransitionHooks(root, vnode.transition);
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key) {
    const nextProp = nextProps[key];
    const prevProp = prevProps[key];
    if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (


(optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps ||
!hasOwn(rawProps, key) &&

((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps &&
(rawPrevProps[key] !== void 0 ||
rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key, value);
        }
      }
      if (opt[
        0
]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray(propType)) {
            for (let index = 0; index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction(propType) && propType.name === "Boolean";
          }
          prop[
            0
] = shouldCast;
          prop[
            1
] = shouldCastTrue;
          if (shouldCast || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    }
    return false;
  }
  const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
  const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false) ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  const initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref3 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (

oldVNode.el &&

(oldVNode.type === Fragment ||

!isSameVNodeType(oldVNode, newVNode) ||
oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (

fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(



n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren &&

n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (



n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
);
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance, false, optimized);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent, root, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          {
            if (root.ce && root.ce._hasShadowRoot()) {
              root.ce._injectChildStyle(type);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance.isUnmounted) update2();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
hostParentNode(prevTree.el),
getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update2 = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      update2();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? (
anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
          ) : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            if (el._isLeaving) {
              el[leaveCbKey](
                true
);
            }
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren &&




!dynamicChildren.hasOnce &&
(type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, job, subTree, um, m, a } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render = (vnode, container, namespace) => {
      let instance;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance = container._vnode.component;
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render,
      hydrate,
      createApp: createAppAPI(render)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0; i < hooks.length; i++)
        hooks[i].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance = anchorVnode.component;
    if (instance) {
      return resolveAsyncComponentPlaceholder(instance.subTree);
    }
    return null;
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = Symbol.for("v-fgt");
  const Text = Symbol.for("v-txt");
  const Comment = Symbol.for("v-cmt");
  const Static = Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 &&
!isBlockNode &&
currentBlock &&



(vnode.patchFlag > 0 || shapeFlag & 6) &&

vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
);
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if ( isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (


mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,



patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,



component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
child.slice()
      );
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
next: null,
      subTree: null,
effect: null,
      update: null,
job: null,
      scope: new EffectScope(
        true
),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
components: null,
      directives: null,
propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
emit: null,
emitted: null,
propsDefaults: EMPTY_OBJ,
inheritAttrs: type.inheritAttrs,
ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,

isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set) => set(v));
        else setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          instance.props,
          setupContext
        ]
      );
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult);
      }
    } else {
      finishComponentSetup(instance);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else ;
    finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key) {
      track(target, "get", "");
      return target[key];
    }
  };
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])\w/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
        instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c;
  };
  const version = "3.5.29";
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },



insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
before ? before.nextSibling : parent.firstChild,
anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const vtcKey = Symbol("_vtc");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOriginalDisplay = Symbol("_vod");
  const vShowHidden = Symbol("_vsh");
  const CSS_VAR_TEXT = Symbol("");
  const displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(
          key,
          isBoolean ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" &&
!tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? (

el.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          nextValue,
          instance
        );
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(
        (fn) => (e2) => !e2._stopped && fn && fn(e2)
      );
    } else {
      return value;
    }
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 &&
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (
el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
    ) {
      patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "sandbox" && el.tagName === "IFRAME") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  const assignKey = Symbol("_assign");
  function castValue(value, trim, number) {
    if (trim) value = value.trim();
    if (number) value = looseToNumber(value);
    return value;
  }
  const vModelText = {
    created(el, { modifiers: { lazy, trim, number } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      const castToNumber = number || vnode.props && vnode.props.type === "number";
      addEventListener(el, lazy ? "change" : "input", (e) => {
        if (e.target.composing) return;
        el[assignKey](castValue(el.value, trim, castToNumber));
      });
      if (trim || castToNumber) {
        addEventListener(el, "change", () => {
          el.value = castValue(el.value, trim, castToNumber);
        });
      }
      if (!lazy) {
        addEventListener(el, "compositionstart", onCompositionStart);
        addEventListener(el, "compositionend", onCompositionEnd);
        addEventListener(el, "change", onCompositionEnd);
      }
    },
mounted(el, { value }) {
      el.value = value == null ? "" : value;
    },
    beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      if (el.composing) return;
      const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
      const newValue = value == null ? "" : value;
      if (elValue === newValue) {
        return;
      }
      if (document.activeElement === el && el.type !== "range") {
        if (lazy && value === oldValue) {
          return;
        }
        if (trim && el.value.trim() === newValue) {
          return;
        }
      }
      el.value = newValue;
    }
  };
  const vModelCheckbox = {
deep: true,
    created(el, _, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        const modelValue = el._modelValue;
        const elementValue = getValue(el);
        const checked = el.checked;
        const assign = el[assignKey];
        if (isArray(modelValue)) {
          const index = looseIndexOf(modelValue, elementValue);
          const found = index !== -1;
          if (checked && !found) {
            assign(modelValue.concat(elementValue));
          } else if (!checked && found) {
            const filtered = [...modelValue];
            filtered.splice(index, 1);
            assign(filtered);
          }
        } else if (isSet(modelValue)) {
          const cloned = new Set(modelValue);
          if (checked) {
            cloned.add(elementValue);
          } else {
            cloned.delete(elementValue);
          }
          assign(cloned);
        } else {
          assign(getCheckboxValue(el, checked));
        }
      });
    },
mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      setChecked(el, binding, vnode);
    }
  };
  function setChecked(el, { value, oldValue }, vnode) {
    el._modelValue = value;
    let checked;
    if (isArray(value)) {
      checked = looseIndexOf(value, vnode.props.value) > -1;
    } else if (isSet(value)) {
      checked = value.has(vnode.props.value);
    } else {
      if (value === oldValue) return;
      checked = looseEqual(value, getCheckboxValue(el, true));
    }
    if (el.checked !== checked) {
      el.checked = checked;
    }
  }
  const vModelSelect = {
deep: true,
    created(el, { value, modifiers: { number } }, vnode) {
      const isSetModel = isSet(value);
      addEventListener(el, "change", () => {
        const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
          (o) => number ? looseToNumber(getValue(o)) : getValue(o)
        );
        el[assignKey](
          el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
        );
        el._assigning = true;
        nextTick(() => {
          el._assigning = false;
        });
      });
      el[assignKey] = getModelAssigner(vnode);
    },

mounted(el, { value }) {
      setSelected(el, value);
    },
    beforeUpdate(el, _binding, vnode) {
      el[assignKey] = getModelAssigner(vnode);
    },
    updated(el, { value }) {
      if (!el._assigning) {
        setSelected(el, value);
      }
    }
  };
  function setSelected(el, value) {
    const isMultiple = el.multiple;
    const isArrayValue = isArray(value);
    if (isMultiple && !isArrayValue && !isSet(value)) {
      return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
      const option = el.options[i];
      const optionValue = getValue(option);
      if (isMultiple) {
        if (isArrayValue) {
          const optionType = typeof optionValue;
          if (optionType === "string" || optionType === "number") {
            option.selected = value.some((v) => String(v) === String(optionValue));
          } else {
            option.selected = looseIndexOf(value, optionValue) > -1;
          }
        } else {
          option.selected = value.has(optionValue);
        }
      } else if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) el.selectedIndex = i;
        return;
      }
    }
    if (!isMultiple && el.selectedIndex !== -1) {
      el.selectedIndex = -1;
    }
  }
  function getValue(el) {
    return "_value" in el ? el._value : el.value;
  }
  function getCheckboxValue(el, checked) {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
  }
  const systemModifiers = ["ctrl", "shift", "alt", "meta"];
  const modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  const withModifiers = (fn, modifiers) => {
    if (!fn) return fn;
    const cache = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
      for (let i = 0; i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i]];
        if (guard && guard(event, modifiers)) return;
      }
      return fn(event, ...args);
    }));
  };
  const keyNames = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  };
  const withKeys = (fn, modifiers) => {
    const cache = fn._withKeys || (fn._withKeys = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = ((event) => {
      if (!("key" in event)) {
        return;
      }
      const eventKey = hyphenate(event.key);
      if (modifiers.some(
        (k) => k === eventKey || keyNames[k] === eventKey
      )) {
        return fn(event);
      }
    }));
  };
  const rendererOptions = extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  });
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$3 = ["title"];
  const _sfc_main$4 = {
    __name: "ControlPanel",
    props: {
      theme: {
        type: String,
        default: "dark"
      },
      showing: {
        type: Boolean,
        default: true
      },
      binded: {
        type: Boolean,
        default: false
      }
    },
    emits: ["search", "bind", "load", "save", "toggle", "config"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["dmplayer-ctl-panel", props.theme === "light" ? "light" : "dark"])
        }, [
          createBaseVNode("button", {
            title: "搜索弹幕",
            onClick: _cache[0] || (_cache[0] = ($event) => emit2("search"))
          }, "🔍"),
          createBaseVNode("button", {
            title: props.binded ? "取消绑定" : "绑定视频",
            onClick: _cache[1] || (_cache[1] = ($event) => emit2("bind"))
          }, toDisplayString(props.binded ? "🗑️" : "🔗"), 9, _hoisted_1$3),
          createBaseVNode("button", {
            title: "载入文件",
            onClick: _cache[2] || (_cache[2] = ($event) => emit2("load"))
          }, "📂"),
          createBaseVNode("button", {
            title: "保存弹幕",
            onClick: _cache[3] || (_cache[3] = ($event) => emit2("save"))
          }, "💾"),
          createBaseVNode("button", {
            title: "开关弹幕",
            onClick: _cache[4] || (_cache[4] = ($event) => emit2("toggle"))
          }, toDisplayString(props.showing ? "✅" : "🚫"), 1),
          createBaseVNode("button", {
            title: "打开设置",
            onClick: _cache[5] || (_cache[5] = ($event) => emit2("config"))
          }, "⚙️")
        ], 2);
      };
    }
  };
  const ControlPanel = _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d0c0fe86"]]);
  const _hoisted_1$2 = { class: "dm-search-panel" };
  const _hoisted_2$2 = { class: "dm-search-tabs" };
  const _hoisted_3$2 = ["onClick"];
  const _hoisted_4$2 = { class: "dm-search-results" };
  const _hoisted_5$2 = {
    key: 0,
    class: "dm-search-status"
  };
  const _hoisted_6$2 = {
    key: 1,
    class: "dm-search-status"
  };
  const _hoisted_7$2 = {
    key: 2,
    class: "dm-search-status"
  };
  const _hoisted_8$2 = { class: "dm-search-group-title" };
  const _hoisted_9$2 = ["onClick"];
  const _hoisted_10$2 = { class: "dm-search-line1" };
  const _hoisted_11$2 = {
    key: 0,
    class: "dm-search-ep-hint"
  };
  const _hoisted_12$2 = { class: "dm-search-line2" };
  const _hoisted_13$2 = { key: 0 };
  const _hoisted_14$2 = { key: 1 };
  const _hoisted_15$1 = { key: 2 };
  const _hoisted_16$1 = { key: 3 };
  const _hoisted_17$1 = ["href"];
  const _hoisted_18$1 = {
    key: 0,
    class: "dm-search-eps"
  };
  const _hoisted_19$1 = ["onClick"];
  const _sfc_main$3 = {
    __name: "SearchPanel",
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      const actions = inject("dmActions");
      const services = inject("dmServices");
      const tabs = [
        { key: "video", label: "视频" },
        { key: "bangumi", label: "番剧" },
        { key: "movie", label: "电影" }
      ];
      const keyword = ref("");
      const loading = ref(false);
      const errorText = ref("");
      const activeTab = ref("video");
      const groupsByTab = ref({ video: [], bangumi: [], movie: [] });
      const expandedBangumiKey = ref("");
      let searchSeq = 0;
      function currentGroups() {
        return groupsByTab.value[activeTab.value] || [];
      }
      function stripHtml(text) {
        return String(text || "").replace(/<[^>]+>/g, "");
      }
      function formatCount(n) {
        const parsed = parseInt(n || "0", 10);
        if (Number.isNaN(parsed)) return "0";
        if (parsed >= 1e8) return `${(parsed / 1e8).toFixed(1)}亿`;
        if (parsed >= 1e4) return `${(parsed / 1e4).toFixed(1)}万`;
        return String(parsed);
      }
      function normalizeTimeStr(duration) {
        if (typeof duration === "number" && !Number.isNaN(duration)) {
          const hours = Math.floor(duration / 3600);
          const minutes = Math.floor(duration % 3600 / 60);
          const seconds = duration % 60;
          if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
        if (typeof duration === "string" && /^\d+:\d{1,2}$/.test(duration)) {
          const [min, sec] = duration.split(":").map(Number);
          if (Number.isNaN(min) || Number.isNaN(sec)) return duration;
          if (min > 99) {
            const hours = Math.floor(min / 60);
            const minutes = min % 60;
            return `${hours}:${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
          }
          return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        }
        return duration;
      }
      function similar(a, b) {
        const m = a.length;
        const n = b.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        const lcs = dp[m][n];
        return 2 * lcs / (m + n);
      }
      function isVideoId(id) {
        return String(id || "").startsWith("video/");
      }
      function parseByUrl(url) {
        return actions.parseArchiveUrl?.(url);
      }
      function normalizeBiliItem(raw, kind) {
        const normalizedUrl = kind === "video" ? raw?.bvid ? `https://www.bilibili.com/video/${raw.bvid}` : raw?.url : raw?.url;
        const parsed = parseByUrl(normalizedUrl);
        if (!parsed?.id) return null;
        const tab = kind === "video" ? "video" : kind === "media_ft" ? "movie" : "bangumi";
        const eps = kind === "media_bangumi" ? (raw?.eps || []).map((ep) => {
          const epParsed = parseByUrl(ep?.url);
          if (!epParsed?.id) return null;
          return {
            id: epParsed.id,
            title: `${ep.index_title || ep.title || ""}${ep.long_title ? ` ${ep.long_title}` : ""}`.trim(),
            url: ep.url
          };
        }).filter(Boolean) : [];
        const author = kind === "video" ? raw?.author || raw?.up_name || raw?.uname || raw?.owner?.name || "" : raw?.season_type_name || raw?.areas || raw?.author || "";
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
          epSize: raw?.ep_size || eps.length
        };
      }
      async function search() {
        const kw = keyword.value.trim();
        if (!kw) return;
        if (kw.startsWith("url=")) {
          const url = kw.slice(4).trim();
          const parsed = parseByUrl(url);
          if (parsed?.id) {
            actions.loadData({ source: { id: parsed.id, from: "bilibili" } });
            emit2("close");
            return;
          }
          errorText.value = "❌ 无效的链接";
          return;
        }
        loading.value = true;
        errorText.value = "";
        expandedBangumiKey.value = "";
        const tab = activeTab.value;
        groupsByTab.value = { ...groupsByTab.value, [tab]: [] };
        const seq = ++searchSeq;
        try {
          const tabGroups = [];
          if (tab !== "movie") {
            const cacheList = [];
            services.dmStore.cache.list().forEach(([, data]) => {
              const info = data?.info;
              if (!info?.title || !info?.id) return;
              const title = info.title + (info.subtitle ? ` ${info.subtitle}` : "");
              const score = similar(title, kw);
              if (score <= 0.3) return;
              const isVideo = isVideoId(info.id);
              if (tab === "video" && !isVideo || tab === "bangumi" && isVideo) return;
              cacheList.push({
                score,
                id: info.id,
                title,
                author: info.owner?.name || "",
                play: info.stat?.view,
                video_review: info.stat?.danmaku,
                duration: info.duration,
                url: info.url
              });
            });
            cacheList.sort((a, b) => b.score - a.score);
            if (cacheList.length) tabGroups.push({ title: "📦 本地缓存", list: cacheList, source: "cache" });
            const server = services.dmStore.get("server");
            if (server) {
              const serverList = await fetch(`${server}/search?keyword=${encodeURIComponent(kw)}&type=video`).then((res) => res.json()).then(
                (list) => (list || []).map((item) => {
                  const url = item?.bvid ? `https://www.bilibili.com/video/${item.bvid}` : item?.url || "";
                  const parsed = parseByUrl(url);
                  if (!parsed?.id) return null;
                  const isVideo = isVideoId(parsed.id);
                  if (tab === "video" && !isVideo || tab === "bangumi" && isVideo) return null;
                  return {
                    ...item,
                    id: parsed.id,
                    title: stripHtml(item?.title),
                    url
                  };
                }).filter(Boolean)
              ).catch(() => {
                actions.showTip("⚠ 请检查服务器是否正确");
                return [];
              });
              if (serverList.length) tabGroups.push({ title: "🌐 服务器数据", list: serverList, source: "server" });
            }
          }
          if (tab === "video") {
            const list = await actions.searchBiliVideos(kw, "video").then(
              (items) => items.map((item) => ({ ...item, url: item?.bvid ? `https://www.bilibili.com/video/${item.bvid}` : item?.url || "" })).map((item) => normalizeBiliItem(item, "video")).filter(Boolean)
            );
            if (list.length) tabGroups.push({ title: "📺 B站视频", list, source: "bilibili" });
          } else if (tab === "bangumi") {
            const list = await actions.searchBiliVideos(kw, "media_bangumi").then((items) => items.map((item) => normalizeBiliItem(item, "media_bangumi")).filter(Boolean));
            if (list.length) tabGroups.push({ title: "📼 B站番剧", list, source: "bilibili" });
          } else {
            const list = await actions.searchBiliVideos(kw, "media_ft").then((items) => items.map((item) => normalizeBiliItem(item, "media_ft")).filter(Boolean));
            if (list.length) tabGroups.push({ title: "🎬 B站电影", list, source: "bilibili" });
          }
          if (seq !== searchSeq) return;
          groupsByTab.value = { ...groupsByTab.value, [tab]: tabGroups };
          if (!tabGroups.length) {
            errorText.value = "❌ 没有找到相关内容";
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
        expandedBangumiKey.value = "";
        errorText.value = "";
        if (keyword.value.trim()) search();
      }
      function selectItem(item, source) {
        actions.loadData({ source: { id: item.id, from: source } });
        emit2("close");
      }
      function toggleBangumiEpisodes(item, group, index) {
        if (group.source !== "bilibili" || item.origin !== "media_bangumi" || !item.eps?.length) {
          selectItem(item, group.source);
          return;
        }
        const key = `${group.source}-${item.id}-${index}`;
        expandedBangumiKey.value = expandedBangumiKey.value === key ? "" : key;
      }
      function isBangumiExpanded(item, group, index) {
        return expandedBangumiKey.value === `${group.source}-${item.id}-${index}`;
      }
      onMounted(() => {
        keyword.value = actions.getCurrentInfo().title;
        search();
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "dm-search-overlay",
          onClick: _cache[2] || (_cache[2] = withModifiers(($event) => emit2("close"), ["self"]))
        }, [
          createBaseVNode("div", _hoisted_1$2, [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "dm-search-title" }, "搜索内容并载入弹幕：", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => keyword.value = $event),
              type: "text",
              onKeydown: withKeys(search, ["enter"])
            }, null, 544), [
              [vModelText, keyword.value]
            ]),
            createBaseVNode("div", _hoisted_2$2, [
              (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                return createBaseVNode("button", {
                  key: tab.key,
                  class: normalizeClass(["dm-search-tab", { active: activeTab.value === tab.key }]),
                  onClick: ($event) => switchTab(tab.key)
                }, toDisplayString(tab.label), 11, _hoisted_3$2);
              }), 64))
            ]),
            createBaseVNode("div", _hoisted_4$2, [
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_5$2, "🔍 搜索中...")) : createCommentVNode("", true),
              errorText.value ? (openBlock(), createElementBlock("div", _hoisted_6$2, toDisplayString(errorText.value), 1)) : createCommentVNode("", true),
              !loading.value && !errorText.value && !currentGroups().length ? (openBlock(), createElementBlock("div", _hoisted_7$2, "暂无该分类结果")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(currentGroups(), (group) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: `${activeTab.value}-${group.title}`
                }, [
                  createBaseVNode("div", _hoisted_8$2, toDisplayString(group.title), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.list, (item, index) => {
                    return openBlock(), createElementBlock(Fragment, {
                      key: `${group.source}-${item.id}-${index}`
                    }, [
                      createBaseVNode("div", {
                        class: "dm-search-row",
                        onClick: ($event) => activeTab.value === "bangumi" ? toggleBangumiEpisodes(item, group, index) : selectItem(item, group.source)
                      }, [
                        createBaseVNode("div", _hoisted_10$2, [
                          createBaseVNode("span", null, toDisplayString(activeTab.value === "movie" ? "🎬" : activeTab.value === "bangumi" ? "📼" : "📺"), 1),
                          createBaseVNode("span", null, toDisplayString(item.title), 1),
                          activeTab.value === "bangumi" && item.eps?.length ? (openBlock(), createElementBlock("span", _hoisted_11$2, toDisplayString(isBangumiExpanded(item, group, index) ? "收起剧集" : `展开剧集(${item.epSize || item.eps.length})`), 1)) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_12$2, [
                          item.author ? (openBlock(), createElementBlock("span", _hoisted_13$2, "👤 " + toDisplayString(item.author), 1)) : createCommentVNode("", true),
                          item.play ? (openBlock(), createElementBlock("span", _hoisted_14$2, "👁 " + toDisplayString(formatCount(item.play)), 1)) : createCommentVNode("", true),
                          item.video_review ? (openBlock(), createElementBlock("span", _hoisted_15$1, "💬 " + toDisplayString(formatCount(item.video_review)), 1)) : createCommentVNode("", true),
                          item.duration ? (openBlock(), createElementBlock("span", _hoisted_16$1, "🕒 " + toDisplayString(normalizeTimeStr(item.duration)), 1)) : createCommentVNode("", true),
                          item.url ? (openBlock(), createElementBlock("a", {
                            key: 4,
                            href: item.url,
                            target: "_blank",
                            onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                            }, ["stop"]))
                          }, "🔗 打开", 8, _hoisted_17$1)) : createCommentVNode("", true)
                        ])
                      ], 8, _hoisted_9$2),
                      activeTab.value === "bangumi" && isBangumiExpanded(item, group, index) ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(item.eps, (ep) => {
                          return openBlock(), createElementBlock("button", {
                            key: ep.id,
                            class: "dm-search-ep-btn",
                            onClick: ($event) => selectItem(ep, group.source)
                          }, toDisplayString(ep.title), 9, _hoisted_19$1);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ], 64);
              }), 128))
            ])
          ])
        ]);
      };
    }
  };
  const SearchPanel = _export_sfc(_sfc_main$3, [["__scopeId", "data-v-44a074b9"]]);
  const _hoisted_1$1 = { class: "dm-config-tabs" };
  const _hoisted_2$1 = {
    key: 0,
    class: "dm-config-tab-body"
  };
  const _hoisted_3$1 = { class: "dm-config-section-head" };
  const _hoisted_4$1 = { class: "dm-config-section-control" };
  const _hoisted_5$1 = { class: "dm-config-section-head" };
  const _hoisted_6$1 = { class: "dm-config-section-control" };
  const _hoisted_7$1 = { class: "dm-config-row" };
  const _hoisted_8$1 = { class: "dm-config-row-main" };
  const _hoisted_9$1 = { class: "dm-config-row" };
  const _hoisted_10$1 = { class: "dm-config-row-main" };
  const _hoisted_11$1 = { class: "dm-config-row" };
  const _hoisted_12$1 = { class: "dm-config-row-main" };
  const _hoisted_13$1 = { class: "dm-config-row" };
  const _hoisted_14$1 = { class: "dm-config-row-main" };
  const _hoisted_15 = { class: "dm-config-row" };
  const _hoisted_16 = { class: "dm-config-row-main" };
  const _hoisted_17 = { class: "dm-config-row" };
  const _hoisted_18 = { class: "dm-config-row-main" };
  const _hoisted_19 = { class: "dm-config-row" };
  const _hoisted_20 = { class: "dm-config-row-main" };
  const _hoisted_21 = { class: "dm-config-shadow-preset" };
  const _hoisted_22 = ["onUpdate:modelValue"];
  const _hoisted_23 = ["onUpdate:modelValue"];
  const _hoisted_24 = ["value"];
  const _hoisted_25 = ["onUpdate:modelValue"];
  const _hoisted_26 = ["value"];
  const _hoisted_27 = ["onUpdate:modelValue"];
  const _hoisted_28 = ["value"];
  const _hoisted_29 = ["onClick"];
  const _hoisted_30 = {
    key: 1,
    class: "dm-config-tab-body"
  };
  const _hoisted_31 = { class: "dm-config-row" };
  const _hoisted_32 = { key: 0 };
  const _hoisted_33 = { class: "dm-config-meta" };
  const _hoisted_34 = ["href"];
  const _hoisted_35 = {
    key: 1,
    class: "dm-config-meta-id"
  };
  const _hoisted_36 = ["title"];
  const _hoisted_37 = { class: "dm-config-meta" };
  const _hoisted_38 = ["href"];
  const _hoisted_39 = {
    key: 1,
    class: "dm-config-meta-id"
  };
  const _hoisted_40 = ["title"];
  const _hoisted_41 = ["onClick"];
  const _hoisted_42 = { key: 1 };
  const _hoisted_43 = { class: "dm-config-meta" };
  const _hoisted_44 = ["href"];
  const _hoisted_45 = {
    key: 1,
    class: "dm-config-meta-id"
  };
  const _hoisted_46 = ["title"];
  const _hoisted_47 = ["onClick"];
  const _hoisted_48 = ["onClick"];
  const _hoisted_49 = {
    key: 2,
    class: "dm-config-tab-body"
  };
  const _hoisted_50 = {
    key: 3,
    class: "dm-config-tab-body"
  };
  const _hoisted_51 = { class: "dm-config-row-inline" };
  const _hoisted_52 = ["value", "onChange"];
  const _hoisted_53 = ["value", "onChange"];
  const _hoisted_54 = { class: "dm-config-row-inline" };
  const _hoisted_55 = ["value", "onChange"];
  const _hoisted_56 = ["value", "onChange"];
  const _hoisted_57 = { class: "dm-config-row-inline" };
  const _hoisted_58 = ["onUpdate:modelValue"];
  const _hoisted_59 = ["onUpdate:modelValue"];
  const _hoisted_60 = ["onClick"];
  const _sfc_main$2 = {
    __name: "ConfigPanel",
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      const state = inject("dmState");
      const actions = inject("dmActions");
      const services = inject("dmServices");
      const dataMap = inject("dmDataMap");
      const getVideoId = inject("dmVideoId");
      const activeTab = ref("display");
      const previewing = ref(false);
      const currentData = computed(() => dataMap[getVideoId()]);
      const options = services.dmPlayer.options;
      const settings = reactive({
        opacity: services.dmStore.get("settings.opacity", options.opacity.value),
        displayArea: services.dmStore.get("settings.displayArea", options.displayArea.value),
        speed: services.dmStore.get("settings.speed", options.speed.value),
        density: services.dmStore.get("settings.density", options.density.value),
        syncRate: services.dmStore.get("settings.syncRate", options.syncRate.value),
        mergeRepeats: services.dmStore.get("settings.mergeRepeats", options.mergeRepeats.value),
        overlap: services.dmStore.get("settings.overlap", options.overlap.value)
      });
      const autoBind = ref(services.dmStore.getLocal("autoBind", false));
      const serverInput = ref(services.dmStore.get("server", ""));
      const uiTheme = ref(services.dmStore.getLocal("ui.theme", "light"));
      const panelTheme = computed(() => state.uiTheme === "light" ? "light" : "dark");
      const shadowPresets = {
        重墨: [{ type: 0, offset: 1, radius: 1, repeat: 1 }],
        描边: [{ type: 1, offset: 0, radius: 1, repeat: 3 }],
        "45°投影": [
          { type: 1, offset: 0, radius: 1, repeat: 1 },
          { type: 2, offset: 1, radius: 2, repeat: 1 }
        ]
      };
      const shadowConfig = ref(
        JSON.parse(
          JSON.stringify(
            services.dmPlayer.options?.shadowEffect?.value || [{ type: 0, offset: 1, radius: 1, repeat: 1 }]
          )
        )
      );
      const shadowPreset = ref("自定义");
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
        services.dmStore.set("settings.shadowEffect", shadowConfig.value);
        services.dmPlayer.setOptions(shadowConfig.value, "shadowEffect");
        actions.showTip("✅ 已保存阴影设置");
      }
      function applyShadowPreset() {
        if (shadowPreset.value === "自定义") return;
        shadowConfig.value = JSON.parse(JSON.stringify(shadowPresets[shadowPreset.value]));
      }
      function initShadowPreset() {
        for (const [name, list] of Object.entries(shadowPresets)) {
          if (JSON.stringify(list) === JSON.stringify(shadowConfig.value)) {
            shadowPreset.value = name;
            return;
          }
        }
        shadowPreset.value = "自定义";
      }
      function saveServer() {
        services.dmStore.set("server", serverInput.value.trim());
        actions.showTip("✅ 地址已保存");
      }
      function setAutoBind() {
        services.dmStore.setLocal("autoBind", autoBind.value);
      }
      function applyUITheme() {
        actions.setUITheme(uiTheme.value);
      }
      function createInfoTitle(info) {
        return info?.title || "未知";
      }
      function createInfoMeta(info, name = "视频") {
        if (!info) {
          return {
            label: `❌ 未知${name}`,
            title: `未知${name}`,
            href: "",
            clickable: false
          };
        }
        const id = info.id || "未知ID";
        return {
          label: `${name} [▶️ ${id}]`,
          title: createInfoTitle(info),
          href: info.url || "",
          clickable: !!info.url
        };
      }
      function clearBinded() {
        if (!confirm("确定要清空所有绑定视频吗？")) return;
        services.dmStore.binded.clear();
        refreshLists();
        actions.showTip("🧹 所有绑定视频已清空");
      }
      function clearCache() {
        if (!confirm("确定要清空所有缓存弹幕吗？")) return;
        services.dmStore.cache.clear();
        refreshLists();
        actions.showTip("🧹 所有缓存弹幕已清空");
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
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = info.id.replace(/[\\/:*?"<>|]/g, "_") + ".json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
      function parseTimeToMs(text) {
        if (!text.includes(":")) return 0;
        const [min, sec] = text.trim().split(":");
        return Math.round((parseInt(min, 10) * 60 + parseFloat(sec)) * 1e3);
      }
      function formatMsToTime(ms) {
        const min = Math.floor(ms / 6e4);
        const sec = ms % 6e4 / 1e3;
        return `${min}:${sec}`;
      }
      function addAlignment() {
        alignment.value.push({
          source: { start: 0, end: 0 },
          target: { start: 0, end: 0 },
          mode: "shift",
          comment: ""
        });
      }
      function removeAlignment(index) {
        alignment.value.splice(index, 1);
      }
      async function pasteAlignment() {
        try {
          const text = await navigator.clipboard.readText();
          const parsed = JSON.parse(text);
          if (!Array.isArray(parsed)) throw new Error("剪贴板内容不是有效的数组");
          const valid = parsed.every((item) => item.source && item.target && item.mode);
          if (!valid) throw new Error("剪贴板内容不是有效的对齐数据");
          alignment.value = parsed;
          actions.showTip("📋 成功粘贴对齐设置");
        } catch (err) {
          actions.logError("❌ 粘贴失败", err);
        }
      }
      function copyAlignment() {
        navigator.clipboard.writeText(JSON.stringify(alignment.value, null)).then(() => actions.showTip("✅ 已复制所有对齐设置")).catch(() => actions.showTip("❌ 复制失败"));
      }
      function saveAlignment() {
        const data = currentData.value;
        if (!data) {
          actions.showTip("未有弹幕数据");
          return;
        }
        data.alignData = alignment.value;
        if (data.binded) actions.bindVideoID(true, true);
        services.dmPlayer.load(data.getDanmakuData());
        actions.showTip("✅ 对齐设置已保存");
      }
      function saveNumberSetting(key, min, max) {
        const val = Number(settings[key]);
        if (Number.isNaN(val) || val < min || val > max) {
          actions.showTip("❌ 输入不合法");
          return;
        }
        settings[key] = val;
        saveSetting(key);
      }
      initShadowPreset();
      refreshLists();
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "dm-config-overlay",
          style: normalizeStyle({ background: "rgba(0, 0, 0, 0.4)", opacity: previewing.value ? 0 : 1 }),
          onClick: _cache[26] || (_cache[26] = withModifiers(($event) => emit2("close"), ["self"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["dm-config-panel", panelTheme.value])
          }, [
            _cache[63] || (_cache[63] = createBaseVNode("div", { class: "dm-config-header" }, "⚙️ 设置", -1)),
            createBaseVNode("div", _hoisted_1$1, [
              createBaseVNode("button", {
                class: normalizeClass({ active: activeTab.value === "display" }),
                onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "display")
              }, "📺 弹幕显示", 2),
              createBaseVNode("button", {
                class: normalizeClass({ active: activeTab.value === "cache" }),
                onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "cache")
              }, "📦 缓存管理", 2),
              createBaseVNode("button", {
                class: normalizeClass({ active: activeTab.value === "server" }),
                onClick: _cache[2] || (_cache[2] = ($event) => activeTab.value = "server")
              }, "🌐 服务器设置", 2),
              createBaseVNode("button", {
                class: normalizeClass({ active: activeTab.value === "alignment" }),
                onClick: _cache[3] || (_cache[3] = ($event) => activeTab.value = "alignment")
              }, "🎯 视频对齐", 2)
            ]),
            activeTab.value === "display" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, [
                _cache[28] || (_cache[28] = createBaseVNode("span", { class: "dm-config-section-title" }, "🎨 面板主题", -1)),
                createBaseVNode("div", _hoisted_4$1, [
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => uiTheme.value = $event),
                    onChange: applyUITheme
                  }, [..._cache[27] || (_cache[27] = [
                    createBaseVNode("option", { value: "dark" }, "深色", -1),
                    createBaseVNode("option", { value: "light" }, "浅色", -1)
                  ])], 544), [
                    [vModelSelect, uiTheme.value]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_5$1, [
                _cache[29] || (_cache[29] = createBaseVNode("span", { class: "dm-config-section-title" }, "📺 弹幕显示设置", -1)),
                createBaseVNode("div", _hoisted_6$1, [
                  createBaseVNode("button", {
                    onMousedown: _cache[5] || (_cache[5] = ($event) => previewing.value = true),
                    onMouseup: _cache[6] || (_cache[6] = ($event) => previewing.value = false),
                    onMouseleave: _cache[7] || (_cache[7] = ($event) => previewing.value = false)
                  }, "👁️ 预览", 32)
                ])
              ]),
              createBaseVNode("div", _hoisted_7$1, [
                _cache[30] || (_cache[30] = createBaseVNode("span", { class: "dm-config-row-label" }, "🌫️ 不透明度", -1)),
                createBaseVNode("div", _hoisted_8$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => settings.opacity = $event),
                    type: "number",
                    min: "0.1",
                    max: "1",
                    step: "0.1"
                  }, null, 512), [
                    [
                      vModelText,
                      settings.opacity,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[9] || (_cache[9] = ($event) => saveNumberSetting("opacity", 0.1, 1))
                  }, "💾 保存")
                ]),
                _cache[31] || (_cache[31] = createBaseVNode("span", { class: "dm-config-row-desc" }, "设置弹幕透明度（0.1 ~ 1.0）越小越透明", -1))
              ]),
              createBaseVNode("div", _hoisted_9$1, [
                _cache[32] || (_cache[32] = createBaseVNode("span", { class: "dm-config-row-label" }, "📐 显示区域", -1)),
                createBaseVNode("div", _hoisted_10$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => settings.displayArea = $event),
                    type: "number",
                    min: "0.1",
                    max: "1",
                    step: "0.1"
                  }, null, 512), [
                    [
                      vModelText,
                      settings.displayArea,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[11] || (_cache[11] = ($event) => saveNumberSetting("displayArea", 0.1, 1))
                  }, "💾 保存")
                ]),
                _cache[33] || (_cache[33] = createBaseVNode("span", { class: "dm-config-row-desc" }, "允许弹幕占屏幕高度范围，1.0 全屏", -1))
              ]),
              createBaseVNode("div", _hoisted_11$1, [
                _cache[34] || (_cache[34] = createBaseVNode("span", { class: "dm-config-row-label" }, "🚀 弹幕速度", -1)),
                createBaseVNode("div", _hoisted_12$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => settings.speed = $event),
                    type: "number",
                    min: "3",
                    max: "9",
                    step: "1"
                  }, null, 512), [
                    [
                      vModelText,
                      settings.speed,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[13] || (_cache[13] = ($event) => saveNumberSetting("speed", 3, 9))
                  }, "💾 保存")
                ]),
                _cache[35] || (_cache[35] = createBaseVNode("span", { class: "dm-config-row-desc" }, "影响弹幕持续时间以及滚动弹幕的速度", -1))
              ]),
              createBaseVNode("div", _hoisted_13$1, [
                _cache[36] || (_cache[36] = createBaseVNode("span", { class: "dm-config-row-label" }, "📚 弹幕密度", -1)),
                createBaseVNode("div", _hoisted_14$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => settings.density = $event),
                    type: "number",
                    min: "0",
                    max: "10",
                    step: "1"
                  }, null, 512), [
                    [
                      vModelText,
                      settings.density,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[15] || (_cache[15] = ($event) => saveNumberSetting("density", 0, 10))
                  }, "💾 保存")
                ]),
                _cache[37] || (_cache[37] = createBaseVNode("span", { class: "dm-config-row-desc" }, "0~10，越大行高越小、轨道间隔越小", -1))
              ]),
              createBaseVNode("label", _hoisted_15, [
                _cache[38] || (_cache[38] = createBaseVNode("span", { class: "dm-config-row-label" }, "⏩ 同步倍速", -1)),
                createBaseVNode("div", _hoisted_16, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => settings.syncRate = $event),
                    type: "checkbox",
                    onChange: _cache[17] || (_cache[17] = ($event) => saveSetting("syncRate"))
                  }, null, 544), [
                    [vModelCheckbox, settings.syncRate]
                  ])
                ]),
                _cache[39] || (_cache[39] = createBaseVNode("span", { class: "dm-config-row-desc" }, "弹幕速度同步视频播放倍速", -1))
              ]),
              createBaseVNode("label", _hoisted_17, [
                _cache[40] || (_cache[40] = createBaseVNode("span", { class: "dm-config-row-label" }, "🔁 合并重复", -1)),
                createBaseVNode("div", _hoisted_18, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => settings.mergeRepeats = $event),
                    type: "checkbox",
                    onChange: _cache[19] || (_cache[19] = ($event) => saveSetting("mergeRepeats"))
                  }, null, 544), [
                    [vModelCheckbox, settings.mergeRepeats]
                  ])
                ]),
                _cache[41] || (_cache[41] = createBaseVNode("span", { class: "dm-config-row-desc" }, "是否合并内容相同且时间接近的弹幕", -1))
              ]),
              createBaseVNode("label", _hoisted_19, [
                _cache[42] || (_cache[42] = createBaseVNode("span", { class: "dm-config-row-label" }, "🔀 允许重叠", -1)),
                createBaseVNode("div", _hoisted_20, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => settings.overlap = $event),
                    type: "checkbox",
                    onChange: _cache[21] || (_cache[21] = ($event) => saveSetting("overlap"))
                  }, null, 544), [
                    [vModelCheckbox, settings.overlap]
                  ])
                ]),
                _cache[43] || (_cache[43] = createBaseVNode("span", { class: "dm-config-row-desc" }, "开启则允许弹幕重叠，否则丢弃会重叠的弹幕", -1))
              ]),
              createBaseVNode("div", { class: "dm-config-section-head" }, [
                _cache[44] || (_cache[44] = createBaseVNode("span", { class: "dm-config-section-title" }, "🌑 弹幕阴影设置", -1)),
                createBaseVNode("div", { class: "dm-config-section-control" }, [
                  createBaseVNode("button", { onClick: saveShadow }, "💾 保存")
                ])
              ]),
              createBaseVNode("div", _hoisted_21, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => shadowPreset.value = $event),
                  onChange: applyShadowPreset
                }, [..._cache[45] || (_cache[45] = [
                  createBaseVNode("option", null, "重墨", -1),
                  createBaseVNode("option", null, "描边", -1),
                  createBaseVNode("option", null, "45°投影", -1),
                  createBaseVNode("option", null, "自定义", -1)
                ])], 544), [
                  [vModelSelect, shadowPreset.value]
                ])
              ]),
              shadowPreset.value === "自定义" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(shadowConfig.value, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: "dm-config-shadow-row"
                  }, [
                    _cache[49] || (_cache[49] = createBaseVNode("span", null, "类型:", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": ($event) => item.type = $event
                    }, [..._cache[46] || (_cache[46] = [
                      createBaseVNode("option", { value: 0 }, "重墨", -1),
                      createBaseVNode("option", { value: 1 }, "描边", -1),
                      createBaseVNode("option", { value: 2 }, "45°投影", -1)
                    ])], 8, _hoisted_22), [
                      [
                        vModelSelect,
                        item.type,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[50] || (_cache[50] = createBaseVNode("span", null, "偏移:", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": ($event) => item.offset = $event
                    }, [
                      _cache[47] || (_cache[47] = createBaseVNode("option", { value: -1 }, "递增", -1)),
                      (openBlock(), createElementBlock(Fragment, null, renderList(11, (n) => {
                        return createBaseVNode("option", {
                          key: `o-${n}`,
                          value: n - 1
                        }, toDisplayString(n - 1) + "px", 9, _hoisted_24);
                      }), 64))
                    ], 8, _hoisted_23), [
                      [
                        vModelSelect,
                        item.offset,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[51] || (_cache[51] = createBaseVNode("span", null, "半径:", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": ($event) => item.radius = $event
                    }, [
                      _cache[48] || (_cache[48] = createBaseVNode("option", { value: -1 }, "递增", -1)),
                      (openBlock(), createElementBlock(Fragment, null, renderList(11, (n) => {
                        return createBaseVNode("option", {
                          key: `r-${n}`,
                          value: n - 1
                        }, toDisplayString(n - 1) + "px", 9, _hoisted_26);
                      }), 64))
                    ], 8, _hoisted_25), [
                      [
                        vModelSelect,
                        item.radius,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[52] || (_cache[52] = createBaseVNode("span", null, "重复:", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": ($event) => item.repeat = $event
                    }, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(10, (n) => {
                        return createBaseVNode("option", {
                          key: `p-${n}`,
                          value: n
                        }, toDisplayString(n), 9, _hoisted_28);
                      }), 64))
                    ], 8, _hoisted_27), [
                      [
                        vModelSelect,
                        item.repeat,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    createBaseVNode("button", {
                      onClick: ($event) => shadowConfig.value.splice(index, 1)
                    }, "删除", 8, _hoisted_29)
                  ]);
                }), 128)),
                createBaseVNode("button", {
                  class: "dm-config-shadow-add",
                  onClick: _cache[23] || (_cache[23] = ($event) => shadowConfig.value.push({ type: 0, offset: 1, radius: 1, repeat: 1 }))
                }, "➕ 添加阴影项")
              ], 64)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            activeTab.value === "cache" ? (openBlock(), createElementBlock("div", _hoisted_30, [
              createBaseVNode("label", _hoisted_31, [
                _cache[53] || (_cache[53] = createBaseVNode("span", { class: "dm-config-row-label" }, "自动绑定视频（载入/缓存数据时）", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => autoBind.value = $event),
                  type: "checkbox",
                  onChange: setAutoBind
                }, null, 544), [
                  [vModelCheckbox, autoBind.value]
                ])
              ]),
              createBaseVNode("div", { class: "dm-config-section-head" }, [
                _cache[54] || (_cache[54] = createBaseVNode("span", { class: "dm-config-section-title" }, "📦 绑定视频", -1)),
                createBaseVNode("div", { class: "dm-config-section-control" }, [
                  createBaseVNode("button", { onClick: clearBinded }, "🧹 清空绑定视频")
                ])
              ]),
              !bindedList.value.length ? (openBlock(), createElementBlock("div", _hoisted_32, "📭 当前没有绑定视频")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(bindedList.value, ([id, item]) => {
                return openBlock(), createElementBlock("div", {
                  key: id,
                  class: "dm-config-list-row"
                }, [
                  createBaseVNode("div", _hoisted_33, [
                    createInfoMeta(item.target, "当前").clickable ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      class: "dm-config-meta-id",
                      href: createInfoMeta(item.target, "当前").href,
                      target: "_blank",
                      rel: "noreferrer"
                    }, toDisplayString(createInfoMeta(item.target, "当前").label), 9, _hoisted_34)) : (openBlock(), createElementBlock("span", _hoisted_35, toDisplayString(createInfoMeta(item.target, "当前").label), 1)),
                    createBaseVNode("div", {
                      class: "dm-config-meta-title",
                      title: createInfoMeta(item.target, "当前").title
                    }, toDisplayString(createInfoMeta(item.target, "当前").title), 9, _hoisted_36)
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    createInfoMeta(item.source, item.source?.from || "来源").clickable ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      class: "dm-config-meta-id",
                      href: createInfoMeta(item.source, item.source?.from || "来源").href,
                      target: "_blank",
                      rel: "noreferrer"
                    }, toDisplayString(createInfoMeta(item.source, item.source?.from || "来源").label), 9, _hoisted_38)) : (openBlock(), createElementBlock("span", _hoisted_39, toDisplayString(createInfoMeta(item.source, item.source?.from || "来源").label), 1)),
                    createBaseVNode("div", {
                      class: "dm-config-meta-title",
                      title: createInfoMeta(item.source, item.source?.from || "来源").title
                    }, toDisplayString(createInfoMeta(item.source, item.source?.from || "来源").title), 9, _hoisted_40)
                  ]),
                  createBaseVNode("button", {
                    onClick: ($event) => removeBinded(id)
                  }, "🗑 删除", 8, _hoisted_41)
                ]);
              }), 128)),
              createBaseVNode("div", { class: "dm-config-section-head" }, [
                _cache[55] || (_cache[55] = createBaseVNode("span", { class: "dm-config-section-title" }, "📦 缓存弹幕", -1)),
                createBaseVNode("div", { class: "dm-config-section-control" }, [
                  createBaseVNode("button", { onClick: clearCache }, "🧹 清空缓存弹幕")
                ])
              ]),
              !cacheList.value.length ? (openBlock(), createElementBlock("div", _hoisted_42, "📭 当前没有缓存弹幕")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(cacheList.value, ([id, item]) => {
                return openBlock(), createElementBlock("div", {
                  key: id,
                  class: "dm-config-list-row"
                }, [
                  createBaseVNode("div", _hoisted_43, [
                    createInfoMeta(item.info, "缓存").clickable ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      class: "dm-config-meta-id",
                      href: createInfoMeta(item.info, "缓存").href,
                      target: "_blank",
                      rel: "noreferrer"
                    }, toDisplayString(createInfoMeta(item.info, "缓存").label), 9, _hoisted_44)) : (openBlock(), createElementBlock("span", _hoisted_45, toDisplayString(createInfoMeta(item.info, "缓存").label), 1)),
                    createBaseVNode("div", {
                      class: "dm-config-meta-title",
                      title: createInfoMeta(item.info, "缓存").title
                    }, toDisplayString(createInfoMeta(item.info, "缓存").title), 9, _hoisted_46)
                  ]),
                  createBaseVNode("button", {
                    onClick: ($event) => downloadCache(item)
                  }, "下载", 8, _hoisted_47),
                  createBaseVNode("button", {
                    onClick: ($event) => removeCache(id)
                  }, "🗑 删除", 8, _hoisted_48)
                ]);
              }), 128))
            ])) : createCommentVNode("", true),
            activeTab.value === "server" ? (openBlock(), createElementBlock("div", _hoisted_49, [
              createBaseVNode("div", { class: "dm-config-section-head" }, [
                _cache[56] || (_cache[56] = createBaseVNode("span", { class: "dm-config-section-title" }, "🌐 服务器地址", -1)),
                createBaseVNode("div", { class: "dm-config-section-control" }, [
                  createBaseVNode("button", { onClick: saveServer }, "💾 保存")
                ])
              ]),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => serverInput.value = $event),
                type: "text"
              }, null, 512), [
                [vModelText, serverInput.value]
              ])
            ])) : createCommentVNode("", true),
            activeTab.value === "alignment" ? (openBlock(), createElementBlock("div", _hoisted_50, [
              _cache[62] || (_cache[62] = createStaticVNode('<div class="dm-config-desc" data-v-05515f64><div data-v-05515f64>⚠️ 对齐设置说明：</div><hr data-v-05515f64><div data-v-05515f64>当原视频和新视频的时间段不一致（如删减/增加片段）时，可通过设置对齐项同步弹幕。</div><div data-v-05515f64><span class="dm-config-desc-key" data-v-05515f64>• 映射：</span>将原时间段线性映射到新时间段。</div><div data-v-05515f64><span class="dm-config-desc-key" data-v-05515f64>• 顺移：</span>平移时间，超出新时间段的丢弃。</div><div data-v-05515f64><span class="dm-config-desc-key" data-v-05515f64>• 附言：</span>可插入一条左上角弹幕提示观众。</div><div data-v-05515f64>时间格式为 分:秒 或 分:秒.毫秒</div></div>', 1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(alignment.value, (entry, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "dm-config-align-row"
                }, [
                  createBaseVNode("div", _hoisted_51, [
                    _cache[57] || (_cache[57] = createBaseVNode("span", null, "原视频：", -1)),
                    createBaseVNode("input", {
                      value: formatMsToTime(entry.source?.start || 0),
                      onChange: ($event) => entry.source.start = parseTimeToMs($event.target.value)
                    }, null, 40, _hoisted_52),
                    _cache[58] || (_cache[58] = createBaseVNode("span", null, "~", -1)),
                    createBaseVNode("input", {
                      value: formatMsToTime(entry.source?.end || 0),
                      onChange: ($event) => entry.source.end = parseTimeToMs($event.target.value)
                    }, null, 40, _hoisted_53)
                  ]),
                  createBaseVNode("div", _hoisted_54, [
                    _cache[59] || (_cache[59] = createBaseVNode("span", null, "现视频：", -1)),
                    createBaseVNode("input", {
                      value: formatMsToTime(entry.target?.start || 0),
                      onChange: ($event) => entry.target.start = parseTimeToMs($event.target.value)
                    }, null, 40, _hoisted_55),
                    _cache[60] || (_cache[60] = createBaseVNode("span", null, "~", -1)),
                    createBaseVNode("input", {
                      value: formatMsToTime(entry.target?.end || 0),
                      onChange: ($event) => entry.target.end = parseTimeToMs($event.target.value)
                    }, null, 40, _hoisted_56)
                  ]),
                  createBaseVNode("div", _hoisted_57, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": ($event) => entry.mode = $event
                    }, [..._cache[61] || (_cache[61] = [
                      createBaseVNode("option", { value: "map" }, "映射", -1),
                      createBaseVNode("option", { value: "shift" }, "顺移", -1)
                    ])], 8, _hoisted_58), [
                      [vModelSelect, entry.mode]
                    ]),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": ($event) => entry.comment = $event,
                      class: "dm-config-comment-input",
                      placeholder: "附言"
                    }, null, 8, _hoisted_59), [
                      [vModelText, entry.comment]
                    ]),
                    createBaseVNode("button", {
                      onClick: ($event) => removeAlignment(index)
                    }, "🗑 删除", 8, _hoisted_60)
                  ])
                ]);
              }), 128)),
              createBaseVNode("div", { class: "dm-config-actions" }, [
                createBaseVNode("button", { onClick: addAlignment }, "➕ 添加对齐片段"),
                createBaseVNode("button", { onClick: pasteAlignment }, "📋 粘贴设置"),
                createBaseVNode("button", { onClick: copyAlignment }, "📋 复制设置"),
                createBaseVNode("button", { onClick: saveAlignment }, "💾 保存")
              ])
            ])) : createCommentVNode("", true)
          ], 2)
        ], 4);
      };
    }
  };
  const ConfigPanel = _export_sfc(_sfc_main$2, [["__scopeId", "data-v-05515f64"]]);
  const _hoisted_1 = { class: "dm-urlrule-tip" };
  const _hoisted_2 = {
    key: 0,
    class: "dm-urlrule-result"
  };
  const _hoisted_3 = { class: "dm-urlrule-list" };
  const _hoisted_4 = {
    key: 0,
    class: "dm-urlrule-empty"
  };
  const _hoisted_5 = ["onUpdate:modelValue"];
  const _hoisted_6 = { class: "dm-urlrule-ops" };
  const _hoisted_7 = ["onClick"];
  const _hoisted_8 = ["onClick"];
  const _hoisted_9 = { class: "dm-urlrule-inline" };
  const _hoisted_10 = ["onUpdate:modelValue"];
  const _hoisted_11 = ["onUpdate:modelValue"];
  const _hoisted_12 = ["onUpdate:modelValue"];
  const _hoisted_13 = ["onUpdate:modelValue"];
  const _hoisted_14 = ["onUpdate:modelValue"];
  const _sfc_main$1 = {
    __name: "UrlRuleSettingsPanel",
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      const state = inject("dmState");
      const actions = inject("dmActions");
      const urlRules2 = inject("dmUrlRules");
      const resultText = ref("");
      const draftRules = ref(urlRules2.get().map((rule) => ({ ...rule })));
      const panelTheme = computed(() => state.uiTheme === "light" ? "light" : "dark");
      function normalizeDraftRule(rule, fallbackIndex) {
        return {
          id: String(rule?.id || `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
          name: String(rule?.name || `规则${fallbackIndex + 1}`),
          enabled: rule?.enabled !== false,
          urlMatch: String(rule?.urlMatch || "").trim(),
          extractRegex: String(rule?.extractRegex || ""),
          urlTemplate: String(rule?.urlTemplate || "{{ID}}"),
          titleExtractRegex: String(rule?.titleExtractRegex || ""),
          order: Number.isFinite(Number(rule?.order)) ? Number(rule.order) : fallbackIndex
        };
      }
      function normalizeRuleList(input) {
        if (Array.isArray(input)) {
          return input.map((rule, index) => normalizeDraftRule(rule, index));
        }
        if (input && typeof input === "object") {
          if (Array.isArray(input.rules)) {
            return input.rules.map((rule, index) => normalizeDraftRule(rule, index));
          }
          return [normalizeDraftRule(input, 0)];
        }
        throw new Error("剪贴板内容不是有效的规则 JSON（需为 [] 或 {}）");
      }
      function createEmptyRule() {
        const hrefWithoutQuery = `${location.origin}${location.pathname}`;
        return {
          id: `rule-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          name: "新规则",
          enabled: true,
          urlMatch: hrefWithoutQuery,
          extractRegex: "",
          urlTemplate: "{{ID}}",
          titleExtractRegex: "",
          order: draftRules.value.length
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
        draftRules.value = urlRules2.getDefault().map((rule) => ({ ...rule }));
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
          const test = urlRules2.test(rule, location.href);
          if (test) {
            matched = { rule, ...test };
            break;
          }
        }
        if (matched) {
          const transformedTitle = urlRules2.applyTitle(document.title, matched.rule);
          resultText.value = `✅ 命中规则：${matched.rule.name}
🆔 视频ID：${matched.videoId}
🔗 视频链接：${matched.normalizedUrl}
🏷 标题：${transformedTitle}`;
        } else {
          resultText.value = "⚠ 未命中规则";
        }
      }
      function saveRules() {
        try {
          validateRules();
          actions.saveRules(draftRules.value);
          actions.showTip("✅ URL匹配规则已保存");
          emit2("close");
        } catch (err) {
          resultText.value = `❌ ${err.message}`;
        }
      }
      function closePanel() {
        emit2("close");
      }
      function copyRule(rule) {
        navigator.clipboard.writeText(JSON.stringify(rule, null, 2)).then(() => actions.showTip(`✅ 已复制规则：${rule.name || "未命名规则"}`)).catch(() => actions.showTip("❌ 复制失败"));
      }
      function copyAllRules() {
        navigator.clipboard.writeText(JSON.stringify(draftRules.value, null, 2)).then(() => actions.showTip("✅ 已复制全部 URL 规则")).catch(() => actions.showTip("❌ 复制失败"));
      }
      async function readRulesFromClipboard() {
        const text = await navigator.clipboard.readText();
        const parsed = JSON.parse(text);
        const next = normalizeRuleList(parsed);
        if (!next.length) throw new Error("规则列表不能为空");
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
            ...next.map((rule, index) => ({ ...rule, order: base + index }))
          ];
          actions.showTip(`✅ 已追加导入 ${next.length} 条规则`);
        } catch (err) {
          resultText.value = `❌ 粘贴添加失败：${err.message || String(err)}`;
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          class: "dm-urlrule-overlay",
          onClick: withModifiers(closePanel, ["self"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["dm-urlrule-panel", panelTheme.value])
          }, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "dm-urlrule-title" }, "🔗 URL匹配设置", -1)),
            createBaseVNode("div", _hoisted_1, "字段：URL匹配(支持*)、ID提取正则(第1捕获组)、链接模板(" + toDisplayString(_ctx.ID) + " 或 *)、标题清理正则(匹配后删除)", 1),
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "dm-urlrule-tip" }, [
              createTextVNode("示例：标题清理正则填 "),
              createBaseVNode("code", null, " - YouTube$"),
              createTextVNode("，会删除标题后缀")
            ], -1)),
            createBaseVNode("div", { class: "dm-urlrule-toolbar" }, [
              createBaseVNode("div", { class: "dm-urlrule-toolbar-left" }, [
                createBaseVNode("button", { onClick: addRule }, "➕ 添加规则"),
                createBaseVNode("button", { onClick: restoreDefault }, "♻ 恢复默认"),
                createBaseVNode("button", { onClick: testCurrentPage }, "🧪 测试当前页面")
              ]),
              createBaseVNode("div", { class: "dm-urlrule-toolbar-right" }, [
                createBaseVNode("button", { onClick: saveRules }, "💾 保存")
              ])
            ]),
            resultText.value ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(resultText.value), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_3, [
              !draftRules.value.length ? (openBlock(), createElementBlock("div", _hoisted_4, "暂无规则")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(draftRules.value, (rule, index) => {
                return openBlock(), createElementBlock("div", {
                  key: rule.id || index,
                  class: "dm-urlrule-card"
                }, [
                  _cache[0] || (_cache[0] = createBaseVNode("div", { class: "dm-urlrule-label" }, "名称", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": ($event) => rule.name = $event,
                    class: "dm-urlrule-input"
                  }, null, 8, _hoisted_5), [
                    [vModelText, rule.name]
                  ]),
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("button", {
                      onClick: ($event) => copyRule(rule)
                    }, "📋 复制配置", 8, _hoisted_7),
                    createBaseVNode("button", {
                      onClick: ($event) => removeRule(index)
                    }, "删除", 8, _hoisted_8)
                  ]),
                  _cache[1] || (_cache[1] = createBaseVNode("div", { class: "dm-urlrule-label" }, "启用", -1)),
                  createBaseVNode("div", _hoisted_9, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": ($event) => rule.enabled = $event,
                      type: "checkbox"
                    }, null, 8, _hoisted_10), [
                      [vModelCheckbox, rule.enabled]
                    ])
                  ]),
                  _cache[2] || (_cache[2] = createBaseVNode("div", null, null, -1)),
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "dm-urlrule-label" }, "URL匹配", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": ($event) => rule.urlMatch = $event,
                    class: "dm-urlrule-input",
                    placeholder: "如：https://www.youtube.com/watch*"
                  }, null, 8, _hoisted_11), [
                    [vModelText, rule.urlMatch]
                  ]),
                  _cache[4] || (_cache[4] = createBaseVNode("div", null, null, -1)),
                  _cache[5] || (_cache[5] = createBaseVNode("div", { class: "dm-urlrule-label" }, "ID提取正则", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": ($event) => rule.extractRegex = $event,
                    class: "dm-urlrule-input",
                    placeholder: "如：[?&]v=([^&]+)"
                  }, null, 8, _hoisted_12), [
                    [vModelText, rule.extractRegex]
                  ]),
                  _cache[6] || (_cache[6] = createBaseVNode("div", null, null, -1)),
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "dm-urlrule-label" }, "链接模板", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": ($event) => rule.urlTemplate = $event,
                    class: "dm-urlrule-input",
                    placeholder: "如：https://www.youtube.com/watch?v={{ID}} 或 https://.../*"
                  }, null, 8, _hoisted_13), [
                    [vModelText, rule.urlTemplate]
                  ]),
                  _cache[8] || (_cache[8] = createBaseVNode("div", null, null, -1)),
                  _cache[9] || (_cache[9] = createBaseVNode("div", { class: "dm-urlrule-label" }, "标题清理正则", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": ($event) => rule.titleExtractRegex = $event,
                    class: "dm-urlrule-input",
                    placeholder: "匹配要处理的标题片段，如： - YouTube$"
                  }, null, 8, _hoisted_14), [
                    [vModelText, rule.titleExtractRegex]
                  ]),
                  _cache[10] || (_cache[10] = createBaseVNode("div", null, null, -1))
                ]);
              }), 128))
            ]),
            createBaseVNode("div", { class: "dm-urlrule-bottom-actions" }, [
              createBaseVNode("div", { class: "dm-urlrule-bottom-actions-left" }, [
                createBaseVNode("button", { onClick: copyAllRules }, "📋 复制所有"),
                createBaseVNode("button", { onClick: pasteReplaceRules }, "📥 粘贴覆盖"),
                createBaseVNode("button", { onClick: pasteAppendRules }, "➕ 粘贴添加")
              ]),
              createBaseVNode("div", { class: "dm-urlrule-bottom-actions-right" }, [
                createBaseVNode("button", { onClick: saveRules }, "💾 保存")
              ])
            ])
          ], 2)
        ]);
      };
    }
  };
  const UrlRuleSettingsPanel = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-30c482c0"]]);
  const _sfc_main = {
    __name: "UserscriptApp",
    setup(__props) {
      const state = inject("dmState");
      const actions = inject("dmActions");
      function openSearch() {
        state.showSearch = true;
      }
      function openConfig() {
        state.showConfig = true;
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(Fragment, null, [
          unref(state).showControlPanel ? (openBlock(), createBlock(ControlPanel, {
            key: 0,
            theme: unref(state).uiTheme,
            showing: unref(state).showing,
            binded: unref(state).binded,
            onSearch: openSearch,
            onBind: _cache[0] || (_cache[0] = ($event) => unref(actions).bindVideoID()),
            onLoad: _cache[1] || (_cache[1] = ($event) => unref(actions).openFileInput()),
            onSave: _cache[2] || (_cache[2] = ($event) => unref(actions).cacheData()),
            onToggle: _cache[3] || (_cache[3] = ($event) => unref(actions).toggleDanmaku()),
            onConfig: openConfig
          }, null, 8, ["theme", "showing", "binded"])) : createCommentVNode("", true),
          unref(state).showSearch ? (openBlock(), createBlock(SearchPanel, {
            key: 1,
            onClose: _cache[4] || (_cache[4] = ($event) => unref(state).showSearch = false)
          })) : createCommentVNode("", true),
          unref(state).showConfig ? (openBlock(), createBlock(ConfigPanel, {
            key: 2,
            onClose: _cache[5] || (_cache[5] = ($event) => unref(state).showConfig = false)
          })) : createCommentVNode("", true),
          unref(state).showUrlRuleSettings ? (openBlock(), createBlock(UrlRuleSettingsPanel, {
            key: 3,
            onClose: _cache[6] || (_cache[6] = ($event) => unref(state).showUrlRuleSettings = false)
          })) : createCommentVNode("", true)
        ], 64);
      };
    }
  };
  class DMPlayerDOMAdapter {
    constructor(playerInstance) {
      this.videoEl = null;
      this.player = playerInstance;
      this._handlers = {};
      this.styleRoot = document.head;
    }
    setStyleRoot(root) {
      this.styleRoot = root || document.head;
    }
    injectStyle(id, content) {
      if (!id) return;
      const root = this.styleRoot || document.head;
      const styleEl = root.querySelector(`style[data-dmplayer-style-id="${id}"]`);
      if (styleEl) {
        styleEl.textContent = content;
      } else {
        const style = this.createElement({ elName: "style", elContent: content });
        style.setAttribute("data-dmplayer-style-id", id);
        if (root === document.head) style.id = id;
        root.appendChild(style);
      }
    }
    injectElement(parent = document.body, element, replace = false) {
      if (!parent || !element) return;
      if (element.id) {
        const existing = document.getElementById(element.id);
        if (existing) {
          if (replace) existing.remove();
          else return;
        }
      }
      parent.appendChild(element);
    }
    createElement({ elName = "div", elId = "", elContent = "", elStyle = {}, elClass }) {
      const element = document.createElement(elName);
      if (elId) element.id = elId;
      if (elContent) element.textContent = elContent;
      if (elClass) {
        if (Array.isArray(elClass)) element.classList.add(...elClass);
        else if (typeof elClass === "string") element.classList.add(elClass);
      }
      Object.assign(element.style, elStyle);
      return element;
    }
    addContainer(container) {
      const wrapper = this.getVideoWrapper();
      if (!wrapper) return;
      if (getComputedStyle(wrapper).position === "static") {
        wrapper.style.position = "relative";
      }
      this.injectElement(wrapper, container, true);
    }
    getVideoWrapper() {
      const video = document.querySelector("video");
      if (!video) return null;
      const videoRect = video.getBoundingClientRect();
      let parent = video.parentElement;
      while (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.width > videoRect.width / 10 && rect.height > videoRect.height / 10) return parent;
        parent = parent.parentElement;
      }
      return null;
    }
    update() {
      this.unbindVideoEvent();
      this.bindVideoEvent();
    }
    bindVideoEvent() {
      const video = document.querySelector("video");
      if (!video || video === this.videoEl) return;
      this.videoEl = video;
      this._handlers.onSeeked = () => this.player.seek();
      this._handlers.onLoaded = () => this.player.resize();
      this._handlers.onPause = () => this.player.pause();
      this._handlers.onPlay = () => this.player.play();
      video.addEventListener("seeked", this._handlers.onSeeked);
      video.addEventListener("loadedmetadata", this._handlers.onLoaded);
      video.addEventListener("pause", this._handlers.onPause);
      video.addEventListener("play", this._handlers.onPlay);
      this._resizeObserver = new ResizeObserver(() => {
        this.player.resize?.();
      });
      this._resizeObserver.observe(video);
    }
    unbindVideoEvent() {
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
        this._resizeObserver = null;
      }
      if (!this.videoEl || !this._handlers) return;
      this.videoEl.removeEventListener("seeked", this._handlers.onSeeked);
      this.videoEl.removeEventListener("loadedmetadata", this._handlers.onLoaded);
      this.videoEl.removeEventListener("pause", this._handlers.onPause);
      this.videoEl.removeEventListener("play", this._handlers.onPlay);
      this.videoEl = null;
      this._handlers = {};
    }
    get video() {
      return new Proxy(
        {},
        {
          get: (_, prop) => this.videoEl?.[prop],
          set: (_, prop, value) => {
            if (this.videoEl) {
              this.videoEl[prop] = value;
              return true;
            }
            return false;
          },
          has: (_, prop) => prop in (this.videoEl || {})
        }
      );
    }
  }
  class BiliDanmakuPlayer {
    constructor() {
      this.domAdapter = new DMPlayerDOMAdapter(this);
      this.danmakuList = [];
      this.danmakuListOrigin = [];
      this.danmakuListMerged = [];
      this.danmakuIndex = 0;
      this.showing = true;
      this.paused = false;
      this.isLoaded = false;
      this.tracks = { scroll: [], top: [], bottom: [] };
      this.containerHost = this.domAdapter.createElement({
        elId: "dmplayer-container-host",
        elStyle: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: "999"
        }
      });
      this.containerShadow = this.containerHost.attachShadow({ mode: "open" });
      this.container = this.domAdapter.createElement({ elId: "dmplayer-container" });
      this.containerShadow.appendChild(this.container);
      this.domAdapter.setStyleRoot(this.containerShadow);
      this.containerRect = { width: 0, height: 0 };
      this.options = {
        displayArea: {
          value: 1,
          setValue: (value) => {
            const next = Number(value);
            if (Number.isFinite(next) && next > 0 && this.options.displayArea.value !== next) {
              this.options.displayArea.value = next;
              this._updateTracks();
            }
          }
        },
        opacity: {
          value: 0.8,
          init: true,
          setValue: (value) => {
            const next = Number(value);
            if (Number.isFinite(next)) {
              this.options.opacity.value = next;
              this.options.opacity.execute();
            }
          },
          execute: () => {
            this.container.style.opacity = this.options.opacity.value;
          }
        },
        speed: {
          value: 6,
          setValue: (value) => {
            const next = Number(value);
            if (Number.isFinite(next)) this.options.speed.value = Math.max(3, Math.min(9, next));
            this._updateDuration();
          }
        },
        density: {
          value: 5,
          setValue: (value) => {
            const next = Number(value);
            if (!Number.isFinite(next)) return;
            const clamped = Math.max(0, Math.min(10, Math.round(next)));
            if (this.options.density.value !== clamped) {
              this.options.density.value = clamped;
              this._updateTracks();
            }
          }
        },
        syncRate: {
          value: false,
          setValue: (value) => {
            if (value !== void 0 && value !== null) {
              this.options.syncRate.value = !!value;
            }
          },
          getValue: () => this.options.syncRate.value
        },
        overlap: {
          value: false,
          setValue: (value) => {
            if (value !== void 0 && value !== null) {
              this.options.overlap.value = !!value;
            }
          }
        },
        mergeRepeats: {
          value: true,
          setValue: (value) => {
            if (value !== void 0 && value !== null) {
              this.options.mergeRepeats.value = !!value;
              this.options.mergeRepeats.execute();
            }
          },
          execute: () => {
            if (this.options.mergeRepeats.value) {
              this._mergeRepeat();
              this.danmakuList = this.danmakuListMerged;
            } else {
              this.danmakuList = this.danmakuListOrigin;
            }
            this.seek();
          }
        },
        shadowEffect: {
          value: [{ type: 0, offset: 1, radius: 1, repeat: 1 }],
          init: true,
          setValue: (value) => {
            if (Array.isArray(value)) {
              this.options.shadowEffect.value = value;
              this.options.shadowEffect.execute();
            }
          },
          execute: () => {
            const textShadow = this.options.shadowEffect.generateTextShadow(this.options.shadowEffect.value);
            const css = `.dmplayer-danmaku { text-shadow: ${textShadow}; }`;
            this.domAdapter.injectStyle("dmplayer-danmaku-shadow", css);
          },
          generateTextShadow: (config) => {
            const shadows = [];
            for (const item of config) {
              const { type, offset, radius, repeat } = item;
              switch (type) {
                case 0:
                  for (let i = 0; i < repeat; i++) {
                    const o = offset === -1 ? 1 + i : offset;
                    const r = radius === -1 ? 1 + i : radius;
                    [
                      [1, 0],
                      [0, 1],
                      [0, -1],
                      [-1, 0]
                    ].forEach(([x, y]) => {
                      shadows.push(`${x * o}px ${y * o}px ${r}px black`);
                    });
                  }
                  break;
                case 1:
                  for (let i = 0; i < repeat; i++) {
                    const r = radius === -1 ? 1 + i : radius;
                    shadows.push(`0 0 ${r}px black`);
                  }
                  break;
                case 2:
                  for (let i = 0; i < repeat; i++) {
                    const o = offset === -1 ? 1 + i : offset;
                    const r = radius === -1 ? 1 + i : radius;
                    shadows.push(`${o}px ${o}px ${r}px black`);
                  }
                  break;
              }
            }
            return shadows.join(",\n");
          }
        }
      };
    }
    init() {
      this.domAdapter.injectStyle(
        "dmplayer-style",
        `
      @keyframes dmplayer-animate-center {
        from { opacity: 1; }
        to { opacity: 1; }
      }
      .dmplayer-danmaku {
        position: absolute;
        white-space: nowrap;
        font-weight: bold;
        pointer-events: none;
        line-height: 1;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
      .dmplayer-danmaku-badge {
        position: absolute;
        padding: 0px 0.4em;
        border-radius: 0.4em;
        font-size: 0.8em;
        top: 0.125em;
      }
      .dmplayer-danmaku-scroll {
        right: 0;
        animation-name: dmplayer-animate-scroll;
      }
      .dmplayer-danmaku-top,
      .dmplayer-danmaku-bottom {
        left: 50%;
        transform: translateX(-50%);
        animation-name: dmplayer-animate-center;
      }
      #dmplayer-container {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }`
      );
      for (const key in this.options) {
        if (this.options[key].init) this.options[key].execute?.();
      }
      console.log("[Danmaku Player]", "✅ 弹幕播放器初始化完成");
    }
    update() {
      this.domAdapter.update();
      this.domAdapter.addContainer(this.containerHost);
      this.resize();
      if (this.domAdapter.video.paused) this.pause();
      else this.play();
    }
    load(danmakuData) {
      const inputList = Array.isArray(danmakuData) ? danmakuData : [];
      let uid2 = 0;
      const base = Date.now();
      const normalized = inputList.map((dm) => {
        const cloned = { ...dm };
        cloned.progress = Number.isFinite(Number(cloned.progress)) ? Number(cloned.progress) : 0;
        cloned.id = cloned.idStr || cloned.id?.toString() || `${base}${uid2++}`;
        return cloned;
      });
      this.clear();
      this.danmakuListOrigin = normalized.sort((a, b) => a.progress - b.progress);
      this.options.mergeRepeats.execute();
      this.isLoaded = true;
      this.paused = !!this.domAdapter.video.paused;
      this.observe();
    }
    clear() {
      this.cleanup();
      this.danmakuList = [];
      this.danmakuListOrigin = [];
      this.danmakuListMerged = [];
      this.danmakuIndex = 0;
      this.isLoaded = false;
      if (this._observerFrame) {
        cancelAnimationFrame(this._observerFrame);
        this._observerFrame = null;
      }
      console.log("[Danmaku Player]", "🔻 弹幕已清空");
    }
    toggle() {
      this.showing = !this.showing;
      if (!this.showing) {
        this.cleanup();
      }
    }
    cleanup() {
      Array.from(this.container.children).forEach((el) => el.remove());
      for (const type in this.tracks) {
        if (Array.isArray(this.tracks[type])) this.tracks[type].fill(null);
      }
    }
    seek() {
      this.cleanup();
      this.danmakuIndex = 0;
    }
    pause() {
      this.paused = true;
      Array.from(this.container.children).forEach((el) => {
        el.style.animationPlayState = "paused";
      });
    }
    play() {
      this.paused = false;
      Array.from(this.container.children).forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }
    resize() {
      const rect = this.container.getBoundingClientRect();
      if (!rect) return;
      if (!this.containerRect || this.containerRect.width !== rect.width || this.containerRect.height !== rect.height) {
        console.log("[Danmaku Player]", `更新尺寸：${Math.round(rect.height)}×${Math.round(rect.width)}`);
        this.containerRect = this.container.getBoundingClientRect();
        this.domAdapter.injectStyle(
          "dmplayer-style-animation",
          `
        @keyframes dmplayer-animate-scroll {
          from { transform: translateX(100%); }
          to { transform: translateX(-${this.containerRect.width}px); }
        }`
        );
        this._updateTracks();
        this._updateDuration();
        const currentTime = this.domAdapter.video.currentTime * 1e3;
        Array.from(this.container.getElementsByClassName("dmplayer-danmaku-scroll")).forEach((el) => {
          el.style.animationDelay = `${el._progress - currentTime}ms`;
        });
      }
    }
    _mergeRepeat() {
      const merged = [];
      const averageColor = (a, b, count) => {
        const toRGB = (hex) => {
          const n = typeof hex === "number" ? hex : parseInt(hex, 10);
          return [n >> 16 & 255, n >> 8 & 255, n & 255];
        };
        const [r1, g1, b1] = toRGB(a);
        const [r2, g2, b2] = toRGB(b);
        const newR = Math.round((r1 * (count - 1) + r2) / count);
        const newG = Math.round((g1 * (count - 1) + g2) / count);
        const newB = Math.round((b1 * (count - 1) + b2) / count);
        return newR << 16 | newG << 8 | newB;
      };
      for (const current of this.danmakuListOrigin) {
        if (!current?.content) continue;
        const mergeWindow = this._getDuration(current.mode) / 2;
        let mergedFound = false;
        for (let i = merged.length - 1; i >= 0; i--) {
          const last = merged[i];
          if (current.progress - last.progress > mergeWindow) break;
          if (last.content === current.content && last.mode === current.mode) {
            last.count = (last.count || 1) + 1;
            last.color = averageColor(last.color, current.color, last.count);
            mergedFound = true;
            break;
          }
        }
        if (!mergedFound) merged.push({ ...current });
      }
      this.danmakuListMerged = merged;
    }
    _updateTracks() {
      const height = this.containerRect.height * this.options.displayArea.value - 8;
      const lineHeight = this._getLineHeight();
      const maxTracks = Math.max(Math.floor(height / lineHeight), 2);
      const keepTracks = (oldTracks, count) => {
        const newTracks = new Array(count);
        for (let i = 0; i < count; i++) {
          newTracks[i] = oldTracks?.[i] ?? null;
        }
        return newTracks;
      };
      this.tracks.scroll = keepTracks(this.tracks.scroll, maxTracks);
      this.tracks.top = keepTracks(this.tracks.top, Math.floor(maxTracks / 2));
      this.tracks.bottom = keepTracks(this.tracks.bottom, Math.floor(maxTracks / 2));
    }
    _getFreeTrack(type, el, delayRatio) {
      if (!(type in this.tracks)) return 0;
      const tracks = this.tracks[type];
      const inter = this._getTrackInter();
      const id = el.id;
      const c = this.containerRect;
      const newDm = el.getBoundingClientRect();
      const newRatio = c.width / (c.width + newDm.width) - delayRatio;
      const compactTrack = (track2) => {
        const alive = {};
        for (const key in track2) {
          const entry = track2[key];
          if (entry?.isConnected) alive[key] = entry;
        }
        return alive;
      };
      for (let i = 0; i < tracks.length; i++) {
        const rawTrack = tracks[i];
        if (!rawTrack || Object.keys(rawTrack).length === 0) {
          tracks[i] = { [id]: el };
          return i;
        }
        const track2 = compactTrack(rawTrack);
        tracks[i] = track2;
        if (Object.keys(track2).length === 0) {
          tracks[i] = { [id]: el };
          return i;
        }
        if (type === "scroll") {
          let conflict = false;
          for (const key in track2) {
            const lastEl = track2[key];
            const oldDM = lastEl.getBoundingClientRect();
            const oldRatio = (oldDM.right - c.left + inter) / (c.width + oldDM.width);
            if (newRatio <= oldRatio || c.right - oldDM.right <= inter) {
              conflict = true;
              break;
            }
          }
          if (!conflict) {
            track2[id] = el;
            return i;
          }
        }
      }
      if (this.options.overlap?.value) {
        let bestIndex = -1;
        let earliestTime = Infinity;
        for (let i = 0; i < tracks.length; i++) {
          const track2 = tracks[i] || {};
          let latestStart = 0;
          for (const key in track2) {
            const lastEl = track2[key];
            if (!lastEl?.isConnected) continue;
            if (lastEl._progress > latestStart) latestStart = lastEl._progress;
          }
          if (latestStart < earliestTime) {
            earliestTime = latestStart;
            bestIndex = i;
          }
        }
        if (bestIndex >= 0) {
          tracks[bestIndex] = tracks[bestIndex] || {};
          tracks[bestIndex][id] = el;
          return bestIndex;
        }
      }
      return -1;
    }
    _updateDuration() {
      this._duration = {
        center: Math.round(3e4 / this.options.speed.value),
        scroll: Math.round(((this.containerRect.width || 0) + 400) * 30 / this.options.speed.value)
      };
    }
    _getDuration(mode) {
      if (mode === 4 || mode === 5) return this._duration.center;
      return this._duration.scroll;
    }
    _getDensity() {
      const raw = Number(this.options?.density?.value);
      if (!Number.isFinite(raw)) return 5;
      return Math.max(0, Math.min(10, Math.round(raw)));
    }
    _getLineHeight() {
      return 35 - this._getDensity();
    }
    _getTrackInter() {
      return Math.max(10, 4 * (10 - this._getDensity()));
    }
    showDanmaku(dm, delay = 0) {
      const duration = dm.duration ?? this._getDuration(dm.mode);
      if (delay >= duration) return;
      const rate = this.options.syncRate.getValue() ? this.domAdapter.video.playbackRate : 1;
      const type = dm.type ?? (dm.mode === 5 ? "top" : dm.mode === 4 ? "bottom" : "scroll");
      const el = this.domAdapter.createElement({
        elId: dm.id,
        elContent: dm.content,
        elClass: ["dmplayer-danmaku", `dmplayer-danmaku-${type}`],
        elStyle: {
          fontSize: `${dm.fontsize || 25}px`,
          color: `#${(dm.color || 16777215).toString(16).padStart(6, "0")}`,
          animationDuration: `${duration / rate}ms`,
          animationDelay: `${-delay / rate}ms`
        }
      });
      if (dm.count && dm.count > 1) {
        const clr = dm.color || 16777215;
        el.appendChild(
          this.domAdapter.createElement({
            elName: "span",
            elContent: `×${dm.count}`,
            elClass: "dmplayer-danmaku-badge",
            elStyle: {
              background: `rgba(${clr >> 16 & 255}, ${clr >> 8 & 255}, ${clr & 255}, 0.3)`
            }
          })
        );
      }
      el._progress = dm.progress;
      this.domAdapter.injectElement(this.container, el);
      const track2 = this._getFreeTrack(type, el, delay / duration);
      if (track2 >= 0) {
        const lineHeight = this._getLineHeight();
        if (type === "top" || type === "bottom") {
          el.style[type] = `${track2 * lineHeight + 5}px`;
        } else if (type === "scroll") {
          el.style.top = `${track2 * lineHeight + Math.floor(Math.random() * 5) + 3}px`;
        } else if (dm.style) {
          Object.assign(el.style, dm.style);
        }
        el.addEventListener("animationend", () => {
          const trackList = this.tracks[type]?.[track2];
          if (trackList && trackList[el.id]) delete trackList[el.id];
          el.remove();
        });
      } else {
        el.remove();
      }
    }
    observe() {
      if (this._observerFrame) return;
      let lastTime = 0;
      const loop = () => {
        this._observerFrame = requestAnimationFrame(loop);
        if (!this.isLoaded || !this.showing || this.paused) return;
        const currentTime = this.domAdapter.video.currentTime * 1e3;
        if (Math.abs(currentTime - lastTime) > 1500) {
          console.log("[Danmaku Player]", "检测到跳转", ((currentTime - lastTime) / 1e3).toFixed(3));
          this.seek();
        }
        lastTime = currentTime;
        while (this.danmakuIndex < this.danmakuList.length) {
          const dm = this.danmakuList[this.danmakuIndex];
          if (dm.progress < currentTime) {
            this.showDanmaku(dm, currentTime - dm.progress);
            this.danmakuIndex++;
          } else {
            break;
          }
        }
      };
      this._observerFrame = requestAnimationFrame(loop);
    }
    setOptions(option, key) {
      if (option === null || option === void 0) return;
      if (key) {
        this.options[key]?.setValue(option);
      } else {
        for (const k in option) {
          if (this.options[k]?.setValue && option[k] !== void 0) {
            this.options[k].setValue(option[k]);
          }
        }
      }
    }
  }
  function createDanmakuData(BDM) {
    const danmakuData = {
      arcMgr: new BDM.BiliArchive(),
      dmMgr: null,
      info: {},
      data: {},
      dmCount: 0,
      alignData: [],
      dmList: [],
      _buildDmListFromMgr() {
        const list = Object.values(danmakuData.dmMgr?.dmDict || {});
        danmakuData.data = { ...danmakuData.data, ...danmakuData.dmMgr?.data || {} };
        danmakuData.data.danmakuData = list;
        danmakuData.dmCount = list.length;
      },
      setData(data) {
        danmakuData.data = { ...data || {} };
        const info = danmakuData.arcMgr.setData(danmakuData.data);
        danmakuData.info = info || danmakuData.arcMgr.info || {};
        danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
        danmakuData.dmMgr.setData(danmakuData.data);
        danmakuData._buildDmListFromMgr();
      },
      async getData(url) {
        const info = await danmakuData.arcMgr.getData(url);
        danmakuData.info = info || danmakuData.arcMgr.info || {};
        danmakuData.data = { ...danmakuData.arcMgr.data };
        danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
      },
      async getDanmakuXml() {
        if (!danmakuData.dmMgr) danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
        danmakuData.dmMgr.setData(danmakuData.data);
        if (typeof danmakuData.dmMgr.getDmXml === "function") {
          const before = Object.keys(danmakuData.dmMgr.dmDict || {}).length;
          await danmakuData.dmMgr.getDmXml();
          danmakuData._buildDmListFromMgr();
          return danmakuData.dmCount - before;
        }
        return 0;
      },
      async getDanmakuPb() {
        if (!danmakuData.dmMgr) danmakuData.dmMgr = new BDM.BiliDanmaku(danmakuData.info);
        danmakuData.dmMgr.setData(danmakuData.data);
        const before = Object.keys(danmakuData.dmMgr.dmDict || {}).length;
        await danmakuData.dmMgr.getDmPb();
        danmakuData._buildDmListFromMgr();
        return danmakuData.dmCount - before;
      },
      getDanmakuData() {
        danmakuData.applyAlignment();
        return danmakuData.dmList;
      },
      applyAlignment() {
        const danmakus = danmakuData.data.danmakuData;
        if (!danmakus?.length) return;
        const alignments = danmakuData.alignData.slice().sort((a, b) => (a.source?.start || 0) - (b.source?.start || 0));
        const newDanmakus = [];
        let lastSEnd = 0;
        let lastTEnd = 0;
        for (let i = 0; i <= alignments.length; i++) {
          const align = alignments[i];
          if (!align) continue;
          const { source, target, mode, comment } = align;
          const sStart = source.start;
          const sEnd = source.end;
          const tStart = target.start;
          const tEnd = target.end;
          const sDuration = sEnd - sStart;
          const tDuration = tEnd - tStart;
          for (const d of danmakus) {
            const time = d.progress;
            if (time >= lastSEnd && time < sStart) {
              const newTime = time - lastSEnd + lastTEnd;
              newDanmakus.push({ ...d, progress: Math.round(newTime) });
            } else if (time >= sStart && time < sEnd) {
              let newTime = null;
              if (mode === "map") {
                const ratio = (time - sStart) / sDuration;
                newTime = tStart + ratio * tDuration;
              } else {
                newTime = time - sStart + tStart;
                if (newTime < tStart || newTime >= tEnd) continue;
              }
              newDanmakus.push({ ...d, progress: Math.round(newTime) });
            }
          }
          if (comment) {
            const commentId = Date.now() * 1e3 + i;
            const markDuration = Math.max(0, Math.min(tEnd - tStart, 1e4));
            newDanmakus.push({
              content: `${comment}`,
              progress: Math.round(tStart),
              type: "mark",
              duration: markDuration,
              fontsize: 32,
              color: 16777215,
              ctime: Math.floor(Date.now() / 1e3),
              pool: 0,
              midHash: "system",
              id: commentId,
              idStr: String(commentId),
              weight: 10
            });
          }
          lastSEnd = sEnd;
          lastTEnd = tEnd;
        }
        for (const d of danmakus) {
          const time = d.progress;
          if (time >= lastSEnd) {
            const newTime = time - lastSEnd + lastTEnd;
            newDanmakus.push({ ...d, progress: Math.round(newTime) });
          }
        }
        danmakuData.dmList = newDanmakus;
      }
    };
    return danmakuData;
  }
  const dmStore = {
    key: "dm-player",
    GMCache: GM_getValue("cache", {}),
    getConfig() {
      const cfg = GM_getValue(dmStore.key, {});
      return cfg && typeof cfg === "object" ? cfg : {};
    },
    setConfig(obj) {
      GM_setValue(dmStore.key, obj && typeof obj === "object" ? obj : {});
    },
    getLocalConfig() {
      try {
        const cfg = JSON.parse(localStorage.getItem(dmStore.key) || "{}");
        return cfg && typeof cfg === "object" ? cfg : {};
      } catch {
        return {};
      }
    },
    setLocalConfig(obj) {
      localStorage.setItem(dmStore.key, JSON.stringify(obj && typeof obj === "object" ? obj : {}));
    },
    getLocal(key, def2) {
      const cfg = dmStore.getLocalConfig();
      return key.split(".").reduce((o, k) => (o || {})[k], cfg) ?? def2;
    },
    setLocal(key, value) {
      const cfg = dmStore.getLocalConfig();
      const keys = key.split(".");
      let obj = cfg;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]];
      }
      obj[keys.at(-1)] = value;
      dmStore.setLocalConfig(cfg);
    },
    get(key, def2) {
      const cfg = dmStore.getConfig();
      return key.split(".").reduce((o, k) => (o || {})[k], cfg) ?? def2;
    },
    set(key, value) {
      const cfg = dmStore.getConfig();
      const keys = key.split(".");
      let obj = cfg;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]];
      }
      obj[keys.at(-1)] = value;
      dmStore.setConfig(cfg);
    }
  };
  dmStore.cache = {
    get(id) {
      return dmStore.GMCache?.[id];
    },
    set(id, data) {
      dmStore.GMCache[id] = data;
      GM_setValue("cache", dmStore.GMCache);
    },
    remove(id) {
      if (dmStore.GMCache) delete dmStore.GMCache[id];
      GM_setValue("cache", dmStore.GMCache);
    },
    list() {
      return Object.entries(dmStore.GMCache);
    },
    clear() {
      dmStore.GMCache = {};
      GM_setValue("cache", dmStore.GMCache);
    }
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
    }
  };
  const URL_RULES_KEY = "urlRules";
  const DEFAULT_URL_RULES = [
    {
      id: "youtube-watch",
      name: "YouTube watch",
      enabled: true,
      urlMatch: "https://www.youtube.com/watch*",
      extractRegex: "[?&]v=([^&]+)",
      urlTemplate: "https://www.youtube.com/watch?v={{ID}}",
      titleExtractRegex: " - YouTube$"
    },
    {
      id: "bilibili-video",
      name: "Bilibili video",
      enabled: true,
      urlMatch: "https://www.bilibili.com/video/*",
      extractRegex: "/video/(BV[0-9A-Za-z]+)",
      urlTemplate: "https://www.bilibili.com/video/{{ID}}",
      titleExtractRegex: "_哔哩哔哩_bilibili$"
    },
    {
      id: "bilibili-watchlater",
      name: "Bilibili watchlater",
      enabled: true,
      urlMatch: "https://www.bilibili.com/list/watchlater*",
      extractRegex: "[?&]bvid=(BV[0-9A-Za-z]+)",
      urlTemplate: "https://www.bilibili.com/video/{{ID}}",
      titleExtractRegex: "-[^-]+-稍后再看-哔哩哔哩视频$"
    }
  ];
  function cloneDefaultUrlRules() {
    return DEFAULT_URL_RULES.map((rule, index) => ({ ...rule, order: index }));
  }
  function wildcardToRegExp(pattern) {
    const escaped = String(pattern || "").replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`, "i");
  }
  function sanitizeUrlRule(rule, fallbackIndex) {
    return {
      id: String(rule?.id || `rule-${Date.now()}-${fallbackIndex}`),
      name: String(rule?.name || `规则${fallbackIndex + 1}`),
      enabled: rule?.enabled !== false,
      urlMatch: String(rule?.urlMatch || "").trim(),
      extractRegex: String(rule?.extractRegex || ""),
      urlTemplate: String(rule?.urlTemplate || "{{ID}}"),
      titleExtractRegex: String(rule?.titleExtractRegex || ""),
      order: Number.isFinite(Number(rule?.order)) ? Number(rule.order) : fallbackIndex
    };
  }
  function applyIdTemplate(template, videoId) {
    const text = String(template || "{{ID}}").trim();
    if (text === "*") return String(videoId || "");
    return text.replaceAll("{{ID}}", videoId).replaceAll("{{id}}", videoId).replaceAll("*", videoId);
  }
  function applyTitleTemplate(titleText, rule) {
    const raw = String(titleText || "");
    const pattern = String(rule?.titleExtractRegex || "").trim();
    if (!pattern) return raw.trim();
    try {
      const regex = new RegExp(pattern);
      return raw.replace(regex, "").trim();
    } catch {
      return raw.trim();
    }
  }
  function ensure() {
    const saved = GM_getValue(URL_RULES_KEY, null);
    if (!Array.isArray(saved)) {
      GM_setValue(URL_RULES_KEY, cloneDefaultUrlRules());
    }
  }
  function getUrlRules() {
    ensure();
    const saved = GM_getValue(URL_RULES_KEY, []);
    if (!Array.isArray(saved)) return cloneDefaultUrlRules();
    return saved.map((rule, index) => sanitizeUrlRule(rule, index));
  }
  function saveUrlRules(rules) {
    const next = Array.isArray(rules) ? rules.map((rule, index) => sanitizeUrlRule(rule, index)) : [];
    GM_setValue(URL_RULES_KEY, next);
  }
  function getDefaultUrlRules() {
    return cloneDefaultUrlRules();
  }
  function testUrlRule(rule, urlText = location.href) {
    try {
      if (rule.urlMatch) {
        const urlRegex = wildcardToRegExp(rule.urlMatch);
        if (!urlRegex.test(urlText)) return null;
      } else {
        return null;
      }
      const extractRegex = rule.extractRegex ? new RegExp(rule.extractRegex) : null;
      const match = extractRegex ? urlText.match(extractRegex) : null;
      const videoId = match?.[1] || match?.[0] || null;
      const normalizedUrl = videoId ? applyIdTemplate(rule.urlTemplate, videoId) : urlText;
      return {
        videoId,
        normalizedUrl
      };
    } catch {
      return null;
    }
  }
  function matchCurrentUrlRule(urlText = location.href) {
    const rules = getUrlRules();
    for (const rule of rules) {
      if (!rule.enabled) continue;
      const matched = testUrlRule(rule, urlText);
      if (!matched) continue;
      return {
        rule,
        ...matched
      };
    }
    return null;
  }
  const urlRules = {
    ensure,
    get: getUrlRules,
    save: saveUrlRules,
    getDefault: getDefaultUrlRules,
    test: testUrlRule,
    applyTitle: applyTitleTemplate,
    matchCurrent: matchCurrentUrlRule
  };
  const controller = {
    panelId: "dmplayer-ctl-panel",
    dmPlayer: null,
    BDM: null,
    dmStore,
    autoBind: dmStore.getLocal("autoBind", false),
    videoId: null,
    data: {},
    panelApp: null,
    fileInput: null,
    hotkeyBound: false,
    uiState: reactive({
      showing: true,
      binded: false,
      uiTheme: dmStore.getLocal("ui.theme", "light"),
      showControlPanel: true,
      showSearch: false,
      showConfig: false,
      showUrlRuleSettings: false
    })
  };
  function pickVideo() {
    const videos = Array.from(document.querySelectorAll("video"));
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
    const next = theme === "light" ? "light" : "dark";
    controller.dmStore.setLocal("ui.theme", next);
    controller.uiState.uiTheme = next;
  }
  function bindHotkey() {
    if (controller.hotkeyBound) return;
    controller.hotkeyBound = true;
    document.addEventListener("keydown", (e) => {
      const target = e.target;
      const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (isTyping) return;
      const key = e.key.toLowerCase();
      if (key === "d") {
        toggleDanmaku();
      } else if (key === "s") {
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
    if (!video) return "";
    const src = video.currentSrc || video.src || "";
    const width = Number.isFinite(video.videoWidth) ? video.videoWidth : 0;
    const height = Number.isFinite(video.videoHeight) ? video.videoHeight : 0;
    const duration = Number.isFinite(video.duration) ? Math.round(video.duration) : 0;
    return `${src}|${width}x${height}|${duration}`;
  }
  async function searchBiliVideos(keyword, search_type = "video") {
    const searchRes = await controller.BDM.client.request({
      url: "https://api.bilibili.com/x/web-interface/search/type",
      params: { search_type, keyword, page: 1 },
      sign: true,
      desc: `搜索${search_type} ${keyword}`
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
        title: urlRules.applyTitle(document.title, matchedRule.rule)
      };
    }
    return { id: null, url: location.href, title: document.title.trim() };
  }
  function observeVideoChange() {
    let href = null;
    let videoFingerprint = "";
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
  function showTip(message, { duration = 3e3 } = {}) {
    const dark = controller.uiState.uiTheme !== "light";
    const tip = document.createElement("div");
    tip.textContent = message;
    Object.assign(tip.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 14px",
      borderRadius: "6px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      fontSize: "14px",
      zIndex: 9999,
      whiteSpace: "pre-line",
      opacity: "0",
      transition: "opacity 0.3s ease",
      background: dark ? "rgba(50, 50, 50, 0.9)" : "#f0f0f0",
      color: dark ? "#fff" : "#000",
      border: dark ? "1px solid #444" : "1px solid #ccc"
    });
    document.body.appendChild(tip);
    requestAnimationFrame(() => {
      tip.style.opacity = "1";
    });
    setTimeout(() => {
      tip.style.opacity = "0";
      tip.addEventListener("transitionend", () => tip.remove());
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
    controller.dmPlayer.setOptions(controller.dmStore.get("settings", {}));
    controller.uiState.showControlPanel = !!getCurrentInfo().id;
    const panelRoot = document.createElement("div");
    panelRoot.id = controller.panelId;
    document.body.appendChild(panelRoot);
    controller.panelApp = createApp(_sfc_main);
    controller.panelApp.provide("dmState", controller.uiState);
    controller.panelApp.provide("dmActions", {
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
      openFileInput
    });
    controller.panelApp.provide("dmServices", {
      dmPlayer: controller.dmPlayer,
      dmStore: controller.dmStore
    });
    controller.panelApp.provide("dmDataMap", controller.data);
    controller.panelApp.provide("dmVideoId", () => controller.videoId);
    controller.panelApp.provide("dmUrlRules", urlRules);
    controller.panelApp.mount(panelRoot);
    controller.fileInput = document.createElement("input");
    controller.fileInput.type = "file";
    controller.fileInput.accept = ".json,.xml";
    controller.fileInput.style.display = "none";
    controller.fileInput.id = "dm-input-file";
    controller.fileInput.onchange = (e) => {
      const file = e.target.files[0];
      controller.fileInput.value = "";
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target.result;
          const data = createDanmakuData(controller.BDM);
          const load = {};
          if (text.startsWith("<")) {
            load.danmakuData = controller.BDM.BiliDanmaku.parseXml(text);
          } else {
            const json = JSON.parse(text);
            if (Array.isArray(json)) load.danmakuData = json;
            else if (json.danmakuData) Object.assign(load, json);
            else throw new Error("不支持的 JSON 格式");
          }
          if (!load.danmakuData?.length) throw new Error("弹幕数据为空");
          const current = getCurrentInfo();
          load.id ??= current.id;
          load.url ??= current.url;
          load.title ??= current.title;
          data.source = "local";
          data.setData(load);
          loadDanmakuSuccess(data);
        } catch (err) {
          logError("❌ 加载失败", err);
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
    const title = info?.title || "（未知标题）";
    const time = info?.fetchtime ? new Date(info.fetchtime * 1e3).toLocaleString("zh-CN", { hour12: false }) : "（未知）";
    showTip(`🎉 成功载入${data.source}数据：
🎬 ${title}
💬 共 ${data.dmCount} 条弹幕
🕒 抓取时间：${time}`);
  }
  async function loadData({ source, target }, binded = false) {
    try {
      const id = source.id;
      if (!id) return;
      const data = createDanmakuData(controller.BDM);
      const executeBind = () => {
        if (!controller.videoId) return;
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
        case "cache": {
          const cache = await controller.dmStore.cache.get(id);
          if (cache?.data) {
            data.setData(cache.data);
            loadDanmakuSuccess(data);
            executeBind();
          } else {
            showTip("⚠ 缓存数据不存在");
          }
          break;
        }
        case "server": {
          const server = controller.dmStore.get("server");
          if (server) {
            const params = new URLSearchParams({ id: String(id) });
            try {
              const res = await fetch(`${server}/video?${params.toString()}`);
              const json = await res.json();
              data.setData(json);
              loadDanmakuSuccess(data);
              executeBind();
            } catch (err) {
              logError("❌ 请检查服务器", err);
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
      logError("❌ 弹幕数据加载失败", err);
    }
  }
  function cacheData() {
    const data = controller.data[controller.videoId];
    if (!data) {
      showTip("⚠ 未有弹幕数据");
      return;
    }
    const id = data.info?.id;
    if (!id) {
      showTip("⚠ 未知弹幕数据");
      return;
    }
    controller.dmStore.cache.set(id, { info: data.info, data: data.data });
    data.source = "cache";
    bindVideoID(true, true);
    showTip("✅ 弹幕数据已缓存");
  }
  function bindVideoID(toggle = true, force = false) {
    const data = controller.data[controller.videoId];
    if (toggle) {
      if (!data) {
        showTip("⚠ 未有弹幕数据");
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
              title: info.title + (info.subtitle ? ` ${info.subtitle}` : ""),
              from: data.source
            },
            target: {
              id: current.id,
              url: current.url,
              title: current.title,
              alignData: data.alignData
            }
          };
          controller.dmStore.binded.set(controller.videoId, bindData);
        } catch (err) {
          logError("❌ 绑定视频失败", err);
        }
      } else {
        controller.dmStore.binded.remove(controller.videoId);
      }
    }
    controller.uiState.binded = !!data?.binded;
  }
  async function waitForVideo(timeout = 1e4) {
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
        reject(new Error("⏰ 超时：未检测到 <video> 元素"));
      }, timeout);
    });
  }
  async function bootstrap() {
    if (window.top !== window.self) {
      return;
    }
    try {
      const BDMGlobal = globalThis.BiliDataManager || unsafeWindow?.BiliDataManager;
      if (!BDMGlobal?.create) {
        throw new Error("BiliDataManager 未加载，请检查 @require");
      }
      controller.BDM = BDMGlobal.create({
        httpRequest: GM_xmlhttpRequest,
        name: "Danmaku Player",
        isLog: true
      });
      controller.dmPlayer = new BiliDanmakuPlayer();
      controller.autoBind = controller.dmStore.getLocal("autoBind", false);
      urlRules.ensure();
      controller.dmPlayer.domAdapter.injectStyle("dmplayer-danmaku-mark", `
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
      if (typeof GM_registerMenuCommand === "function") {
        GM_registerMenuCommand("🔗 URL匹配设置", () => {
          const video = pickVideo();
          if (!video) {
            showTip("⚠ 当前页面未检测到 <video> 元素");
            return;
          }
          showUrlRuleSettingsPanel();
        });
        GM_registerMenuCommand("🔍 搜索弹幕", () => {
          const video = pickVideo();
          if (!video) {
            showTip("⚠ 当前页面未检测到 <video> 元素");
            return;
          }
          controller.uiState.showSearch = true;
        });
      }
    } catch (err) {
      console.error("加载失败:", err);
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
  bootstrap();

})();