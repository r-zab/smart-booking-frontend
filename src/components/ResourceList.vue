<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Przeglądaj Zasoby</h1>

    <div v-if="loading">Ładowanie...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="resources.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div v-for="resource in resources" :key="resource.id" class="card">
        <div class="card-icon-wrapper">
          <svg class="h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="getIconForResource(resource.name)"/>
          </svg>
        </div>

        <h2 class="card-title">{{ resource.name }}</h2>
        <p class="card-description">
          {{ resource.description.substring(0, 70) }}{{ resource.description.length > 70 ? '...' : '' }}
        </p>

        <div class="card-footer">
          <span class="text-sm text-gray-400">Pojemność: {{ resource.capacity }}</span>
          <router-link :to="'/rezerwuj/' + resource.id" class="details-button">
            Zobacz szczegóły
          </router-link>
        </div>
      </div>

    </div>
    <div v-else-if="!loading">Brak zasobów do wyświetlenia.</div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

const resources = ref([]);
const loading = ref(true);
const error = ref(null);

const getIconForResource = (name) => {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.includes('sala') || lowerCaseName.includes('pokój')) {
    return 'M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
  }
  if (lowerCaseName.includes('samochód')) {
    return 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM19 17H5M17 17l-1.31-5.243A2 2 0 0013.82 10H10.18a2 2 0 00-1.87 1.757L7 17H5.16a1 1 0 00-1 .92L4.5 20.92a1 1 0 001 .92H18.5a1 1 0 001-.92l.34-2.08a1 1 0 00-1-.92H19z';
  }
  if (lowerCaseName.includes('projektor') || lowerCaseName.includes('aparat') || lowerCaseName.includes('dron') || lowerCaseName.includes('laptop')) {
    return 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2 2v10a2 2 0 002 2z';
  }
  return 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z';
};

const fetchResources = async () => {
  loading.value = true;
  error.value = null;
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    error.value = "Brak autoryzacji.";
    loading.value = false;
    return;
  }
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/resources/', {
      headers: {'Authorization': `Token ${authToken}`}
    });
    resources.value = response.data;
  } catch (err) {
    error.value = 'Nie udało się pobrać zasobów.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchResources();
});
</script>

<style scoped>
.card {

  @apply bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-md p-6 flex flex-col hover:shadow-indigo-500/20 hover:border-slate-600 transition-all duration-300;
}

.card-icon-wrapper {
  @apply w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4;
}

.card-title {
  @apply text-lg font-bold text-white mb-2;
}

.card-description {
  @apply text-gray-400 text-sm flex-grow mb-4;
}

.card-footer {
  @apply flex justify-between items-center mt-auto;
}

.details-button {
  @apply text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors;
}
</style>