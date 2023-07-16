import './assets/main.css';

import tracker from '@sdk/vue-tracker';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
await tracker(
  app,
  {
    APP_ID: 'API_ID_123'
  },
  router
);
app.use(router);
app.mount('#app');
