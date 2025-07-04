<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white">
          Stwórz nowe konto
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input v-model="username" type="text" required class="input-field rounded-t-md"
                   placeholder="Nazwa użytkownika">
          </div>
          <div>
            <input v-model="email" type="email" required class="input-field" placeholder="Adres e-mail">
          </div>
          <div>
            <input v-model="password" type="password" required class="input-field" placeholder="Hasło">
          </div>
          <div>
            <input v-model="passwordConfirm" type="password" required class="input-field rounded-b-md"
                   placeholder="Potwierdź hasło">
          </div>
        </div>
        <div>
          <button type="submit" class="submit-button">
            Zarejestruj się
          </button>
        </div>
      </form>
      <p v-if="error" class="mt-2 text-center text-sm text-red-500">
        {{ error }}
      </p>
      <p class="mt-4 text-center text-sm text-gray-400">
        Masz już konto?
        <router-link to="/login" class="font-medium text-indigo-400 hover:text-indigo-300">
          Zaloguj się
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const error = ref(null);
const router = useRouter();

const register = async () => {
  error.value = null;
  if (password.value !== passwordConfirm.value) {
    error.value = 'Hasła nie są identyczne.';
    return;
  }
  try {
    await axios.post('http://127.0.0.1:8000/api/register/', {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    router.push('/login');
  } catch (err) {

    error.value = 'Rejestracja nie powiodła się. Sprawdź wprowadzone dane.';
    console.error(err.response.data);
  }
};
</script>

<style scoped>

.input-field {
  @apply appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm;
}

.submit-button {
  @apply relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-colors;
}
</style>