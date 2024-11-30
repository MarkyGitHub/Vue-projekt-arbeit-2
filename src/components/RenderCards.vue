<template>
  <div id="data-cards-container">
    <div
      v-for="item in dataItems"
      :key="item.id"
      class="data-card"
      @click="navigateToDetailPage(item.id)"
    >
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigateToDetailPage(dataId) {
      this.$router.push(`/detail/${dataId}`);
    },
  },
};
</script>

<style scoped>
.data-card {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}
.data-card:hover {
  background-color: #f0f0f0;
}
</style>
