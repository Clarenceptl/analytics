<template>
  <div class="greetings">
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <!-- button click me -->
    <!-- <button v-tracking:click="1 + 1">click me</button> -->
    <button v-track:ASWEER.click="'m'">track</button>
  </div>
</template>

<script setup lang="ts">
import useMousePosition from '../composables/useMousePosition';
useMousePosition({ APP_ID: 'API_ID_123' });
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
