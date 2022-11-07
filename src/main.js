import { createApp } from 'vue';
import './style.css';
import { store } from './store';
import { vfmPlugin } from 'vue-final-modal';
import App from './App.vue';

const app = createApp(App);
app.use(vfmPlugin);
app.use(store);
app.mount('#app');
