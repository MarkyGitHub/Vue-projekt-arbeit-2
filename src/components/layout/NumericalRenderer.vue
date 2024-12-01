<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // Register the required components for Chart.js
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);

    const ctx = this.$refs.chartCanvas.getContext("2d");

    new Chart(ctx, {
      type: "bar", // Chart type
      data: {
        labels: this.dataItem.dataPoints.map((point) => point.label),
        datasets: [
          {
            label: this.dataItem.title,
            data: this.dataItem.dataPoints.map((point) => point.value),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Categories",
            },
          },
          y: {
            title: {
              display: true,
              text: "Values",
            },
          },
        },
      },
    });
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
