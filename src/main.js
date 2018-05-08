// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
//import router from './router'
import './static/rem'
import 'swiper/dist/css/swiper.css'
import './static/style/style.css'

Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App},
  template: '<App/>'
})
