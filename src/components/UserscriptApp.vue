<script setup>
import { inject } from 'vue';
import ControlPanel from './ControlPanel.vue';
import SearchPanel from './SearchPanel.vue';
import ConfigPanel from './ConfigPanel.vue';
import UrlRuleSettingsPanel from './UrlRuleSettingsPanel.vue';

const state = inject('dmState');
const actions = inject('dmActions');

function openSearch() {
  state.showSearch = true;
}

function openConfig() {
  state.showConfig = true;
}
</script>

<template>
  <ControlPanel
    v-if="state.showControlPanel"
    :theme="state.uiTheme"
    :showing="state.showing"
    :binded="state.binded"
    @search="openSearch"
    @bind="actions.bindVideoID()"
    @load="actions.openFileInput()"
    @save="actions.cacheData()"
    @toggle="actions.toggleDanmaku()"
    @config="openConfig"
  />

  <SearchPanel
    v-if="state.showSearch"
    @close="state.showSearch = false"
  />
  <ConfigPanel
    v-if="state.showConfig"
    @close="state.showConfig = false"
  />
  <UrlRuleSettingsPanel v-if="state.showUrlRuleSettings" @close="state.showUrlRuleSettings = false" />
</template>
