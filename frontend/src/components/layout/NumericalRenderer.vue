<template>
  <div class="numerical-renderer">
    <canvas ref="chartCanvas"></canvas>
    <p v-if="dataItem.sourceUrl" class="source">
      <strong>Source:</strong> <a :href="dataItem.sourceUrl" target="_blank">{{ dataItem.sourceUrl }}</a>
    </p>
    <p class="description">{{ dataItem.description }}</p>
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
.numerical-renderer {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

canvas {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.source {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
  word-wrap: break-word;
}

.description {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
  text-align: left;
}
</style>
