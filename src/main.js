"use strict";

import { createApp } from "vue";
import App from "@/App.vue";
import "./registerServiceWorker";
import router from "@/router";
import store from "@/store";
import { createI18n } from "vue-i18n";

import couchdbUtils from "@/db/couchdbUtils";
import { syncDatabases } from "@/db/pouchdbClient"; // Import syncDatabases function
import sampleData from "@/assets/data/sample-data.json"; // Import JSON file

// Pre-load all translations
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";

const messages = { en, de, fr, es };

const i18n = createI18n({
  legacy: false, // Switch to Composition API mode
  globalInjection: true, // Allow $t to be used globally
  locale: "de", // Default locale
  fallbackLocale: "en", // Fallback locale
  messages, // Translation messages
  datetimeFormats: {
    en: { long: { year: "numeric", month: "long", day: "numeric" } },
    de: { long: { year: "numeric", month: "long", day: "numeric" } },
    fr: { long: { year: "numeric", month: "long", day: "numeric" } },
    es: { long: { year: "numeric", month: "long", day: "numeric" } },
  },
  numberFormats: {
    en: { currency: { style: "currency", currency: "USD" } },
    de: { currency: { style: "currency", currency: "EUR" } },
    fr: { currency: { style: "currency", currency: "EUR" } },
    es: { currency: { style: "currency", currency: "EUR" } },
  },
});

const configureCORS = async () => {
  const adminCredentials = {
    username: "admin",
    password: "password",
  };

  const corsSettings = [
    {
      url: "http://127.0.0.1:5984/_node/_local/_config/httpd/enable_cors",
      value: '"true"',
    },
    {
      url: "http://127.0.0.1:5984/_node/_local/_config/cors/origins",
      value: '"*"',
    },
    {
      url: "http://127.0.0.1:5984/_node/_local/_config/cors/credentials",
      value: '"true"',
    },
    {
      url: "http://127.0.0.1:5984/_node/_local/_config/cors/methods",
      value: '"GET, PUT, POST, DELETE, OPTIONS"',
    },
    {
      url: "http://127.0.0.1:5984/_node/_local/_config/cors/headers",
      value: '"accept, authorization, content-type, origin"',
    },
  ];

  for (const setting of corsSettings) {
    try {
      const response = await fetch(setting.url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${adminCredentials.username}:${adminCredentials.password}`
          )}`,
        },
        body: setting.value,
      });

      if (response.ok) {
        console.log(`${setting.url} configured successfully.`);
      } else {
        console.error(
          `Failed to set ${setting.url}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error setting ${setting.url}:`, error.message);
    }
  }
};

(async () => {
  const app = createApp(App);

  try {
    console.log("Initializing CouchDB...");

    // Configure CORS dynamically
    await configureCORS();

    // Perform bulk update only if the database is empty
    const existingDocs = await couchdbUtils.getAllDocuments();
    if (!existingDocs || existingDocs.length === 0) {
      console.log("Performing bulk update with initial data...");
      await couchdbUtils.bulkUpdate(sampleData.dataItems);
      console.log("Bulk update completed.");
    } else {
      console.log("Database already seeded. Skipping bulk update.");
    }

    // Fetch data from CouchDB
    console.log("Fetching data items from CouchDB...");
    const dataItems = await couchdbUtils.getAllDocuments();
    console.log("Data items fetched successfully:", dataItems);

    // Save data to Vuex for centralized management
    store.commit("setDataItems", dataItems); // Assuming a Vuex mutation exists for this

    // Initialize real-time database synchronization
    console.log("Starting real-time database synchronization...");
    syncDatabases();
    console.log("Real-time synchronization initialized.");
  } catch (error) {
    console.error("Error during app initialization:", error.message);
  }

  app.config.compilerOptions.isCustomElement = (tag) => tag === "type-filter";

  // Mount the app
  app.use(i18n).use(router).use(store).mount("#app");
})();
