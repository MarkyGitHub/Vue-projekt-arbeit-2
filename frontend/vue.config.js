"use strict";

import { defineConfig } from "@vue/cli-service";
import webpack from "webpack";

export default defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/project_arbeit_2db": {
        target: "http://127.0.0.1:5984",
        changeOrigin: true,
        pathRewrite: { "^/project_arbeit_2db": "/project_arbeit_2db" },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Disable hydration mismatch details
      }),
    ],
  },
});
