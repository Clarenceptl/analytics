<template>
  <h1 class="">Home Admin</h1>

  <div class="overflow-x-auto">
    <table v-if="users" class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Nom</th>
          <th>Company</th>
          <th>Site url</th>
          <th>Roles</th>
          <th>Verify</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users">
          <th>{{ index + 1 }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.company }}</td>
          <td>{{ user.siteUrl }}</td>
          <td>{{ user.roles }}</td>
          <td>{{ user.isVerify }}</td>
          <td class="flex flex-nowrap">
            <button
              @click="
                handleSideBar(true);
                selectUser(user);
              "
              class="btn btn-sm btn-secondary mr-2"
            >
              Edit
            </button>
            <button class="btn btn-sm btn-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="drawer drawer-end">
      <input ref="test" id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label for="my-drawer-4" class="drawer-overlay" @click="handleSideBar(false)"></label>
        <ul class="menu px-4 pb-4 pt-20 w-80 h-full bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <UpdateUserForm v-if="selectedUser" :user="selectedUser"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UpdateUserForm } from '@/components';
import type { User } from '@/models';
import { useUserStore } from '@/stores';
import { ref } from 'vue';

const userStore = useUserStore();
const users = await userStore.getUsers();
const test = ref<HTMLInputElement | null>(null);
const selectedUser = ref<User | null>(null);

const selectUser = (user: User | null) => {
  selectedUser.value = user;
};
const handleSideBar = (isOpenning: boolean) => {
  if (!test.value) return;
  if (isOpenning) {
    return (test.value.checked = isOpenning);
  }
  selectUser(null);
};
</script>
