<template>
    <div>
        <h3>Data Points Editor</h3>

        <!-- Data points list -->
        <select size="5" v-model="selectedIndex">
            <option v-for="(dataPoint, index) in dataPoints" :key="index" :value="index">
                {{ dataPoint[label1] || "N/A" }}: {{ dataPoint[label2] || "N/A" }}
            </option>
        </select>

        <!-- Input fields for the selected data point -->
        <label>
            {{ label1 || "Label 1" }}: <input v-model="currentLabel" />
        </label>
        <label>
            {{ label2 || "Label 2" }}: <input v-model.number="currentValue" type="number" />
        </label>

        <!-- Buttons -->
        <div class="buttons">
            <button @click="create">Create</button>
            <button @click="update" :disabled="selectedIndex === null">Update</button>
            <button @click="del" :disabled="selectedIndex === null">Delete</button>
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
        const dataPoints = ref([...props.initialDataPoints]); // Clone the initial data points
        const selectedIndex = ref(null);
        const label1 = ref(Object.keys(dataPoints.value[0] || {})[0]);
        const label2 = ref(Object.keys(dataPoints.value[0] || {})[1]);
        const currentLabel = ref("");
        const currentValue = ref(null);

        watch(
            () => dataPoints.value,
            (updatedPoints) => {
                emit("update-data-points", updatedPoints); // Notify parent of updated data points
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
