// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueProgressiveImage from 'vue-progressive-image'
import VueResource from 'vue-resource'


Vue.config.productionTip = false


Vue.use(VueProgressiveImage)
Vue.use(VueResource)
Vue.http.options.root = `${process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://shining-present.ru:4000'}/api`
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
