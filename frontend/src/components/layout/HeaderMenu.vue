<template>
  <header>
    <nav class="menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/features">Features</router-link></li>
      </ul>
    </nav>
    <div class="selectors">
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
  display: flex;
  justify-content: space-between;
  /* Menu on left, selectors on right */
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 20px;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.menu ul li {
  display: inline;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.menu ul li a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

.selectors {
  display: flex;
  align-items: center;
  gap: 15px;
}

select {
  background-color: #555;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 5px;
}
</style>
