<template>
  <div class="about-container">
    <h1 class="text-4xl font-extrabold text-white mb-6 border-b-2 border-indigo-500 pb-4">
      O Projekcie SmartBooking
    </h1>

    <div class="space-y-12 text-lg text-gray-300">
      <section>
        <h2 class="section-title">Misja Projektu</h2>
        <p>
          Celem projektu było stworzenie w pełni funkcjonalnego, nowoczesnego systemu full-stack do rezerwacji zasobów
          firmowych. Aplikacja wykracza poza prosty CRUD, implementując zaawansowaną logikę biznesową, konteneryzację
          oraz moduły sztucznej inteligencji, co odzwierciedla realne wyzwania i standardy stosowane w komercyjnych
          projektach IT.
        </p>
      </section>

      <section>
        <h2 class="section-title">Stos Technologiczny</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="tech-card">
            <h3 class="tech-title">Backend</h3>
            <ul class="tech-list">
              <li>Python 3.13</li>
              <li>Django 5.2</li>
              <li>Django REST Framework</li>
            </ul>
          </div>
          <div class="tech-card">
            <h3 class="tech-title">Frontend</h3>
            <ul class="tech-list">
              <li>Vue.js 3 (Composition API)</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
              <li>Vue Router</li>
            </ul>
          </div>
          <div class="tech-card">
            <h3 class="tech-title">Baza Danych i Konteneryzacja</h3>
            <ul class="tech-list">
              <li>PostgreSQL</li>
              <li>Docker & Docker Compose</li>
            </ul>
          </div>
          <div class="tech-card">
            <h3 class="tech-title">AI i Testowanie</h3>
            <ul class="tech-list">
              <li>Pandas & Scikit-learn</li>
              <li>Dateparser & SpaCy</li>
              <li>Pytest & pytest-django</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="section-title">Architektura i Kluczowe Funkcjonalności</h2>
        <p class="mb-4">
          System opiera się na architekturze rozproszonej, gdzie skonteneryzowany backend w Django udostępnia REST API,
          a niezależna aplikacja frontendowa SPA (Single Page Application) w Vue.js konsumuje te dane.
        </p>
        <ul class="list-disc list-inside space-y-2">
          <li><b>Uwierzytelnianie Tokenowe:</b> Bezpieczny system logowania i rejestracji oparty o tokeny. Chronione
            endpointy API są dostępne tylko dla zalogowanych użytkowników.
          </li>
          <li><b>Logika Biznesowa:</b> Backend posiada zaawansowaną walidację, która uniemożliwia tworzenie rezerwacji w
            terminach, które się na siebie nakładają.
          </li>
          <li><b>Asystent AI:</b> Dedykowany endpoint chatbota, który przetwarza język naturalny, aby identyfikować
            intencje użytkownika (nazwę zasobu, datę, godzinę) i sprawdzać dostępność w czasie rzeczywistym.
          </li>
          <li><b>Model Predykcyjny:</b> System zawiera moduł analityczny, który na podstawie historycznych danych jest w
            stanie prognozować przyszłe zapotrzebowanie na zasoby.
          </li>
          <li><b>Automatyczne Testy:</b> Kluczowe endpointy API są pokryte testami automatycznymi, co gwarantuje
            stabilność i jakość kodu.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.about-container {
  @apply max-w-4xl mx-auto py-8;
}

.section-title {
  @apply text-3xl font-bold text-white mb-4;
}

.tech-card {
  @apply bg-gray-800 p-6 rounded-lg border border-gray-700;
}

.tech-title {
  @apply text-xl font-semibold text-indigo-400 mb-3;
}

.tech-list {
  @apply list-disc list-inside text-gray-300;
}
</style>