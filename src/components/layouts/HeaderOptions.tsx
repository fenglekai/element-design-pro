import {
  ElBadge,
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElPopover,
  ElTabPane,
  ElTabs,
  ElTooltip,
} from "element-plus";
import { defineComponent, ref } from "vue";
import styles from "./index.module.scss";
import { Bell, SwitchButton } from "@element-plus/icons-vue";
import { useUserStore } from "~/store";

export default defineComponent({
  render() {
    const userStore = useUserStore();

    const LanguageConfig = (
      <ElDropdown
        v-slots={{
          dropdown: () => (
            <ElDropdownMenu>
              <ElDropdownItem>繁体中文</ElDropdownItem>
              <ElDropdownItem>English</ElDropdownItem>
            </ElDropdownMenu>
          ),
        }}
      >
        <div class={styles.headerItemHover}>
          <i>
            <svg
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
            >
              <path
                fill="currentColor"
                d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"
              ></path>
            </svg>
          </i>
        </div>
      </ElDropdown>
    );

    const messageTab = ref("notice");

    const MessageList = defineComponent({
      render: () => {
        return (
          <ul class={styles.messageList}>
            <li>这是一条消息11111111111111111111111111111111</li>
          </ul>
        );
      },
    });

    const MessageConfig = (
      <div class={styles.headerItem}>
        <ElPopover
          width={350}
          offset={30}
          trigger="click"
          transition="ep-fade-in-linear"
          v-slots={{
            reference: () => (
              <ElBadge value={200} max={99} style={{ zIndex: 99 }}>
                <ElIcon>
                  <Bell />
                </ElIcon>
              </ElBadge>
            ),
          }}
        >
          <ElTabs model-value={messageTab.value}>
            <ElTabPane
              name="notice"
              v-slots={{
                label: () => (
                  <div style={{ width: "322px" }} class={"text-center"}>
                    消息
                  </div>
                ),
              }}
            >
              <MessageList />
            </ElTabPane>
          </ElTabs>
          <div
            style={{ borderTop: "1px solid var(--ep-border-color)" }}
            class={"flex justify-center mt-6 pt-3"}
          >
            <ElButton text>清空消息</ElButton>
            <ElButton text>查看更多</ElButton>
          </div>
        </ElPopover>
      </div>
    );

    const logout = () => {
      userStore.logout();
      this.$root?.$router.push("/login");
    };

    const UserInfo = (
      <div class={styles.headerItemHover}>
        <ElTooltip
          content="退出登录"
          transition="ep-fade-in-linear"
          offset={30}
        >
          <ElIcon onClick={logout}>
            <SwitchButton />
          </ElIcon>
        </ElTooltip>
      </div>
    );

    return (
      <div class={"flex"}>
        {UserInfo}
        {MessageConfig}
        {LanguageConfig}
      </div>
    );
  },
});
