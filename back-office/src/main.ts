import { createPinia } from 'pinia';
import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';

import '@/assets/main.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(ToastPlugin);
app.use(createPinia());
app.use(router);

app.mount('#app');
