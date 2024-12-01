<template>
  <div id="app">
    <HeaderMenu />
    <main>
      <router-view />
      <!-- Displays the active view -->
      <div></div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "@/components/layout/AppFooter.vue";
import HeaderMenu from "@/components/layout/HeaderMenu.vue";

export default {
  components: {
    HeaderMenu,

    AppFooter,
  },
};
</script>

<style>
/* Global styles for layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  /* Fills available space between header and footer */
  padding: 20px;
}
</style>
