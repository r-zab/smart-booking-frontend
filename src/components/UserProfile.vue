<template>
  <div class="profile-container">
    <h1 class="text-3xl font-bold mb-2">Mój Profil</h1>

    <div class="my-6">
      <input
          type="text"
          v-model="searchTerm"
          placeholder="Szukaj rezerwacji po tytule lub nazwie zasobu..."
          class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
    </div>

    <div v-if="loading">Ładowanie rezerwacji...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="!loading && !error" class="grid md:grid-cols-2 gap-12">

      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-300 border-b-2 border-indigo-500 pb-2">Nadchodzące</h2>
        <div v-if="filteredUpcomingBookings.length > 0" class="space-y-4 mt-4">
          <div v-for="booking in filteredUpcomingBookings" :key="booking.id" class="booking-card bg-gray-800">
            <div class="flex-grow">
              <h3 class="font-bold text-lg">{{ booking.title }}</h3>
              <p class="text-gray-400 text-sm">Zasób: {{ booking.resource.name }}</p>
              <p class="text-gray-400 text-sm">
                Od: <span class="font-medium text-gray-200">{{
                  new Date(booking.start_time).toLocaleString('pl-PL')
                }}</span>
              </p>
              <p class="text-gray-400 text-sm">
                Do: <span class="font-medium text-gray-200">{{
                  new Date(booking.end_time).toLocaleString('pl-PL')
                }}</span>
              </p>
            </div>
            <div class="flex flex-col items-center space-y-2 ml-4">
              <button @click="openEditModal(booking)"
                      class="text-xs text-yellow-500 hover:text-yellow-400 font-semibold">Edytuj
              </button>
              <button @click="deleteBooking(booking.id)" class="text-xs text-red-500 hover:text-red-400 font-semibold">
                Usuń
              </button>
            </div>
          </div>
        </div>
        <div v-else class="mt-4 text-gray-500">
          <span v-if="searchTerm">Brak rezerwacji pasujących do wyszukiwania.</span>
          <span v-else>Brak nadchodzących rezerwacji.</span>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-4 text-gray-300 border-b-2 border-gray-700 pb-2">Historia</h2>
        <div v-if="displayPastBookings.length > 0" class="space-y-4 mt-4">
          <div v-for="booking in displayPastBookings" :key="booking.id"
               class="booking-card bg-gray-900/50 border-gray-800 opacity-70">
            <div>
              <h3 class="font-bold text-md text-gray-300">{{ booking.title }}</h3>
              <p class="text-sm text-gray-500">Zasób: {{ booking.resource.name }}</p>
              <p class="text-sm text-gray-500">
                Zakończono: <span class="font-medium">{{
                  new Date(booking.end_time).toLocaleDateString('pl-PL')
                }}</span>
              </p>
            </div>
          </div>
          <button v-if="filteredPastBookings.length > 5 && !showAllPastBookings" @click="showAllPastBookings = true"
                  class="w-full mt-4 text-indigo-400 hover:text-indigo-300 font-semibold">
            Pokaż wszystkie ({{ filteredPastBookings.length }})
          </button>
        </div>
        <div v-else class="mt-4 text-gray-500">
          <span v-if="searchTerm">Brak rezerwacji pasujących do wyszukiwania.</span>
          <span v-else>Brak historycznych rezerwacji.</span>
        </div>
      </div>

    </div>

    <div v-if="isEditModalVisible" class="modal-backdrop" @click.self="isEditModalVisible = false">
      <div class="modal-content">
        <h2 class="text-2xl font-bold mb-4">Edytuj Rezerwację</h2>
        <form v-if="editingBooking" @submit.prevent="updateBooking" class="space-y-4">
          <div>
            <label for="edit_title" class="block text-sm font-medium text-gray-300">Tytuł</label>
            <input v-model="editingBooking.title" id="edit_title" type="text" required class="input-field">
          </div>
          <div>
            <label for="edit_start_time" class="block text-sm font-medium text-gray-300">Czas rozpoczęcia</label>
            <input v-model="editingBooking.start_time" id="edit_start_time" type="datetime-local" required
                   class="input-field">
          </div>
          <div>
            <label for="edit_end_time" class="block text-sm font-medium text-gray-300">Czas zakończenia</label>
            <input v-model="editingBooking.end_time" id="edit_end_time" type="datetime-local" required
                   class="input-field">
          </div>
          <p v-if="editError" class="text-red-500 text-sm">{{ editError }}</p>
          <div>
            <button type="submit"
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">Zapisz
              zmiany
            </button>
            <button @click="isEditModalVisible = false" type="button"
                    class="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';


