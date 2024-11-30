<template>
  <div>
    <button @click="toggleSort">{{ sortButtonText }}</button>
  </div>
</template>

<script>
export default {
  name: "SortButton",
  data() {
    return {
      sortState: "asc",
    };
  },
  computed: {
    sortButtonText() {
      return this.sortState === "asc"
        ? "Sortieren nach Titel: A-Z"
        : "Sortieren nach Titel: Z-A";
    },
  },
  methods: {
    toggleSort() {
      this.sortState = this.sortState === "asc" ? "desc" : "asc";
      this.$emit("sort-items", this.sortState);
    },
  },
};
</script>
