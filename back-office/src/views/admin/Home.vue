<template>
  <h1 class="">Home Admin</h1>

  <div class="overflow-x-auto">
    <table v-if="users" class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
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
          <td>{{ user.company }}</td>
          <td>{{ user.siteUrl }}</td>
          <td>{{ user.roles }}</td>
          <td>{{ user.isVerify }}</td>
          <td class="flex flex-nowrap">
            <button class="btn btn-sm btn-secondary mr-2">Edit</button>
            <button class="btn btn-sm btn-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const users = await userStore.getUsers();
console.log(users);
</script>
