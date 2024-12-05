<template>
  <div class="text-renderer">
    <h1>{{ dataItem.title }}</h1>
    <p>{{ dataItem.description }}</p>
    <p v-if="dataItem.keywords && dataItem.keywords.length" class="keywords">
      <strong>Keywords:</strong> {{ dataItem.keywords.join(", ") }}
    </p>
    <p v-if="dataItem.sourceUrl" class="source">
      <strong>Source:</strong> <a :href="dataItem.sourceUrl" target="_blank">{{ dataItem.sourceUrl }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "TextRenderer",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.text-renderer {
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

p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 10px;
}

.keywords {
  font-size: 0.9rem;
  color: #333;
}

.source {
  font-size: 0.9rem;
  color: #555;
  word-wrap: break-word;
  /* Handle long URLs */
}

.source a {
  color: #007bff;
  text-decoration: none;
}

.source a:hover {
  text-decoration: underline;
}
</style>
