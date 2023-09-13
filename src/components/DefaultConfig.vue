<script lang="ts" setup>
import { ref } from "vue";
import { isDark, toggleDark } from "~/composables";
import { useConfigStore } from "~/store";
import { ElMessage } from "element-plus";
import { setEpColor } from "~/utils/common";

const configStore = useConfigStore();

// mobile布局
const drawer = ref(false);
const targetSetting = () => {
  drawer.value = !drawer.value;
};

// 黑暗主题切换
const handleDark = (bool: boolean) => {
  toggleDark(bool);
  setEpColor(configStore.primaryColor, bool);
};

// 主题色
const checkColor = (e: MouseEvent | any) => {
  const element = e.target;
  let child;
  // 判断当前点击是否存在check
  if (element.className.includes("theme-color-block")) {
    for (let i = 0; i < e.path[1].children.length; i++) {
      // 遍历出存在Icon的节点复制其节点及后代，删除Icon的节点
      const checkElement = e.path[1].children[i].lastElementChild;
      if (checkElement) {
        child = checkElement.cloneNode(true);
        checkElement.remove();
      }
    }
    // 添加节点
    element.appendChild(child);
    configStore.primaryColor = element.style.backgroundColor;
    setEpColor(configStore.primaryColor, isDark.value);
  }
};

/**
 * layout布局
 * 0: 侧边
 * 1: 顶栏
 * 2: 混合
 */
const navbarType = ref(configStore.layoutModel);
const setNavbar = (num: number) => {
  navbarType.value = num;
  configStore.toggleLayout(num);
  if (num == 0) {
    configStore.useSideMenu();
    isMixMenuSwitch.value = false;
    configStore.isMixMenu = false;
  }
  if (num == 1) {
    configStore.useHeaderMenu();
    isMixMenuSwitch.value = false;
    configStore.isMixMenu = false;
  }
  if (num == 2) {
    configStore.useSideMenu();
  }
};

// 固定Header
const fixedHeaderSwitch = ref(configStore.fixedHeader);
const fixedHeaderChange = (val: any) => {
  configStore.fixedHeader = val;
};

// 固定侧边菜单
const fixedSideSwitch = ref(configStore.fixedSide);
const fixedSideChange = (val: any) => {
  configStore.fixedSide = val;
};

// 自动分割菜单
const isMixMenuSwitch = ref(configStore.isMixMenu);
const isMixMenuChange = (val: any) => {
  configStore.isMixMenu = val;
  if (val) {
    configStore.useMixMenu();
  } else {
    configStore.useSideMenu();
  }
};

// 顶栏半透明
const headerBackgroundSwitch = ref(configStore.headerBackground);
const headerBackgroundChange = (val: any) => {
  configStore.headerBackground = val;
};

// 顶栏
const showHeaderSwitch = ref(configStore.showHeader);
const showHeaderChange = (val: any) => {
  configStore.showHeader = val;
};

// 菜单
const showSideSwitch = ref(configStore.showSide);
const showSideChange = (val: any) => {
  configStore.showSide = val;
};

// 菜单
const showFooterSwitch = ref(configStore.showFooter);
const showFooterChange = (val: any) => {
  configStore.showFooter = val;
};

// 拷贝配置
const copyConfig = () => {
  const state: any = { ...configStore.$state, isDark: isDark.value };
  delete state.headerMenu;
  delete state.sideMenu;
  delete state.mixHeaderIndex;
  navigator.clipboard.writeText(JSON.stringify(state)).then(
    () => {
      ElMessage({
        message: "拷贝成功",
        type: "success",
      });
    },
    () => {
      ElMessage({
        message: "拷贝失败",
        type: "error",
      });
    }
  );
};
</script>

