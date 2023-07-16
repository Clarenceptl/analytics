<template>
  <button @click="openForm">Open Form</button>
  <PopupForm/>
</template>


<script lang="ts" setup>
import {ref} from "vue";
import type {GraphsModel} from "../models/viewModel/graphs.model";
import PopupForm from '../components/PopupForm.vue';

const graphs = ref<GraphsModel[]>([]);
const openForm = () => {
  this.$refs.popupForm.openForm();
};
</script>
