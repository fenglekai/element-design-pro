<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { Upload } from "@element-plus/icons-vue";
import avatarImg from "~/assets/avatar.png";
import { UploadRequestOptions } from "element-plus";
import { regionData } from "element-china-area-data";
import { useWindowStore } from "~/store";

const windowStore = useWindowStore();
const avatar = ref(avatarImg);

const sizeForm = reactive({
  avatar: avatar,
  email: "",
  name: "",
  introduction: "",
  nation: "",
  provincesAndCities: "",
  street: "",
  phoneBefore: "",
  phone: "",
});

const uploadImg = (options: UploadRequestOptions) => {
  console.log(options);
  return Promise.resolve();
};

function onSubmit() {
  console.log("submit!");
}


</script>

<template>
  <div class="right-wrapper">
    <p class="right-title">基本设置</p>
    <el-form
      ref="form"
      :model="sizeForm"
      label-width="auto"
      label-position="top"
    >
      <div flex>
        <div style="flex-basis: 500px">
          <el-form-item label="头像" v-if="windowStore.screenWidth < 1200">
            <div flex flex-col justify-center items-center>
              <el-image
                style="width: 150px; height: 150px"
                :src="avatar"
                fit="fill"
              />
              <el-upload action="upload" :http-request="uploadImg">
                <template #trigger>
                  <el-button
                    ><el-icon><Upload /></el-icon>更换头像</el-button
                  >
                </template>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="sizeForm.email"
              style="max-width: 330px"
              clearable
            />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="sizeForm.name"
              style="max-width: 330px"
              clearable
            />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input
              v-model="sizeForm.introduction"
              type="textarea"
              style="max-width: 440px"
            />
          </el-form-item>
          <el-form-item label="国家/地区">
            <el-select v-model="sizeForm.nation" placeholder="请选择">
              <el-option label="中国" value="中国" />
            </el-select>
          </el-form-item>
          <el-form-item label="所在省市">
            <el-cascader
              v-model="sizeForm.provincesAndCities"
              placeholder="请选择"
              :options="regionData"
            />
          </el-form-item>
          <el-form-item label="街道地址">
            <el-input
              v-model="sizeForm.street"
              style="max-width: 330px"
              clearable
            />
          </el-form-item>
          <el-form-item label="联系电话">
            <div flex gap-2>
              <el-input
                v-model="sizeForm.phoneBefore"
                style="max-width: 70px"
                clearable
              />
              <el-input
                v-model="sizeForm.phone"
                style="max-width: 230px"
                clearable
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </div>
        <el-form-item label="头像" v-if="windowStore.screenWidth >= 1200">
          <div flex flex-col justify-center items-center>
            <el-image
              style="width: 150px; height: 150px"
              :src="avatar"
              fit="fill"
            />
            <el-upload action="upload" :http-request="uploadImg">
              <template #trigger>
                <el-button
                  ><el-icon><Upload /></el-icon>更换头像</el-button
                >
              </template>
            </el-upload>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
