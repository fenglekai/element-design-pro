<script lang="ts" setup>
import {} from "vue";
import {
  Files,
  ChatLineRound,
  Platform,
  Document,
  Setting,
  Present,
} from "@element-plus/icons-vue";
</script>

<template>
  <table w-full>
    <tbody>
      <tr class="base-tr">
        <td p-5 border-r-1 border-b-1 class="base-td">
          <div flex items-center gap-2>
            <el-icon><ChatLineRound /></el-icon>
            <span class="header">消息列表体验优化</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">5小时前</span>
          </div>
        </td>
        <td p-5 border-r-1 border-b-1 class="base-td">
          <div flex items-center gap-2>
            <el-icon><Platform /></el-icon>
            <span class="header">管理平台</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">5小时前</span>
          </div>
        </td>
        <td p-5 border-b-1 class="base-td">
          <div flex items-center gap-2>
            <el-icon><Document /></el-icon>
            <span class="header">文档中心</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">5小时前</span>
          </div>
        </td>
      </tr>
      <tr class="base-tr">
        <td p-5 border-r-1 class="base-td">
          <div flex items-center gap-2>
            <el-icon><Files /></el-icon>
            <span class="header">五月日常小需求</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">5小时前</span>
          </div>
        </td>
        <td p-5 border-r-1 class="base-td">
          <div flex items-center gap-2>
            <el-icon><Setting /></el-icon>
            <span class="header">功能效能</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">5小时前</span>
          </div>
        </td>
        <td p-5>
          <div flex items-center gap-2>
            <el-icon><Present /></el-icon>
            <span class="header">智能运营中心</span>
          </div>
          <div class="text">
            <span>这是一条描述消息这是一条描述消息这是一条描述消息</span>
          </div>
          <div class="foot-team" flex justify-between>
            <span>项目组</span>
            <span class="time">3小时前</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.base-tr {
  td {
    width: 33%;
    cursor: pointer;
    .header {
      font-size: 0.9rem;
      font-weight: bold;
      transition: color 0.3s;
      &:hover {
        color: var(--ep-color-primary);
      }
    }
    .text {
      margin-top: 1rem;
      color: var(--ep-text-color-secondary);
    }
    .foot-team {
      margin-top: 1rem;
      font-size: 0.6rem;
      font-weight: bold;
      color: var(--ep-text-color-secondary);
      transition: color 0.3s;
      &:hover {
        color: var(--ep-color-primary);
      }
      .time {
        font-weight: 500;

        color: var(--ep-text-color-placeholder);
      }
    }
  }
}
.base-td {
  border-color: var(--ep-card-border-color);
}
</style>
