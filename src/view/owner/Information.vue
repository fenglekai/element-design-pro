<script lang="ts" setup>
import { ref } from "vue";
const switch1 = ref(true);
const switch2 = ref(true);
const switch3 = ref(true);
</script>

<template>
  <div class="right-wrapper">
    <p class="right-title">新消息通知</p>
    <div flex justify-between>
      <div>
        <p m-0 mb-1>账户密码</p>
        <span color-gray>其他用户的消息将以站内信的形式通知</span>
      </div>
      <el-switch
        v-model="switch1"
      >
      </el-switch>
    </div>
    <el-divider />
    <div flex justify-between>
      <div>
        <p m-0 mb-1>系统消息</p>
        <span color-gray>系统消息将以站内信的形式通知</span>
      </div>
      <el-switch
        v-model="switch2"
      >
      </el-switch>
    </div>
    <el-divider />
    <div flex justify-between>
      <div>
        <p m-0 mb-1>待办任务</p>
        <span color-gray>待办任务将以站内信的形式通知</span>
      </div>
      <el-switch
        v-model="switch3"
      >
      </el-switch>
    </div>
    <el-divider />
  </div>
</template>

<style lang="scss" scoped></style>
