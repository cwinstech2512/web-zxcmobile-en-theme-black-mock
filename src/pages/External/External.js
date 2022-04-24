import Vue from 'vue'
import 'babel-polyfill'
import External from './External.vue'
import router from '../../router/external'
import store from '../../store/store'
import $ from 'jquery'
import AOS from 'aos'
import axios from 'axios'
import https from '../../api/https'
// import swal from 'sweetalert2'
import 'swiper/dist/css/swiper.css'
import extension from '../../plugin/extension'
import platmain from '../../plugin/platmain'
import md5 from 'js-md5'
import moment from 'moment'
import lodash from 'lodash'
import CryptoJS from 'crypto-js'
import validator from 'vue-validator'
import loading from '../../plugin/loading'
import VueSweetalert2 from 'vue-sweetalert2'
import lottery from 'vue-lottery'

import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.prototype._ = lodash
Vue.prototype.moment = moment
// 配置成vue的原型
// Vue.prototype.$swal = swal
Vue.prototype.$https = https
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$crypt = CryptoJS
Vue.use(extension)
Vue.use(platmain)
Vue.use(validator)
Vue.use(loading)
Vue.use(VueSweetalert2)
Vue.use(lottery)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#External',
  $,
  AOS,
  store,
  router,
  components: { External },
  template: '<External/>'
})
