<template>
  <div v-if="!!country">
    <h1 class="title">Communauté de langage de {{ country?.name?.common }}</h1>
    <country-language-community :country="country"></country-language-community>
  </div>
</template>
<script>
import countryComponentMixin from "../mixins/countryComponentMixin";
import CountryLanguageCommunity from "../components/Country/CountryLanguageCommunity.vue";

export default {
  name: "CountryLanguageCOmmunityPage",
  mixins: [countryComponentMixin],
  components: { CountryLanguageCommunity },
};
</script>