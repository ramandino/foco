import {createRouter, createWebHistory} from 'vue-router'
import Home from "../components/Home.vue"
import Pomofoco from "../components/Pomofoco.vue"

const routes = [
    // {
    //     path : "/",
    //     name : "/Home",
    //     component : Home
    // }
    {
        path : "/Home",
        name : "/Home",
        component : Home
    },
    {
        path : "/pomo-foco",
        name : "/Pomofoco",
        component : Pomofoco
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router