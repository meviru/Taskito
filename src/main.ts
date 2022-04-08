import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from "@ionic/vue";

/* Global styles */
import "./style.scss";

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});