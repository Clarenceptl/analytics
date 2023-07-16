<template>
  <Form class="flex flex-col justify-between h-full" @submit="submit" :validation-schema="UpdateAdminSchema">
    <div>
      <Field v-model="user.email" as="div" name="email" class="mb-1" v-slot="{ field }">
        <div class="form-control w-full max-w-xs">
          <label for="email" class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            id="email"
            v-bind="field"
            type="text"
            placeholder="Type here"
            class="input input-bordered input-secondary w-full max-w-xs"
          />
        </div>
      </Field>
      <ErrorMessage as="p" class="text-red-600" name="email" />

      <Field v-model="user.name" as="div" name="name" class="mb-1" v-slot="{ field }">
        <div class="form-control w-full max-w-xs">
          <label for="name" class="label"> Name </label>
          <input
            id="name"
            v-bind="field"
            type="text"
            placeholder="Type here"
            class="input input-bordered input-secondary w-full max-w-xs"
          />
        </div>
      </Field>
      <ErrorMessage as="p" class="text-red-600" name="name" />

      <Field v-model="user.company" as="div" class="mt-4 mb-1" name="company" v-slot="{ field }">
        <label for="company" class="label">
          <span class="label-text">Company</span>
        </label>
        <input
          id="company"
          v-bind="field"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
      </Field>
      <ErrorMessage as="p" class="text-red-600" name="company" />

      <Field v-model="user.siteUrl" as="div" class="mt-4 mb-1" name="siteUrl" v-slot="{ field }">
        <label for="siteUrl" class="label">
          <span class="label-text">Site url</span>
        </label>
        <input
          id="siteUrl"
          v-bind="field"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
      </Field>
      <Field as="div" class="mt-4 mb-1" name="admin" v-slot="{ field }">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Admin ?</span>
            <input type="checkbox" :checked="isAdmin" class="checkbox" />
          </label>
        </div>
      </Field>
      <Field as="div" class="mt-4 mb-1" name="isVerified" v-slot="{ field }">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Vérifié ?</span>
            <input type="checkbox" :checked="isVerify" class="checkbox" />
          </label>
        </div>
      </Field>
    </div>
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { TOAST_TYPE, USER_ROLE } from '@/enums';
import { UpdateAdminSchema, UpdateUserDTO, type User } from '@/models';
import router, { ROUTES_NAMES } from '@/router';
import { useToastStore, useUserStore } from '@/stores';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { computed, type PropType } from 'vue';

const userStore = useUserStore();
const toastStore = useToastStore();
const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
});

const isAdmin = computed(() => props.user.roles.includes(USER_ROLE.ADMIN));
const isVerify = computed(() => props.user.isVerify);

const submit = async (values: any) => {
  // const formValues = values as UpdateUserDTO;
  // const res = await userStore.register(formValues);
  // if (!res?.success) {
  //   return toastStore.createToast({
  //     message: res?.error,
  //     type: TOAST_TYPE.ERROR
  //   });
  // }
  // toastStore.createToast({
  //   message: 'User created successfully',
  //   type: TOAST_TYPE.SUCCESS
  // });
};
</script>
