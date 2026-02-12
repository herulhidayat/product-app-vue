import { HomeIcon, MapIcon } from '@heroicons/vue/24/outline';

export const mainRouteConfig = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@pages/Home.vue'),
        icon: HomeIcon
    },
    {
        path: '/maps-monitoring',
        name: 'Maps Monitoring',
        component: () => import('@pages/MapsMonitoring.vue'),
        icon: MapIcon
    }
]