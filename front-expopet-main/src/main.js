import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as MdIcons from "oh-vue-icons/icons/md";
import { useAuth } from "./stores/auth.js";
import Cookies from 'js-cookie';

const Md = Object.values({ ...MdIcons });
addIcons(...Md);

const app = createApp(App)
app.component('v-icon', OhVueIcon);
app.use(createPinia())
app.use(router)

const token = Cookies.get('token');
if (token) {
	(async () => {
		const auth = useAuth();
		try {
			auth.setIsAuth(true);
			await auth.checkToken();
		} catch (error) {
			auth.clear()
		}
	})()
}

app.mount('#app')
