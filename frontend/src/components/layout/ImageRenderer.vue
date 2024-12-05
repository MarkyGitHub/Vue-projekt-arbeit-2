<template>
  <div class="image-renderer">
    <h1>{{ dataItem.title }}</h1>
    <img :src="dataItem.imageUrl" :alt="dataItem.title" />
    <p>{{ dataItem.description }}</p>
    <div v-if="dataItem.annotations" class="annotations">
      <h3>Annotations</h3>
      <ul>
        <li v-for="annotation in dataItem.annotations" :key="annotation">
          {{ annotation }}
        </li>
      </ul>
    </div>
    <p v-if="dataItem.sourceUrl" class="source">
      <strong>Source:</strong> <a :href="dataItem.sourceUrl" target="_blank">{{ dataItem.sourceUrl }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "ImageRenderer",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-renderer {
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

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 20px;
}

.annotations {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.annotations h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #444;
}

.annotations ul {
  list-style-type: disc;
  padding-left: 20px;
}

.annotations li {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}
</style>
