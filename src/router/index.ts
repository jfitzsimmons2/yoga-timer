import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@views/Home.vue'
import YogaApp from '@views/yoga-app.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/app', component: YogaApp },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router