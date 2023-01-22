import { Router } from "vue-router";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'games',
            component: Games
        }
    ]
});