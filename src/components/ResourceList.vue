<template>
  <div class="resource-container">

    <h2>Lista dostępnych zasobów</h2>
    <div v-if="loading">Ładowanie...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <ul v-if="resources.length > 0">
      <router-link
        v-for="resource in resources"
        :key="resource.id"
        :to="'/resources/' + resource.id"
        custom
        v-slot="{ navigate }"
      >
        <li @click="navigate" role="link">
          {{ resource.name }} (Pojemność: {{ resource.capacity }})
        </li>
      </router-link>
    </ul>
    <div v-else-if="!loading && !error">Brak zasobów do wyświetlenia.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const resources = ref([]);
const loading = ref(true);
const error = ref(null);

// Funkcja do pobierania zasobów z API
const fetchResources = async () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken || authToken === 'undefined') {
    error.value = 'Brak autoryzacji. Proszę się najpierw zalogować.';
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/resources/', {
      headers: {
        // Dołączamy token do nagłówka zapytania w poprawnym formacie
        'Authorization': `Token ${authToken}`
      }
    });
    resources.value = response.data;
  } catch (err) {
    console.error('Błąd podczas pobierania zasobów:', err);
    error.value = 'Nie udało się pobrać zasobów. Sprawdź, czy serwer backendowy działa poprawnie.';
  } finally {
    loading.value = false;
  }
};

// `onMounted` uruchomi funkcję `fetchResources`, gdy komponent zostanie wyświetlony.
onMounted(() => {
  fetchResources();
});
</script>

<style scoped>
.resource-container {
  max-width: 600px;
  margin: 20px auto;
  text-align: left;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #3e4d5a;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.error-message {
  color: #ff6b6b;
}
.logout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.logout-button:hover {
    background-color: #d32f2f;
}
</style>