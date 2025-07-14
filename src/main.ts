import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'

const APP = createApp(App)

APP.use(createPinia())
APP.use(router)

APP.mount('#app')
