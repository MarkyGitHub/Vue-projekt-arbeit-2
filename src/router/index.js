"use strict";

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import FeaturesView from "@/views/FeaturesView.vue";
import store from "@/store"; // Import Vuex store
import sampleData from "@/assets/data/sample-data.json"; // Import JSON data
import couchdbUtils from "@/db/couchdbUtils";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/features", name: "Features", component: FeaturesView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Fetch data before rendering any route
router.beforeEach(async (to, from, next) => {
  if (!store.state.dataItems.length) {
    try {
      console.log("Checking if CouchDB needs to be updated...");

      // Step 1: Perform bulk update if no data exists in CouchDB
      const existingDocs = await couchdbUtils.getAllDocuments(); // Check existing documents in CouchDB
      if (!existingDocs.length) {
        console.log("No data found in CouchDB. Performing bulk update...");

        await couchdbUtils.bulkUpdate(sampleData.dataItems);
        console.log("Bulk update completed.");
      } else {
        console.log("Data already exists in CouchDB. Skipping bulk update.");
      }

      // Step 2: Fetch data from CouchDB into Vuex
      console.log("Fetching data items from CouchDB...");
      await store.dispatch("fetchDataItems"); // Dispatch Vuex action to fetch data
      console.log("Data items fetched successfully.");
    } catch (error) {
      console.error("Error during initialization:", error.message);
    }
  }
  next(); // Allow navigation
});

export default router;
