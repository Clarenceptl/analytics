import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import tracker from './plugins/tracker';
import router from './router';

const app = createApp(App);
await tracker(
  app,
  {
    APP_ID: '123456789'
  },
  router
);
app.use(router);
app.mount('#app');
