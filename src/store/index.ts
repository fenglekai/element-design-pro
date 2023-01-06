import { createPinia, defineStore } from "pinia";
import { Menu, menus } from "~/config/menu";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { toggleDark } from "~/composables";
import { setEpColor } from "~/utils/common";

const pinia = createPinia();

interface State {
  primaryColor: string;
  layoutModel: number;
  fixedHeader: boolean;
  fixedSide: boolean;
  sideMenu: Menu[];
  headerMenu: Menu[];
  isMixMenu: boolean;
  mixHeaderIndex: string;
  headerBackground: boolean;
  showHeader: boolean;
  showSide: boolean;
  showFooter: boolean;
}

export const useConfigStore = defineStore("config", {
  state(): State {
    return {
      primaryColor: "#41b883",
      layoutModel: 0,
      fixedHeader: false,
      fixedSide: true,
      sideMenu: menus,
      headerMenu: [],
      isMixMenu: false,
      mixHeaderIndex: "",
      headerBackground: false,
      showHeader: true,
      showSide: true,
      showFooter: true,
    };
  },
  getters: {
    initConfig(state: any) {
      return (config: any) => {
        for (const key in config) {
          if (Object.prototype.hasOwnProperty.call(state, key)) {
            state[key] = config[key];
          }
        }
        toggleDark(config.isDark);
        setEpColor(config.primaryColor, config.isDark);
      };
    },
  },
  actions: {
    toggleLayout(num: number) {
      this.layoutModel = num;
    },
    useSideMenu() {
      this.sideMenu = menus;
      this.headerMenu = [];
    },
    useHeaderMenu() {
      this.sideMenu = [];
      this.headerMenu = menus;
    },
    useMixMenu() {
      this.mixHeaderIndex = "Home";
      this.toggleMixSideMenu();
      this.headerMenu = menus.map((item) => {
        return { ...item, children: [] };
      });
    },
    toggleMixSideMenu() {
      menus.forEach((item) => {
        if (item.index == this.mixHeaderIndex) {
          this.sideMenu = item.children;
        }
      });
    },
  },
});

export const useUserStore = defineStore("user", {
  state() {
    return {
      username: "",
      role: "",
      screenWidth: "",
      screenHeight: "",
    };
  },
  getters: {
    getUser(state) {
      if (sessionStorage.getItem("username")) {
        state.username = sessionStorage.getItem("username") || "";
      }
      if (localStorage.getItem("username")) {
        state.username = localStorage.getItem("username") || "";
      }
      if (state.username) {
        return state;
      } else {
        return false;
      }
    },
  },
  actions: {
    sessionLogin(val: any) {
      this.username = val.username;
      this.role = val.username;
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("role", this.role);
    },
    localLogin(val: any) {
      this.username = val.username;
      this.role = val.username;
      localStorage.setItem("username", this.username);
      localStorage.setItem("role", this.role);
    },
    logout() {
      this.username = "";
      this.role = "";
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    },
  },
});

export const useWindowStore = defineStore("window", {
  state() {
    return {
      screenWidth: 0,
      screenHeight: 0,
    };
  },
  getters: {
    getSize(state) {
      return state;
    },
  },
  actions: {
    setSize(val: { screenWidth: number; screenHeight: number }) {
      this.screenWidth = val.screenWidth;
      this.screenHeight = val.screenHeight;
    },
  },
});

export default pinia;
