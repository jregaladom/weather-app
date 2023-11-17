import { createWebHistory, createRouter } from "vue-router";
import HomePage from '@/components/Pages/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;