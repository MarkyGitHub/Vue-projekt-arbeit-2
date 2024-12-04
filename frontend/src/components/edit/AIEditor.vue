<template>
  <div>
    <h3>Edit AI Result Item</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>
    <label>Model Type:</label>
    <input v-model="editableItem.modelType" />
    <label>Results:</label>
    <textarea
      v-model="editableItem.results"
      placeholder="Enter JSON data for results"
    ></textarea>
    <button @click="saveChanges">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AIEditor",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const editableItem = ref({ ...props.dataItem }); // Clone data item for editing

    const saveChanges = () => {
      try {
        editableItem.value.results = JSON.parse(editableItem.value.results);
        props.$emit("save", editableItem.value);
      } catch (error) {
        alert("Invalid JSON for results!");
      }
    };

    return { editableItem, saveChanges };
  },
};
</script>

<style scoped>
/* Similar styles to TextEditor */
</style>