<template>
  <div
    id="config-setting"
    :style="drawer ? { right: '300px' } : {}"
    @click="targetSetting"
  >
    <ElIcon size="24"><IEpSetting /></ElIcon>
  </div>
  <ElDrawer v-model="drawer" title="默认配置" :size="300" @close="drawer = false">
    <div mb-4>
      <h3 class="setting-title">整体风格设置</h3>
      <div flex>
        <ElTooltip
          content="默认主题"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div class="white-theme" @click="handleDark(false)">
            <ElIcon class="theme-check" v-show="!isDark"><IEpCheck /></ElIcon>
          </div>
        </ElTooltip>
        <ElTooltip
          content="暗黑主题"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div class="dark-theme" @click="handleDark(true)">
            <ElIcon class="theme-check" v-show="isDark"><IEpCheck /></ElIcon>
          </div>
        </ElTooltip>
      </div>
    </div>
    <div mb-4>
      <h3 class="setting-title">主题色</h3>
      <div
        overflow-hidden
        @click.stop="
          (e) => {
            checkColor(e);
          }
        "
      >
        <ElTooltip
          content="清新绿"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#41b883' }"
          >
            <ElIcon><IEpCheck /></ElIcon>
          </div>
        </ElTooltip>
        <ElTooltip
          content="初晓蓝"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#589ef8' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="薄暮"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#f5222d' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="火山"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#fa541c' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="日暮"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#faad14' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="明青"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#13c2c2' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="极光绿"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#52c41a' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="极客蓝"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#2f54eb' }"
          ></div>
        </ElTooltip>
        <ElTooltip
          content="酱紫"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div
            class="theme-color-block"
            :style="{ backgroundColor: '#722ed1' }"
          ></div>
        </ElTooltip>
      </div>
    </div>
    <ElDivider />

    <div mb-4>
      <h3 class="setting-title">导航模式</h3>
      <div flex mb-6>
        <ElTooltip
          content="侧边菜单布局"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div class="side-theme" @click="setNavbar(0)">
            <ElIcon class="theme-check dark:color-dark" v-show="navbarType == 0"
              ><IEpCheck
            /></ElIcon>
          </div>
        </ElTooltip>
        <ElTooltip
          content="顶部菜单布局"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div class="header-theme" @click="setNavbar(1)">
            <ElIcon class="theme-check dark:color-dark" v-show="navbarType == 1"
              ><IEpCheck
            /></ElIcon>
          </div>
        </ElTooltip>
        <ElTooltip
          content="混合菜单布局"
          placement="top"
          transition="ep-fade-in-linear"
        >
          <div class="mix-theme" @click="setNavbar(2)">
            <ElIcon class="theme-check dark:color-dark" v-show="navbarType == 2"
              ><IEpCheck
            /></ElIcon>
          </div>
        </ElTooltip>
      </div>
      <ul class="setting-list">
        <li>
          <span>固定Header</span>
          <ElSwitch
            size="small"
            v-model="fixedHeaderSwitch"
            @change="fixedHeaderChange"
          />
        </li>
        <li>
          <span>固定侧边菜单</span>
          <ElSwitch
            size="small"
            v-model="fixedSideSwitch"
            @change="fixedSideChange"
          />
        </li>
        <li>
          <span>自动分割菜单(实验)</span>
          <ElSwitch
            size="small"
            v-model="isMixMenuSwitch"
            @change="isMixMenuChange"
            :disabled="navbarType != 2"
          />
        </li>
      </ul>
    </div>
    <ElDivider />
    <div mb-4>
      <h3 class="setting-title">内容区域</h3>
      <ul class="setting-list">
        <li>
          <span>顶栏背景半透明</span>
          <ElSwitch
            size="small"
            v-model="headerBackgroundSwitch"
            @change="headerBackgroundChange"
          />
        </li>
        <li>
          <span>顶栏</span>
          <ElSwitch
            size="small"
            v-model="showHeaderSwitch"
            @change="showHeaderChange"
          />
        </li>
        <li>
          <span>菜单</span>
          <ElSwitch
            size="small"
            v-model="showSideSwitch"
            @change="showSideChange"
          />
        </li>
        <li>
          <span>页脚</span>
          <ElSwitch
            size="small"
            v-model="showFooterSwitch"
            @change="showFooterChange"
          />
        </li>
      </ul>
    </div>
    <ElDivider />
    <ElAlert type="warning" show-icon :closable="false">
      配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件
    </ElAlert>
    <ElButton my-4 w-full @click="copyConfig">拷贝配置</ElButton>
  </ElDrawer>
</template>

<style lang="scss" scoped>
#config-setting {
  position: fixed;
  top: 12rem;
  right: 0;
  z-index: 9999;
  width: 3.5rem;
  height: 3.5rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: var(--ep-color-white);
  background-color: var(--ep-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}
.white-theme {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    content: "";
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
    content: "";
  }
}
.dark-theme {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: rgba(0, 21, 41, 0.85);
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: rgba(15, 28, 41, 0.65);
    content: "";
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(15, 28, 41, 0.65);
    content: "";
  }
}
.side-theme {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
    content: "";
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: rgba(15, 28, 41);
    content: "";
  }
}
.header-theme {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(15, 28, 41);
    content: "";
  }
}
.mix-theme {
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    content: "";
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(15, 28, 41);
    content: "";
  }
}
.theme-check {
  position: absolute;
  right: 2px;
  bottom: 2px;
}
.theme-color-block {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 8px;
  margin-right: 8px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 24px;
  border-radius: 2px;
  cursor: pointer;
}
.setting-title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: normal;
}
.setting-list {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
}
</style>
