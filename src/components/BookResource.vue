<template>
  <div v-if="loading">Ładowanie formularza...</div>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <div v-if="resource" class="space-y-8">

    <div>
      <h1 class="text-3xl font-bold">Rezerwacja Zasobu</h1>
      <p class="text-xl text-indigo-400 font-semibold">{{ resource.name }}</p>
    </div>

    <div class="detail-container">
      <h2 class="text-2xl font-bold mb-4">Wypełnij dane</h2>
      <form @submit.prevent="createBooking" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-300">Tytuł rezerwacji</label>
          <input v-model="newBookingTitle" id="title" type="text" required class="input-field">
        </div>
        <div>
          <label for="start_time" class="block text-sm font-medium text-gray-300">Czas rozpoczęcia</label>
          <input v-model="newBookingStart" id="start_time" type="datetime-local" required class="input-field">
        </div>
        <div>
          <label for="end_time" class="block text-sm font-medium text-gray-300">Czas zakończenia</label>
          <input v-model="newBookingEnd" id="end_time" type="datetime-local" required class="input-field">
        </div>
        <button type="submit"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          Zatwierdź Rezerwację
        </button>
      </form>
      <p v-if="bookingError" class="mt-4 text-red-500">{{ bookingError }}</p>
      <p v-if="bookingMessage" class="mt-4 text-green-500">{{ bookingMessage }}</p>
    </div>

    <div class="detail-container calendar-wrapper">
      <h2 class="text-2xl font-bold mb-4">Sprawdź harmonogram</h2>
      <FullCalendar :options="calendarOptions"/>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, reactive, watch} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const resource = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const resourceId = route.params.id;
const schedule = ref([]);
const newBookingTitle = ref('');
const newBookingStart = ref('');
const newBookingEnd = ref('');
const bookingError = ref(null);
const bookingMessage = ref(null);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  },
  events: [],
  locale: 'pl',
  allDaySlot: false,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  height: 'auto'
});

watch(schedule, (newSchedule) => {
  calendarOptions.events = newSchedule.map(booking => ({
    title: booking.title,
    start: booking.start_time,
    end: booking.end_time
  }));
});

const createBooking = async () => {
  bookingError.value = null;
  bookingMessage.value = null;
  const authToken = localStorage.getItem('authToken');

  if (new Date(newBookingStart.value) >= new Date(newBookingEnd.value)) {
    bookingError.value = 'Czas zakończenia musi być późniejszy niż czas rozpoczęcia.';
    return;
  }
  try {
    await axios.post('http://127.0.0.1:8000/api/bookings/', {
      resource_id: resourceId,
      title: newBookingTitle.value,
      start_time: newBookingStart.value,
      end_time: newBookingEnd.value
    }, {
      headers: {'Authorization': `Token ${authToken}`}
    });
    bookingMessage.value = 'Rezerwacja została pomyślnie utworzona!';
    newBookingTitle.value = '';
    newBookingStart.value = '';
    newBookingEnd.value = '';
    await fetchSchedule();
  } catch (err) {
    if (err.response && err.response.data && err.response.data.non_field_errors) {
      bookingError.value = err.response.data.non_field_errors[0];
    } else {
      bookingError.value = 'Wystąpił nieoczekiwany błąd podczas rezerwacji.';
    }
    console.error(err);
  }
};

const fetchResourceDetail = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    error.value = "Brak autoryzacji.";
    return;
  }
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/resources/${resourceId}/`, {
      headers: {'Authorization': `Token ${authToken}`}
    });
    resource.value = response.data;
  } catch (err) {
    error.value = "Nie udało się pobrać danych zasobu.";
  }
};

const fetchSchedule = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return;
  }
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/resources/${resourceId}/schedule/`, {
      headers: {'Authorization': `Token ${authToken}`}
    });
    schedule.value = response.data;
  } catch (err) {
    console.error("Błąd pobierania harmonogramu:", err);
  }
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([
    fetchResourceDetail(),
    fetchSchedule()
  ]);
  loading.value = false;
});
</script>

<style>
:root {
  --fc-border-color: #374151;
  --fc-daygrid-cell-misc-color: #374151;
  --fc-page-bg-color: transparent;
  --fc-list-bg-color: #1f2937;
  --fc-list-event-hover-bg-color: #374151;
  --fc-event-bg-color: #4f46e5;
  --fc-event-border-color: #6366f1;
  --fc-event-text-color: #ffffff;
  --fc-button-bg-color: #4f46e5;
  --fc-button-active-bg-color: #4338ca;
  --fc-today-bg-color: rgba(79, 70, 229, 0.2);
}

.fc .fc-button-primary {
  background-color: var(--fc-button-bg-color);
  border-color: var(--fc-button-bg-color);
}

.fc .fc-button-primary:hover {
  background-color: #6366f1;
}

.fc .fc-toolbar-title {
  font-size: 1.25rem;
}

.fc-direction-ltr .fc-timegrid-col-events {
  margin: 0;
}
</style>

<style scoped>
.detail-container {
  @apply p-6 bg-gray-800/60 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl;
}

.calendar-wrapper {
  color: #d1d5db;
}

.input-field {
  @apply w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500;
}
</style>