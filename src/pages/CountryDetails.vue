<template>
  <div>
    <h1 class="title">{{ country?.name?.common }}</h1>
    <country-favorite-button :country="country"></country-favorite-button>
    <country-flag :country="country"></country-flag>
    <country-intro :country="country"></country-intro>
  </div>
</template>
<script>
import CountryIntro from "../components/Country/CountryIntro.vue";
import CountryFlag from '../components/Country/CountryFlag.vue';
import CountryFavoriteButton from "../components/Country/CountryFavoriteButton.vue";

export default {
  name: "CountryDetails",
  components: {
    CountryIntro,
    CountryFlag,
    CountryFavoriteButton
  },
  props: {
    countryCode: {
      type: String,
      default: "",
    },
  },
  computed: {
    country: function () {
      return this.$store.getters.getCountry(this.countryCode);
    },
  },
};
</script>