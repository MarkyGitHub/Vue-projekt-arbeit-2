<template>
  <div class="text-editor">
    <h3>Edit Text Item</h3>

    <!-- Title Input -->
    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" v-model="editableItem.title" />
    </div>

    <!-- Description Textarea -->
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="editableItem.description"></textarea>
    </div>

    <!-- Content Type -->
    <div class="form-group">
      <label for="contentType">Content Type:</label>
      <input id="contentType" v-model="editableItem.contentType" placeholder="Enter content type" />
    </div>

    <!-- Keywords -->
    <div class="form-group">
      <label for="keywords">Keywords:</label>
      <input id="keywords" v-model="editableItem.keywords" placeholder="Enter keywords (comma-separated)" />
    </div>

    <!-- Source URL -->
    <div class="form-group">
      <label for="sourceUrl">Source URL:</label>
      <input id="sourceUrl" v-model="editableItem.sourceUrl" type="url" placeholder="Enter the source URL" />
    </div>

    <!-- Thumbnail -->
    <div class="form-group">
      <label for="thumbnail">Thumbnail URL:</label>
      <input id="thumbnail" v-model="editableItem.thumbnail" type="url" placeholder="Enter the thumbnail URL" />
    </div>

    <!-- Save Button -->
    <button class="save-button" @click="$emit('save', editableItem)">Save</button>
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
.text-editor {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  height: 100px;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.save-button:hover {
  background-color: #369a6e;
}

.save-button:active {
  background-color: #2b8355;
}
</style>
