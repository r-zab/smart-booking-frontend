<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">

      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white">
          Logowanie do systemu
        </h2>
        <p class="mt-2 text-sm text-gray-400">
          Witaj z powrotem! Podaj swoje dane.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="login">

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Nazwa użytkownika</label>
            <input id="username" v-model="username" name="username" type="text" required
                   class="input-field rounded-t-md"
                   placeholder="Nazwa użytkownika">
          </div>
          <div>
            <label for="password" class="sr-only">Hasło</label>
            <input id="password" v-model="password" name="password" type="password" required
                   class="input-field rounded-b-md"
                   placeholder="Hasło">
          </div>
        </div>

        <div>
          <button type="submit" class="submit-button">
            Zaloguj się
          </button>
        </div>

      </form>

      <p v-if="error" class="mt-2 text-center text-sm text-red-500">
        {{ error }}
      </p>
      <p class="mt-4 text-center text-sm text-gray-400">
        Nie masz konta?
        <router-link to="/rejestracja" class="font-medium text-indigo-400 hover:text-indigo-300">
          Zarejestruj się
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {handleLoginSuccess} from '../auth';

const username = ref('');
const password = ref('');
const error = ref(null);

const login = async () => {
  error.value = null;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username.value,
      password: password.value,
    });
    handleLoginSuccess(response.data.token);
  } catch (err) {
    error.value = 'Nie udało się zalogować. Sprawdź dane.';
    console.error(err);
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