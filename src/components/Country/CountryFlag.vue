<template>
  <div class="flag-wrapper">
    <div class="fav-overlay" v-if="showFavorite && isFavorite">
      <span class="icon is-large has-text-warning">
        <i class="mdi mdi-48px mdi-star"></i>
      </span>
    </div>
    <embedded-image :src="country.flags.png"></embedded-image>
  </div>
</template>
<script>
import EmbeddedImage from "../EmbeddedImage.vue";
import countryComponentMixin from "../../mixins/countryComponentMixin";

export default {
  name: "CountryFlag",
  props: {
    showFavorite: {
      type: Boolean,
      default: false
    }
  },
  components: { EmbeddedImage },
  mixins: [countryComponentMixin],
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

.flag-wrapper {
  pointer-events: all;
}
</style>