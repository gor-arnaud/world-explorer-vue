<template>
  <span class="icon is-large">
    <i
      class="mdi mdi-36px"
      :class="favorite ? 'mdi-star' : 'mdi-star-outline'"
      @click="$emit('favoriteClick')"
    ></i>
  </span>
</template>
<script>
export default {
    name:"FavoriteButton",
    emits: ["favoriteClick"],
    props: {
        favorite: {
            type: Boolean,
            default: false
        }
    }
};
</script>