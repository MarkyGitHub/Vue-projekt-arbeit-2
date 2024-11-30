import { createStore } from "vuex";
import couchdbUtils from "@/db/couchdbUtils";

export default createStore({
  state: {
    dataItems: [], // Store fetched data items here
  },
  mutations: {
    setDataItems(state, dataItems) {
      state.dataItems = dataItems;
    },
  },
  actions: {
    async fetchDataItems({ commit }) {
      try {
        const dataItems = await couchdbUtils.getAllDocuments(); // Fetch data from CouchDB
        commit("setDataItems", dataItems); // Save data to state
      } catch (error) {
        console.error("Error fetching data items:", error.message);
        throw error; // Handle error in the UI if necessary
      }
    },
  },
  getters: {
    dataItems: (state) => state.dataItems,
  },
});
