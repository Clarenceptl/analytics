<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <!-- Filtres pour sélectionner les dimensions de la requête et l'échelle de temps -->
      <!-- ... -->
    </div>

    <div v-if="selectedVisual === 'KPI'">
      <!-- Affichage des KPIs -->
      <!-- ... -->
    </div>

    <div v-else-if="selectedVisual === 'Graph'">
      <!-- Affichage du graphe -->
      <div id="graph-container">
        <canvas id="my-chart"></canvas>
      </div>
    </div>

    <div v-else-if="selectedVisual === 'Heatmap'">
      <!-- Affichage du heatmap -->
      <div id="heatmap-container">
        <canvas id="my-heatmap"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import heatmap from "heatmap.js";

export default {
  data() {
    return {
      selectedVisual: "KPI",
    };
  },
  methods: {
    async fetchData() {
      try {

        const response = await axios.get(
            `/api/data?visual=${this.selectedVisual}&filter1=${this.filter1}&filter2=${this.filter2}&start=${this.startTime}&end=${this.endTime}&step=${this.step}`
        );

        const data = response.data;

        if (this.selectedVisual === "KPI") {
          // Affichage des KPIs
          // ...
        } else if (this.selectedVisual === "Graph") {
          // Affichage du graphe
          const ctx = document.getElementById("my-chart").getContext("2d");
          new Chart(ctx, {
            type: "line",
            data: {
              labels: data.labels,
              datasets: data.datasets,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
        } else if (this.selectedVisual === "Heatmap") {
          // Affichage du heatmap
          const heatmapData = {
            data: data.heatmapData,
            max: data.maxValue,
          };
          heatmap.create({
            container: document.getElementById("heatmap-container"),
            data: heatmapData,
          });
        }
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des données :", error);
      }
    },
  },
  watch: {
    selectedVisual() {
      this.fetchData();
    },
    mounted() {
      this.fetchData();
    },
  }
}
</script>

<style>
</style>
