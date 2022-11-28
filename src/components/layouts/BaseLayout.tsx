import { ElBacktop, ElConfigProvider, ElScrollbar } from "element-plus";
import { defineComponent } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useConfigStore } from "~/store";
import DefaultConfig from "../DefaultConfig.vue";
import BaseHeader from "./BaseHeader.vue";
import BaseSide from "./BaseSide.vue";
import styles from "./index.module.scss";

export const BaseFooter = defineComponent({
  render() {
    return (
      <div class={"mt-10 mb-6 flex justify-center color-gray-4"}>
        <span>&copy; 2022 IAI Innovative Application Dept</span>
      </div>
    );
  },
});

export const Tag = defineComponent({
  render() {
    const configStore = useConfigStore();

    const HeaderWrapper = defineComponent({
      render() {
        return (
          <>
            {configStore.fixedHeader ? (
              <header style={{ height: "60px", visibility: "hidden" }}></header>
            ) : null}
            <BaseHeader
              class={[
                configStore.fixedHeader ? "absolute top-0 z-1" : null,
                configStore.headerBackground ? styles.headerBackground : null,
              ]}
              style={{
                width: configStore.fixedHeader ? "calc(100% - 20px)" : null,
              }}
            />
          </>
        );
      },
    });

    const SideLayout = defineComponent({
      render() {
        return (
          <>
            <div class={"flex"} style={{ height: "100vh" }}>
              {configStore.showSide ? <BaseSide /> : null}
              <ElScrollbar class={"w-full h-full bg-gray-1 dark:bg-gray-9"}>
                {configStore.showHeader ? <HeaderWrapper /> : null}
                {this.$slots.default?.()}
              </ElScrollbar>
            </div>
          </>
        );
      },
    });
    const HeaderLayout = defineComponent({
      render() {
        return (
          <>
            <div style={{ height: "100vh" }}>
              <ElScrollbar class={"w-full h-full bg-gray-1 dark:bg-gray-9"}>
                {configStore.showHeader ? <HeaderWrapper /> : null}
                {this.$slots.default?.()}
              </ElScrollbar>
            </div>
          </>
        );
      },
    });
    const MixLayout = defineComponent({
      render() {
        return (
          <>
            {configStore.showHeader ? (
              <BaseHeader
                class={
                  configStore.headerBackground ? styles.headerBackground : null
                }
              />
            ) : null}

            <div class={"flex"} style={{ height: "calc(100vh - 60px)" }}>
              {configStore.showSide ? <BaseSide /> : null}
              <ElScrollbar class={"w-full h-full bg-gray-1 dark:bg-gray-9"}>
                {this.$slots.default?.()}
              </ElScrollbar>
            </div>
          </>
        );
      },
    });

    if (configStore.layoutModel == 0) {
      return (
        <SideLayout>
          <RouterView></RouterView>
          <ElBacktop target=".ep-scrollbar__wrap"></ElBacktop>
          {configStore.showFooter ? <BaseFooter /> : null}
        </SideLayout>
      );
    }
    if (configStore.layoutModel == 1) {
      return (
        <HeaderLayout>
          <RouterView></RouterView>
          <ElBacktop target=".ep-scrollbar__wrap"></ElBacktop>
          {configStore.showFooter ? <BaseFooter /> : null}
        </HeaderLayout>
      );
    }
    if (configStore.layoutModel == 2) {
      return (
        <MixLayout>
          <RouterView></RouterView>
          
          <ElBacktop target=".ep-scrollbar__wrap"></ElBacktop>
          {configStore.showFooter ? <BaseFooter /> : null}
        </MixLayout>
      );
    }
    return null;
  },
});

const BaseLayout = defineComponent({
  setup() {
    console.log(import.meta.env.MODE);
    const route = useRoute()
    console.log(route.name);
    
    return () => (
      <ElConfigProvider namespace="ep">
        {import.meta.env.MODE != "production" && route.name != 'login' ? <DefaultConfig /> : null}
        <RouterView></RouterView>
      </ElConfigProvider>
    );
  },
});

export default BaseLayout;
