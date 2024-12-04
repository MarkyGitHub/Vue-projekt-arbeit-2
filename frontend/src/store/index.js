import { createStore } from "vuex";
import couchdbUtils from "@/db/couchdbUtils";

export default createStore({
  state: {
    dataItems: [], // Store fetched data items here
  },
  mutations: {
    updateDataItem(state, { index, updatedItem }) {
      // Replace the item at the given index with the updated one
      state.dataItems.splice(index, 1, updatedItem);
    },
    // Example fetchDataItems mutation (if not already implemented)
    setDataItems(state, items) {
      state.dataItems = items;
    },
  },
  actions: {
    async fetchDataItems({ commit }) {
      try {
        const result = await couchdbUtils.getAllDocuments();
        const items = result.rows.map((row) => row.doc); // Extract documents from CouchDB response
        commit("setDataItems", items);
      } catch (error) {
        console.error("Failed to fetch data items:", error.message);
      }
    },
  },
  getters: {
    dataItems: (state) => state.dataItems,
  },
});
