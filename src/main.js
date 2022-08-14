import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from "vue-router";
import routes from "./routes";
import App from './App.vue'

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

createApp(App)
	.use(router)
	.mount('#app')
