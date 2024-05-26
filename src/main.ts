import { createApp } from 'vue';
import '@/style.scss';
import { vfmPlugin } from 'vue-final-modal';
import { createPinia } from 'pinia';
const pinia = createPinia();
import App from '@/App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
app.use(vfmPlugin);
app.use(pinia);
app.mount('#app');
