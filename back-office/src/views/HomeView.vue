<template>
  <h1 class="">Home</h1>
  <div v-if="isAdmin">
    <h2>Admin panel</h2>
    <router-link :to="{ name: homeAdmin }" class="btn btn-secondary">Home admin</router-link>
  </div>
</template>

<script setup lang="ts">
import { ROUTES_NAMES } from '@/router';
import { useUserStore } from '@/stores';
import { computed } from 'vue';

const homeAdmin = ROUTES_NAMES.HOME_ADMIN;

const userStore = useUserStore();

const isAdmin = computed(() => userStore.isAdmin);
</script>
