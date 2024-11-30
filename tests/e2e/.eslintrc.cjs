module.exports = {
  env: {
    browser: true,
    node: true,
    "cypress/globals": true, // Add Cypress globals
  },
  plugins: ["cypress"], // Add Cypress plugin
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:cypress/recommended", // Extend Cypress rules
  ],
};
