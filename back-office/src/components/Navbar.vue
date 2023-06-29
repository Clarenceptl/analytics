<template>
  <div class="navbar bg-teal-700 z-10">
    <div class="flex-1">
      <router-link :to="{ name: 'home' }" class="btn btn-ghost normal-case text-xl text-white">Analytics</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal flex items-center px-1">
        <li>
          <details>
            <summary class="text-white hover:text-white">email@mail.com</summary>
            <ul class="p-2 bg-base-200">
              <li>
                <router-link :to="{ name: 'informations' }">Mes informations</router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <router-link v-if="val" class="btn btn-primary" :to="{ name: 'login' }">Login</router-link>

      <button v-else class="btn btn-primary h-full flex items-center">
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const val = true;
</script>
