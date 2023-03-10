import Vue from 'vue';
import App from './App.vue'
import store from './store';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false

const fetchCountries = function () {
  return new Promise((resolve, reject) => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
  })
};

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    fetchCountries()
    .then(countries => store.commit("SET_COUNTRIES", countries))
    .catch(error => console.error(error));

    store.commit("GET_FAVORITES");
  }
}).$mount('#app');
