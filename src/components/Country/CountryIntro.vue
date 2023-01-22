<template>
  <wikipedia-intro :query="country.name.common"></wikipedia-intro>
</template>
<script>
import WikipediaIntro from "../WikipediaIntro.vue";
import countryComponentMixin from "../../mixins/countryComponentMixin";

export default {
  name: "CountryIntro",
  components: { WikipediaIntro },
  mixins: [countryComponentMixin]
};
</script>