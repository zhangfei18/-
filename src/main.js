import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Calendar from './components/install';

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.use(Calendar);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
