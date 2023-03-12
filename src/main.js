import { createApp } from 'vue'
import { auth } from '@/firebase/config'
import App from './App.vue'
import router from './router'
import store from './store'
import UI from '@/components/UI'


let app;
auth.onAuthStateChanged(()=>{
    if(!app) {
        app = createApp(App)
        for(let n in UI) {
            app.component(n, UI[n])
        }
        app.use(store).use(router).mount('#app')
    }
})