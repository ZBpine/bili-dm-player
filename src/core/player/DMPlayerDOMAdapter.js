export class DMPlayerDOMAdapter {
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
      const style = this.createElement({ elName: 'style', elContent: content });
      style.setAttribute('data-dmplayer-style-id', id);
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

  createElement({ elName = 'div', elId = '', elContent = '', elStyle = {}, elClass }) {
    const element = document.createElement(elName);
    if (elId) element.id = elId;
    if (elContent) element.textContent = elContent;
    if (elClass) {
      if (Array.isArray(elClass)) element.classList.add(...elClass);
      else if (typeof elClass === 'string') element.classList.add(elClass);
    }
    Object.assign(element.style, elStyle);
    return element;
  }

  addContainer(container) {
    const wrapper = this.getVideoWrapper();
    if (!wrapper) return;
    if (getComputedStyle(wrapper).position === 'static') {
      wrapper.style.position = 'relative';
    }
    this.injectElement(wrapper, container, true);
  }

  getVideoWrapper() {
    const video = document.querySelector('video');
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
    const video = document.querySelector('video');
    if (!video || video === this.videoEl) return;
    this.videoEl = video;
    this._handlers.onSeeked = () => this.player.seek();
    this._handlers.onLoaded = () => this.player.resize();
    this._handlers.onPause = () => this.player.pause();
    this._handlers.onPlay = () => this.player.play();
    video.addEventListener('seeked', this._handlers.onSeeked);
    video.addEventListener('loadedmetadata', this._handlers.onLoaded);
    video.addEventListener('pause', this._handlers.onPause);
    video.addEventListener('play', this._handlers.onPlay);
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
    this.videoEl.removeEventListener('seeked', this._handlers.onSeeked);
    this.videoEl.removeEventListener('loadedmetadata', this._handlers.onLoaded);
    this.videoEl.removeEventListener('pause', this._handlers.onPause);
    this.videoEl.removeEventListener('play', this._handlers.onPlay);
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
        has: (_, prop) => prop in (this.videoEl || {}),
      },
    );
  }
}
