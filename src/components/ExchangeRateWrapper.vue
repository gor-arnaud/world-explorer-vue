<template>
  <div class="chart-container">
    Base currency :
    <currency-selector
      :currencies="currencies"
      :selectedCurrency="baseCurrency"
      @currencyChange="updateBaseCurrency"
    ></currency-selector>
    <exchange-rate-history
      :currency="currency"
    ></exchange-rate-history>
  </div>
</template>
<script>
import CurrencySelector from './CurrencySelector.vue';
import ExchangeRateHistory from './ExchangeRateHistory.vue';

export default {
  name: "ExchangeRateWrapper",
  components: {
    CurrencySelector,
    ExchangeRateHistory
  },
  emits: ["baseCurrencyChange"],
  props: {
    currency: {
        type: String,
        default: ""
    }
  },
  computed: {
    currencies: function() {
      return this.$store.getters.allCurrencies;
    },
    baseCurrency: function() {
      return this.$store.state.baseCurrency;
    }
  },
  methods: {
    updateBaseCurrency: function(newCurrency) {
        this.$store.commit("SET_BASE_CURRENCY", newCurrency);
    }
  }
};
</script>
<style scoped>
  .chart-container {
    background-color: #ffffff;
  }
</style>