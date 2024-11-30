<template>
  <div>
    <label for="type-filter">Filtern nach Typ:</label>
    <select id="type-filter" v-model="selectedType" @change="filterByType">
      <option value="all">Alle</option>
      <option value="numerical">Numerische</option>
      <option value="text">Text</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
      <option value="ai_result">AI Ergebnis</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "TypeFilter",
  data() {
    return {
      selectedType: "all",
    };
  },
  methods: {
    filterByType() {
      this.$emit("filter-type", this.selectedType);
    },
  },
};
</script>
