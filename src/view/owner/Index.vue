<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useWindowStore } from "~/store";
import Base from './Base.vue'
import Safe from './Safe.vue'
import Information from './Information.vue'

const windowStore = useWindowStore();
const tabPosition: any = ref("left");

watch(windowStore, (newVal) => {
  if (newVal.screenWidth < 768) {
    tabPosition.value = "top";
  } else {
    tabPosition.value = "left";
  }
});

onMounted(() => {
  if (windowStore.screenWidth < 768) {
    tabPosition.value = "top";
  } else {
    tabPosition.value = "left";
  }
});
</script>

<template>
  <div px-6 pt-6>
    <el-card>
      <el-tabs :tab-position="tabPosition" class="demo-tabs">
        <el-tab-pane label="基本设置">
            <Base />
        </el-tab-pane>
        <el-tab-pane label="安全设置">
            <Safe />
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <Information />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss">
.right-wrapper {
  padding: 5px 20px;
  .right-title {
    margin: 0 0 30px 0;
    font-size: 20px;
  }
}
</style>
