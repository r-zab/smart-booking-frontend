// src/auth.js
import { ref } from 'vue';
import router from './router'; // Importujemy router

// Tworzymy reaktywną zmienną, która na start sprawdza, czy w pamięci jest token
export const isLoggedIn = ref(!!localStorage.getItem('authToken'));

// Centralna funkcja logowania
// src/auth.js
export function handleLoginSuccess(token) {
  localStorage.setItem('authToken', token);
  isLoggedIn.value = true;
  router.push('/dashboard'); // <--- ZMIANA Z '/' NA '/dashboard'
}

// Centralna funkcja wylogowania
export function handleLogout() {
  localStorage.removeItem('authToken'); // Usuń token
  isLoggedIn.value = false; // Zmień stan na "wylogowany"
  router.push('/login'); // Przekieruj do logowania
}