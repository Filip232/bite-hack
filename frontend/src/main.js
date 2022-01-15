import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.73:3000/';
axios.defaults.headers.post['crossDomain'] = 'true';
import "carbon-components/css/carbon-components.min.css";
import CarbonComponentsVue from "@carbon/vue";

Vue.use(CarbonComponentsVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
