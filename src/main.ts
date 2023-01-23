import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import {
  plugin,
  defaultConfig,
} from '@formkit/vue';
import '@formkit/themes/genesis';
import 'bootstrap/scss/bootstrap.scss';
import '@/styles/custom.scss';

createApp(App)
  .use(plugin, defaultConfig)
  .use(createPinia())
  .use(router)
  .mount('#app');
