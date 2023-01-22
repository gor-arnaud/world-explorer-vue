<template>
  <div>
    <h1>{{ title }}</h1>
    Filter : <input type="text" v-model="filter" /><br />
    <input type="checkbox" v-model="onlyFavorites" />
    <label for="checkbox">Only Favorites</label> <br />
    Base currency :
    <currency-selector
      :currencies="allCurrencies"
      :selectedCurrency="baseCurrency"
      @currencyChange="updateBaseCurrency"
    ></currency-selector>
    <table class="table">
      <thead>
        <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>Languages</th>
          <th>Currencies</th>
          <th>Map</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in currentPage" v-bind:key="country.cca3">
          <td>
            <country-flag
              :country="country"
              @click.native="openFlag(country)"
              class="flag-thumbnail"
            ></country-flag>
          </td>
          <td>
            <router-link
              :to="{
                name: 'country',
                params: { countryCode: country.cca3 },
              }"
            >
              {{ country.name.common }}
            </router-link>
          </td>
          <td>
            <ul>
              <li v-for="language in country.languages" :key="language">
                {{ language }}
              </li>
            </ul>
          </td>
          <td>
            <router-link
              :to="{
                name: 'currencies',
                params: { countryCode: country.cca3 },
              }"
            >
              Taux de change
            </router-link>
          </td>
          <td>
            <button class="button is-ghost" @click="openMap(country)">
              Map
            </button>
          </td>
          <td>
            <country-favorite-button
              :country="country"
            ></country-favorite-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal" :class="{ 'is-active': showOverlay }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <component
          :is="targetComponent"
          v-bind="targetProperties"
          v-on="targetEventHandlers"
          :class="targetCssClass"
        ></component>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeOverlay"
      ></button>
    </div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous" @click="pageIndex--" v-if="pageIndex > 0">Previous</a>
      <a class="pagination-next" @click="pageIndex++" v-if="pageIndex < numberOfPages - 1">Next page</a>
      <ul class="pagination-list">
        <li v-for="pageNumber in numberOfPages" :key="pageNumber">
          <a
            class="pagination-link"
            :class="{ 'is-current': pageNumber === pageIndex + 1 }"
            :aria-label="`Page ${pageNumber}`"
            aria-current="page"
            @click="pageIndex = pageNumber - 1"
            >{{ pageNumber }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
  
  <script>
import CountryFlag from "../components/Country/CountryFlag.vue";
import CountryMap from "../components/Country/CountryMap.vue";
import CurrencySelector from "../components/CurrencySelector.vue";
import CountryFavoriteButton from "../components/Country/CountryFavoriteButton.vue";

export default {
  name: "CountryList",
  components: {
    CountryFlag,
    CountryMap,
    CurrencySelector,
    CountryFavoriteButton,
  },
  data() {
    return {
      title: "World Explorer",
      filter: "",
      targetComponent: "",
      targetCountry: null,
      targetCurrency: "",
      onlyFavorites: false,
      itemsPerPage: 10,
      pageIndex: 0,
    };
  },
  methods: {
    updateTargetCurrency(newCurrency) {
      this.targetCurrency = newCurrency;
    },
    updateBaseCurrency(newCurrency) {
      this.$store.commit("SET_BASE_CURRENCY", newCurrency);
    },
    openFlag: function (country) {
      this.targetCountry = country;
      this.targetComponent = "CountryFlag";
    },
    gotoDetails: function (country) {
      this.$router.push({
        name: "country",
        params: { countryCode: country.cca3 },
      });
    },
    openMap: function (country) {
      this.targetCountry = country;
      this.targetComponent = "CountryMap";
    },
    closeOverlay: function () {
      this.targetComponent = "";
    },
    addCountryToFavorites: function (country) {
      this.$store.commit("ADD_FAVORITE", country);
    },
    removeCountryFromFavorites: function (country) {
      this.$store.commit("REMOVE_FAVORITE", country);
    },
    isCountryFavorite: function (country) {
      return this.$store.getters.isCountryFavorite(country);
    },
    toggleFavorite: function (country) {
      if (this.isCountryFavorite(country))
        this.removeCountryFromFavorites(country);
      else this.addCountryToFavorites(country);
    },
  },
  computed: {
    filteredCountries: function () {
      if (this.onlyFavorites)
        return this.$store.getters
          .filteredCountries(this.filter)
          .filter((c) => this.isCountryFavorite(c));
      else return this.$store.getters.filteredCountries(this.filter);
    },
    itemsOffset: function() {
      return this.pageIndex * this.itemsPerPage;
    },
    currentPage: function () {
      if (!!this.filteredCountries && this.filteredCountries.length > 0)
        return this.filteredCountries.slice(
          this.itemsOffset,
          this.itemsOffset + this.itemsPerPage
        );

      return [];
    },
    targetProperties: function () {
      let props = {
        country: this.targetCountry,
      };

      switch (this.targetComponent) {
        case "CountryFlag":
          props.showFavorite = true;
          break;
        case "CountryIntro":
          break;
        case "CountryMap":
          break;
        case "CountryExchangeRate":
          props.currency = this.targetCurrency;
          break;
        default:
          props = null;
          break;
      }

      return props;
    },
    targetEventHandlers: function () {
      return {};
    },
    targetCssClass: function () {
      if (this.targetComponent === "CountryIntro") return "country-intro";

      return "";
    },
    showOverlay: function () {
      return this.targetComponent !== "";
    },
    allCurrencies: function () {
      return this.$store.getters.allCurrencies;
    },
    baseCurrency: function () {
      return this.$store.state.baseCurrency;
    },
    numberOfPages: function () {
      if (!!this.filteredCountries && this.filteredCountries.length > 0)
        return Math.ceil(this.filteredCountries.length / this.itemsPerPage);

      return 0;
    },
  },
};
</script>
  
  <style scoped>
span.icon > i {
  cursor: pointer;
}

.flag-thumbnail {
  cursor: pointer;
}

.country-intro {
  background-color: #ffffff;
  color: #000000;
}
</style>
  