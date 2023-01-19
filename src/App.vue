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
          <th>Name</th>
          <th>Languages</th>
          <th>Currencies</th>
          <th>Map</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in filteredCountries" v-bind:key="country.fifa">
          <td>
            <button class="button is-ghost" @click="openFlag(country)">
              {{ country.name.common }}
            </button>
          </td>
          <td>
            <ul>
              <li v-for="language in country.languages" :key="language">
                {{ language }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="(cur, key) in country.currencies" :key="key">
                <button
                  class="button is-ghost"
                  @click="openExchangeRate(country, key)"
                >
                  {{ key }}
                </button>
              </li>
            </ul>
          </td>
          <td>
            <button class="button is-ghost" @click="openMap(country)">
              Map
            </button>
          </td>
          <td>
            <span class="icon is-large">
              <i
                class="mdi mdi-36px"
                :class="{
                  'mdi-star': isCountryFavorite(country),
                  'mdi-star-outline': !isCountryFavorite(country),
                }"
                @click="toggleFavorite(country)"
              ></i>
            </span>
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
        ></component>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeOverlay"
      ></button>
    </div>
  </div>
</template>

<script>
import CountryFlag from "./components/CountryFlag.vue";
import CountryMap from "./components/CountryMap.vue";
import CountryExchangeRate from "./components/CountryExchangeRate.vue";
import CurrencySelector from "./components/CurrencySelector.vue";

export default {
  name: "App",
  components: {
    CountryFlag,
    CountryMap,
    CountryExchangeRate,
    CurrencySelector,
  },
  data() {
    return {
      title: "World Explorer",
      filter: "",
      targetComponent: "",
      targetCountry: null,
      targetCurrency: "",
      onlyFavorites: false,
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
    openMap: function (country) {
      this.targetCountry = country;
      this.targetComponent = "CountryMap";
    },
    openExchangeRate: function (country, currency) {
      this.targetCountry = country;
      this.targetCurrency = currency;
      this.targetComponent = "CountryExchangeRate";
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
    targetProperties: function () {
      let props = {};

      switch (this.targetComponent) {
        case "CountryFlag":
        case "CountryMap":
          props.country = this.targetCountry;
          break;
        case "CountryExchangeRate":
          props.country = this.targetCountry;
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
    showOverlay: function () {
      return this.targetComponent !== "";
    },
    allCurrencies: function () {
      return this.$store.getters.allCurrencies;
    },
    baseCurrency: function () {
      return this.$store.state.baseCurrency;
    },
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
</style>

<style scoped>
span.icon > i {
  cursor: pointer;
}
</style>
