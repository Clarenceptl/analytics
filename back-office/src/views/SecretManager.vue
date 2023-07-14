<template>
  <div class="container mx-auto">
    <h2>Vos secret</h2>

    <div class="overflow-x-auto">
      <table v-if="user" class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>Secret</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(secret, index) in user?.appSecret">
            <td>{{ secret }}</td>
            <td class="flex flex-nowrap">
              <button class="btn btn-sm btn-error">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="drawer drawer-end">
      <input ref="test" id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label for="my-drawer-4" class="drawer-overlay" @click="handleSideBar(false)"></label>
        <ul class="menu px-4 pb-4 pt-20 w-80 h-full bg-base-200 text-base-content">

        </ul>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const user = userStore.getContextUser;
console.log(user);
</script>
