<template>
  <ul>
    <li v-for="country in communityCountries" :key="country.cca3">
      {{  country.name.common }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "LanguageCommunity",
  props: {
    languages: [],
  },
  computed: {
    communityCountries: function () {
      return this.$store.state.countries.filter((c) => {
        if (c.languages)
          return (
            Object.keys(c.languages).findIndex((l) =>
              this.languages.includes(l)
            ) !== -1
          );

        return false;
      });
    },
  },
};
</script>