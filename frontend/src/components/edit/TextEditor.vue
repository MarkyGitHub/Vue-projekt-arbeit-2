<template>
  <div>
    <h3>Edit Text Item</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>
    <button @click="$emit('save', editableItem)">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TextEditor",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const editableItem = ref({ ...props.dataItem }); // Clone data item for editing
    return { editableItem };
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369a6e;
}
</style>
