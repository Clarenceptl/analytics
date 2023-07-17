<template>
  <Line v-if="!loading" :data="dataChart" />
</template>

<script setup lang="ts">
import { ChartService } from '@/services';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { onBeforeUnmount, reactive, ref } from 'vue';
import { Line } from 'vue-chartjs';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const loading = ref(true);

const dataChart = reactive({
  labels: [],
  datasets: [
    {
      label: 'Pageviews',
      backgroundColor: '#f87979',
      data: []
    }
  ]
});

const getPageViews = ChartService.getPageviews();
getPageViews.onmessage = ({ data }) => {
  const events = JSON.parse(data);
  console.log(events);
  console.log(dataChart);
  events.map((event) => {
    if (dataChart.labels.includes(event.data.fullPath)) {
      const arrayValues = events.filter((elem) => elem.data.fullPath === event.data.fullPath);
      dataChart.datasets[0].data[dataChart.labels.indexOf(event.data.fullPath)] = arrayValues.length;
      //   dataChart.datasets[0].data[dataChart.labels.indexOf(event.data.fullPath)] += 1;
    } else {
      dataChart.labels.push(event.data.fullPath);
      dataChart.datasets[0].data.push(1);
    }
  });
  loading.value = false;
};
getPageViews.onerror = (err) => {
  loading.value = false;
  console.error(err);
};
getPageViews.onopen = () => {
  loading.value = true;
};

onBeforeUnmount(() => {
  if (getPageViews) {
    getPageViews.close();
  }
});
</script>
