<template>
  <div id="app">
    <HeaderMenu />
    <main>
      <router-view />
      <!-- Displays the active view -->
    </main>
    <Footer />
  </div>
  <div>
    <HeaderMenu />
    <DetailComponent />
    <AppFooter />
    <MainIndex />
  </div>
</template>

<script>
import DetailComponent from "@/components/DetailComponent.vue";
import AppFooter from "@/components/AppFooter.vue";
import MainIndex from "@/components/MainIndex.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";

export default {
  components: {
    HeaderMenu,
    DetailComponent,
    AppFooter,
    MainIndex,
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
  flex: 1; /* Fills available space between header and footer */
  padding: 20px;
}
</style>
