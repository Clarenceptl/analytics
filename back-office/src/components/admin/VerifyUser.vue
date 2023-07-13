<template>
  <div v-if="isAdmin">
    <h2>Compte à vérifier</h2>
    <div v-if="!loading" class="stack">
      <div v-if="usersToVerify.length === 0" class="text-center border border-base-content card w-36 bg-base-100">
        <div class="card-body">Pas de compte à vérifier</div>
      </div>
      <div
        v-else
        v-for="(user, index) in usersToVerify"
        :key="index"
        class="text-center border border-base-content card bg-base-100"
      >
        <div class="card-body">
          <p>{{ user.name }}</p>
          <p>{{ user.company }}</p>
          <p>{{ user.siteUrl }}</p>
          <p>{{ user.email }}</p>
          <button class="btn btn-success" @click="handleVerification(user, true)">Accepte</button>
          <button class="btn btn-error" @click="handleVerification(user, false)">Refuse</button>
        </div>
      </div>
    </div>
    <span v-else class="loading loading-ring loading-lg"></span>
  </div>
</template>

<script setup lang="ts">
import { TOAST_TYPE } from '@/enums';
import type { User } from '@/models';
import { UserService } from '@/services';
import { useToastStore, useUserStore } from '@/stores';
import type { EventSourcePolyfill } from 'event-source-polyfill';
import { computed, onBeforeUnmount, ref } from 'vue';

const userStore = useUserStore();
const toastStore = useToastStore();

const isAdmin = computed(() => userStore.isAdmin);

let getListUser: EventSourcePolyfill | null = null;
const loading = ref(false);
const usersToVerify = ref<User[]>([]);

const handleVerification = async (user: User, isVerify: boolean) => {
  const res = await UserService.verifyUser(user._id, isVerify);
  console.log(res);
  if (res.success) {
    toastStore.createToast({
      message: `Le compte de ${user.name} a été ${isVerify ? 'accepté' : 'refusé'}`,
      type: TOAST_TYPE.SUCCESS
    });
    usersToVerify.value = usersToVerify.value.filter((u) => u._id !== user._id);
  }
};

if (isAdmin.value) {
  getListUser = UserService.getUnverifiedUsers();
  getListUser.onmessage = ({ data }) => {
    loading.value = false;
    const users = JSON.parse(data);
    if (users === usersToVerify.value) return;
    usersToVerify.value = users;
  };
  getListUser.onerror = (err) => {
    loading.value = false;
    console.error(err);
  };
  getListUser.onopen = () => {
    loading.value = true;
  };
}

onBeforeUnmount(() => {
  if (getListUser) {
    getListUser.close();
  }
});
</script>
