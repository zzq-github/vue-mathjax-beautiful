import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import i18n from './i18n';

// 导入核心包样式
import 'vue-mathjax-beautiful/dist/style.css';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');
