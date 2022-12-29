<script lang="ts" setup>
import { onMounted } from "vue";
import { useWindowStore } from "./store";

const windowStore = useWindowStore();

onMounted(() => {
  windowStore.setSize({
    screenWidth: document.body.clientWidth,
    screenHeight: document.body.clientHeight,
  });
  window.onresize = () => {
    return (() => {
      windowStore.setSize({
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight,
      });
    })();
  };
});
</script>

<template>
  <BaseLayout />
</template>

<style>
#app {
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
.ep-tooltip__trigger {
  transition: 0.3s;
}
</style>
