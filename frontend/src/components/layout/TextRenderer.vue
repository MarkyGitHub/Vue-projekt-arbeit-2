<template>
  <div v-if="dataItem">
    <h1>{{ dataItem.title }}</h1>
    <p>{{ dataItem.description }}</p>
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
p {
  font-size: 1rem;
}
</style>
