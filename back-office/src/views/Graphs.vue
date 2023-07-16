<template>
  <div v-if="graphs.length === 0" class="text-center place-content-center" >
    <div class="card-body">Pas de graphique</div>
    <div><button>Créer votre graphique</button></div>
  </div>

  <div
      v-else
      v-for="(graph, index) in graphs"
      :key="index"
      class="text-center border border-base-content card bg-base-100"
  >
  </div>
  <PopupForm/>
</template>


<script lang="ts" setup>
import {ref} from "vue";
import type {GraphsModel} from "@/models/viewModel/graphs.model";
import PopupForm from '../components/PopupForm.vue';

const graphs = ref<GraphsModel[]>([]);
const openForm = () => {
  this.$refs.popupForm.openForm();
};
</script>
