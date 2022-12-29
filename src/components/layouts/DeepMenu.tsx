import {
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
} from "element-plus";
import { defineComponent, onMounted, Ref, ref, toRaw, watch } from "vue";

const DeepMenu = defineComponent({
  props: {
    config: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const configMenu = (child: any) => {
      const result: any = [];
      child.map((item: any) => {
        if (item.group) {
          result.push(
            <ElMenuItemGroup title={item.title}>
              {configMenu(item.children)}
            </ElMenuItemGroup>
          );
        } else if (item.children?.length) {
          result.push(
            <ElSubMenu
              index={item.index}
              disabled={item.disabled}
              v-slots={{
                title: () => (
                  <>
                    {item.icon ? <ElIcon>{item.icon.render()}</ElIcon> : null}
                    <span>{item.title}</span>
                  </>
                ),
              }}
            >
              {configMenu(item.children)}
            </ElSubMenu>
          );
        } else {
          result.push(
            <ElMenuItem index={item.index} disabled={item.disabled}>
              {item.icon ? <ElIcon>{item.icon.render()}</ElIcon> : null}
              <span>{item.title}</span>
            </ElMenuItem>
          );
        }
      });
      return result;
    };
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    return () => (
      <ElMenu
        class="border-none"
        style={{ backgroundColor: "transparent" }}
        onSelect={handleSelect}
      >
        {...configMenu(props.config)}
      </ElMenu>
    );
  },
});

export default DeepMenu;
