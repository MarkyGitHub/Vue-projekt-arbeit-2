<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/features">Features</router-link></li>
      </ul>
    </nav>
    <div class="selector">
      <!-- Theme Selector -->
      <ThemeSelector />

      <!-- Language Selector -->
      <LanguageSelector />
    </div>
  </header>
</template>

<script>
import ThemeSelector from "@/components/common/ThemeSelector.vue";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
export default {
  name: "HeaderMenu",
  components: {
    ThemeSelector,
    LanguageSelector,
  },
  methods: {
    updateTheme(theme) {
      console.log("Theme updated:", theme);
    },
    updateLanguage(language) {
      console.log("Language updated:", language);
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

.selectors {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
