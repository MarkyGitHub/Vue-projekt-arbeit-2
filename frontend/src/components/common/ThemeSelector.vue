<template>
  <div>
    <label for="theme-selector">Theme:</label>
    <select id="themeSelector" v-model="selectedTheme" @change="changeTheme">
      <option value="theme-default">Standard</option>
      <option value="theme-dark">Dunkel</option>
      <option value="theme-light">Hell</option>
      <option value="theme-minimal">Minimum</option>
      <option value="theme-borderless">Ohne Ränder</option>
      <option value="theme-bootstrap">Bootstrap 4</option>
      <option value="theme-wordpress">WordPress</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ThemeSelector",
  data() {
    return {
      selectedTheme: "theme-default",
    };
  },
  methods: {
    changeTheme() {
      this.$emit("update-theme", this.selectedTheme);
    },
  },
};
</script>
