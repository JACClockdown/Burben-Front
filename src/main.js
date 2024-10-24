import './assets/style.css'
import './assets/examples.css'
import './assets/vendors/simplebar.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { createApp, markRaw } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'
import { plugin, defaultConfig } from '@formkit/vue'
import axios from 'axios' 
import App from './App.vue'
import router from './router'


window.axios = axios
window.axios.defaults.baseURL = 'http://127.0.0.1:8000/'


const pinia = createPinia()

pinia.use(({store}) =>{
    store.router = markRaw(router)
});
pinia.use(createPersistedState)

const app = createApp(App)

app.use(pinia)
app.use(createBootstrap())
app.use(router)
app.use(plugin, defaultConfig )

app.mount('#app')
