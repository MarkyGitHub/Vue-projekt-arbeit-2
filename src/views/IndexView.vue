<template>
  <div>
    <h1>Data Items</h1>
    <ul>
      <li v-for="item in dataItems" :key="item._id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    dataItems() {
      // Access data items from Vuex
      return this.$store.getters.dataItems;
    },
  },
};
</script>
