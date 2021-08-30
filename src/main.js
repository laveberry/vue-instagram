import Vue from 'vue'
import App from './App.vue'
import {store} from './assets/store/store.js';

Vue.config.productionTip = false

new Vue({
  store, //vuex를 위한 추가
  render: h => h(App),
}).$mount('#app')
