import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router) // Router 등록
  .mount('#app')
