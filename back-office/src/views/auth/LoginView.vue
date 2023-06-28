<template>
  <div class="w-full flex justify-center px-3">
    <div class="w-full card card-side max-w-6xl bg-base-100 shadow-xl">
      <figure class="flex items-center w-64 h-64 py-8 pl-8"><img src="@/assets/img/bg-login.jpg" alt="bg login" /></figure>
      <div class="card-body w-3/4">
        <h2 class="card-title">Login form</h2>
        <Form class="flex flex-col" @submit="submit" :validation-schema="schema">
          <Field as="div" name="email" v-slot="{ field }">
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
          <ErrorMessage class="text-red-600" name="email" />

          <Field as="div" class="mt-4" name="password" v-slot="{ field }">
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
          <ErrorMessage class="text-red-600" name="password" />

          <div class="card-actions justify-end">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { reactive } from 'vue';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
});

const formValues = reactive({
  email: '',
  name: '',
  password: ''
});

const submit = (values: any) => {
  console.log(values);
};
</script>
