import Vue from 'vue'
import Deposit from './Deposit.vue'
import platmain from '../../plugin/platmain'
import https from '../../api/https'
import md5 from 'js-md5'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

Vue.prototype.$md5 = md5
Vue.use(platmain)
Vue.prototype.$https = https
Vue.use(VueSweetalert2)

/* eslint-disable no-new */
new Vue({
  el: '#App',
  components: { Deposit },
  template: '<Deposit/>'
})
