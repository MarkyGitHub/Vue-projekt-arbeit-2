<template>
  <div>
    <h2>{{ dataItem.title }}</h2>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <p>{{ dataItem.description }}</p>
  </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const labels = this.dataItem.dataPoints.map(
      (point) => point.quarter || point.date
    );
    const values = this.dataItem.dataPoints.map((point) => point.value);
    const chartType =
      this.dataItem.visualizationType === "line_chart" ? "line" : "bar";

    new Chart(this.$refs.chartCanvas, {
      type: chartType,
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
      },
    });
  },
};
</script>
