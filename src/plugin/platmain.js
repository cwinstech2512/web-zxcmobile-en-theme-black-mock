import _ from 'lodash'
export default {
  install (Vue, options) {
    // 获取参数
    Vue.prototype.getQueryStringBySearch = function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      // search,查询？后面的参数，并匹配正则
      if ((window.location.search.length > 0)) {
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        }
      }
      return ''
    }
    Vue.prototype.getQueryStringByHash = function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.hash.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return ''
    }
    Vue.prototype.getQueryStringByUrl = function (url, name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      if ((url.length > 0)) {
        var r = url.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        } else {
          return ''
        }
      }
    }
    Vue.prototype.getQueryString = function (name) {
      var localSearch = window.location.search
      var localHash = window.location.hash
      if (localSearch.indexOf('?') === -1 && localHash.indexOf('#') === -1) return ''
      // 如果url中没有传参直接返回空
      // key存在先通过search取值如果取不到就通过hash来取
      localSearch = localSearch.substr(1) || localHash.split('?')[1]
      if (localSearch) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var para = decodeURI(localSearch)
        var r = para.match(reg)
        if (r != null) {
          return unescape(r[2])
        } else {
          return ''
        }
      }
    }

    // 是否是移动设备,
    Vue.prototype.isMobileDevice = function () {
      var browser = this.browserVersions()
      if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) { // 苹果设备
        return true
      } else if (browser.versions.android) { // 安卓设备
        return true
      }
      return false
    }
    Vue.prototype.getRaid = function (scode) {
      let url = '/api/Other/Check'
      let params = {
        SCode: scode || ''
      }
      this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            // console.log('raid_verify', res.data)
            if (res.data.Status === 403) {
              sessionStorage.setItem('ip', res.data.Result.IP)
              this.$router.push('/forbidden')
            } else if (res.data.Status === 405) {
              this.$router.push('/errorinfo')
            } else {
              scode = res.data.Result.Scode // 获取服务器检测后的代理编码
              let limit = res.data.Result.Limit // 1 是限定域名 0
              if (scode.length > 1) {
                localStorage.setItem('raid', scode)
              } else {
                localStorage.removeItem('raid') // 错误代理编码，删除
              }
              this.$root.$emit('setAPPDownUrl')
              if (limit === 1) {
                sessionStorage.setItem('mandat', limit)
              } else {
                sessionStorage.removeItem('mandat')
              }
            }
          } else {
            this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'Confirm'
            })
          }
        })
    }
    Vue.prototype.pageInit = function () {
      var nsc = this.getQueryString('sc')
      if (nsc) {
        localStorage['raid'] = nsc
      }
      if (!localStorage.getItem('mac')) {
        localStorage.setItem('mac', this.generateUUID())
      }
      if (!sessionStorage.getItem('host')) {
        sessionStorage.setItem('host', window.location.host + '/#')
      }
      if (process.env.NODE_ENV !== 'development' && !this.isMobileDevice()) {
        // 电脑打开跳转到电脑版
        top.location.href = '../'
      }
      this.getRaid(nsc)
    }

    Vue.prototype.generateUUID = function () {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }

    Vue.prototype.jsonEscape = function (jsonObj) {
      let arr = []
      for (var key in jsonObj) {
        arr.push(key)
      }
      arr.sort()
      let str = ''
      for (var i in arr) {
        if (jsonObj[arr[i]] !== '' && arr[i] !== 'SecretKey') {
          str += arr[i] + '=' + jsonObj[arr[i]] + '&'
        }
      }
      // return str.substr(0, str.length - 1)
      if (jsonObj.os === 'Android') {
        return str + '0gg|0B>fYn#L4Cm|w!(~mOc0Gv)#VC'
      } else if (jsonObj.os === 'IOS') {
        return str + '!fdeS)I~^)Nf5!g7_%b6XiU7W*RD54'
      } else {
        return str + 'TS9IHQ#Di#i2zU*HpDTl6LURE\'$I_&'
      }
    }

    Vue.prototype.secret = function (options) {
      let defaultOptions = { os: 'H5' }
      let opts = Object.assign(defaultOptions, options)
      return Object.assign(opts, { SecretKey: this.$md5(this.jsonEscape(opts)) })
    }

    Vue.prototype.Secret = function (options) {
      let defaultOptions = { os: 'H5' }
      let opts = Object.assign(defaultOptions, options)
      return Object.assign(opts, { SecretKey: this.$md5(this.jsonEscape(opts)) })
    }

    Vue.prototype.saveinfo = function (account, token, balance, lastlogintime) {
      localStorage.setItem('account', JSON.stringify({
        'account': account,
        'token': token,
        'balance': balance,
        'lastlogintime': lastlogintime
      }))
    }

    Vue.prototype.getinfo = function () {
      let user = localStorage.getItem('account')
      if (user) {
        return JSON.parse(user)
      }
      return {
        'account': '',
        'token': '',
        'balance': 0,
        'lastlogintime': ''
      }
    }

    Vue.prototype.removeinfo = function () {
      localStorage.removeItem('account')
      sessionStorage.removeItem('PopupDialog')
      sessionStorage.removeItem('GamePlat')
      sessionStorage.removeItem('MsgBox')
      sessionStorage.removeItem('BannerOrNotice')
      // sessionStorage.clear()
    }

    // AG,EA,PG
    Vue.prototype.loginPlat = function (plat, event, gameCode) {
      // debugger
      // alert(event.target.tagName)
      if (this.getinfo().token === '') {
        this.$swal({
          text: '请先登录',
          type: 'warning',
          confirmButtonText: 'Confirm'
        })
        return false
      }
      window.open('Game.html?act=' + plat)
      return true
    }

    // 浏览器信息
    Vue.prototype.browserVersions = function () {
      return {
        versions: (function () {
          var u = navigator.userAgent
          // let app = navigator.appVersion
          return {// 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
          }
        }()),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
    }

    // 客服1
    Vue.prototype.sliaonow = function () {
      window.open('../KF.html', 'kfwindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
    }
    // 客服2
    Vue.prototype.sliaonow2 = function () {
      // var t = this.getinfo().account
      // if (t.length > 0) {
      //   t = '&clientid=' + t + '&metadata={"name":"' + t + '"}'
      // }
      // window.open('https://chatlink.mstatik.com/widget/standalone.html?eid=157761' + t, 'kf2window', 'height=560,width=756,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
      window.open('https://vue.livelyhelp.chat/chatWindow.aspx?siteId=60000647&planId=2ec968de-c0bc-4000-bd6c-891e8cf7f2a8#', 'kf2window', 'height=560,width=756,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
    }

    /**
     * @description 刷新sessionStorage余额
     */
    Vue.prototype.refreshBalance = function () {
      var _this = this
      let url = '/api/Balance/Get'
      let params = {
        Token: _this.getinfo().token,
        Plat: 'ZXC'
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.saveinfo(
              _this.getinfo().account,
              _this.getinfo().token,
              _.toNumber(res.data.Result),
              _this.getinfo().lastlogintime
            )
          } else {
            _this.saveinfo(
              _this.getinfo().account,
              _this.getinfo().token,
              0,
              _this.getinfo().lastlogintime
            )
          }
        }).catch(err => {
          console.log('refreshBalance', err)
        })
    }
    /**
     * @description 刷新左菜单余额
     * @param sidemenuVm 左菜单对象
     */
    Vue.prototype.updateSidebarBalacne = function (sidemenuVm) {
      if (sidemenuVm) {
        console.log('fresh_balance', new Date())
        sidemenuVm.$forceUpdate()
        sidemenuVm.$set(sidemenuVm.$data, 'balance', this.getinfo().balance === 0 ? '0.00' : this.numberFormat(this.getinfo().balance, 2))
      }
    }
    /**
     * @description 外部超时退出
     */
    Vue.prototype.ExteralFileComfirm = function (data) {
      if (sessionStorage.getItem('current_os') === null) {
        if (data.Status === 'NoLogin' || data.Status === 'LoginExpire') {
          this.$swal({
            // title: data.Mesage,
            text: '请重新登录！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: '取消'
            // closeOnConfirm: false,
            // closeOnClickOutside: false
          }).then(res => {
            if (res.value) {
              this.$parent.externalCheckOut()
            }
          })
        } else if (data.Status === 'Forbidden') {
          console.log('跳转到错误页面')
          this.$router.push('/errorinfo')
        } else {
          this.$swal({
            text: data.Message,
            type: 'error',
            confirmButtonText: 'Confirm'
          })
        }
      } else {
        this.$swal({
          text: data.Message,
          type: 'error',
          confirmButtonText: 'Confirm'
        })
      }
    }
    /**
     * @description 内部超时退出
     */
    Vue.prototype.NormalFailConfirm = function (data) {
      if (data.Status === 'NoLogin' || data.Status === 'LoginExpire') {
        this.$swal({
          // title: data.Mesage,
          text: '登录已超时，请重新登录！',
          type: 'warning',
          // showCancelButton: true,
          confirmButtonText: 'Confirm'
          // cancelButtonText: '取消'
          // closeOnConfirm: false,
          // closeOnClickOutside: false
        }).then(res => {
          if (res.value) {
            this.removeinfo()
            this.$router.push('/login')
            this.pageInit()
          }
        })
      } else if (data.Status === 'Forbidden') {
        console.log('跳转到错误页面')
        this.$router.push('/errorinfo')
      } else {
        this.$swal({
          text: data.Message,
          type: 'error',
          confirmButtonText: 'Confirm'
        })
      }
    }
    /**
     * @description 弹出警告
     */
    Vue.prototype.AlertWarning = function (msg) {
      this.$swal({
        text: msg,
        type: 'warning',
        confirmButtonText: 'Confirm'
      })
    }
    /**
     * @description 弹出成功
     */
    Vue.prototype.AlertError = function (msg) {
      this.$swal({
        text: msg,
        type: 'error',
        confirmButtonText: 'Confirm'
      })
    }
    /**
     * @description 弹出错误
     */
    Vue.prototype.AlertSuccess = function (msg) {
      this.$swal({
        text: msg,
        type: 'success',
        confirmButtonText: 'Confirm'
      })
    }
  }
}
