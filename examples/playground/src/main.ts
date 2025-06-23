import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// 导入构建后的组件库样式
import '../../../packages/core/dist/style.css'

const app = createApp(App)
app.mount('#app') 