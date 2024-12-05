<template>
    <div class="ai-results-editor">
        <h3>AI Results Editor</h3>

        <!-- Results List -->
        <div class="results-list">
            <select size="5" v-model="selectedIndex">
                <option v-for="(result, index) in results" :key="index" :value="index">
                    {{ formattedResult(result) }}
                </option>
            </select>
        </div>

        <!-- Input Fields for Selected Result -->
        <div class="result-form">
            <div class="form-group" v-for="(value, key) in editableResult" :key="key">
                <label>{{ key }}:</label>
                <input v-model="editableResult[key]" :type="getInputType(value)" />
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            <button @click="create" class="btn create">Create</button>
            <button @click="update" :disabled="selectedIndex === null" class="btn update">
                Update
            </button>
            <button @click="del" :disabled="selectedIndex === null" class="btn delete">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    name: "AIResultsEditor",
    props: {
        initialResults: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {
        const results = ref([...props.initialResults]); // Clone initial results
        const selectedIndex = ref(null);
        const editableResult = ref({});

        // Watch for changes in selectedIndex to populate editableResult
        watch(selectedIndex, (index) => {
            editableResult.value = index !== null ? { ...results.value[index] } : {};
        });

        // Watch for changes in results and notify the parent component
        watch(
            () => results.value,
            (updatedResults) => {
                emit("update-results", updatedResults);
            },
            { deep: true }
        );

        // Format the result for display in the list
        const formattedResult = (result) =>
            Object.values(result).join(" | ");

        // Determine input type (e.g., number or text) based on value
        const getInputType = (value) =>
            typeof value === "number" ? "number" : "text";

        // Create a new result
        const create = () => {
            results.value.push({});
        };

        // Update the selected result
        const update = () => {
            if (selectedIndex.value !== null) {
                results.value[selectedIndex.value] = { ...editableResult.value };
            }
        };

        // Delete the selected result
        const del = () => {
            if (selectedIndex.value !== null) {
                results.value.splice(selectedIndex.value, 1);
                selectedIndex.value = null;
            }
        };

        return {
            results,
            selectedIndex,
            editableResult,
            formattedResult,
            getInputType,
            create,
            update,
            del,
        };
    },
};
</script>

<style scoped>
.ai-results-editor {
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.results-list select {
    width: 100%;
    height: auto;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.result-form {
    margin: 20px 0;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    color: #fff;
}

.btn.create {
    background-color: #42b983;
}

.btn.update {
    background-color: #ffa500;
}

.btn.delete {
    background-color: #dc3545;
}

.btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}
</style>