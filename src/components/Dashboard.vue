<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Panel Główny</h1>
    <p class="text-lg text-gray-300 mb-8">Witaj z powrotem! Co chciałbyś dzisiaj zrobić?</p>

    <div class="grid md:grid-cols-2 gap-6">
      <router-link to="/zasoby" class="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200">
        <h2 class="text-2xl font-semibold text-indigo-400 mb-2">Przeglądaj Zasoby</h2>
        <p class="text-gray-400">Zobacz pełną listę dostępnych sal, sprzętu i pojazdów. Zarezerwuj to, czego potrzebujesz.</p>
      </router-link>

      <router-link to="/profil" class="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200">
        <h2 class="text-2xl font-semibold text-indigo-400 mb-2">Moje Rezerwacje</h2>
        <p class="text-gray-400">Przeglądaj swoje nadchodzące i historyczne rezerwacje. Zarządzaj swoimi terminami.</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// W przyszłości możemy tu pobierać dane, np. listę najbliższych rezerwacji
</script>