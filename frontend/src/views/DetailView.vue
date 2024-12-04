<template>
    <div class="detail-view">
        <!-- Render a single data item using the appropriate renderer -->
        <component :is="getRenderer(currentItem.type)" v-if="currentItem" :dataItem="currentItem" />
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import TextRenderer from "@/components/layout/TextRenderer.vue";
import ImageRenderer from "@/components/layout/ImageRenderer.vue";
import VideoRenderer from "@/components/layout/VideoRenderer.vue";
import NumericalRenderer from "@/components/layout/NumericalRenderer.vue";
import AIRenderer from "@/components/layout/AIRenderer.vue";

export default {
    components: {
        TextRenderer,
        ImageRenderer,
        VideoRenderer,
        NumericalRenderer,
        AIRenderer,
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        // Get the ID from the route parameters
        const itemId = computed(() => route.params.id);

        // Find the item by its ID from Vuex
        const currentItem = computed(() => {
            return store.getters.dataItems.find((item) => item.id === itemId.value);
        });

        // Map data types to their corresponding renderer components
        const getRenderer = (type) => {
            const rendererMap = {
                text: "TextRenderer",
                image: "ImageRenderer",
                video: "VideoRenderer",
                numerical: "NumericalRenderer",
                ai_result: "AIRenderer",
            };
            return rendererMap[type] || "div"; // Default to a generic div
        };

        return {
            currentItem,
            getRenderer,
        };
    },
};
</script>

<style scoped>
.detail-view {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
}
</style>