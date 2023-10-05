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
    // 客服_Messager
    Vue.prototype.sliao_messager = function () {
      // window.open('https://18slot.ladesk.com/scripts/generateWidget.php?v=5.35.3.12&t=' + timestamp + '&cwid=ptaxsxn1&cwt=chat_popout&cid=wto1No5LCQNxNjaj&vid=bf624n60epk72o4mr57fa944yokky', 'lawindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
      window.open('http://m.me/103291305984562', 'lawindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
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
    // 客服_LA
    Vue.prototype.sliao_liveAgent = function (timestamp) {
      // window.open('https://18slot.ladesk.com/scripts/generateWidget.php?v=5.35.3.12&t=' + timestamp + '&cwid=ptaxsxn1&cwt=chat_popout&cid=wto1No5LCQNxNjaj&vid=bf624n60epk72o4mr57fa944yokky', 'lawindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
      window.open('https://18slot.ladesk.com/scripts/inline_chat.php?cwid=ptaxsxn1', 'lawindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
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
            text: 'please login again!',
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
          // console.log('跳转到错误页面')
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
          text: 'Timed out，please log in again!',
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
        // console.log('跳转到错误页面')
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
        html: `<p style="color: #fff; font-size: 16px">${msg}</p>`,
        type: 'warning',
        confirmButtonText: 'Ok',
        background: '#434343',
        confirmButtonColor: '#0097f6',
        cancelButtonColor: '#adc9d6'
      })
    }
    /**
     * @description 弹出成功
     */
    Vue.prototype.AlertError = function (msg) {
      var iconData = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMwOCAyNzYiIHdpZHRoPSIzMDgiIGhlaWdodD0iMjc2Ij48ZGVmcz48aW1hZ2UgIHdpZHRoPSIzMDgiIGhlaWdodD0iMjc2IiBpZD0iaW1nMSIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFUUUFBQUVVQ0FZQUFBQ2xMY3FwQUFBQUFYTlNSMElCMmNrc2Z3QUFMclpKUkVGVWVKenRuUWw4RlVYVzZKdUVmVWNRRWtJSUVVVU5POFJ4SEIzSDBXOThueisvNTV1bk0rN0xROEVORlVSRlJCUUlTWUFRQ0ZrUnhBRlJ3UjBWRkRka0RUdUVUWkFkV2NKaUNGc2dRSlo2ZGZyMkRTRmt1ZFhWM2FlNjcrbmY3eStveWMyOVZlZjhVOTFWZFVyVEpwM1ZDTUlrelRtRE9NczRXemw1bkFKQjhvenZYV2E4Vm5NRlBoZmhWdERmQU9FbTd1UGN6NW5DMmNRNXhHRVdjOGg0N1NuR3o3cFBnYzlOdUFYME4wQzRnUUdjenpUcjVSVW9ueG52QWJzZENOVkJmd09FcWpUaDlPTk00eFJwZURMelUyUzhsMzdHZThOdUgwSkYwTjhBb1NJOU9MczFmSWxWeFc3alBXSzNFNkVhNkcrQVVJMG5PVWMxZkduVnhGSGp2V0szRjZFUzZHK0FVQWtRQkxhb1JDR3BFUmRCZndPRUtzUnArSEl5UzV3QzdVZW9BUG9iSUxDcHcwblY4S1VrUzZyeFdiRGJrOEFFL1EwUW1JUnIzcEJaZWFtRks5Q3VCQmFCZm1Ic2lFV0VoOUI4aWI5UnMwRXNvVm1uV2JQVVEreWF4UFhzK29RMU90RmpmbVVOMC9OWTNZd1RyRkhhVVR1bEJwOHBITHQ5M1FDNmZFaG9oRVdCYktuTVdxUWM1QnhnTFZQMnMwNkpPYXpMcUpXTS81ekw2RDFpTWVzUmw2My9IYjRlcE5kcXdqNlNHbDRjZUE4U1duQmhwY3phak4vRE9vN1pXS204UklEWGlFamVRVkp6UGhhOEJ3a3RlTEJDWm5BNzJXckM3eXdxYVF2clBYS3h0TXpLY3pVWFc5UFV3L3JQSUtrNUVnL2VnNFFXUEJnSlhtSldFUEFNck91b0ZaWktyQ0p3VzlvdGJqa1gyeUVyaEFhZmRTTjJ1NnNLdW54SWFJUkU4UGJTZktWNlRNa0Jublg1bjM4NVFhK1JTMWp6aWJsV1NBMCtjeS9zOWxjUmRQbVEwQWlUZ2R0Tmt5ajFBdy85WXgwU1dXd0ZxWUZJUStSdlFlR3pkOFB1QjlWQWx3OEpqVEFSdE5keWNzM0tBQjdXeHlMSXJEelJZelpiTVZLRE5yZ1d1ejlVQWwwK0pEUkNNR0RyY2RhYkVVQ3RTV2RZWk5KdnJPZklwZWhDaXpXa0ZwSlZJQ3MxYUl0NjJQMmlDdWp5SWFFUmdnRTczRXppMThrOHlhNUlPWUF1c1lyQU1oRkpvUUhEc2Z0RkZkRGxRMElqQklMMUdrNittYVR2SEw4S1hWNlZBVE9na1VuYlpJVUdiWElOZHYrb0FMcDhTR2hFZ0lGYWkvT2RtWVJ2bVBhSG83T1pabWdtdjZRRDJxWVdkajloZ3k0ZkVob1JRSkNDek40d0piUDBQQzZ6WmVqQ3FnbDRyZ2NMY0NXbDlrYXdTdzFkUGlRMElvQWd2Y05NZ3RmUHlHZmRYU0F6UHlBMWVOWW5LYlU3c1BzTE9WYThCd25OTy9CK2l1U01GRTNzV2xsbldFekNhblJKaVFJem56QWJLeUUwYUt0STdINURqQmZ2UVVMekRyeWZIakNUMkcyVGQ2TEx5U3l3NkZkQ2FNQUQyUDJHR0MvZWc0VG1IWGcvTFJCTmFMalZWR1d0bVJtNnhxMlFYWisyQUx2ZkVPUEZlNURRdkFIdm8zK2FTV2dvd2hpcmdKaGtpQnE3UmI5dGxwRGFQN0g3RHlsbXZBY0p6ZjN3L3ZtN1p1SXc0UERrWGVneXNnb29hU1FoTkdpN3YyUDNJMExjZUE4U212dmgvWk1tbXNTdzdDRldBUkZaQlZUSmhUVjBFbEpMdys1SGhManhIaVEwZDhQNzVpN09jWkhraGJyK2JwNElxSXFJY2R0bGhBWnRlQmQyZnpvY085NkRoT1p1ZU4vTUVrMWVGZmRwV2dFVW40UkpEZ21wemNMdVQ0ZGp4M3VRME53TDc1ZGJPRWRFRS9mYXhCeDArZGdGVkx1dG5YbktyTkNnTFcvQjdsY0g0OGQ3a05EY0MrK1hWYUpKQzFWZ1l4VVFqNTAwVGpzcXMrQjJGWGEvT2hnLzNvT0U1azU0bnlTSUptdVQxTU42eFlwWUJhUmpKN0N1cm03bUNabGJ6d1RzL25Vb2hyd0hDYzE5OFA1b3dOa2ltcWp0azM1RGw0MVR0SmFyblFadDJ3QzdueDJJSSs5QlFuTWZ2RDhXY1lwRmtoUks3cmg1UjRBb3NJeERZZ2NCdE8waTdINTJJSTY4QnduTlhXaStNd0tFVDIrNmFzeG1kTWs0RFp6emFWSm96R2hqVDU5QmdDNGZFaHJCKytJRDBlU0VoK1NxRjIyMEF6Z0l1V0Zhbm96VVBzRHViNXRqeVh1UTBOd0Q3NGY3T09kRkUvUDZoRFhvY3NIaTZ0RWJaUFo1UWx2Zmg5M3ZOc2FUOXlDaHVRUGVCMkdhNytSem9hU0UxZk94Q29nRkU4bGo4S0ROdzdENzM2YVk4aDRrTlBYaDdSL0N5UkpOUm5nbzNpVitKYnBRc0lIYmJja1NROUQySWRoeFlFTmNlUThTbXZwb3ZoT2NTa1FUOGJyRWRVR3g3aXdRV2svWUt5TTBhSHZQblJTRkxoOFNXbkRDMno5ZU5BbGhUMk13VGdSVUJSeitJamxCRUk4ZEJ6YkVsZmNnb2FrTmIvdW1uQnpSQkl3T3dtVWFOWEVOVEJDWTN4SUZmZEFVT3g0c2ppM3ZRVUpURjBObVA0Z21IOVRaaHlVTHNRcElSRFhDa25mSmpOSis4SkxVME9WRFFnc3VlTHNQRlUwNk9OcE4xWlBQVmFCVFlvNk0wSUNoMkhGaFlYeDVEeEthbXZBMkQrV3NGMDI0cUtTdDZOSlFuWFpKMjJWdVBhRlBRckhqdzZJWTh4NGtORFhoYlQ1RE5ObGdJaUJXQVdHNEFja0pnaG5ZOFdGUmpIa1BFcHA2OFBhdW81a28zRWlMYUFNSFNwQkxDQTM2cGc1Mm5GZ1FaOTZEaEtZV211OVdjNjRtZUlvVExCeDE0K25uV1BTTXkyYWhtYWZOQ3EzSTZDTlgzM3FpeTRlRTVtME1tZDB0S3JQUXJOUDZ3KzVZQlVUaEptQ1BxMFM1N2lLanIxd3JOWFQ1a05DOERXL25lcHlEb3NrVjdzRVRuSndpWE83V0UvcXFIbmJjU01TYjl5Q2hxUU52NTBHYVlEVU5tSzJqVzAzendHNEtpVkVhOU5VZzdMaVJpRGZ2UVVKVEE5N0d0VG56UlpPS2RnVElJemxLZ3o2cmpSMC9KbVBPZTVEUThERms5b3BvTXNIb2pQWnJ5Z09seVp1a0hwR1IyaXR1bEJxNmZFaG8zb1MzYnc4emlRUjdFM3VOWElJdUJDOEF2eGpnUkhrSnFmWEFqaU1UY2VjOVNHam9RZFZlRXp6OUhFWm16U2JtVW1rZ2k2bVhjVnhHYU5DSDdiSGpTVEQydkFjSkRUMm83aFJOSGlncERTZUV4eW9nQVM4Um1iUk5SbWpBbmRqeEpCaDczb09FaGhwUVVFMURlQ0tnemZqZFZFM0RCdUNYUk1OMHFTMVIwSmV1cWNhQkxoOFNtcmZnN1RyWlRPTFFJbHI3Z0dkcERkS1B5VWh0TW5aY0NjU2Y5eUNob1FVVGpNNTJpeVFMUERzTDQ2T3pXT1NrOXpvUnlUdGtoQVo5Nm9wUkdycDhTR2plZ2JmcENORmtnZHVoV09Sa0R3YmcxbE55bERZQ083NENBVjArSkRSdndOdnpWczV4a1NTQkpRWEJlUG81RnJEUFUwSm8wTGUzWXNkWlRhRExoNFRtRFhoN2ZpNmFKRTFURDZFbmViRFJqTGU1aE5RK3g0Nnpta0NYRHduTi9mQzIvSXNtdUYrVHFtbmdBR2VhU3A2Ni9oZnNlS3NPZFBtUTBOd05iOGZtbkFPaXlSR1Z0QVU5dVlPVlJtbC95SXpTb0srYlk4ZGRWYURMaDRUbWJuZzdqaEZOQ2hpZGRSMjFBajJ4Z3hWNGxnWUh6MGhJYlF4MjNGVUZ1bnhJYU82RnQyRVh6bEhSaEdoTHRjN1E2VEIyaTR6UW9NKzdZTWRmWmFETGg0VG1UalJmSmRwczBXU0FDaEJRQ1VJMEFRbHJnVjBaa2h2WG9lK1ZxMnlMTGg4U21qdlJmUHMxUzBRVG9lT1lqZWpKVFBpNEl1V0FqTkNnNzVYYjU0a3VIeEthKytCdDE1cXpSalFKR3FjZHBmMmFDZ0Y5MFh4aXJvelVJQVphWThWaFphRExoNFRtUG5qYmpSWU5mcGdJb0dvYTZnRW5SVWxPRUl4Mk92NnFBMTArSkRSM29mbHFuUW10T1FQb2ZFMTFnZDBhRWtLRFdGQ21aaHE2ZkVobzdvRzNXUzNPMjZKQkQzc0lxYXkydXNESVdVSm96SWlKV2s3RllYV2d5NGVFNWg0MDN5TGFRcEZnaDJvYTF5V3NSVTlhb25yZ1lCbzQyTm1rMENBbWxGaHNpeTRmRXBvNzRPMVZsek5iTk5ocHY2WjdhRDFocjh3b0RXS2pybDN4RnlqbzhpR2h1UVBlWG8rSUJubnR6SlA2cW5RN2tvK3duaWk1eGJiQUkzYkZYNkNneTRlRTVnNTRlMzBpR3VBMEVlQStycHp3dTR6UVByRTY3a1JCbHc4SlRYMTRXeVZ3OGtXQ0cxYWgwNW96OTlFOWJwbSt4TWFrMENCR0VxeU9QeEhRNVVOQ1V4dmVUdTA0eDBTRE81ejJhN3FXbGluN1pVb01RYXkwc3lyK1JFR1hEd2xOYlhnN1RSQU5hdmdOVDRjRnV4dko4enduV0JGN1prQ1hEd2xOWFhnYi9ZbHpVaVNZNFRmNzFiUmYwL1ZFSnYwbWMrc0pNZk1uMmZnekE3cDhTR2hxb3ZrVzBXNFNEV2E0WFhFNitRanJnUlBzSlE5VmdkaHhmTEV0dW54SWFPcGh5R3lZWnFxYXhpYjBaQ1NzNGVyUkcyU0VWbUxFa0tOU1E1Y1BDVTA5TkYrdHM4T2lRUXpMTktqV21YZm9NbXFsWGlGRlFtb1FRNDdXVEVPWER3bE5QWGpiM01zcEVnbmV1cGtuOU1vTm1BbElXQS9zd2EyZGVjcXMwQ0NHN2hXTlB4blE1VU5DVXd2ZUxtMDVXMFNERng0aVl5Y2ZZUTloeWJ0a1Jta1FTMjBEalQ5WjBPVkRRbE1IM2laTk9DdEZneFpPRWFKYlRlOENCOXBJckV0alJrdzFDVFFPWlVDWER3bE5IWGliZERRVHNKM2pWNkVuSFdFdjBYSTEwNENPTmNXZkZhRExoNFNtQnJ3OVduRitGZzFVMmhFUUhNQXlEc2tKQW9pdFZ0WEZvQldneTRlRXBnYThQYkpFZ3hScW5WSGh4dUNoVStKNnZjOGxwSlpWVmZ4WkJicDhTR2o0YUw1blp4dEZBN1JGeWtIOU56ZDJvaEhPQVV0ekpJUUdNV2Jyc3pSMCtaRFE4TkZNbEFhQ2d6VzZ4SzlFVHpEQ1dUb2w1c2crUzdPMXhCQzZmRWhvNkRKcnJBbHVjWUk5ZmxTNE1YaHBuL1NiVExsdWlMWEdzZmJGcy9jZ29Ra0ZRRi9Sb0lSS0ROaEpSZURTTUQxUFpwVFdONWFFUmtLem9mTnYwZ1JybmNHcWNianRNSnNJdmFtc2tDZUFaUndTSllZZzVtNktKYUdSMEN6cytQcWM3YUxCR0pXMEZUMlpDRFZva1hKQVpwUUdzVmMvbG9SR1FyT2cwMEZtNzRnR0lUdzdvMFcwaEI4NG5sQkNhTXlJUVV1bGhpNGZFaHFLMEpxYUNVQnpwWUZvV1lkWGdTVTdyU2JzazVWYTAxZ1NHZ2xOb3NNYmNiNFhEYndRR3AwUmxRQUg0VFJKUFNJak5JakZSckVrTkJLYXlRNi93VXpndFpyd2U0M0JEZWNJOUl5alRlckJodVJpVytDR1dCSWFDYzFFWjhPdDV0ZWlBZGNvN1doQXRjN2dtY3JWWXplakp4amhMUENMREhhTlNBZ05ZdEtTVzA5MCtaRFFIQlZhc3BtQWc4cWxnUVEyUEZPaHJWREJDZnd5Q3pGL3FBcVFIRXRDSTZFSmRIUUh6aHFSSUlQVjRGRkpXOUNUaFhBSFY4Z3Q0NERZN0JCTFFpT2hCZGpSZDRvR0dTelR3RTRTd2ozQWRqakpVZHFkc1NRMEVsb0FuWHdyWjc5SWNNSG9UR1pIQUJHY1FDbDJDYUZCak40YVMwSWpvVlhUd1hBazNXRFI0SUt5MnRqSlFiZ1BtQ0JvbW5wWVJtb1FxNmFQdmtPWER3bk5kcGs5eGlrV0NTcTQxWVF6R2JHVFF5VjZqVnJHYmhxL2pzVXZQS296cWh6eEMvOWdmMDNkb0g4Tjl2dFVBYmoxbEJCYXNSR3pwcVNHTGg4U211MUNXeThhVkpGSjI2cE83Q0JhWjlZN2NTVjc3c3Y5N01PTkoxbFJjU21yNllLdm1iZmpESHZocXdPc2Q4SUs5UGVQQlZReGhoRytoTlRXazlCSWFKVjE3azJpUW9NS0NrRmY2eXh4RlJ2MjAyRldjS0drUm9sVmRaMCtYOEorMkZuQWJrL2ZpUDk1a0tUV0lDTmZSbWltcW5GYzlmL2VxUlowT1pIUVRNc01DamZPRncybXBxbUgwSk1CazF0UzFyUDhRdk1pcTJ6VTlzS1hlMW12K09Yb244MXBlc3lRMmhJRnNTdGNDSktFNWxINDV4c3BHa1N3SjY5YlhQQWxucCtNRmZuc1hBQzNsbWF1ZGZ0UHMxNEp3ZFcyM2VOWHNrYnBVcmVlSTZ1TDhjb2dvWGtRelVSWmJRQk95TVpPQWl3KzJIRFNGcEdWdi9JTFMvVm5rRjJIQjArUnk0ams3VEluUlFtWDZ5YWhlUXhEWnUrSkJrL0xsUDFCdTIzcGc0MzJ5OHgvSFR0WHFvL1VZZ1oveTdxTkNJNEpscm9aSjJSR2FlK0pTSTJFNWpFMDN4WW40Y0NKU1ZpTkh2Z1lmTGp4RkNzdXNlYzJzNnJyRHo1U2F6OWhKK3M4OEhNV00rUjcxbjJrdDhVR0kzOEpvUUVkQW8xL0VwcUg0SitwRG1lc2FNQkFOWTFnRk5wYjh3ODdLckx5VjhhbUl0Yjh6VldNSnhuclBPQnoxbm5vejZ5blI4OWJnTmlDeVNZSm9VRk0xd2trQjBob0hvSi9wbitJQmd2c3ZRdkdMVTQzamMreGJRSWcwR3ZZaW5Nc3F1ODBYV3BsWWh1MndKTzMvbkNHS3h5d0l5RzFmd1NTQXlRMGo4QS9UelJuczJpZ3RFM2VpUjdzR0h5eDVUU3F6T0RLUDFmS3J1ci9jWm5RL01RTS9JSjFlUnUvamF3R0R0aVJFQnJFZG5STmVWQ2owTExPNGtKQ0MxaG84MFNEQkdhZmdyR3M5bDhtNURqKzNLeXE2OUhKS3k0VFd0bG9iZEJYck9zSTk5K0cra2Vjc0dBN1ZLNGF4N3lhOHFBbW9lVWNMa0tGaEJhWXpPN2dsSW9FQjl4cWRoaTdwZExBOHpwamwrUmhlNnpzS2poN2puVjZabHFsVXZPTExlYTF1WjZaRVpVOFZBVmkvSTdxY3FFbW9iRUx4YWlRMEFJVFdxSm9jRlIyK2prY2VJRWQ4SFlERzhpMzVWM0E5dGdsMS9EM0Y3SU9qMmRWS2JXeUVkdnI3cDhSaFdvY1YyUWVsWkZhWW5XNVVKUFF6aFlXbzBKQ3ExbG1NWndpa2FDQVc4MTJTZHNyak1pOEx6TUFOcHlyZG1Wdk9jZzY5cG5Ncm5waVVyVlN1emdqK3BPclowUzdqbGtuSXpTSTlaaXE4cUhHRVJvN2p3b0pyWHFaTmRFRXkyb0RVSzhLTzZpeGVQckxmZGordXV3NmRxcVE5WDVoT212L21GOW84T2ZrbXNYbTBoblJYbnlVR1RZNVQwWnFFUE5OS3N1Sm1vVDJhdlpKVkVobzFRdXR2V2d3d0sxbU1FNEUrSm0xNlJTMnZ5NjdTa3RMMlNOanYySGhEMmRXRUZmTkl6YTN6b2gyalZ1aFYwV1drRnI3eW5LaXhsbk9pWVc0a05DcWxGazl6bWVpZ2RBcGNUMTZNR015TGNlNWJVNGkxOEIzZm1KaEQ2VlhNaklMOERZVVprUmR0a2MwWEc0SEFjUit2WXA1UWV2UVhJam1LOXc0VVRRSWd2bFcwNCtLUWlzOFg4eHVlMjBtaTN6VVAwS3I3SFl6c050UU44Mkl3cDJDaE5DWWtRT1hGSUlrb2JrTVEyWTNjODZJQmdDY2NJMGR4TmlvS0xRejU0cFl6LzdUV1B2SHlzOTBWaVd2QUVkc3I4OXp4WXdveEtSRU5ZNHpSaTZVU1kyRTVpSU1tY0d0NWh6UnpxK2Zmc3lWRDVDdFJrMmhYV0M5WDV4ZVFXaCtxVlUxV3F0ZWFtNmFFVzBvVjY1N2pwRVR1dFJJYUM3QmtGa0k1eStpblE2cnN5dVcxUTZtc3dISzgvNTY5WVJXVUhpQjNmRFNEQlo1bWRCcW91YmIwREt4S1R3akNyZWVrdnM4LzJMa1JpMFNtZ3NvSnpPb3BqRk50TU9oSGhWMjBLckNwRlhIc2YxMTJYWDY3QVVXKytMN2xZelFLbUwrTnZRcXhXZEVKUTlWbVdia1JvMVNRNWNUQ1UwWG1tbVoxY282d3pxT0NjNkRPaXJqeG5GcnNmMTEyWFgweEpsS25xR0pDRTN3TmxUQkdWRW9NVlFuODZRbFVpT2hLVXc1bWJYa0hCZnRhRGpKR2p0WVZRSjJDcWl5TWQxLzdUcDBuSFY1ZG1xNWhiVTFVWlBZQXJzTmpYbHRqbEl6b3RGak5zc0k3YmlSSTlWS0RWMU93U3kwY2pKcnlsbkVLUkhwNU1acFIvVzljOWlCcWhxcUxhNzlaZjN2dW1RNkJMRDFLVENwaVkzWVlsNy9Ub2taVWRoTDNNVDhxZXNsUm80MHJVNXFXdG81WElKVmFPVmsxb0J6SytlQ1NBZkRyU2FkZmw0NTQ1YXFVMjBEcm5mbnJXZmhENld6NkNkRUpnVDhVcE8vRFMyN0ZWVmdSalJ5N0RhWlVkb0ZJMWNhVkNXMUc3N0lSeVVvaGFiNUpnRkNqWTRCWm9wMkxvek9zTVdoS3JlbGI4SjIyQ1hYMkUrV3N6WVBwZ3ZLVEhTMFZ2TnRhSm5ZaHYyQ05pTUsrenl2KytpWWpOUm1sc3NieUtGTEpna1lXNDFLMEFsTnV6aWpXZC9vbE9jNUJhSWRHMVdoMWhsUkxtbmlzcGtxVDlFS3p4ZXhmOFhQWmhHUFZOekhhYlhVeEVac21ET2kzZE4rbFJGYWdaRXpEWXdjdW1UbTg2bEZ1YWdFbzlEOHQ1clFHUjA0ZTBRNkZGWmRSNC81RlYwYUtnTTEwVlFSR3N4d2RubjJQUmIxdU1qek0vdWZyZmxIYXpHRFpqczJJMXErSGwvekZLbERWZllZdVZOZnEzRHJxYVdld3lWSWhRWWQwWkR6bXFqTVlJRmlUd1VlOEtxTVNrSmJ2R20vWGd1dGcvRHpNN1BQMVV6ZWhyNXEvNHdvTFBiMlN3MWlXSEt4N1d0R0R0Vy9SR2htaElLTlc0Vm15S3l1MFJHM2M0cEZaQVk3QXE1TFhJY3VETlVCb2FseVRmdHhJMnY3Y0lhSkNRRXJwR1ppeE9iZ2pDamNhVWdJcmRqSW9ZWkdUb1dRMEp5Vm1YOGlvS0hCTUJHWkFVMVNqeWk3dlVVbG9JM21iQ3ZBZHBsK1RmMStBNHQ4Tk10aW9RVjYreWt1dGJJUm13TXpvakJhYTJwK0dRY3pjc2lmVDZGR2p1RUxLa2lFQnFPemVrYmpQNjRGT0RvRGtma0w1VjAxWmpPNkxOekNTM01PWXJ0TXY4Wjh1b0sxZXpUVEpxR1pFVnVnWCt2TWpDZ3NQWklRV3JHUlN3Mk4zQXBCbDFNd0NFM3ovZWFvcmZsbVpqcHlkZ1hhYVg2WnRSNi9seGJSQ3ZBL1UzOWoyQnNHemwwb1p2ZkdmV25CREtlVlVoTWZzZmxtUkJmYTBrL2Q0cGJMVnVQWVplUlVBeVBIM0RkS2M1UFF0SXUzbXZEd3NoSG5sVUE3UzcvVnpEcWpsOVh1T21vRnVpVGNSRzh1LzdORnVFSTdlZVk4dTNQb0p3NEp6UzgxZTI1RGRiSFpOQ1BhUFc2Wlh2NUtRbXF2R0xsVlgzUGpyYWNMaFZiSGFQQW96c0pBT3dwR1owQlk4aTUwUWJnTkVGcnVLVnlqYmRyN0IrdiszSDhzWExKaHRkVDhZaE84RGRWblJLMFZXL09KdVRKQ1cyamtWaU1qMTBob05ncXQvT2dzSWRCT2dwRVpqTkRnb1NsTkJKaWp6MmUvb3dwdDN1cmRmSFNXd2FJZGs1bFpxWW1QMkt5ZUVZMUpXQ05ialNOQnUzU1VoaThxcndsTjgvMm1xR3MwTXZ3RzJSZVF6SXlKQVBnelBIa251aGpjeXYwZjdFSVYydFI1RzN3VEFvNExyYnpZN0pOYTJZanRqUjh0bVJHRnMyUWxoTGJQeUxINlJzNjVaNVRtQnFGcEY1K2RRZU0yNWt3UHRIUDAwUm1uWmNvK0dwMUo4T0JIdUVKN1l2eTN4a2xQV0VJekl6VUpzUTM3UldyaUNyNFgxbHBLU0cyNmtXdDFOVGM5UzNPUjBHb2JqWnNhc015TTBSbE5CTWp6Nk1kNzBHU1dmN3FRM2ZycVIvb0lEVmRvem9wTmRrYjB1b1MxTWtKalJxN1YxZHcwNCtrU29ZVm9GNWRxckJhUkdmd1pObjQzdWhEY3psMVR0ckp6eFRock41WnRPZUE3UThEVzlXZHFTazBYbXo0amF1N3VvbVhLZmhtaHJkWXVMdUZ3eDdvMDFZV21YYnBVSXk3UXp2QWY5eFdhZFlwZFMxdWNMR0hIc1Fzb1Fudm4yeHdGYmplcmtwcUR0NkVtWmtTaGtvemtxZXR4bXB1V2NMaElhSDhXa1JsTkJGZ1AxdEtOWjFLL2w2eUJwdHBJVFZKc0FqT2k4TndZenZPVUVCb3pjbytFWnBIUVFvekdmQ3Rnb1JrVEFYQ0NFNnlleGhhQlY4aFltWThpdEFkSGY2M29DTTBLc1ptN0RiMDRJMXF6Mk9CWm11UW83UzBqQjlXLzdWUlphTnJGQW82M0JTd3pZMGRBU05acHFuVm1NZi9JK3RWeG1jR3hkYzd1RU1DUW1xVFkzcXg1UmhRT1ZZRzhrSkRhYlVZdXFqMUtjNEhRYnVJY0VCRWEvRWtuT0ZuUHpSUFdzL3pDRWtlRnRpdjNPT3Z5ekhzQ3B6eGhZL2E1bXB6WUFwa1JsVHdwNm9DUml5UTBTYUhkSjlMdy91ZG5GVTgvSjZ4aDJmNXpqZ3J0aDdXNzlUTTRvNFZPZWNJR1IycTYyS3FaRVlXY2tCQWFNM0tSaENZaE5KaGRtUzhxczRqa0hiU0kxaVpXSEhSV2FCTm5yMkd0bFowUUNFUnNNdDh2Y1J2NjZoeld0Y0tNYUkrNGJOWW83YWlNME9ZYk9Za3ZMcmNKeldpNFpFNmhTS00zb2hPY1BDVzBqRy9XS1R6RHFiN1lZZ1pmT2lQYVpkVEtzc2N5SmlnMGNsSmRxU2tzdERCUm1RRzBUTU5lTmgwOTc2alFFajllenNJOElUUlpxWm1uNGg1UnljVzJoVVp1NHN2TFpVSWJJZHJZVUZZYk8rRzl6cWlGZnpnbXMxTm56N083My9yTUpUT2NUa25OL1BNMS80eG9EejVpa3l3eE5BSmRYRzRTR3Y5NWYrUDhMTkxJY0t0SmE4N3M1NmJ4T1k0SjdVRGVhZGI3aGVrc1VwazluRmFKellyWE1TKzI2RDZUV1lzM2w4b0k3V2NqUi9FRjVoS2hmUzdheUMxU0RxSW5lekJ3YStwR3g0UTJQMmV2UHNQWndWVXpuRTZLVGE1ZDZxUklIYXJ5T2JxODNDQTAvck51NXVTTE5uQ254QnowWkE4Ry9weThqcDA4NTh4YXRMR2ZydkRBaElEZFVqTXZ0ZzU5cDdHUWpCTm1oWlp2NUNxK3hGUVZHdjg1MTRqS0RKWnBSQ1p0bzBOUEhPVGJIYzRjYXpmd25ma3MvT0VNQmNUakJxbVpFMXZEMGJEUDAvU3NaNzZScy9naVUxUm9kNGsyS3BRYUpwazV5OCs3enpna3RKK0RRR2grcWVITmdvYW01c25jZXQ2RkxqRVZoY1ovUmhQT1p0RUdiVXZMTkJ4bjBMZTVqZ2p0b2RIZjZDZWw0d3ZIalZJTGZMVFdiTGhVSWNqTlJ1N2l5MHdWb1dtKzdSUmZpVFltTE5PZ1oyZk9jOFBZMWJiTDdGQitBZnY3NEZrS1ZhbDFVbXhXdmw3Tll1dlFiN3B4NjJsYWFsOXBxbXlKVWtSb2Q1dHB5STVqTnFJbmR6RHlwNlExdGd0dHdZWjkrdjdORG80ZVc2Y0t6a3V0N1F1ZnlRaU5HVGxNUXVPdmZSVW5TN1FCRzZjZFpUM2pzdEdUT3hpNWNkeGEyNFUyZCtWT1hXYmVYTEtocHRqcUorMlZFVnFXa2N0Qkw3UWhvbzFYUHlNL29NSjJoRTJNWHNXT25TMjJWV2hEcHkwS291ZG5Ua3FOVThVdmliQ0JjMW10VEttVG9vWUV0ZEQ0NjRaelZvbzJYTFBVUS9oSkhlUk1YWFBDTnBrVkZaZXdmOGQvRlNRem5JRkt6WmxaMFBBQlg4c1VnbHhwNUhUUUNpMVp0Tkhnck1ITzhhdlFFenJZbWJYNXBHMUMyL0o3bnI3bENYWUo0TXRFRmV3UzJxV2p0ZWcrVTJTZnBTVUhwZEQ0YTBaeThrUWI3R3FhQ0ZDQ2Y4M1lhWnZRUGwyOFZkK1E3cTZpanQ0UlcvTzNWc2tJTFUvUDdhd3ptalF1RTlwazBjWnFOakVYUFpFSkg3M2lsOXNtdElsZnJXRlgzcCttZ0R4VXhYNnBOUm0xU1VacWsxc05ucS9KNGhxaDhkZDdXQk9zZFFhbm4wY2xiVVZQWk1KSDc4U1Z0Z2t0L2V1MXJOWDlxUXFJUTJYc2ZLWTJpVVhJTGVPQTNINDRiT0EzbWd4dUV0cEMwVVlLVDk2Rm5zVEVwYnkzenZxSmdkSlN4b1pOWDh5dWZJQkdhSUZKelI2eFJmV2J3Um9sYkpXUjJzS3dBVnhNRXJoQ2FKcHY3OWR4a2NhQi9acDA2SWw2akZtU1o3blFDczhYc2J1R2ZjcmFlYUtvbzVOaXMvNTFJMTc0bklXbTVac1ZHdVQ0WGUyZS8xUXppL0pDNDYvVFRsUm1BRlRUd0U1ZTRuSnVtYmpCY3FIOWNlSXM2L3JzZXl3cUtIY0lxQ2UyZXVQMnlZelNJTmZiUmZXZHJwbkJEVUliSzlvb2NQcDVEOW9Sb0NTOTQ1YXlFNFhXTHJCZHUrTXc2OWpublNEZklhQ0swQ2F4aVA2ZnNqb3BSMlNrTnJiOTB4OXFabEJhYVB3MVlqbW5SQnNrS21tTGJRblpLNDUyRzhqeXluZldWdDU0WjI0T0MzOG9nMFdqeThITldGdTFJMnpBSEJtaFFjN0hSdlY3WHhORldhRnB2aVBrOTRvMkJweE9ZMmV0czk0ajZleE9XZnAvZmNBeW1jR0VRUHpNYk5vaG9KVFVKckVPVDc0clcySUljaitrUTk5cG1nZ3FDNjBicDBDMElhNU5YR2VmekVZc1psM0g1dENlVU5sMlRGak9Db3FzRWRxRjRtSzlCbHJFSXlRMDY2Um16ZGtGN1o2YkpTTTB5UDF1bmhDYUliUDlvbzBBK3pYdGxrM1hVU3RJYUxKQzQ3OFlUbDZ3Um1obnp4ZDU2Tmc2bFpDWEdwdy9VRDlwajR6VTlvdEtUVldoSllsKytMcVpKMGcwTHFIM3lDWHNqRVVqdEwySFQ3QmJYLzJJUlQ1S2V6aFZsRnJibDc2VVdjWUJKUEhSbmhZb3lnbU5mOSs5bkIyaUg3eGQwbmIwUkNVQ0ZkcGl0djJZTlVaYnQvTXc2Lzc4ZjJqSmhzSmlhLzcyYWhtaGdRdnVqZTR6UlFzRXBZU20rU1lDaE10cU4wcjdndzQ5Y1JrUHpkeHRpZEJ5ZGgxbW5aK2VHcVJWYXAwVW1ubXBoYi8wdFd6Tk5IQkNTRVQvVDdXYVVFMW92VGtsb2grNGE5d0s5QVFseExDcThzWlBPWHYwMFZuMEU5aEo3M1hrcEhibHF6L0sxRXdESi9SMm85QytFUDJ3RGRLUDBlak1oY0J6dE4zSDVXY0dCazlkUUVzMkhCZWJpZS9yTTRVMUdMTkxacFQyUmRUVE03U2FVRVpvL09zZjQ1d1grWkFOMC9OWXQ3amw2TWxKbUdQYk1UbWhsWlNXc2dkSGY2MHZxc1ZQOUdCRFhHeHRYNXpOUjJrRlpvVUdibmdzOHRtWlduVW9JVFROZDBiZjc2SWZFbThpZ0JiWFdzSHVmRG1oYmQyWHArL2hiUDhZUFQ5emk5UmFERnN1TTBvRFJ6U0plSjdmWGxhQktrTDdUdlREdFVnNXlMcU1Xb21lbElSNUZraWVwajcraTFVczdFRWFuYmxKYWgzNlRtZDF4eCtVa2RwMzRRTyswYW9DWFdqODYxcHdkb3QrTUNxcjdYNytsZ3FWTjBwTnllelgzL1BZbndmTW9QVm5TaEQ0aEVISEp5YXgxb1BteWR4NmdpdGFSRDQ3UzZzTUZZVDJKcWRVNUVNMVRNdERUMFpDbmw3ODFqMWgwVkYyN3R4NUlabHQzSE9VL2VPTlQraklPcVVJVkdxVFdIU2ZkMlZPWFFkWHZObjJoUysweWtBVkd2K2Eyem01b2grS1RqLzNCcjFHTG1haEk3ZXcyOVBXc0Vuek5yQzAyYXRZeHB5MTdPTkZXOWxIdi96S1Bwei9LL3ZnNTgxczVvSXRiUGF5N2V6YmxUdFo0cXpsck1mejAyaXJrNXZobzdTSTV6OWxvZW1tZHhDQU0yNi84clVmdFlxZ0NZMy8vL3FjWGFJZkJxcHBVTVVMYjlCejVCTFdhTlJtMXVqVkJleUtmak5aR3o3aWF2MUFtazZyKzlOWXkzK242c0RoSnpDVENSVnBRV1NSZEZTZDR0UTBVb05SMm1UV09INkx6TE0wY0VmOXlHYysxTXFES2JTYk9jVWlId0xPMTZSbEd0NEFOcWhEWmRNbWNSdFpxOEcvc0xiUGY4YWkrdjVIRC9pS2RjM2czK0Y0T2gvWXlVcFlJN1pKck4zem4vQzhOcjNZRnR4eHN4TDEwUGovdTFJelVWYjdtc1QxNklsSVdDZTArdU4rWjAzak5uQ2h6V2ZoL0Jha2JaK3BMT0xSU2Zvb0RBaDdLSjJUb1kvT1lQRXMvRGQ5VndCNm9oTHlVdVA5K09TN3JGN3lmcGxSR2pqa3lqWXZmNnY1Y1Z4b21tKy81djhTZmZPaG1hZjEwajNZaVVoWUo3VFFwSDJzenZDTkxQU2xuOWlWejN6TWVneWN5ZjQyK0dQMnQ5ZG1zanVHZk15ZVMvK1JEZjlnS1J2QkdUVDVGM2IzMjUreGE1K2Fva3V1M2FPWk5GcHpEVlZNR1BBUmQ4c2hpMWhvK25FWnFZRkxRdmd2T1EzQUVGcEh6am5STng2ZXZCTTlDUWxyYVpGeWdOMDBaUWRMbWIrYnpWbXpsK1htbldMRkphV3NpQU4vVnJ4T25EbkhWbTNMWlJPK1hNWCsrc3FIWmFNMi9JUWx6QUtqdEN2ZVdDSWpOSEJKeCtnbnAyaUFvMEl6Um1mQ3A1ODNUVDNNdXNjdFEwL0F5dWhOdXdaTThlLzN0N005K2VlNXZFcE1yVU03Y3Z3TW16SnZQZnV2SVovb3Q2YnRhYUxBSlZ3K1VvT2o3eG9sL2lZanRjbjZLTzNKcVk0TDdSN1JOeHVTVmFEMHJTYk51SXB4NDlnMUxHTmxmcVVqTUROWDNxbENsdmp4Y2hiVDcxMTlYVnBIOUlRbHpFaXR6Y3ZmeWdnTnVJZVA5cHdUR3YvM0tNNFMwVGZhT08wb2pZSThBcHpKZWE3WUdwRlZ2SlpzM3M5dUh2UWhhL05ndWdJSlM0aEtyY05UVTJXUHZsdGlPTVl4b2YxTDlFM1d6anhGWmJVOUFzanNiSkU5TXZOZjJ3L21zOXRlbjhuYVBKQ3VqOVJvdEtZNmwwNFd0QjcwUGF2RmMxNUNhdjl5UkdqODc0MDVTMFhmWU5QVVEraUpTTWp6Vnk2ek14ZnNsWm4vMm5ub09MdmxsWS8wQ1FNNGZCZy9hWW5BeEdaSTdkV2ZaSVMyMUhDTmZVTFRmQk1CYzBUZlhMMk00L1I4eWdQYzRxRE0vTmZLMzNKWmwyZmVZKzFvNDdxcmdJM3I3WjcvV0diak9qTmNFMktuMEZwcmlwMStUampId1ZNV0hlOGtlQ1Y5dG9KRlBFeExPdHhHZEo4cHJOV1FCVEpDTzJVNHh6YWhqUko5VTgwbjVxSW5JaUZQNm9wamxzMW1pbDduTGhTei96MzhDNnJJNFRiNEtDMnEzM1JXWjhJaEdhbU5za1Zvbkx0RlIyZDFNMDZ3NnhMV29pY2pJY2VONDlhaXljeC96VnU5aStxbHVaRStrMW40Z0c5a2JqMVBHZTZ4VkdpbTltdkM2bkhzWkNUaytXRERTVlNad1ZWVVhNTHVqWnROaDZpNGxLWWoxc21NMG80YkRySk1hUDh0K2laQ3NrN1Q2TXdEOUlyTHhuWloyWlgrOVJwOUp3RjJjaExpdEg5NmhteTU3disyU21qUm5CT2liK0RxMFJ2UWs1R1E1NUZaZTdBOVZuWnRPNURQT2owMWhRNGlkaWxoTDgrVk9hVDRoT0VpS2FIVjQ0d1cvZUcxTTAvUytab2VJV0hSSDlnZUs3c0tDaSt3djc4K2k1Wnd1SmphcVhreW83VFJocE5NQyszL21QbkJFY2xZUjlJUlZnSzNtOHYybjhQMldObFZVbExLK21mOHlNSm9TNVJyYWY3MmFobWhNY05KcG9XV0xmb0RtMDNNcGRHWlZ4aTlDdHRobDExWmM5ZnBaYjJ4RTVNd1Q3UGhhMldFbG0xV2FHOXBnaWM0MFg1TmI5RTdjU1cydnk2N29Nd1FDYzNkd0FSQnFQbGJ6MUxEVFVKQzY4dzVJanc2by8yYW5rSkZvVTMrTG9lRTVnSENYL3BLWnBSMnhIQlV3RUliTFBwRFlMOG1qYzY4aFpwQ294R2FGMmovOUFjc0pPT2tqTlFHaXdodHBNaUwxOG82d3lMRzBVU0E1eGl0bnRDbWtOQThRL2hMWDhzSWJXU2dRcnVYYzFya3hXbS9wamZwbmJDQzVSZWFLNnR0MTZVTGpXWTVQUUdjNTlrb1lhdFpvWjAyWEZXdDBKcHgxb3ErT08wSThDN2psdVpoTyt5U0szN1dNdG90NENHZ3VtMUlodWxDa0dzTloxVXB0TGFpTDBvbk9IbWJvVDhleG5aWTJlV3J1dkU1aTNpVVNnbDVpYkNCYzJXazFyWTZvVjB0OG1JTjBvK3hIbkhaNkVsSDJBZE1ER0JYMnZCZnYrMC94bUtlZnBkRlBVNDdCYnhHYU5veHMwSzd1aXFod2YvSUZYbXhzT1JkNkFsSDJFOXlOYmVkcFZYODNZNXI5Q2ZMYVplQVIybng1akt6UXN1OVJHcG1SMmRBVzdyZERBcGdsRlpVeFFsUHBlV3c4enBlVU1qK2E4akhMT0lSS2gva1JjSUd6akVyTkZhWjBHREQ1d2lSRjJtUmNwQzJPQVVSL2I3Y1YzYnJXVm9CK00rQW5WSjc3L3NOTFB3aGtwbVh1V0pvdGxtaGpkRDhtOVlOb2RYbnJBLzBCVUt6VHJQckU5YWdKeG5oTEcvOWZLUk1ZS3pjbjNhUHpuWWZPc0Y2OVo5T0o2cDdITmc5WUxLeTdYckRZZWFFVmlmekpIcHlFYzdUTzM0NTI1Ri80YkxSV0ttTlJpczhYOFNlU2Z1ZWhkSG9MQWlZek9wT3lMVkVhRDA1SndOOUFmMVlPam9CUFRnWnZZb2RMdkNkL2xSKzh0TXVwMlhOV2NkYTNaK3FRTElSVHRCeXlFSldaNkx3cWVzbkRZZVZDZTBIRVpsMWoxdUduMWdFcXRTT25TMjVUR3BXWDNBd3l2WDkzcVZielNDajRlZ2Raa1pwUC9pRjFvcXpRMFJvNkFsRjRNT2x0dnpnT1Zaa2s5Rm1aMjlqMTNHWlJUeENpMmlEaldadnJ6RWp0QjI2eS9nL0hnLzBtMkFUT2kzVklNb1Q5OHRSZHI2S0pSMW1ydE5uejdPSnM5ZHdtVTBobVFVcGtjOStaRVpvVEhjWi84ZlFRTDhoSkt1QXhTU3NSazhpUWkxdVRsblA5cCtVUDFWOTlmWkQ3S0V4MzdBMkQ2YlRib0FnSnZMWm1XWm5PNGVDMElST1E2ZlRuSWpLZ1BNSDVtNHZFTjRtQmVkdDV1dzh6QWErTTE4LzBZbE9SeWVBTmk5L2EwWm9vNFNFMWpBdGo0bzRFdFZ5ejN2YldYSjJIa3RaZHF4TVdzVWxKYnE0L01zNzhrOFZzcFcvNWJJWE0zOWlON3owUHV2SUF4Z1d6ZEx4ZElTZnFMN1Q3QmRhcDhRYzlJUWgzRUd2K0d6MjZ1U2YyZitOKzVMZE9mUVRkdVBBR2ZwNnNuOG5mS1hQWEVMUWRuaGlVaG5ZQ1VTb0JWUzB0VlZvY0FCS2wxRXIwUk9GY0FmZFJpeGhuVi8vam5VZThGbFprTUlJREpaZ3dKOGtNYUk2YkJkYXk1Ujk2RWxDdUkrdXc1ZXc2MS84bE1XVUV4dEIxRVIwbnluMkNvMEtPUkl5ZE9VanRwalg1dklSMitmb3lVSzRBMXVGUnFlaEUxWUFJN2FZZ1YrZ0p3dWhQcllLalJiVUVsWUIrNEE3di9ZdGpkYUlhckZWYUszSDcwVlBCTUpiZEhsN0lVbU5xQkpiaGRhVVRrVW5iS0tyUGlNNmorUkdYSUt0UW10R1oyOFNOdE5qNUZMV2VjZ1BKRGFDUmZWN240UkdlSVB1WEd3eGcra1pXekJqK3pvME9oMmRjQnA5cWNjclg1UFlnaEFab1kwTTVJdWJwQjZoUTFFSUZMb01YOHc2dnp3YlBja0k1WVUyRW9UV1A5QnZ1QzVoTFhwd0U4RkxsN2NXMGhxMklLSDkwelBNQ0swL0NPMmVRTC9oV3RxY1RpQURkd21kMzV4UHQ2RWV4NlRRN2hFU1dzUDBQTllqTGhzOXFBbWlKNGp0alI5SmJCNmtROTlwck1IWVhmWUxEYUFTUW9SSytHWkV2eU94ZVlqSTUyYVprWms1b1VVbWJVTVBZb0tvaUw0NDk5VTVKRFlQMEhSRWpwVFFidU1VQnZwTjlUUHkwWU9YSUtxaTYvREZMR1lRellpNm1Ycmo5cG1SV2FIdU1zMTNMbWQyb044WW1uV2F0UjYvQnoxd0NhSTZZSjhvellpNmkrZ24zMlZONGphYUhaMWxhK1VPR2w0ZytnTFhKYTVERDFxQ3FBNTlSblRZTDNRYjZoSmF2L0s5V1preHcyRmxRdXZHeVJONWdhYXBoMm1oTGVFS2ZET2lQNUhZRkFZbUFtcW41cG1WV1o3aHNES2hBZk5GWDZoWjZpR1NHdUVhOUJuUjEybEdWRVVrYmpXWjRTNnRvdERHbVhteDZERy9vZ2NxUVlqUWJjUlNtaEZWaUdiRDE4aklqQm51dWt4b25jeThHRXdTdEp5d24vVWV1Umc5VUFsQ0JDZ0gzbm5RVnlRMlJGb09XU1FyTTJhNDZ6S2hOZU84WVBaRm9ScEg1L2hWZEJBeDRUcTZ2TDJJWmtRZEpuekFONnpoNkIweXo4Mzh2R0M0NnpLaCthVzJTT1lId05rRDNlS1dvd2NwUVlpZ24zTXdiQUdOMWh5Z1Nkd21LMFpsekhEVlJabFZJalRnZHM1cG1SOEV0NkVSNCtpVUtNSjk2RE9pUTJsRzFBNWF2TG1NTlV6Y1pwWE1UaHV1dXRSZmxRZ051SXR6UnZhSHRobS9SNzhOaGVkcmRDdEt1QW1ZRWFWekR1U0F3NEpoc2V3VmJ5elJaV2FSeUpqaHByc3FkVmNWUWdPbVcvSERRN0lLV0ozTWs2eFIyaC9vUVVvUW92ajNpR0xMd1czQXcvN1ExRHpXT0g2TGxTTHpNNzFLYjFVanRDWldTYzBQN0FNRjJpVnQxMGR1VjQvZVFPV0lDT1dCdFpZdGh5eG1IWjZhaWk0S0ZZbm8veWtMR3poWC96dU14T3BNT0dTSHhNckxySWtab2RraXRmSWpOL2l6U2VwaGRnMFhXK08wbzZ4bHluNFdsYlJGRngxVXh3VTZKNnhDRDJnaXVJRUpnN284U1JzbWJ0Y1RON3JQWkhTSk9BbXM0bS83NHBlWDBIRDBkbFkvNlhlZFdwbW45Vnl1bDd6ZlRwSFZMTE1BaEdhcjFBS2gxcVF6K282RThqU3Q4TzlCemNSY2ZjbU1DUEE5Nk8vYkVnNno1aE1Pc09hSlcyMEhFamhZcVpWNUNpWDNoV1VXb05EUXBVWVFSRkFUbU13RWhPYVgyaE9jOHdwOFFJSWd2QSs0NWdrdFVKa0pDczNQLzNDMmFoWXM2eUFJZ3FnRWNBczRCbHdqNWlmaGIvQlJpek9jYzFDQkQwOFFoSGNBcHd6WGZJNFJkNU9wYjdvb05SZ0t4aXZRQ0FSQnVCOXdDVGpGbk13a2hWYWVBWnhObkdKT3FRSU5ReENFK29BcndCbmdEbkNJdklzc2VSRWZqVGh0T1g4eTNpaUpqU0NJeXZEN0FWd0J6Z0IzV09NaHkxN28wbHZSVGdaak9kczRSeFJvUklJZzhBQUhnQXZBQ1g0L21MKzFkRkJvbFkzY2dHYzVTd3l5RFZaeFRob1VLTkRvQkVHSUE3bnJ6MlBJYVg5KysvTWRjdC92QVh0OVkvc1BDSnhRemJlRC9wK2FiNWFEdUpRUm5KRUdveXdrcnR6cmpxamlaNytsQ0RXMVM1ekZiVk5UdXdRN2tLdVFzNUM3MlA3UStmL3hkL0wvTVg5UVVRQUFBQUJKUlU1RXJrSmdnZz09Ii8+PC9kZWZzPjxzdHlsZT48L3N0eWxlPjx1c2UgIGhyZWY9IiNpbWcxIiB4PSIwIiB5PSIwIi8+PC9zdmc+'
      this.$swal({
        html: `<img width="100px" src="${iconData}"><br /><p style="color: #fff; font-size: 16px">${msg}</p>`,
        // type: 'error',
        icon: null,
        confirmButtonText: 'Confirm',
        background: '#434343',
        confirmButtonColor: '#0097f6',
        cancelButtonColor: '#adc9d6'
      })
    }
    /**
     * @description 弹出错误
     */
    Vue.prototype.AlertSuccess = function (msg) {
      this.$swal({
        html: `<p style="color: #fff; font-size: 16px">${msg}</p>`,
        type: 'success',
        confirmButtonText: 'Confirm',
        background: '#434343',
        confirmButtonColor: '#0097f6',
        cancelButtonColor: '#adc9d6'
      })
    }
  }
}
