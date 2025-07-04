import {createRouter, createWebHistory} from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import ResourceList from '../components/ResourceList.vue';
import UserProfile from '../components/UserProfile.vue';
import Chatbot from '../components/Chatbot.vue';
import About from '../components/About.vue';
import BookResource from '../components/BookResource.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/o-projekcie',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/rejestracja',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        path: '/zasoby',
        name: 'ResourceList',
        component: ResourceList,
        meta: {requiresAuth: true}
    },
    {
        path: '/profil',
        name: 'UserProfile',
        component: UserProfile,
        meta: {requiresAuth: true}
    },
    {
        path: '/chatbot',
        name: 'Chatbot',
        component: Chatbot,
        meta: {requiresAuth: true}
    },
    {

        path: '/rezerwuj/:id',
        name: 'BookResource',
        component: BookResource,
        meta: {requiresAuth: true}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('authToken');
    if (to.meta.requiresAuth && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;