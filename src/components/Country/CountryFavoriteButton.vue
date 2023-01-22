<template>
    <FavoriteButton :favorite="isFavorite" @favoriteClick="toggleFavorite"></FavoriteButton>
</template>
<script>
import countryComponentMixin from "../../mixins/countryComponentMixin";
import FavoriteButton from "../FavoriteButton.vue";

export default {
  name: "CountryFavoriteButton",
  mixins: [countryComponentMixin],
  components: { FavoriteButton },
};
</script>