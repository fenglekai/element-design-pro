/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'element-china-area-data';

interface ImportMetaEnv {
  readonly BASE_URL: sting
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  _axiosPromiseArr: Array<any>;
}