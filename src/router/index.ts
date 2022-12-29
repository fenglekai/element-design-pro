import { createRouter, createWebHistory } from "vue-router";
import HelloWorldVue from "~/components/HelloWorld.vue";
import BaseVue from "~/view/dashboard/Base.vue";
import PageNotFound from "~/view/exception/PageNotFound.vue";
import LoginIndexVue from "~/view/login/Index.vue";
import OwnerIndexVue from "~/view/owner/Index.vue";
import { useUserStore } from "~/store";
import { ElMessage } from "element-plus";

const routes = [
  {
    name: "layout",
    path: "/",
    children: [
      { name: "index", path: "", component: HelloWorldVue },
      { name: "base", path: "base", component: BaseVue },
      { name: "owner", path: "owner", component: OwnerIndexVue },
      { name: "404", path: "404", component: PageNotFound },
    ],
  },
  { name: "login", path: "/login", component: LoginIndexVue },
];

/**
 * 使用HTML5模式 createWebHistory()
 * 需要在服务器上配置
 * location / {
 *  try_files $uri $uri/ /index.html;
 * }
 */
const router = createRouter({ history: createWebHistory(), routes: routes });

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.getUser) {
    if (!router.hasRoute(to.name || "")) {
      router.push("/404");
    }
    next();
  } else {
    if (to.name != "login") {
      ElMessage.warning("请先登录账户!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    next();
  }
});

export default router;
