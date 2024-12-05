<template>
    <div class="data-item-menu-bar">
        <!-- Data Type Filter -->
        <div class="filter-section">
            <DataTypeFilter @filter-type="filterByType" />
        </div>

        <!-- Search Field -->
        <div class="search-section">
            <SearchField @search-query="searchByTitle" />
        </div>

        <!-- Sort Button -->
        <div class="sort-section">
            <SortButton @sort-items="sortItems" />
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
    methods: {
        filterByType(type) {
            this.$emit("filter-type", type); // Emit event to HomeView
        },
        searchByTitle(query) {
            this.$emit("search-query", query); // Emit event to HomeView
        },
        sortItems(sortState) {
            this.$emit("sort-items", sortState); // Emit event to HomeView
        },
    },
};
</script>

<style scoped>
.data-item-menu-bar {
    display: flex;
    justify-content: space-between;
    /* Space between sections */
    align-items: center;
    /* Vertically center components */
    gap: 20px;
    /* Spacing between components */
    background-color: #f5f5f5;
    /* Light gray background for visibility */
    padding: 10px 20px;
    /* Add padding for spacing */
    border-bottom: 1px solid #ddd;
    /* Separate visually from the grid */
}

.filter-section,
.search-section,
.sort-section {
    display: flex;
    align-items: center;
}

.search-section {
    flex-grow: 1;
    /* Allow search field to expand */
}

.sort-section {
    justify-content: flex-end;
}
</style>
