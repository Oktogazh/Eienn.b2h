import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(router).use(store).use(VueSweetalert2).mount('#app')
