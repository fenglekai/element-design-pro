<script lang="ts" setup>
import { ref } from "vue";
import { useConfigStore } from "~/store";
import DeepMenu from "./DeepMenu";
import HeaderOptions from "./HeaderOptions";

const configStore = useConfigStore();

const handleSelect = (index: string) => {
  configStore.mixHeaderIndex = index
  configStore.toggleMixSideMenu()
}
</script>

<template>
  <header class="navbar">
    <img
      alt="Vue logo"
      id="default-logo"
      src="../../assets/logo.png"
      @click="$router.push('/')"
      v-if="configStore.layoutModel == 1 || configStore.layoutModel == 2"
    />
    <DeepMenu
      :config="configStore.headerMenu"
      mode="horizontal"
      :style="{ width: 'calc(60%)' }"
      @select="handleSelect"
      :router="!configStore.isMixMenu"
    />
    <HeaderOptions />
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  height: 59px;
  padding: 0 10px;
  border-bottom: 1px solid var(--ep-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ep-bg-color);
}
</style>
