import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'B站弹幕播放器',
        namespace: 'https://github.com/ZBpine/bilibili-danmaku-download/',
        version: '2.0.0',
        description: '在任意网页视频页面加载B站弹幕',
        author: 'ZBpine',
        icon: 'https://www.bilibili.com/favicon.ico',
        match: ['*://*/*'],
        require: ['https://cdn.jsdelivr.net/gh/ZBpine/bili-data-manager@1.0.3/dist/bili-data-manager.min.js'],
        grant: ['unsafeWindow', 'GM_getValue', 'GM_setValue', 'GM_xmlhttpRequest', 'GM_registerMenuCommand'],
        connect: ['api.bilibili.com'],
        license: 'MIT',
        'run-at': 'document-end',
      },
    }),
  ],
});
