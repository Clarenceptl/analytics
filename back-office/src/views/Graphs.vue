<template>
  <div class="container">
    <h1>Graphs</h1>
    <div class="columns-auto p-3">
      <!-- <MetricsDashboard /> -->
      <!-- <BarChart class="mb-5" /> -->
      <LineChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BarChart from '@/components/charts/BarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
</script>
