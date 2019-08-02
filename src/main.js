import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'

import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

import '@/styles/index.scss'

import Mock from './mock'
Mock.bootstrap()

// global filters
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// global directives
import permission from '@/directives/permission'
Vue.use(permission)

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
