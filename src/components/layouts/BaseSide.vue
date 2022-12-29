<script lang="ts" setup>
import { ref } from "vue";
import DeepMenu from "./DeepMenu";
import logo from "~/assets/logo.png";
import vueLogo from "~/assets/small-logo.png";
import { useConfigStore } from "~/store";

const props = defineProps({
  showLine: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const isCollapse = ref(false);
const logoPath = ref(logo);
const configStore = useConfigStore();

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    logoPath.value = vueLogo;
  } else {
    setTimeout(() => {
      logoPath.value = logo;
    }, 300);
  }
};
</script>

<template>
  <aside
    class="sidebar"
    :style="
      props.showLine ? { borderRight: '1px solid var(--ep-border-color)' } : {}
    "
  >
    <div flex justify-center v-if="configStore.layoutModel == 0">
      <img
        alt="Vue logo"
        id="default-logo"
        :src="`${logoPath}`"
        @click="$router.push('/')"
      />
    </div>
    <DeepMenu
      class="ep-menu-vertical"
      :config="configStore.sideMenu"
      :collapse="isCollapse"
      router
    />
    <div
      class="ep-menu-item"
      justify-center
      cursor-pointer
      absolute
      bottom-0
      w-full
      @click="handleCollapse()"
      v-if="!configStore.fixedSide"
    >
      <i v-if="isCollapse" inline-flex i="ep-expand" />
      <i v-else inline-flex i="ep-fold" />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
}
.ep-menu-vertical:not(.ep-menu--collapse) {
  width: 200px;
}
</style>
