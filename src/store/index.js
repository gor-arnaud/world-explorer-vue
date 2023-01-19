import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        countries: [],
        currency: "",
        baseCurrency: ""
    },
    getters: {
        sortedCountries: (state) => {
            return [...state.countries].sort((c1, c2) =>
                c1.name.common.localeCompare(c2.name.common)
            );
        },
        filteredCountries: (state, getters) => (filter) => {
            return getters.sortedCountries.filter((c) =>
                c.name.common.toLowerCase().includes(filter.toLowerCase())
            );
        },
        allCurrencies: (state, getters) => {
            if (getters.sortedCountries.length > 0) {
                const currencies = [];
        
                getters.sortedCountries.forEach((country) => {
                  if (country.currencies)
                    currencies.push(...Object.keys(country.currencies));
                });
                return [...new Set(currencies)].sort();
              }
        
              return [];
        }
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.countries = countries;
        },
        SET_BASE_CURRENCY(state, currency) {
            state.baseCurrency = currency;
        }
    }
})