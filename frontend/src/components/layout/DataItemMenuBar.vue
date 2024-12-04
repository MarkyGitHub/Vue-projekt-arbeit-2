<template>
    <div class="data-item-menu-bar">
        <div class="data-tye-selectors">
            <!-- Data Type Filter -->
            <DataTypeFilter @filter-type="filterByType" />
        </div>

        <div class="actions">
            <!-- Search Field -->
            <SearchField @search-query="searchByTitle" />

            <!-- Sort Button -->
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