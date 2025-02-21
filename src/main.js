import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import i18n from "./i18n";
import router from "./router/router";
import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";
import { VueTelegramPlugin } from "vue-tg";

axios.defaults.baseURL = "https://saler-bot.prostor-dev.ru/api";
// axios.defaults.baseURL = "http://213.108.200.197:5050/";
createApp(App)
  .use(router)
  .use(VueTelegramPlugin)
  .component("GDialog", GDialog)
  .use(i18n)
  .mount("#app");
