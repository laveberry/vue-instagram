import Vue from 'vue'
import App from './App.vue'
import {store} from './assets/store/store.js';
import {auth} from './assets/store/auth.js';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

new Vue({
  store, //vuex를 위한 추가
  auth,
  VeeValidate,
  render: h => h(App),
}).$mount('#app')
