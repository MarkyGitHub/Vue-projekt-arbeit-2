<template>
    <div class="data-points-editor">
        <h3>Data Points Editor</h3>

        <!-- Data Points List -->
        <div class="data-points-list">
            <select size="5" v-model="selectedIndex">
                <option v-for="(dataPoint, index) in dataPoints" :key="index" :value="index">
                    {{ dataPoint[label1] || "N/A" }}: {{ dataPoint[label2] || "N/A" }}
                </option>
            </select>
        </div>

        <!-- Input Fields for Data Point -->
        <div class="data-point-form">
            <div class="form-group">
                <label>{{ label1 || "Label 1" }}:</label>
                <input v-model="currentLabel" />
            </div>
            <div class="form-group">
                <label>{{ label2 || "Label 2" }}:</label>
                <input v-model.number="currentValue" type="number" />
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            <button @click="create" class="btn create">Create</button>
            <button @click="update" :disabled="selectedIndex === null" class="btn update">Update</button>
            <button @click="del" :disabled="selectedIndex === null" class="btn delete">Delete</button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    name: "DataPointsEditor",
    props: {
        initialDataPoints: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {
        const dataPoints = ref([...props.initialDataPoints]); // Clone data points
        const selectedIndex = ref(null);
        const label1 = ref(Object.keys(dataPoints.value[0] || {})[0]);
        const label2 = ref(Object.keys(dataPoints.value[0] || {})[1]);
        const currentLabel = ref("");
        const currentValue = ref(null);

        watch(
            () => dataPoints.value,
            (updatedPoints) => {
                emit("update-data-points", updatedPoints); // Notify parent
            },
            { deep: true }
        );

        watch(selectedIndex, (index) => {
            if (index !== null && dataPoints.value[index]) {
                currentLabel.value = dataPoints.value[index][label1.value] || "";
                currentValue.value = dataPoints.value[index][label2.value] || null;
            } else {
                currentLabel.value = "";
                currentValue.value = null;
            }
        });

        const create = () => {
            dataPoints.value.push({
                [label1.value]: currentLabel.value || "New Label",
                [label2.value]: currentValue.value || 0,
            });
            currentLabel.value = "";
            currentValue.value = null;
        };

        const update = () => {
            if (selectedIndex.value !== null && dataPoints.value[selectedIndex.value]) {
                dataPoints.value[selectedIndex.value] = {
                    [label1.value]: currentLabel.value || "Updated Label",
                    [label2.value]: currentValue.value || 0,
                };
            }
        };

        const del = () => {
            if (selectedIndex.value !== null) {
                dataPoints.value.splice(selectedIndex.value, 1);
                selectedIndex.value = null;
            }
        };

        return {
            dataPoints,
            selectedIndex,
            currentLabel,
            currentValue,
            label1,
            label2,
            create,
            update,
            del,
        };
    },
};
</script>

<style scoped>
.data-points-editor {
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.data-points-list select {
    width: 100%;
    height: auto;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.data-point-form {
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