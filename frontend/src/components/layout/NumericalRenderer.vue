<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default {
  name: "NumericalRenderer",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null, // Store chart instance
    };
  },
  mounted() {
    // Register all required Chart.js components
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    this.renderChart();
  },
  watch: {
    dataItem: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
  },
  methods: {
    renderChart() {
      if (!this.dataItem || !this.dataItem.dataPoints || this.dataItem.dataPoints.length === 0) {
        console.warn("No data points available for rendering the chart.");
        return;
      }

      const ctx = this.$refs.chartCanvas.getContext("2d");

      const labels = this.dataItem.dataPoints.map(
        (point) => point.quarter || point.date
      );
      const values = this.dataItem.dataPoints.map((point) => point.value);

      // Create the Chart.js instance
      this.chartInstance = new Chart(ctx, {
        type: "bar", // Default to bar chart
        data: {
          labels,
          datasets: [
            {
              label: this.dataItem.title,
              data: values,
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
            title: {
              display: true,
              text: this.dataItem.title,
            },
          },
          scales: {
            x: {
              type: "category", // Ensure "category" scale is used
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
    updateChart() {
      this.destroyChart(); // Destroy the previous instance
      this.renderChart(); // Re-create the chart
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // Properly destroy the chart instance
        this.chartInstance = null; // Reset the instance
      }
    },
  },
  beforeUnmount() {
    this.destroyChart(); // Clean up the chart instance
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
