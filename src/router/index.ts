import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { useAuth } from "../services/auth.services"
import { mainRouteConfig } from "../configs/menu.config"

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
        component: () => import('@components/layouts/MainLayout.vue'),
        path: '/',
        meta: {
            requiresAuth: true
        },
        children: mainRouteConfig.map(route => ({
            path: route.path,
            name: route.name,
            component: route.component
        }))
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