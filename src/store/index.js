import Vue from 'vue';
import Vuex from 'vuex';
import createPersistencePlugin from "./plugins/persistencePlugin";

Vue.use(Vuex);

const persistencePlugin = createPersistencePlugin();

export default new Vuex.Store({
    state: {
        countries: [],
        currency: "",
        baseCurrency: "",
        favorites: []
    },
    plugins: [persistencePlugin],
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
        },
        favoriteCountries: (state, getters) => {
            return getters.sortedCountries.filter(c => state.favorites.includes(c.cca3));
        },
        isCountryFavorite: (state) => (country) => {
            return state.favorites.includes(country.cca3);
        },
        getCountry: (state) => (code) => {
            return state.countries.find(c => c.cca3 === code);
        }
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.countries = countries;
        },
        SET_BASE_CURRENCY(state, currency) {
            state.baseCurrency = currency;
        },
        ADD_FAVORITE(state, country) {
            if (!state.favorites.includes(country.cca3))
                state.favorites.push(country.cca3);
        },
        REMOVE_FAVORITE(state, country) {
            const index = state.favorites.indexOf(country.cca3);

            if (index !== -1)
                state.favorites.splice(index, 1);
        },
        GET_FAVORITES() {},
        SET_FAVORITES(state, favorites) {
            state.favorites = favorites;
        }
    }
})