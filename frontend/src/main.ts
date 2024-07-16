import './assets/main.css'
// AWC-UI
import './components/awc-ui/global.css'
import './components/awc-ui/index.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
