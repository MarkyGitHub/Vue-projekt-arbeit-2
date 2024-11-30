<template>
  <div>
    <header>
      <h1>Visualisierungstafel</h1>
    </header>
    <main>
      <ThemeSelector @update-theme="updateTheme" />
      <LanguageSelector @update-language="updateLanguage" />
      <TypeFilter @filter-type="filterByType" />
      <SearchField @search-query="searchByTitle" />
      <SortButton @sort-items="sortItems" />
      <div id="data-cards-container" class="data-grid">
        <div v-for="item in filteredItems" :key="item.id" class="data-card">
          {{ item.title }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ThemeSelector from "@/components/ThemeSelector.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import TypeFilter from "@/components/TypeFilter.vue";
import SearchField from "@/components/SearchField.vue";
import SortButton from "@/components/SortButton.vue";

export default {
  name: "MainIndex",
  components: {
    ThemeSelector,
    LanguageSelector,
    TypeFilter,
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
    updateTheme(theme) {
      console.log("Theme updated:", theme);
    },
    updateLanguage(language) {
      console.log("Language updated:", language);
    },
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
