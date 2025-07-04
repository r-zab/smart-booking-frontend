<template>
  <div class="chatbot-container">
    <h1 class="text-3xl font-bold mb-4 text-center">Asystent AI</h1>

    <div class="messages-window">
      <div v-for="(message, index) in messages" :key="index"
           :class="message.sender === 'user' ? 'user-message' : 'bot-message'">
        <p>{{ message.text }}</p>
      </div>
      <div v-if="isLoading" class="bot-message">
        <p class="typing-indicator">...</p>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="message-form">
      <input
          v-model="newMessage"
          type="text"
          placeholder="Zapytaj o dostępność zasobu..."
          class="message-input"
          :disabled="isLoading"
      >
      <button type="submit" class="send-button" :disabled="isLoading">
        Wyślij
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const messages = ref([]);
const newMessage = ref('');
const isLoading = ref(false);

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userMessage = {text: newMessage.value, sender: 'user'};
  messages.value.push(userMessage);

  const messageToSend = newMessage.value;
  newMessage.value = '';
  isLoading.value = true;

  try {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.post('http://127.0.0.1:8000/api/chatbot/',
        {
          message: messageToSend
        },
        {
          headers: {'Authorization': `Token ${authToken}`}
        });

    const botMessage = {text: response.data.bot_response, sender: 'bot'};
    messages.value.push(botMessage);

  } catch (error) {
    const errorMessage = {text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie później.', sender: 'bot'};
    messages.value.push(errorMessage);
    console.error("Błąd komunikacji z chatbotem:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.chatbot-container {
  max-width: 700px;
  margin: auto;
  height: 70vh;
  display: flex;
  flex-direction: column;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
}

.messages-window {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bot-message, .user-message {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
}

.bot-message {
  background-color: #374151;
  align-self: flex-start;
  color: #d1d5db;
}

.user-message {
  background-color: #4f46e5;
  color: white;
  align-self: flex-end;
}

.message-form {
  display: flex;
  padding: 10px;
  border-top: 1px solid #374151;
}

.message-input {
  @apply flex-grow bg-gray-700 text-white border-none rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500;
}

.send-button {
  @apply px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors disabled:bg-gray-500;
}

.typing-indicator {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style>