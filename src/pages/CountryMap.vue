<template>
  <div v-if="!!country">
    <h1 class="title">{{ country?.name?.common }}</h1>
    <country-favorite-button
      :country="country"
      @favoriteClick="toggleFavorite"
    ></country-favorite-button>
    <country-map :country="country"></country-map>
  </div>
</template>
<script>
import countryComponentMixin from "../mixins/countryComponentMixin";
import CountryMap from "../components/Country/CountryMap.vue";
import CountryFavoriteButton from "../components/Country/CountryFavoriteButton.vue";

export default {
  mixins: [countryComponentMixin],
  components: { CountryFavoriteButton, CountryMap },
  name: "CountryMapPage",
};
</script>