<template>
  <div class="main-container">
    Country currency :
    <currency-selector
      :currencies="countryCurrencies"
      :selected-currency="localCurrency"
      @currencyChange="updateLocalCurrency"
    ></currency-selector>
    <exchange-rate-wrapper
      :currency="localCurrency"
    ></exchange-rate-wrapper>
  </div>
</template>
<script>
import ExchangeRateWrapper from "./ExchangeRateWrapper.vue";
import CurrencySelector from "./CurrencySelector.vue";

export default {
  name: "CountryExchangeRate",
  components: { ExchangeRateWrapper, CurrencySelector },
  emits: ["baseCurrentyChange"],
  data() {
    return {
      localCurrency: "",
    };
  },
  props: {
    country: {
      type: Object,
      default: null,
    },
    currency: {
      type: String,
      default: "",
    }
  },
  computed: {
    countryCurrencies: function () {
      if (this.country) return Object.keys(this.country.currencies);

      return [];
    },
  },
  methods: {
    updateLocalCurrency(newCurrency) {
        this.localCurrency = newCurrency;
    }
  },
  mounted() {
    this.localCurrency = this.currency;
  },
};
</script>
<style scoped>
  .main-container {
    background-color: #ffffff;
  }
</style>