import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        countries: []
    },
    getters: {
        sortedCountries: function (state) {
            return [...state.countries].sort((c1, c2) =>
                c1.name.common.localeCompare(c2.name.common)
            );
        }
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.countries = countries;
        }
    }
})