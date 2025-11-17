import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TeddyUI from './index'
import './styles/global.css'

createApp(App)
    .use(router)
    .use(TeddyUI)
    .mount('#app')