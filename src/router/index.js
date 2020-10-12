import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Landing
    },
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router