import { DefineComponent } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  WarnTriangleFilled
} from "@element-plus/icons-vue";

type Menu = {
  icon?: DefineComponent;
  title: string;
  index: string;
  disabled?: boolean;
  children?: SubMenu[] | MenuItemGroup[];
};

type SubMenu = {
  icon?: DefineComponent;
  title: string;
  index: string;
  disabled?: boolean;
  // children?: Menu[] | SubMenu[] | MenuItemGroup[];
  children?: any;
};

type MenuItemGroup = {
  title: string;
  group?: boolean;
  children?: Menu[];
};

type MenuConfig = Menu[] | SubMenu[];

const menus: MenuConfig = [
  {
    icon: IconMenu,
    title: "首页",
    index: "Home",
    children: [
      {
        title: "分析页",
        index: "/base",
      },
      {
        title: "个人页",
        index: "/owner",
      },
    ],
  },
  {
    icon: WarnTriangleFilled,
    title: "404",
    index: "/404",
  },
];

export { menus, Menu };
