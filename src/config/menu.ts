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
  // {
  //   icon: Location,
  //   title: "Navigator One",
  //   index: "1",
  //   children: [
  //     {
  //       title: "Group One",
  //       group: true,
  //       children: [
  //         {
  //           title: "item one",
  //           index: "1-1",
  //         },
  //         {
  //           title: "item two",
  //           index: "1-2",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Group Two",
  //       group: true,
  //       children: [
  //         {
  //           title: "item three",
  //           index: "1-3",
  //         },
  //       ],
  //     },
  //     {
  //       title: "item four",
  //       index: "1-4",
  //       children: [
  //         {
  //           title: "item four 1",
  //           index: "1-4-1",
  //           children: [
  //             {
  //               title: "item four 2",
  //               index: "1-4-2",
  //               children: [
  //                 {
  //                   title: "item four 3",
  //                   index: "1-4-3",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   icon: IconMenu,
  //   title: "Navigator Two",
  //   index: "2",
  // },
  // {
  //   icon: Document,
  //   title: "Navigator Three",
  //   index: "3",
  //   disabled: true,
  // },
  // {
  //   icon: Setting,
  //   title: "Navigator Four",
  //   index: "4",
  // },
];

export { menus, Menu };
