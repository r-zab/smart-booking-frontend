<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Panel Główny</h1>
    <p class="text-lg text-gray-300 mb-8">Witaj z powrotem! Co chciałbyś dzisiaj zrobić?</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      <router-link to="/zasoby" class="dashboard-card">
        <h2 class="text-xl font-semibold text-indigo-400 mb-2">Zarezerwuj Zasób</h2>
        <p class="text-gray-400">Przejdź do listy, aby znaleźć i zarezerwować to, czego potrzebujesz.</p>
      </router-link>

      <router-link to="/profil" class="dashboard-card">
        <h2 class="text-xl font-semibold text-indigo-400 mb-2">Moje Rezerwacje</h2>
        <p class="text-gray-400">Przeglądaj swoje nadchodzące i historyczne rezerwacje.</p>
      </router-link>

      <router-link to="/chatbot" class="dashboard-card">
        <h2 class="text-xl font-semibold text-indigo-400 mb-2">Asystent AI</h2>
        <p class="text-gray-400">Zapytaj bota o dostępność zasobów.</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard-card {
  @apply block p-6 rounded-lg transition-all duration-300;
  background-color: rgba(49, 46, 129, 0.2);
  border: 1px solid rgba(79, 70, 229, 0.4);
  backdrop-filter: blur(4px);
}

.dashboard-card:hover {
  border-color: rgba(129, 140, 248, 0.6);
  background-color: rgba(49, 46, 129, 0.4);
}

.primary-action-card {
  @apply md:row-span-2 flex flex-col justify-center text-white p-8 rounded-lg transition-all duration-300 transform hover:scale-105;
  background-color: #4f46e5;
}
</style>