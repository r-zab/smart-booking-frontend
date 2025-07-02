<template>
  <div v-if="loading">Ładowanie szczegółów...</div>
  <div v-if="error" class="error-message">{{ error }}</div>
  <div v-if="resource" class="detail-container">
    <h1 class="text-4xl font-bold mb-4">{{ resource.name }}</h1>
    <p class="description text-lg text-gray-300">{{ resource.description }}</p>
    <p class="text-gray-200"><strong>Pojemność:</strong> {{ resource.capacity }} osób</p>

    <button @click="goBack" class="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
      &larr; Wróć do listy
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const resource = ref(null);
const loading = ref(true);
const error = ref(null);

const route = useRoute();
const router = useRouter(); // Tworzymy instancję routera
const resourceId = route.params.id;

// Funkcja do cofania na poprzednią stronę
const goBack = () => {
  router.back();
};

const fetchResourceDetail = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    error.value = "Brak autoryzacji.";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/resources/${resourceId}/`, {
      headers: { 'Authorization': `Token ${authToken}` }
    });
    resource.value = response.data;
  } catch (err) {
    error.value = "Nie udało się pobrać danych zasobu.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchResourceDetail();
});
</script>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
  background-color: #2c3542;
  border-radius: 8px;
  text-align: left;
}
.description {
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>