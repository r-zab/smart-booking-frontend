// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; // <--- ZMIANA
import Login from '../components/Login.vue';
import ResourceList from '../components/ResourceList.vue';
import ResourceDetail from '../components/ResourceDetail.vue';
import UserProfile from '../components/UserProfile.vue';
import Dashboard from '../components/Dashboard.vue'; // <--- NOWY IMPORT
import Register from '../components/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // <--- STRONA GŁÓWNA DLA WSZYSTKICH
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { // <--- NOWA TRASA
      path: '/rejestracja',
      name: 'Register',
      component: Register
    },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard', // <--- NOWA TRASA
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/zasoby', // <--- NOWA TRASA DLA LISTY
    name: 'ResourceList',
    component: ResourceList,
    meta: { requiresAuth: true }
  },
  {
    path: '/zasoby/:id',
    name: 'ResourceDetail',
    component: ResourceDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/profil',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// === DODAJ PONIŻSZY BLOK KODU ===
// 2. TWORZYMY "STRAŻNIKA NAWIGACJI"
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken');

  // Jeśli trasa wymaga logowania, a użytkownik NIE jest zalogowany
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login'); // Przekieruj na stronę logowania
  } else {
    next(); // W przeciwnym razie, pozwól na nawigację
  }
});
// ===============================

export default router;