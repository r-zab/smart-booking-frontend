import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // <--- 1. IMPORTUJEMY ROUTER

const app = createApp(App)

app.use(router) // <--- 2. MÓWIMY APLIKACJI, ABY GO UŻYWAŁA
app.mount('#app')