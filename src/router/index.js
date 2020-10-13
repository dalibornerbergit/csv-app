import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing'
import Contacts from '../views/Contacts'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Landing
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router