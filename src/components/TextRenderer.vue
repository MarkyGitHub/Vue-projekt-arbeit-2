<template>
  <div>
    <h2>{{ dataItem.title }}</h2>
    <p>{{ dataItem.description }}</p>
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
