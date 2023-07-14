<template>
  <div class="container mx-auto">
    <h1 class="">Home</h1>
    <h2>App ID : {{ user?.appId }}</h2>

    <div class="columns-auto gap-10">
      <VerifyUser />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VerifyUser } from '@/components';
import { useUserStore } from '@/stores';
import { onMounted } from 'vue';
const userStore = useUserStore();
const user = userStore.getContextUser;
onMounted(async () => {
  await userStore.loadContextUser();
});
</script>
