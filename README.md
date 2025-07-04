# SmartBooking - Interfejs Użytkownika (Vue.js)

![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Nowoczesny interfejs użytkownika typu SPA (Single Page Application) dla systemu SmartBooking. Aplikacja została
zbudowana przy użyciu Vue.js 3 (Composition API) i w pełni komunikuje się z dedykowanym backendem REST API napisanym w
Django.
---
**Link do repozytorium backendu:**
[smart-booking-system (Django REST API)](https://github.com/r-zab/smart-booking-system)

---

## Kluczowe Funkcjonalności

Aplikacja front-endowa została zaprojektowana z myślą o profesjonalnej użyteczności, oferując bogaty zestaw funkcji:

* **Architektura SPA (Single Page Application):** Dzięki wykorzystaniu **Vue Router**, nawigacja między podstronami
  odbywa się błyskawicznie, bez przeładowywania całej witryny. Zapewnia to płynne i nowoczesne doświadczenie
  użytkownika.

* **Zaawansowany System Rezerwacji:**
    * **Logiczny Przepływ:** Użytkownik jest prowadzony przez intuicyjny proces: od panelu głównego, przez listę
      zasobów, aż po dedykowaną stronę rezerwacji.
    * **Interaktywny Kalendarz:** Strona rezerwacji wykorzystuje bibliotekę **FullCalendar** do wizualizacji
      harmonogramu, co pozwala użytkownikowi na łatwe znalezienie wolnych terminów.
    * **Walidacja w Czasie Rzeczywistym:** Formularz rezerwacji komunikuje się z backendem, wyświetlając błędy
      walidacyjne (np. o zajętym terminie) bezpośrednio w interfejsie.

* **Pełny Cykl Uwierzytelniania i Zarządzania Użytkownikiem:**
    * **Ochrona Tras:** Dostęp do kluczowych sekcji aplikacji jest chroniony. Niezalogowany użytkownik jest
      automatycznie przekierowywany na stronę logowania.
    * **Dynamiczna Nawigacja:** Pasek nawigacyjny inteligentnie dostosowuje swoje menu w zależności od statusu
      zalogowania użytkownika.
    * **Zaawansowany Profil Użytkownika:** Dedykowana strona `/profil` prezentuje rezerwacje w dwóch kolumnach (
      nadchodzące i historyczne), oferuje wyszukiwarkę filtrującą wyniki w czasie rzeczywistym, paginację dla historii
      oraz pełną obsługę CRUD (edycja i usuwanie) dla nadchodzących rezerwacji.

* **Integracja z Modułami AI:**
    * **Interfejs Chatbota:** Dedykowana podstrona z interfejsem czatu, który pozwala na interakcję z asystentem AI w
      celu sprawdzania dostępności zasobów w języku naturalnym.

* **Nowoczesny Design:**
    * Cały interfejs został zbudowany przy użyciu **Tailwind CSS**, co zapewnia spójny, estetyczny i w pełni responsywny
      wygląd.
    * Zastosowano nowoczesne techniki UI/UX, takie jak efekt "mrożonego szkła" (glassmorphism) na tłach i panelach, aby
      podnieść jakość wizualną aplikacji.

---

## Stos Technologiczny

* **Framework:** Vue.js 3 (Composition API)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** Vue Router
* **Komunikacja z API:** Axios
* **Komponenty UI:** FullCalendar dla interaktywnego harmonogramu
* **Zarządzanie Stanem:** Prosty, reaktywny moduł oparty o Vue Reactivity (`ref`)

---

## Uruchomienie Projektu

Do uruchomienia projektu wymagany jest Node.js oraz działająca instancja backendu.

### Wymagania Wstępne

1. Zainstalowany [Node.js](https://nodejs.org/) (wersja 18+).
2. Zainstalowany [Git](https://git-scm.com/).
3. Uruchomiony lokalnie projekt backendowy [smart-booking-system](https://github.com/r-zab/smart-booking-system).

### Instalacja i Uruchomienie

1. **Sklonuj repozytorium:**
   ```bash
   git clone [https://github.com/r-zab/smart-booking-frontend.git](https://github.com/r-zab/smart-booking-frontend.git)
   ```

2. **Przejdź do folderu projektu:**
   ```bash
   cd smart-booking-frontend
   ```

3. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

4. **Uruchom serwer deweloperski:**
   ```bash
   npm run dev
   ```

Aplikacja będzie dostępna pod adresem `http://localhost:5173` (lub innym porcie, jeśli 5173 jest zajęty).

---

## Struktura Projektu

Struktura projektu jest oparta o komponenty, co zapewnia modularność i łatwość w utrzymaniu kodu.

* `src/components/` - Zawiera wszystkie komponenty Vue.js, takie jak:
    * `App.vue`: Główna "rama" aplikacji z Nawigacją i Stopką.
    * `Navbar.vue`, `Footer.vue`: Reużywalne elementy układu.
    * `Home.vue`: Strona powitalna dla gości.
    * `Login.vue`, `Register.vue`: Formularze autoryzacji.
    * `Dashboard.vue`: Panel główny dla zalogowanych użytkowników.
    * `ResourceList.vue`: Widok siatki ze wszystkimi zasobami.
    * `BookResource.vue`: Strona rezerwacji z formularzem i kalendarzem.
    * `UserProfile.vue`: Zaawansowany widok profilu z listą rezerwacji.
    * `Chatbot.vue`, `About.vue`: Pozostałe podstrony.
* `src/router/` - Konfiguracja Vue Router, definiująca wszystkie ścieżki i powiązane z nimi komponenty.
* `src/auth.js` - Prosty moduł do globalnego zarządzania stanem logowania.
* `src/main.js` - Główny plik inicjalizujący aplikację Vue.

---

## Autor

* **Rafał Zaborek** - [r-zab](https://github.com/r-zab)