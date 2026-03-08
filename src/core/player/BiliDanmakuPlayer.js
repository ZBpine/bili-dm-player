import { DMPlayerDOMAdapter } from './DMPlayerDOMAdapter';

export class BiliDanmakuPlayer {
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
      elId: 'dmplayer-container-host',
      elStyle: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '999',
      },
    });
    this.containerShadow = this.containerHost.attachShadow({ mode: 'open' });
    this.container = this.domAdapter.createElement({ elId: 'dmplayer-container' });
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
        },
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
        },
      },
      speed: {
        value: 6,
        setValue: (value) => {
          const next = Number(value);
          if (Number.isFinite(next)) this.options.speed.value = Math.max(3, Math.min(9, next));
          this._updateDuration();
        },
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
        },
      },
      syncRate: {
        value: false,
        setValue: (value) => {
          if (value !== undefined && value !== null) {
            this.options.syncRate.value = !!value;
          }
        },
        getValue: () => this.options.syncRate.value,
      },
      overlap: {
        value: false,
        setValue: (value) => {
          if (value !== undefined && value !== null) {
            this.options.overlap.value = !!value;
          }
        },
      },
      mergeRepeats: {
        value: true,
        setValue: (value) => {
          if (value !== undefined && value !== null) {
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
        },
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
          this.domAdapter.injectStyle('dmplayer-danmaku-shadow', css);
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
                    [-1, 0],
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
              default:
                break;
            }
          }
          return shadows.join(',\n');
        },
      },
    };
  }

  init() {
    this.domAdapter.injectStyle(
      'dmplayer-style',
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
      }`,
    );
    for (const key in this.options) {
      if (this.options[key].init) this.options[key].execute?.();
    }
    console.log('[Danmaku Player]', '✅ 弹幕播放器初始化完成');
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
    let uid = 0;
    const base = Date.now();
    const normalized = inputList.map((dm) => {
      const cloned = { ...dm };
      cloned.progress = Number.isFinite(Number(cloned.progress)) ? Number(cloned.progress) : 0;
      cloned.id = cloned.idStr || cloned.id?.toString() || `${base}${uid++}`;
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
    console.log('[Danmaku Player]', '🔻 弹幕已清空');
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
      el.style.animationPlayState = 'paused';
    });
  }

  play() {
    this.paused = false;
    Array.from(this.container.children).forEach((el) => {
      el.style.animationPlayState = 'running';
    });
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    if (!rect) return;
    if (!this.containerRect || this.containerRect.width !== rect.width || this.containerRect.height !== rect.height) {
      console.log('[Danmaku Player]', `更新尺寸：${Math.round(rect.height)}×${Math.round(rect.width)}`);
      this.containerRect = this.container.getBoundingClientRect();
      this.domAdapter.injectStyle(
        'dmplayer-style-animation',
        `
        @keyframes dmplayer-animate-scroll {
          from { transform: translateX(100%); }
          to { transform: translateX(-${this.containerRect.width}px); }
        }`,
      );
      this._updateTracks();
      this._updateDuration();
      const currentTime = this.domAdapter.video.currentTime * 1000;
      Array.from(this.container.getElementsByClassName('dmplayer-danmaku-scroll')).forEach((el) => {
        el.style.animationDelay = `${el._progress - currentTime}ms`;
      });
    }
  }

  _mergeRepeat() {
    const merged = [];
    const averageColor = (a, b, count) => {
      const toRGB = (hex) => {
        const n = typeof hex === 'number' ? hex : parseInt(hex, 10);
        return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
      };
      const [r1, g1, b1] = toRGB(a);
      const [r2, g2, b2] = toRGB(b);
      const newR = Math.round((r1 * (count - 1) + r2) / count);
      const newG = Math.round((g1 * (count - 1) + g2) / count);
      const newB = Math.round((b1 * (count - 1) + b2) / count);
      return (newR << 16) | (newG << 8) | newB;
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
    // console.log('[Danmaku Player]', `最大轨道数：${maxTracks}`);
  }

  _getFreeTrack(type, el, delayRatio) {
    if (!(type in this.tracks)) return 0;
    const tracks = this.tracks[type];
    const inter = this._getTrackInter();
    const id = el.id;
    const c = this.containerRect;
    const newDm = el.getBoundingClientRect();
    const newRatio = c.width / (c.width + newDm.width) - delayRatio;

    const compactTrack = (track) => {
      const alive = {};
      for (const key in track) {
        const entry = track[key];
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

      const track = compactTrack(rawTrack);
      tracks[i] = track;
      if (Object.keys(track).length === 0) {
        tracks[i] = { [id]: el };
        return i;
      }

      if (type === 'scroll') {
        let conflict = false;
        for (const key in track) {
          const lastEl = track[key];
          const oldDM = lastEl.getBoundingClientRect();
          const oldRatio = (oldDM.right - c.left + inter) / (c.width + oldDM.width);
          if (newRatio <= oldRatio || c.right - oldDM.right <= inter) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          track[id] = el;
          return i;
        }
      }
    }

    if (this.options.overlap?.value) {
      let bestIndex = -1;
      let earliestTime = Infinity;
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i] || {};
        let latestStart = 0;
        for (const key in track) {
          const lastEl = track[key];
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
      center: Math.round(30000 / this.options.speed.value),
      scroll: Math.round(((this.containerRect.width || 0) + 400) * 30 / this.options.speed.value),
    };
    // console.log('[Danmaku Player]', `弹幕持续时长：中间 ${this._duration.center / 1000}秒，滚动 ${this._duration.scroll / 1000}秒`);
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
    const type = dm.type ?? (dm.mode === 5 ? 'top' : dm.mode === 4 ? 'bottom' : 'scroll');
    const el = this.domAdapter.createElement({
      elId: dm.id,
      elContent: dm.content,
      elClass: ['dmplayer-danmaku', `dmplayer-danmaku-${type}`],
      elStyle: {
        fontSize: `${dm.fontsize || 25}px`,
        color: `#${(dm.color || 0xffffff).toString(16).padStart(6, '0')}`,
        animationDuration: `${duration / rate}ms`,
        animationDelay: `${-delay / rate}ms`,
      },
    });
    if (dm.count && dm.count > 1) {
      const clr = dm.color || 0xffffff;
      el.appendChild(
        this.domAdapter.createElement({
          elName: 'span',
          elContent: `×${dm.count}`,
          elClass: 'dmplayer-danmaku-badge',
          elStyle: {
            background: `rgba(${(clr >> 16) & 0xff}, ${(clr >> 8) & 0xff}, ${clr & 0xff}, 0.3)`,
          },
        }),
      );
    }
    el._progress = dm.progress;
    this.domAdapter.injectElement(this.container, el);
    const track = this._getFreeTrack(type, el, delay / duration);
    if (track >= 0) {
      const lineHeight = this._getLineHeight();
      if (type === 'top' || type === 'bottom') {
        el.style[type] = `${track * lineHeight + 5}px`;
      } else if (type === 'scroll') {
        el.style.top = `${track * lineHeight + Math.floor(Math.random() * 5) + 3}px`;
      } else if (dm.style) {
        Object.assign(el.style, dm.style);
      }
      el.addEventListener('animationend', () => {
        const trackList = this.tracks[type]?.[track];
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

      const currentTime = this.domAdapter.video.currentTime * 1000;
      if (Math.abs(currentTime - lastTime) > 1500) {
        console.log('[Danmaku Player]', '检测到跳转', ((currentTime - lastTime) / 1000).toFixed(3));
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
    if (option === null || option === undefined) return;
    if (key) {
      this.options[key]?.setValue(option);
    } else {
      for (const k in option) {
        if (this.options[k]?.setValue && option[k] !== undefined) {
          this.options[k].setValue(option[k]);
        }
      }
    }
  }
}
