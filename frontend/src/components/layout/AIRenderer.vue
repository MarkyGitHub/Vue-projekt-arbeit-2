<template>
  <div class="ai-renderer">
    <h1>{{ dataItem.title }}</h1>
    <p class="description">{{ dataItem.description }}</p>
    <div class="ai-results">
      <div v-for="(result, index) in dataItem.results" :key="index" class="ai-result">
        <div v-for="(value, key) in result" :key="key" class="ai-result-field">
          <p>
            <strong>{{ formatLabel(key) }}:</strong>
            <template v-if="key === 'image'">
              <img :src="value" alt="AI result image" class="ai-result-image" />
            </template>
            <template v-else>
              {{ formatValue(value, key) }}
            </template>
          </p>
        </div>
      </div>
    </div>
    <p v-if="dataItem.sourceUrl" class="source">
      <strong>Source:</strong> <a :href="dataItem.sourceUrl" target="_blank">{{ dataItem.sourceUrl }}</a>
    </p>
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
  methods: {
    formatLabel(key) {
      // Map specific keys to user-friendly labels
      const labelMap = {
        review: "Review",
        sentiment: "Sentiment",
        confidence: "Confidence",
        category: "Category",
        image: "Image",
        object: "Object",
      };
      return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    },
    formatValue(value, key) {
      // Format confidence percentages or other specific key-value pairs
      if (key === "confidence" && typeof value === "number") {
        return `${(value * 100).toFixed(2)}%`;
      }
      return value;
    },
  },
};
</script>

<style scoped>
.ai-renderer {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.ai-results {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ai-result {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ai-result p {
  margin: 5px 0;
  font-size: 0.95rem;
}

.ai-result p strong {
  color: #333;
}

.ai-result-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 10px;
}

.source {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.source a {
  color: #007bff;
  text-decoration: none;
}

.source a:hover {
  text-decoration: underline;
}
</style>
