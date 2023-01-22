import Vue from 'vue'
import Router from 'vue-router'
import CountryList from '../pages/CountryList';
import CountryDetails from '../pages/CountryDetails';
import CountryCurrencies from '../pages/CountryCurrencies';
import store from '../store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: CountryList
        },
        {
            path: '/:countryCode',
            name: 'country',
            component: CountryDetails,
            props: true
        },
        {
            path: '/:countryCode/currencies',
            name: 'currencies',
            component: CountryCurrencies,
            props: route => { return { country: store.getters.getCountry(route.params.countryCode) } }
        }
    ]
});

export default router;