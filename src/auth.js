import {ref} from 'vue';
import router from './router';

export const isLoggedIn = ref(!!localStorage.getItem('authToken'));

export function handleLoginSuccess(token) {
    localStorage.setItem('authToken', token);
    isLoggedIn.value = true;
    router.push('/dashboard');
}

export function handleLogout() {
    localStorage.removeItem('authToken');
    isLoggedIn.value = false;
    router.push('/login');
}