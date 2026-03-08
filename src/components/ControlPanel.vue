<script setup>
const props = defineProps({
  theme: {
    type: String,
    default: 'dark',
  },
  showing: {
    type: Boolean,
    default: true,
  },
  binded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['search', 'bind', 'load', 'save', 'toggle', 'config']);
</script>

<template>
  <div class="dmplayer-ctl-panel" :class="props.theme === 'light' ? 'light' : 'dark'">
    <button title="搜索弹幕" @click="emit('search')">🔍</button>
    <button :title="props.binded ? '取消绑定' : '绑定视频'" @click="emit('bind')">{{ props.binded ? '🗑️' : '🔗' }}</button>
    <button title="载入文件" @click="emit('load')">📂</button>
    <button title="保存弹幕" @click="emit('save')">💾</button>
    <button title="开关弹幕" @click="emit('toggle')">{{ props.showing ? '✅' : '🚫' }}</button>
    <button title="打开设置" @click="emit('config')">⚙️</button>
  </div>
</template>

<style scoped>
.dmplayer-ctl-panel {
  position: fixed;
  left: 0;
  bottom: 40px;
  transform: translateX(calc(-100% + 20px));
  z-index: 10000;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease;
  opacity: 0.2;
  background: #333;
  border-radius: 0 20px 20px 0;
  padding: 10px 20px 10px 10px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 36px;
  grid-template-rows: 36px 36px;
  gap: 6px;
}

.dmplayer-ctl-panel.light {
  background: #ccc;
}

.dmplayer-ctl-panel:hover {
  transform: translateX(0);
  opacity: 1;
}

.dmplayer-ctl-panel button {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  background: #555;
  color: #fff;
}

.dmplayer-ctl-panel.light button {
  background: #eee;
  color: #000;
}
</style>
