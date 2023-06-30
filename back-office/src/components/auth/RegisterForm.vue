<template>
  <Form class="flex flex-col justify-between h-full" @submit="submit" :validation-schema="RegisterSchema">
    <div>
      <Field as="div" name="email" class="mb-1" v-slot="{ field }">
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

      <Field as="div" class="mt-4 mb-1" name="company" v-slot="{ field }">
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

      <Field as="div" class="mt-4 mb-1" name="siteUrl" v-slot="{ field }">
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
      <ErrorMessage as="p" class="text-red-600" name="siteUrl" />

      <Field as="div" class="mt-4 mb-1" name="password" v-slot="{ field }">
        <label for="password" class="label">
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

      <Field as="div" class="mt-4 mb-1" name="confirmPassword" v-slot="{ field }">
        <label for="confirmPassword" class="label">
          <span class="label-text">Confirm password</span>
        </label>
        <input
          id="confirmPassword"
          v-bind="field"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
      </Field>
      <ErrorMessage as="p" class="text-red-600" name="confirmPassword" />
    </div>
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-primary">Register</button>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { TOAST_TYPE } from '@/enums';
import { RegisterSchema, type RegisterDTO } from '@/models';
import router, { ROUTES_NAMES } from '@/router';
import { useToastStore, useUserStore } from '@/stores';
import { ErrorMessage, Field, Form } from 'vee-validate';

const userStore = useUserStore();
const toastStore = useToastStore();

const submit = async (values: any) => {
  const formValues = values as RegisterDTO;
  const res = await userStore.register(formValues);
  if (!res?.success) {
    return toastStore.createToast({
      message: res?.error,
      type: TOAST_TYPE.ERROR
    });
  }
  toastStore.createToast({
    message: 'User created successfully',
    type: TOAST_TYPE.SUCCESS
  });
  router.push({ name: ROUTES_NAMES.LOGIN });
};
</script>
