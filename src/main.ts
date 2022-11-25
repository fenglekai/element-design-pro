import { createApp } from "vue";
import App from "./App.vue";
import "~/styles/index.scss";
import 'uno.css'
import "element-plus/theme-chalk/src/message.scss"
import router from '~/router'
import pinia, { useConfigStore } from "~/store";
import config from '~/config'

const app = createApp(App);
app.use(router)
app.use(pinia)
const configStore = useConfigStore();
configStore.initConfig(config.theme)
app.mount("#app");

