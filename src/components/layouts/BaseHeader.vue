<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useConfigStore, useWindowStore } from "~/store";
import DeepMenu from "./DeepMenu";
import HeaderOptions from "./HeaderOptions";
import logo from "~/assets/logo.png";
import vueLogo from "~/assets/small-logo.png";

const configStore = useConfigStore();
const windowStore = useWindowStore();

const logoPath = ref(logo);
const drawer = ref(false);

const handleSelect = (index: string) => {
  configStore.mixHeaderIndex = index;
  configStore.toggleMixSideMenu();
};
const handleExpand = () => {
  drawer.value = true;
};

watch(windowStore, (newVal) => {
  if (newVal.screenWidth < 768) {
    logoPath.value = vueLogo;
  } else {
    logoPath.value = logo;
  }
});

onMounted(() => {
  if (windowStore.screenWidth < 768) {
    logoPath.value = vueLogo;
  } else {
    logoPath.value = logo;
  }
});
</script>

<template>
  <header class="navbar">
    <div inline-flex items-inherit>
      <img
        alt="Vue logo"
        id="default-logo"
        :src="`${logoPath}`"
        @click="$router.push('/')"
        v-if="
          configStore.layoutModel == 1 ||
          configStore.layoutModel == 2 ||
          windowStore.screenWidth < 768
        "
      />
      <div style="cursor: pointer" @click="handleExpand">
        <i
          v-if="drawer"
          inline-flex
          i="ep-fold"
        />
        <i v-else inline-flex i="ep-expand" />
      </div>
    </div>
    <el-drawer
      v-if="windowStore.screenWidth < 768"
      v-model="drawer"
      :with-header="false"
      direction="ltr"
      :size="250"
    >
      <BaseSide :showLine="false" />
    </el-drawer>
    <DeepMenu
      v-else
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
