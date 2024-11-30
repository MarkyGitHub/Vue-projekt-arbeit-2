<template>
  <div>
    <h2>{{ dataItem.title }}</h2>
    <div v-for="result in dataItem.results" :key="result.id" class="ai-result">
      <p>Review: {{ result.review }}</p>
      <p>Sentiment: {{ result.sentiment }}</p>
      <p>Confidence: {{ (result.confidence * 100).toFixed(1) }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
