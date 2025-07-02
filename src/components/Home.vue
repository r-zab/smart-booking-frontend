<template>
  <div class="text-center">
     <section class="py-20">
      <h1 class="text-5xl font-extrabold text-white md:text-6xl">
        Witaj w <span class="text-indigo-400">SmartBooking</span>
      </h1>
      <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Inteligentne zarządzanie zasobami Twojej firmy. Rezerwuj sale, sprzęt i pojazdy w prosty sposób, wspomagany przez sztuczną inteligencję.
      </p>
      <div v-if="!isLoggedIn" class="mt-8">
        <router-link to="/login" class="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Rozpocznij teraz
        </router-link>
      </div>
    </section>

    <section class="py-16 bg-gray-800 rounded-xl">
      <h2 class="text-3xl font-bold text-white mb-10">Kluczowe Funkcjonalności</h2>
      <div class="grid md:grid-cols-3 gap-8 px-4">
        <div class="bg-gray-900 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-2">Proste Rezerwacje</h3>
          <p class="text-gray-400">Intuicyjny interfejs pozwala na szybkie znalezienie i zarezerwowanie dowolnego zasobu w Twojej firmie.</p>
        </div>
        <div class="bg-gray-900 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-2">Asystent AI</h3>
          <p class="text-gray-400">Zapytaj naszego chatbota o dostępność zasobów w języku naturalnym, a on znajdzie dla Ciebie wolny termin.</p>
        </div>
        <div class="bg-gray-900 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-2">Analityka i Predykcje</h3>
          <p class="text-gray-400">Nasz system analizuje historyczne dane, aby przewidzieć przyszłe zapotrzebowanie na zasoby.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { isLoggedIn } from '../auth';
</script>