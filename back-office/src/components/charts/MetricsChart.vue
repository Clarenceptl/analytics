<template>
  <div>
    <h2>{{ chartTitle }}</h2>
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import axios from 'axios';

export default {
  extends: Line,
  // mixins: [mixins.reactiveProp],
  props: ['chartData', 'chartOptions', 'chartTitle'],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>
