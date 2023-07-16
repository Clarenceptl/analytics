<template>
  <div>
    <KpiChart
        v-if="MetricsData.length"
        :chart-data="lineChartData"
        :chart-options="lineChartOptions"
        chart-title="KPI Line Chart"
    />
    <div v-else>
      No KPI data available.
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import MetricsChart from './MetricsChart.vue';
import axios from 'axios';

export default defineComponent({
  name: 'MetricsDashboard',
  components: {
    MetricsChart: MetricsChart,
  },
  setup() {
    const MetricsData = ref([]);

    const lineChartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Metrics Line Chart',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
        },
      ],
    });

    const lineChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/kpi'); // Replace with your backend API URL
        MetricsData.value = response.data;

        lineChartData.value.labels = MetricsData.value.map((metrics) => metrics.name);
        lineChartData.value.datasets[0].data = MetricsData.value.map((metrics) => metrics.value);

        // You can customize other chart data and options here as needed
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      MetricsData: MetricsData,
      lineChartData,
      lineChartOptions,
    };
  },
});
</script>
