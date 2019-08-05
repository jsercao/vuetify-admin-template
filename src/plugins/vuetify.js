import Vue from 'vue'

import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

import Snackbar from '@/components/snackbar/index'
Vue.prototype.$message = Snackbar

import i18n from '@/i18n'

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: false
  }
})
