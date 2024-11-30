<template>
  <div>
    <h2>{{ dataItem.title }}</h2>
    <img :src="dataItem.imageUrl" :alt="dataItem.title" />
    <p>{{ dataItem.description }}</p>
    <p v-if="dataItem.annotations">
      Annotations: {{ dataItem.annotations.join(", ") }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
