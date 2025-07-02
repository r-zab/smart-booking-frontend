<template>
  <nav class="bg-gray-800 shadow-lg">
    <div class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">

        <div class="text-white font-bold text-xl">
          <router-link :to="isLoggedIn ? '/dashboard' : '/'">
            SmartBooking
          </router-link>
        </div>

        <div class="flex items-center">
          <div v-if="isLoggedIn" class="flex items-center space-x-4">
            <router-link to="/dashboard" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              Panel
            </router-link>
            <router-link to="/profil" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              Mój Profil
            </router-link>
            <button @click="handleLogout" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
              Wyloguj
            </button>
          </div>

          <div v-else class="flex items-center space-x-4">
            <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              Strona Główna
            </router-link>
            <router-link to="/login" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
              Zaloguj
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { isLoggedIn, handleLogout } from '../auth';
</script>

<style scoped>
/* Możemy zostawić puste, całe stylowanie jest w klasach Tailwind */
</style>