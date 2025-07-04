<template>
  <div class="flex flex-col min-h-screen">
    <Navbar/>
    <main class="flex-grow container mx-auto mt-5 px-4">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  color: #f3f4f6;
}
</style>