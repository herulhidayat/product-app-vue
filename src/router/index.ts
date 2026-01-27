import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { useAuth } from "../services/auth.services"

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@pages/Login.vue'),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@pages/Home.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const { isAuthenticated } = useAuth()

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next({ name: 'Login' })
        return
    }

    if (to.meta.requiresGuest && isAuthenticated.value) {
        next({ name: 'Home' })
        return
    }

    next()
})

export default router