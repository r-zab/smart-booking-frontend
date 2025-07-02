<template>
  <div class="profile-container">
    <h1 class="text-3xl font-bold mb-2">Mój Profil</h1>

    <div class="my-6">
      <label for="search" class="sr-only">Szukaj</label>
      <input
        id="search"
        type="text"
        v-model="searchTerm"
        placeholder="Szukaj po tytule lub nazwie zasobu..."
        class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
    </div>

    <h2 class="text-xl font-semibold mb-4 text-gray-300">Moje Rezerwacje</h2>

    <div v-if="loading">Ładowanie rezerwacji...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="filteredBookings.length > 0" class="space-y-4">
      <div v-for="booking in filteredBookings" :key="booking.id" class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 class="font-bold text-lg">{{ booking.title }}</h3>
        <p class="text-gray-400">Zasób: {{ booking.resource.name }}</p>
        <p class="text-gray-400">
          Od: <span class="font-medium text-gray-200">{{ new Date(booking.start_time).toLocaleString('pl-PL') }}</span>
        </p>
        <p class="text-gray-400">
          Do: <span class="font-medium text-gray-200">{{ new Date(booking.end_time).toLocaleString('pl-PL') }}</span>
        </p>
      </div>
    </div>

    <div v-else-if="!loading && !error">Nie znaleziono rezerwacji pasujących do kryteriów.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const bookings = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref('');

// Właściwość "obliczeniowa", która filtruje listę rezerwacji w czasie rzeczywistym
const filteredBookings = computed(() => {
  if (!searchTerm.value) {
    return bookings.value; // Jeśli pole jest puste, zwróć wszystkie rezerwacje
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  // Zwróć tylko te rezerwacje, których tytuł lub nazwa zasobu zawierają szukaną frazę
  return bookings.value.filter(booking =>
    booking.title.toLowerCase().includes(lowerCaseSearch) ||
    booking.resource.name.toLowerCase().includes(lowerCaseSearch)
  );
});

const fetchUserBookings = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    error.value = "Brak autoryzacji.";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/bookings/', {
      headers: { 'Authorization': `Token ${authToken}` }
    });
    bookings.value = response.data;
  } catch (err) {
    error.value = "Nie udało się pobrać rezerwacji.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserBookings();
});
</script>

<style scoped>
.profile-container {
  max-width: 900px;
}
</style>