/**
 * el-menu菜单在横向模式下,不会出现省略号（严重） #9281
 */
import {
  computed,
  DefineComponent,
  defineComponent,
  h,
  mergeProps,
  PropType,
  reactive,
  ref,
  Ref,
  resolveDynamicComponent,
  watchEffect,
} from "vue";
import { useRoute, RouteRecordRaw, useRouter } from "vue-router";
import {
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  menuProps as elMenuProps,
  useProp,
} from "element-plus";
import { omit as objectOmit } from "lodash-unified";
import { createSharedComposable } from '@vueuse/core'

const props = objectOmit(elMenuProps, ["defaultActive", "router"]);

export const menuProps = {
  ...props,
  routes: Array as PropType<RouteRecordRaw[]>,
  router: {
    type: Boolean,
    default: true,
  },
};

/** Gets the routes from `vue-router` */
export const useSharedRoutes = createSharedComposable(() => {
  const router = useRouter();
  const routes = ref([]) as Ref<RouteRecordRaw[]>;

  router.options.routes = reactive(router.options.routes);

  watchEffect(() => {
    routes.value = router.options.routes as RouteRecordRaw[];
  });

  return routes;
});

/** routes with no value will get `vue-router` routes */
export function useCurrentRoutes(): Ref<RouteRecordRaw[]> {
  const routes = useProp<RouteRecordRaw[]>("routes");

  return computed(() => {
    return routes.value ? routes.value : useSharedRoutes().value;
  });
}

export default defineComponent({
  name: "ProMenu",
  props: menuProps,
  setup(props, { slots }) {
    const route = useRoute();
    const routes = useCurrentRoutes();

    function createDefault(item: RouteRecordRaw) {
      if (slots.default) {
        return slots.default(item);
      } else {
        return [
          item.meta?.icon &&
            h(resolveDynamicComponent(item.meta.icon) as DefineComponent, {
              class: "el-icon",
            }),
          item.meta?.title && h("span", item.meta.title),
        ];
      }
    }

    function hasMultiChild(item: RouteRecordRaw) {
      if (!item.children) return false;

      let count = 0;
      let index = 0;

      while (count < 2 && index < item.children.length) {
        if (!item.children[index].meta?.hidden) {
          count++;
        }
        index++;
      }

      return count >= 2;
    }

    function createList(list?: RouteRecordRaw[]) {
      if (!list) return undefined;
      return list.map((item) => {
        const showItem = item && !item.meta?.hidden;

        if (showItem && !hasMultiChild(item)) {
          return h(
            ElMenuItem,
            { index: item.children?.[0].path || item.path },
            () => createDefault(item)
          );
        } else if (showItem) {
          return h(
            item.meta?.group ? ElMenuItemGroup : ElSubMenu,
            { index: item.path },
            {
              title: () =>
                createDefault({ meta: item?.meta } as RouteRecordRaw),
              default: () => createList(item?.children),
            }
          );
        } else {
          return undefined;
        }
      });
    }

    return () =>
      h(
        ElMenu,
        mergeProps(props, {
          defaultActive: route?.path,
          class: "pro-menu",
        }),
        () => createList(routes.value)
      );
  },
});
