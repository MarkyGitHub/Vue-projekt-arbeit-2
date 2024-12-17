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
    <div class="button-group">
      <button class="save-button" @click="$emit('save', editableItem)">Save</button>
      <button class="create-button" @click="createNewItem">Create</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import couchdbUtils from "@/db/couchdbUtils"; // Import CouchDB utility

export default {
  name: "TextEditor",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editableItem = ref({ ...props.dataItem }); // Clone data item for editing
    // Create a new item
    const createNewItem = async () => {
      try {
        // Generate a unique ID using a UUID generator or similar method
        const newId = crypto.randomUUID(); // Modern browsers support this
        const newItem = {
          ...editableItem.value,
          _id: newId, // Assign a unique ID
        };

        // Insert the new item into CouchDB
        const result = await couchdbUtils.insertDocument(newItem);

        console.log("New item created:", result);

        // Emit a creation event with the new item
        emit("create", newItem);
      } catch (error) {
        console.error("Error creating new item:", error.message);
      }
    };
    return { editableItem, createNewItem };
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

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-button,
.create-button {
  flex: 1;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.save-button {
  background-color: #42b983;
  color: white;
}

.save-button:hover {
  background-color: #369a6e;
}

.create-button {
  background-color: #007bff;
  color: white;
}

.create-button:hover {
  background-color: #0056b3;
}
</style>
