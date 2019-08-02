import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Snackbar from '@/components/snackbar/index'

Vue.use(Vuetify)
Vue.prototype.$message = Snackbar

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
