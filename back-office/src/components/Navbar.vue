<template>
  <div class="navbar bg-teal-700 z-10 relative">
    <div class="flex-1">
      <router-link :to="{ name: ROUTES_NAMES.HOME }" class="btn btn-ghost normal-case text-xl text-white"
        >Analytics</router-link
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal flex items-center px-1">
        <li v-if="isAdmin">
          <details>
            <summary class="text-white hover:text-white">Admin</summary>
            <ul class="p-2 bg-base-200">
              <li>
                <router-link :to="{ name: admin }">Home</router-link>
              </li>
            </ul>
          </details>
        </li>
        <li v-if="isConnected">
          <details>
            <summary class="text-white hover:text-white">Mon compte</summary>
            <ul class="p-2 bg-base-200">
              <li>
                <router-link :to="{ name: informations }">Mes informations</router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <router-link v-if="!isConnected" class="btn btn-secondary" :to="{ name: switchRoute() }">{{
        switchRoute(true)
      }}</router-link>

      <button @click="logout" v-else class="btn btn-secondary h-full flex items-center">
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router, { ROUTES_NAMES } from '@/router';
import { useUserStore } from '@/stores';
import { capitalize, computed } from 'vue';

const informations = ROUTES_NAMES.INFORMATIONS;
const admin = ROUTES_NAMES.HOME_ADMIN;

const userStore = useUserStore();
const isConnected = computed(() => userStore.isConnected);
const isAdmin = computed(() => userStore.isAdmin);
const switchRoute = (isCapitalise?: boolean): string => {
  const res = router.currentRoute.value.name === ROUTES_NAMES.LOGIN ? ROUTES_NAMES.REGISTER : ROUTES_NAMES.LOGIN;

  return isCapitalise ? capitalize(res) : res;
};

const logout = () => {
  userStore.logout();
  router.push({ name: ROUTES_NAMES.LOGIN });
};
</script>
