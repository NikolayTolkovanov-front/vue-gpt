import './assets/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTippy)

app.mount('#app')
