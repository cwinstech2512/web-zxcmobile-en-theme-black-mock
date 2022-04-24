import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from '../../router'
import store from '../../store/store'
import $ from 'jquery'
import axios from 'axios'
import https from '../../api/https'
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
import eventBus from '../../plugin/eventBus'

import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

// 配置成vue的原型
Vue.prototype.$bus = eventBus
Vue.prototype._ = lodash
Vue.prototype.moment = moment
Vue.prototype.$https = https
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$md5 = md5
Vue.prototype.$crypt = CryptoJS

Vue.use(extension)
Vue.use(platmain)
Vue.use(validator)
Vue.use(loading)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  router,
  components: { App },
  template: '<App/>'
})
