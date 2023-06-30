<template>
  <Form class="flex flex-col justify-between h-full" @submit="submit" :validation-schema="LoginSchema">
    <div>
      <Field as="div" name="email" class="mb-1" v-slot="{ field }">
        <div class="form-control w-full max-w-xs">
          <label class="label">
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

      <Field as="div" class="mt-4 mb-1" name="password" v-slot="{ field }">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          id="password"
          v-bind="field"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
      </Field>
      <ErrorMessage as="p" class="text-red-600" name="password" />
    </div>
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { TOAST_TYPE } from '@/enums';
import { LoginSchema, type LoginVM } from '@/models';
import router, { ROUTES_NAMES } from '@/router';
import { useToastStore, useUserStore } from '@/stores';
import { ErrorMessage, Field, Form } from 'vee-validate';

const userStore = useUserStore();
const toastStore = useToastStore();

const submit = async (values: any) => {
  const formValues = values as LoginVM;
  const res = await userStore.login(formValues);
  if (!res?.success) {
    return toastStore.createToast({
      message: res?.error,
      type: TOAST_TYPE.ERROR
    });
  }

  router.push({ name: ROUTES_NAMES.HOME });
};
</script>
