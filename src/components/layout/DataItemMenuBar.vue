<template>
  <div class="data-item-menu-bar">
    <div class="data-tye-selectors">
      <!-- Data Type Filter -->
      <DataTypeFilter />
    </div>

    <div class="actions">
      <!-- Search Field -->
      <SearchField />

      <!-- Sort Button -->
      <SortButton />
    </div>
  </div>
</template>

<script>
import DataTypeFilter from "@/components/common/DataTypeFilter.vue";
import SearchField from "@/components/common/SearchField.vue";
import SortButton from "@/components/common/SortButton.vue";

export default {
  name: "DataItemMenuBar",
  components: {
    DataTypeFilter,
    SearchField,
    SortButton,
  },
  data() {
    return {
      items: [], // All data items
      filteredItems: [],
    };
  },
  methods: {
    filterByType(type) {
      console.log("Filter by type:", type);
    },
    searchByTitle(query) {
      console.log("Search query:", query);
    },
    sortItems(sortState) {
      console.log("Sort state:", sortState);
    },
  },
};
</script>

<style scoped>
/* Styles for the menu bar */
.data-item-menu-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.data-tye-selectors {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
