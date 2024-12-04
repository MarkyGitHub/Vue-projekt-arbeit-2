<template>
  <div>
    <h2>Data List</h2>
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
      // Access Vuex state using a getter
      return this.$store.getters.dataItems;
    },
  },
};
</script>