const loading = ref(true);
const error = ref(null);
const upcomingBookings = ref([]);
const pastBookings = ref([]);
const searchTerm = ref('');
const showAllPastBookings = ref(false);

const isEditModalVisible = ref(false);
const editingBooking = ref(null);
const editError = ref(null);


const filterBookings = (bookings) => {
  if (!searchTerm.value) {
    return bookings;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return bookings.filter(b => b.title.toLowerCase().includes(lowerCaseSearch) || b.resource.name.toLowerCase().includes(lowerCaseSearch));
};

const filteredUpcomingBookings = computed(() => filterBookings(upcomingBookings.value));
const filteredPastBookings = computed(() => filterBookings(pastBookings.value));

const displayPastBookings = computed(() => {
  if (showAllPastBookings.value) {
    return filteredPastBookings.value;
  }
  return filteredPastBookings.value.slice(0, 5);
});


const fetchUserBookings = async () => {
  loading.value = true;
  error.value = null;
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    error.value = "Brak autoryzacji.";
    loading.value = false;
    return;
  }
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/bookings/', {headers: {'Authorization': `Token ${authToken}`}});
    const now = new Date();
    const allBookings = response.data;
    upcomingBookings.value = allBookings.filter(b => new Date(b.end_time) >= now);
    pastBookings.value = allBookings.filter(b => new Date(b.end_time) < now);
  } catch (err) {
    error.value = "Nie udało się pobrać rezerwacji.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteBooking = async (bookingId) => {
  if (!window.confirm('Czy na pewno chcesz usunąć tę rezerwację?')) return;
  try {
    const authToken = localStorage.getItem('authToken');
    await axios.delete(`http://127.0.0.1:8000/api/bookings/${bookingId}/`, {headers: {'Authorization': `Token ${authToken}`}});
    upcomingBookings.value = upcomingBookings.value.filter(b => b.id !== bookingId);
  } catch (err) {
    alert('Nie udało się usunąć rezerwacji.');
  }
};

const formatDateTimeForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
};

const openEditModal = (booking) => {
  editError.value = null;
  editingBooking.value = {
    ...booking,
    start_time: formatDateTimeForInput(booking.start_time),
    end_time: formatDateTimeForInput(booking.end_time)
  };
  isEditModalVisible.value = true;
};

const updateBooking = async () => {
  if (!editingBooking.value) return;
  editError.value = null;
  try {
    const authToken = localStorage.getItem('authToken');
    const payload = {
      title: editingBooking.value.title,
      start_time: new Date(editingBooking.value.start_time).toISOString(),
      end_time: new Date(editingBooking.value.end_time).toISOString(),
    };
    const response = await axios.patch(`http://127.0.0.1:8000/api/bookings/${editingBooking.value.id}/`, payload, {
      headers: {'Authorization': `Token ${authToken}`}
    });
    const index = upcomingBookings.value.findIndex(b => b.id === editingBooking.value.id);
    if (index !== -1) {
      upcomingBookings.value[index] = response.data;
    }
    isEditModalVisible.value = false;
  } catch (err) {
    if (err.response && err.response.data) {
      editError.value = Object.values(err.response.data).flat().join(' ');
    } else {
      editError.value = 'Nie udało się zaktualizować rezerwacji.';
    }
    console.error(err);
  }
};

onMounted(() => {
  fetchUserBookings();
});
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: auto;
}

.booking-card {
  @apply p-4 rounded-lg border flex justify-between items-start;
}

.modal-backdrop {
  @apply fixed inset-0 bg-black/70 flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg;
}

.input-field {
  @apply w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500;
}
</style>