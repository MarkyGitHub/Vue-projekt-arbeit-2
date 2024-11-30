<template>
  <div>
    <label for="language-selector">Sprache:</label>
    <select
      id="languageSelector"
      v-model="selectedLanguage"
      @change="changeLanguage"
    >
      <option value="en">Englisch</option>
      <option value="de">Deutsch</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LanguageSelector",
  data() {
    return {
      selectedLanguage: "en",
    };
  },
  methods: {
    changeLanguage() {
      this.$emit("update-language", this.selectedLanguage);
    },
  },
};
</script>
