<template>
   <country-exchange-rate :country="country" :currency="defaultCurrency"></country-exchange-rate>
</template>
<script>
import countryComponentMixin from '../mixins/countryComponentMixin';
import CountryExchangeRate from '../components/Country/CountryExchangeRate.vue';

export default {
    name: "CountryCurrencies",
    mixins: [countryComponentMixin],
    components: {
        CountryExchangeRate
    },
    computed: {
        defaultCurrency: function() {
            return Object.keys(this.country.currencies)[0];
        }
    }
}
</script>