import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import localIp from '@/utils/localIp';

console.log(localIp);
axios.defaults.baseURL = localIp;
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
