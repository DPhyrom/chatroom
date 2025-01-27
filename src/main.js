import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/page/Home.vue'
import Chat from '@/page/Chat.vue'
import Users from '@/page/Users.vue'
import OAuthGoogle from '@/page/OAuthGoogle.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path: '/', component: Home},
        {path: '/chat', component: Chat},
        {path: '/google-callback', component:OAuthGoogle},
        {path: '/getAllUsers', component:Users},
    ]
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
