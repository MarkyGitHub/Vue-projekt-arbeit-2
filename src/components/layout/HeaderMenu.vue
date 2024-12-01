<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/features">Features</router-link></li>
      </ul>
    </nav>
    <div>
      <ThemeSelector @update-theme="updateTheme" />
      <LanguageSelector @update-language="updateLanguage" />
      <TypeFilter @filter-type="filterByType" />
      <SearchField @search-query="searchByTitle" />
      <SortButton @sort-items="sortItems" />
    </div>
  </header>
</template>

<script>

import ThemeSelector from "@/components/common/ThemeSelector.vue";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import DataTypeFilter from "@/components/common/DataTypeFilter.vue";
import SearchField from "@/components/common/SearchField.vue";
import SortButton from "@/components/common/SortButton.vue";

export default {
  name: "HeaderMenu",
  components: {
    ThemeSelector,
    LanguageSelector,
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

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
