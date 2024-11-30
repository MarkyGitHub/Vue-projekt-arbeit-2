<template>
  <div>
    <header>
      <h1>{{ dashboardDetail }}</h1>
    </header>
    <main>
      <!-- Theme auswählen -->
      <div class="selectors">
        <label for="theme-selector">Theme:</label>
        <select
          id="themeSelector"
          v-model="selectedTheme"
          @change="updateTheme"
        >
          <option value="theme-default">Standard</option>
          <option value="theme-dark">Dunkel</option>
          <option value="theme-light">Hell</option>
          <option value="theme-minimal">Minimum</option>
          <option value="theme-borderless">Ohne Ränder</option>
          <option value="theme-bootstrap">Bootstrap 4</option>
          <option value="theme-wordpress">WordPress</option>
        </select>

        <!-- Sprache auswählen -->
        <label for="language-selector">Sprache:</label>
        <select
          id="languageSelector"
          v-model="selectedLanguage"
          @change="updateLanguage"
        >
          <option value="en">Englisch</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>
      <br /><br />

      <button id="back-to-list" @click="goBack">
        Zurück zur Visualisierungstafel
      </button>
      <br /><br />

      <!-- Daten werden hier dargestellt -->
      <div class="data-item-container" id="data-item-container">
        <p>Detail view for data item goes here.</p>
      </div>
    </main>
    <footer>
      <div class="navigation-buttons">
        <button id="prev-button" @click="prevItem">Vorherige</button>
        <button id="next-button" @click="nextItem">Nächste</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardDetail: "Datenansicht",
      selectedTheme: "theme-default",
      selectedLanguage: "en",
    };
  },
  methods: {
    updateTheme() {
      document.body.className = this.selectedTheme;
    },
    updateLanguage() {
      console.log(`Language changed to: ${this.selectedLanguage}`);
    },
    goBack() {
      this.$router.push("/");
    },
    prevItem() {
      console.log("Go to previous item");
    },
    nextItem() {
      console.log("Go to next item");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
