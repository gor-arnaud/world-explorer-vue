<template>
  <div>
    <h2>{{ title }}</h2>
    <input type="text" v-model="filter" />
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
  },
  computed: {
    sortedCountries: function () {
      return this.$store.getters.sortedCountries;
    },
    filteredCountries: function () {
      return this.$store.getters.filteredCountries(this.filter);
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
    baseCurrency: function() {
      return this.$store.state.baseCurrency;
    }
  }
};
</script>

<style>
@import "~bulma/css/bulma.css";
</style>
