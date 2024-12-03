<template>
  <div>
    <h3>Edit Numerical Item</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>
    <label>Data Points:</label>
    <textarea
      v-model="editableItem.dataPoints"
      placeholder="Enter JSON array of data points"
    ></textarea>
    <button @click="saveChanges">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "NumericalEditor",
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
        editableItem.value.dataPoints = JSON.parse(
          editableItem.value.dataPoints
        );
        props.$emit("save", editableItem.value);
      } catch (error) {
        alert("Invalid JSON for data points!");
      }
    };

    return { editableItem, saveChanges };
  },
};
</script>

<style scoped>
/* Similar styles to TextEditor */
</style>
