<script lang="ts" setup>
import {} from "vue";
</script>

<template>
  <div class="right-wrapper">
    <p class="right-title">安全设置</p>
    <div flex justify-between>
      <div>
        <p m-0 mb-1>账户密码</p>
        <span color-gray>当前密码强度： 强</span>
      </div>
      <el-link>修改</el-link>
    </div>
    <el-divider />
    <div flex justify-between>
      <div>
        <p m-0 mb-1>绑定手机</p>
        <span color-gray>已绑定手机： 138****8293</span>
      </div>
      <el-link>修改</el-link>
    </div>
    <el-divider />
    <div flex justify-between>
      <div>
        <p m-0 mb-1>绑定邮箱</p>
        <span color-gray>已绑定邮箱： ele***t-plus.com</span>
      </div>
      <el-link>修改</el-link>
    </div>
    <el-divider />
  </div>
</template>

<style lang="scss" scoped></style>
