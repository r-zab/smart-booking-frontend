<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow container mx-auto mt-5 px-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* Tutaj zostawiamy globalne style, w tym te z Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #1f2937; /* Ciemne tło dla całej aplikacji */
  color: #f3f4f6;
}
</style>