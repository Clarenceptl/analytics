import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import tracker from './plugins/tracker';

const app = createApp(App)
await tracker(app, {
  APP_ID: '123456789'
});
app.use(router)

app.mount('#app')
