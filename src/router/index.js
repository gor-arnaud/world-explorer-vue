import Vue from 'vue'
import Router from 'vue-router'
import CountryList from '../pages/CountryList';
import CountryDetails from '../pages/CountryDetails';
import CountryCurrencies from '../pages/CountryCurrencies';
import CountryMap from '../pages/CountryMap';
import store from '../store';

Vue.use(Router)

const getCountryByCode = (code) => {
    { return store.getters.getCountry(code) }
}

const getCountryPropsByRoute = (route) => {
    { return { country: getCountryByCode(route.params.countryCode) } }
}

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
            props: route => getCountryPropsByRoute(route)
        },
        {
            path: '/:countryCode/map',
            name: 'map',
            component: CountryMap,
            props: route => getCountryPropsByRoute(route)
        }
    ]
});

export default router;