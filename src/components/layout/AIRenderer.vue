<template>
  <div v-if="dataItem">
    <h1>{{ dataItem.title }}</h1>
    <p>{{ dataItem.description }}</p>
    <div class="ai-results">
      <div v-for="result in dataItem.results" :key="result.id" class="ai-result">
        <p>Review: {{ result.review }}</p>
        <p>Sentiment: {{ result.sentiment }}</p>
        <p>Confidence: {{ (result.confidence * 100).toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AIRenderer",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.ai-results {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ai-result {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
</style>
