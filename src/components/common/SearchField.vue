<template>
  <div>
    <label for="title-search">Suchen nach Titel:</label>
    <input
      type="text"
      id="title-search"
      v-model="searchQuery"
      @input="search"
      placeholder="Such Titel eingeben..."
    />
  </div>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      this.$emit("search-query", this.searchQuery);
    },
  },
};
</script>
