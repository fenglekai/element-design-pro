<script lang="ts" setup>
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElMessage,
  FormInstance,
  FormRules,
} from "element-plus";
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/store";
import { isDark } from "~/composables";

const router = useRouter();
const userStore = useUserStore();

const activeName = ref("1");

const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "admin",
  saveLocal: false,
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入账户", trigger: "blur" },
    { min: 4, max: 10, message: "长度需要在4-10之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 10, message: "长度需要在4-10之间", trigger: "blur" },
  ],
});

const loadStatus = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      loadStatus.value = true;
      setTimeout(() => {
        loadStatus.value = false;
        if (loginForm.saveLocal) {
          userStore.localLogin(loginForm);
        } else {
          userStore.sessionLogin(loginForm);
        }
        ElMessage.success("登录成功");
        router.push("/");
      }, 2000);
    } else {
      ElMessage.error("账户或密码格式错误");
    }
  });
};
</script>

<template>
  <div class="container-wrapper" bg-gray-1 dark:bg-gray-9>
    <div class="login-left">
      <img src="../../assets/logo.png" alt="logo" width="400" />
      <p class="subtitle" m-0>简洁的Element Plus中后台模板</p>
    </div>
    <div :class="['login-right', isDark ? 'dark-bg' : 'light-bg']">
      <ElTabs v-model="activeName">
        <ElTabPane name="1">
          <template #label>
            <div style="width: 220px" text-center>账户密码登录</div>
          </template>
          <ElForm
            ref="loginFormRef"
            :model="loginForm"
            style="width: 220px"
            :rules="rules"
          >
            <ElFormItem prop="username">
              <ElInput v-model="loginForm.username" :prefix-icon="User" />
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput
                v-model="loginForm.password"
                type="password"
                show-password
                :prefix-icon="Lock"
              />
            </ElFormItem>
            <ElFormItem>
              <div flex justify-between w-full>
                <ElCheckbox v-model="loginForm.saveLocal" label="记住密码" />
                <!-- <ElButton type="primary" link>忘记密码</ElButton> -->
              </div>
            </ElFormItem>
            <ElFormItem>
              <ElButton
                w-full
                type="primary"
                @click="submitForm(loginFormRef)"
                :loading="loadStatus"
                >立即登录</ElButton
              >
            </ElFormItem>
          </ElForm>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark-bg {
  background-color: rgba(18,18,18,0.5);
}
.light-bg {
  background-color: rgba(255,255,255,0.5);
}
.container-wrapper {
  background-image: url("~/assets/login-img.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  display: flex;
  .login-left {
    flex: 1.5;
    display: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-right {
    flex: 1;
    display: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.subtitle {
  font-size: 24px;
  color: var(--ep-text-color-secondary);
}
</style>
