<template>
  <div class="w-full flex justify-center px-3">
    <div class="w-full card card-side card-height max-w-6xl bg-base-100 shadow-xl">
      <figure class="figure flex items-center w-2/6 py-8 pl-8">
        <img src="@/assets/img/register.jpg" alt="bg login" />
      </figure>
      <div class="card-body w-4/6">
        <h2 class="card-title">Register form</h2>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RegisterForm } from '@/components';
</script>

<style scoped>
@media screen and (max-width: 640px) {
  .figure {
    display: none;
  }
}
</style>
