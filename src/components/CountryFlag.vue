<template>
  <div>
    <div class="fav-overlay" v-if="isFavorite">
      <span class="icon is-large has-text-warning">
        <i class="mdi mdi-48px mdi-star"></i>
      </span>
    </div>
    <embedded-image :src="country.flags.png"></embedded-image>
  </div>
</template>
<script>
import EmbeddedImage from "./EmbeddedImage.vue";

export default {
  name: "CountryFlag",

  props: {
    country: {
      type: Object,
      default: null,
    },
  },
  components: { EmbeddedImage },
  computed: {
    isFavorite: function () {
      return this.$store.getters.isCountryFavorite(this.country);
    },
  },
};
</script>
<style scoped>
.fav-overlay {
  position: absolute;
  z-index: 10;
  left: 10px;
  top: 10px;
}
</style>