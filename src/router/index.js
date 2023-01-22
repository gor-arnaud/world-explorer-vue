import Vue from 'vue'
import Router from 'vue-router'
import CountryList from '../pages/CountryList';
import CountryDetails from '../pages/CountryDetails';

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
        }
    ]
});

export default router;