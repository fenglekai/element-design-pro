<script lang="ts" setup>
import {} from "vue";
</script>

<template>
  <div px-6 py-14>
    <div text-center mb-10 style="font-size: 2rem">
      Error: 404 Page Not Found
    </div>
    <div text-center mb-10>
      <img src="../../assets/404.png" alt="404" />
    </div>
    <div text-center color-gray-4 mb-10>
      Sorry, the page you visited does not exist.
    </div>
    <div text-center>
      <ElButton type="primary" @click="$router.push('/')"
        >Back to Home</ElButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
