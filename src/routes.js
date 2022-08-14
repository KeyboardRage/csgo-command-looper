import IndexView from "@/routes/IndexView";
import RebinderView from "@/routes/rebinder/RebinderView";

export default [
	{ path: '/', component: IndexView },
	{ path: '/rebind', component: RebinderView },
]