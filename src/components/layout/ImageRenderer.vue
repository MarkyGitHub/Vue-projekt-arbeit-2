<template>
  <div v-if="dataItem">
    <h1>{{ dataItem.title }}</h1>
    <img :src="dataItem.imageUrl" :alt="dataItem.title" />
    <p>{{ dataItem.description }}</p>
    <div v-if="dataItem.annotations">
      <h3>Annotations</h3>
      <ul>
        <li v-for="annotation in dataItem.annotations" :key="annotation">
          {{ annotation }}
        </li>
      </ul>
    </div>
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
img {
  max-width: 100%;
  border-radius: 5px;
}
</style>
