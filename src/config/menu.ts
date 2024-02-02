import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  WarnTriangleFilled
} from "@element-plus/icons-vue";
import type {DefineComponent, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes} from 'vue'

type icon = DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}, {}>;

type Menu = {
  icon?: icon;
  title: string;
  index: string;
  disabled?: boolean;
  children?: SubMenu[] | MenuItemGroup[];
};

type SubMenu = {
  icon?: icon;
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
