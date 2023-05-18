<template>
  <div class="loginbar">
    <Verify :showVerify="showVerify" :account="account" @closeVerifyAndlogin="closeVerifyAndlogin"/>
    <!-- 登录 -->
    <div class='login'
         v-show="isLogin">
      <div class="login-main">
        <ul class="login-main-box">
          <div class="logobar">
            <div class="logobg">
              <div class="logo">
                <div class="logoA"
                      @click="returnHome()" />
                <div class="logoB"
                      @click="returnHome()" />
              </div>
            </div>
          </div>
          <li class="user">
            <div class="input_block">
              <i /><input type="text"
                    placeholder="USERBANE"
                    v-model.trim="loginForm.username">
            </div>
          </li>
          <li class="key">
            <div class="input_block">
              <i /><input type="password"
                    placeholder="PASSWORD"
                    v-model.trim="loginForm.password">
            </div>
          </li>
          <li class="vcode" style="display: none;">
            <i /><input type="text"
                   maxlength="5"
                   placeholder="输入验证码"
                   v-model.trim="loginForm.VCode">
            <img :src="vcodesrc"
                 @click="getVcode()"
                 alt="点击刷新图片"
                 style="width:auto;height:auto" />
          </li>
          <li class="forget">
            <i @click="remember =!remember"
               :class="{'on':remember}" />
            <span @click="remember =!remember">REMEMBER</span><br />
            <i class="forget_ico" />
            <span @click="forget">FORGOT PASSWORD?</span>
          </li>
          <li class="btn">
            <button @click="login">{{loginBtnText}}</button>
          </li>
          <li class="newuser" @click="goRegistered">
            <i class="newuser_ico" /><span>NEW USER?<em>JOIN NOW</em></span>
          </li>
          <li class="btn">
            <div class="RtdFacebookBtn">
              <span></span>
              <div
                type="button"
                @click="FBLogin()">SIGN UP WITH FACEBOOK</div>
            </div>
          </li>
          <li class="text lookin_moment" @click="visitor">
            <i class="lookin_moment_ico" /><span>LOOKING AT THE MOMENT</span>
          </li>
          <li class="text download_app" v-show="appDown">
            <i class="download_app_ico" />
            <a target="_blank" :href="downUrl"><span>DOWNLOAD APP</span></a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 注册 -->
    <registered v-if="!isLogin && !isFBLoginToReg"
                @goLogin='goLogin'
                @restore='restore'
                :def='def' />

    <!-- 注册 -->
    <registeredFB v-if="!isLogin && isFBLoginToReg"
                @goLogin='goLogin'
                @restore='restore'
                :def='def'
                :FBParams="FBParams" />
    <!-- 客服 -->
    <div class="service-box">
      <div class="img"
           @click="serv1">
        <i></i><span>24/7</span>
      </div>
      <transition name="slide-fade">
        <ul class="service"
            v-show="service">
          <li @click="serv1">LINE1</li>
        </ul>
      </transition>
    </div>
    <!-- 下载app -->
    <!-- <div class="download-box"
         v-show="appDown">
      <div class="img">
        <i /><span>APP下载</span>
      </div>
    </div> -->
    <!-- 背景视频 -->
    <div class="video-wrap">
      <!-- <video muted autoplay loop src="static/video/test.mp4" webkit-playsinline playsinline/> -->
      <div class="img"></div>
    </div>
  </div>
</template>

<script>
import registered from '@/components/Login/registered.vue'
import registeredFB from '@/components/Login/registered_fb.vue'
import Verify from '@/components/Login/verify.vue'
import {initFacebookSdk} from '@/_help/init-facebook-sdk'
import '../../../static/js/gt/gt.js'
export default {
  name: 'login',
  //  import引入的组件需要注入到对象中才能使用
  components: { registered, registeredFB, Verify },
  data () {
    //  这里存放数据
    return {
      showVerify: false,
      account: {
        Username: '',
        Password: '',
        VCodeKey: '',
        Token: '',
        Balance: '',
        isShowIpDiffCheckCode: '',
        LastLoginTime: ''
      },
      isLogin: true,
      isFBLoginToReg: false,
      service: false,
      def: false,
      loginForm: {
        username: '',
        password: '',
        VCodeKey: '',
        VCode: '',
        cellPhone: ''
      },
      FBParams: {
        fb_username: '',
        fb_email: '',
        fb_access_token: '',
        fb_id: ''
      },
      remember: false,
      inClickProcess: false,
      loginBtnText: 'LOGIN',
      appDown: false,
      vcodesrc: '',
      downUrl: 'https://app.18slot.app/'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closeVerifyAndlogin () {
      let _this = this
      _this.$bus.$emit('loadingShow', 'Login Success')
      setTimeout(function () {
        if (_this.$route.query.m) {
          let index = 0
          if (_this.$route.query.m === 't') {
            index = 1
          } else if (_this.$route.query.m === 'w') {
            index = 2
          }
          _this.$router.push('/center/home')
          setTimeout(function () {
            _this.$nextTick(function () {
              _this.$router.push({
                name: 'wallet',
                params: {
                  index: index
                }
              })
            })
          }, 200)
        }
        _this.$router.push('/center/home')
        _this.$bus.$emit('loadingHide')
      }, 1000)
      if (_this.remember) {
        _this.setCookie(_this.loginForm.username, _this.loginForm.password, 30)
      } else {
        _this.clearCookie()
      }
      localStorage.setItem('remember_pwd', _this.remember)
      // sessionStorage.setItem('remember_pwd', _this.remember)
      // _this.saveinfo(
      //   _this.account.username,
      //   _this.account.Token,
      //   _this.account.Balance,
      //   _this.account.LastLoginTime
      // )
      _this.showVerify = false
    },
    /**
     * @description 游客进入
     */
    visitor () {
      this.$router.push('/visitor/v_home')
    },
    /**
     * @description 前往注册
     */
    goRegistered () {
      this.isLogin = false
    },
    /**
     * @description 前往登录
     */
    goLogin () {
      this.def = false
      this.isLogin = true
    },
    /**
     * @description 默认未注册状态
     */
    restore () {
      this.def = true
    },
    /**
     * @description 主线客服
     */
    serv1 () {
      this.sliaonow()
    },
    /**
     * @description 次线客服
     */
    serv2 () {
      // this.sliaonow2()
    },
    /**
     * @description 检查是否登录
     */
    checkLogin: function () {
      return !!localStorage.getItem('account')
    },
    // 获取验证码
    getVcode () {
      let url = '/api/Reg/VCode'
      let params = {
        Key: this.loginForm.VCodeKey
      }
      let _this = this
      this.vcodesrc = 'static/images/popup/codeload.gif'
      this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcodesrc = 'data:image/jpeg;base64,' + res.data.Result.Img
            _this.loginForm.VCodeKey = res.data.Result.Key
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'Confirm'
            })
          }
        })
        .catch(err => {
          // _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    /**
     * @description 登录
     */
    login () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      if (_this.loginForm.username === '' || _this.loginForm.password === '') {
        _this.AlertWarning('Username or password can\'t be empty!')
        _this.loginBtnText = 'Login'
        _this.inClickProcess = false
        return false
      }
      // if (this.loginForm.VCodeKey === '') {
      //   _this.$swal({
      //     text: '请刷新验证码！',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   _this.inClickProcess = false
      //   return false
      // }
      // if (this.loginForm.VCode === '') {
      //   _this.$swal({
      //     text: '请输入验证码！',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   _this.inClickProcess = false
      //   return false
      // }
      _this.loginBtnText = 'Loading'
      _this.$bus.$emit('loadingShow', 'Loading')
      let initGeetestUrl = '/api/Geetest/initGeetest'
      this.$https
        .fetchGet(initGeetestUrl, {})
        .then(res => {
          var resMessage = JSON.parse(res.data)
          // eslint-disable-next-line
          initGeetest({
            gt: resMessage.gt,
            challenge: resMessage.challenge,
            offline: !resMessage.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: resMessage.new_captcha,
            lang: 'en',
            product: 'bind'
          }, function (captchaObj) {
            console.log(captchaObj)
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              var result = captchaObj.getValidate()
              let url = '/api/Login/LoginBySlidePicture'
              let params = {
                UserName: _this.loginForm.username,
                Pwd: _this.loginForm.password,
                DeviceId: localStorage.getItem('mac'),
                // VCodeKey: _this.loginForm.VCodeKey,
                // VCode: _this.loginForm.VCode,
                ScreenWidth: window.screen.width,
                ScreenHeight: window.screen.height,
                seccodeGeetest: result.geetest_seccode,
                validateGeetest: result.geetest_validate,
                challengeGeetest: result.geetest_challenge + '|gi'
              }
              _this.$https
                .fetchPost(url, _this.Secret(params))
                .then(res => {
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.$bus.$emit('loadingShow', 'Loading Success')
                    setTimeout(function () {
                      if (_this.$route.query.m) {
                        let index = 0
                        if (_this.$route.query.m === 't') {
                          index = 1
                        } else if (_this.$route.query.m === 'w') {
                          index = 2
                        }
                        _this.$router.push('/center/home')
                        setTimeout(function () {
                          _this.$nextTick(function () {
                            _this.$router.push({
                              name: 'wallet',
                              params: {
                                index: index
                              }
                            })
                          })
                        }, 200)
                      }
                      _this.$router.push('/center/home')
                      _this.$bus.$emit('loadingHide')
                    }, 1000)
                    if (_this.remember) {
                      _this.setCookie(_this.loginForm.username, _this.loginForm.password, 30)
                    } else {
                      _this.clearCookie()
                    }
                    localStorage.setItem('remember_pwd', _this.remember)
                    // sessionStorage.setItem('remember_pwd', _this.remember)
                    _this.saveinfo(
                      _this.loginForm.username,
                      res.data.Result.Token,
                      res.data.Result.Balance,
                      res.data.Result.LastLoginTime
                    )
                  } else if (res.data.Status === 'VCodeError') {
                    // 验证码错误
                    _this.$bus.$emit('loadingHide')
                    _this.loginForm.VCode = ''
                    _this.getVcode()
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: 'Confirm'
                    })
                  } else if (res.data.Message == null || res.data.Message === '' ||
                    res.data.Message === '发生一个意外错误，请联系在线客服。错误：102' ||
                    res.data.Message === '您的登录发生异常，代码:102，请联系在线客服帮助您！') {
                    _this.account.Username = _this.loginForm.username
                    _this.account.Password = _this.loginForm.password
                    _this.account.VCodeKey = _this.loginForm.VCodeKey
                    _this.account.cellPhone = res.data.cellPhone
                    _this.account.isShowIpDiffCheckCode = true
                    _this.showVerify = true
                    _this.$bus.$emit('loadingHide')
                  } else {
                    _this.$bus.$emit('loadingHide')
                    _this.AlertError(res.data.Message)
                    captchaObj.reset()
                  }
                  _this.loginBtnText = 'Login'
                  _this.inClickProcess = false
                })
                .catch(err => {
                  _this.loginBtnText = 'Login'
                  _this.inClickProcess = false
                  _this.$bus.$emit('loadingHide')
                  captchaObj.reset()
                  console.log(err)
                })
            }).onError(function () {
              _this.loginBtnText = 'Login'
              _this.inClickProcess = false
              _this.$bus.$emit('loadingHide')
              captchaObj.reset()
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    FBLogin () {
      let _this = this
      window.FB.login(function (response) {
        if (response.authResponse && response.status && response.status === 'connected') {
          if (response.authResponse.accessToken) {
            let fbAccessToken = response.authResponse.accessToken
            let url = '/api/Login/FBLoginStep3'
            // eslint-disable-next-line
            let params = '\"' + fbAccessToken + '\"'
            _this.$https
              .fetchPost(url, params)
              .then(res => {
                if (res.data.Success === true) {
                  let msgObj = JSON.parse(res.data.Message)
                  let UserName = res.data.UserName ? res.data.UserName : ''
                  _this.isFBLoginToReg = !res.data.isReg
                  if (!res.data.isReg || UserName.length === 0) {
                    _this.isLogin = false
                    _this.FBParams = {
                      fb_username: msgObj.name,
                      fb_email: msgObj.email,
                      fb_access_token: fbAccessToken,
                      fb_id: msgObj.id
                    }
                  } else {
                    if (res.data.Success !== true) {
                      _this.$swal({
                        text: res.data.Message,
                        type: 'error',
                        confirmButtonText: 'Confirm'
                      })
                      return
                    }
                    _this.loginBtnText = 'Loading'
                    _this.$bus.$emit('loadingShow', 'Loading')
                    let initGeetestUrl = '/api/Geetest/initGeetest'
                    this.$https
                      .fetchGet(initGeetestUrl, {})
                      .then(res => {
                        var resMessage = JSON.parse(res.data)
                        // eslint-disable-next-line
                        initGeetest({
                          gt: resMessage.gt,
                          challenge: resMessage.challenge,
                          offline: !resMessage.success, // 表示用户后台检测极验服务器是否宕机
                          new_captcha: resMessage.new_captcha,
                          lang: 'en',
                          product: 'bind'
                        }, function (captchaObj) {
                          console.log(captchaObj)
                          captchaObj.onReady(function () {
                            captchaObj.verify()
                          }).onSuccess(function () {
                            var result = captchaObj.getValidate()
                            let url = '/api/Login/FBLoginBySlidePicture'
                            let params = {
                              UserName: UserName,
                              fbAccessToken: fbAccessToken,
                              DeviceId: localStorage.getItem('mac'),
                              Email: msgObj.email,
                              FacebookID: msgObj.id,
                              ScreenWidth: window.screen.width,
                              ScreenHeight: window.screen.height,
                              seccodeGeetest: result.geetest_seccode,
                              validateGeetest: result.geetest_validate,
                              challengeGeetest: result.geetest_challenge + '|gi'
                            }
                            _this.$https
                              .fetchPost(url, _this.Secret(params))
                              .then(res => {
                                _this.$bus.$emit('loadingHide')
                                if (res.data.Success === true) {
                                  _this.$bus.$emit('loadingShow', 'Loading Success')
                                  setTimeout(function () {
                                    if (_this.$route.query.m) {
                                      let index = 0
                                      if (_this.$route.query.m === 't') {
                                        index = 1
                                      } else if (_this.$route.query.m === 'w') {
                                        index = 2
                                      }
                                      _this.$router.push('/center/home')
                                      setTimeout(function () {
                                        _this.$nextTick(function () {
                                          _this.$router.push({
                                            name: 'wallet',
                                            params: {
                                              index: index
                                            }
                                          })
                                        })
                                      }, 200)
                                    }
                                    _this.$router.push('/center/home')
                                    _this.$bus.$emit('loadingHide')
                                  }, 1000)
                                  if (_this.remember) {
                                    _this.setCookie(_this.loginForm.username, _this.loginForm.password, 30)
                                  } else {
                                    _this.clearCookie()
                                  }
                                  localStorage.setItem('remember_pwd', _this.remember)
                                  // sessionStorage.setItem('remember_pwd', _this.remember)
                                  _this.saveinfo(
                                    _this.loginForm.username,
                                    res.data.Result.Token,
                                    res.data.Result.Balance,
                                    res.data.Result.LastLoginTime
                                  )
                                } else if (res.data.Status === 'VCodeError') {
                                  // 验证码错误
                                  _this.$bus.$emit('loadingHide')
                                  _this.loginForm.VCode = ''
                                  _this.getVcode()
                                  _this.$swal({
                                    text: res.data.Message,
                                    type: 'error',
                                    confirmButtonText: 'Confirm'
                                  })
                                } else if (res.data.Message == null || res.data.Message === '' ||
                                  res.data.Message === '发生一个意外错误，请联系在线客服。错误：102' ||
                                  res.data.Message === '您的登录发生异常，代码:102，请联系在线客服帮助您！') {
                                  _this.account.Username = _this.loginForm.username
                                  _this.account.Password = _this.loginForm.password
                                  _this.account.VCodeKey = _this.loginForm.VCodeKey
                                  _this.account.cellPhone = res.data.cellPhone
                                  _this.account.isShowIpDiffCheckCode = true
                                  _this.showVerify = true
                                  _this.$bus.$emit('loadingHide')
                                } else {
                                  _this.$bus.$emit('loadingHide')
                                  _this.AlertError(res.data.Message)
                                  captchaObj.reset()
                                }
                                _this.loginBtnText = 'Login'
                                _this.inClickProcess = false
                              })
                              .catch(err => {
                                _this.loginBtnText = 'Login'
                                _this.inClickProcess = false
                                _this.$bus.$emit('loadingHide')
                                captchaObj.reset()
                                console.log(err)
                              })
                          }).onError(function () {
                            _this.loginBtnText = 'Login'
                            _this.inClickProcess = false
                            _this.$bus.$emit('loadingHide')
                            captchaObj.reset()
                          })
                        })
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }
                }
              })
          }
        }
      })
    },
    /**
     * @description 设置cookies
     * @param account:账号
     * @param passwd:密码
     * @param exdays: 时效
     */
    setCookie (account, passwd, exdays) {
      // 加密
      var cipherAccount = this.$crypt.AES.encrypt(account, this.getCryptKey()).toString()
      var cipherPsw = this.$crypt.AES.encrypt(passwd, this.getCryptKey()).toString()
      // 打印一下看看有没有加密成功
      // console.log('cookie ebcrypt', cipherAccount + '/' + cipherPsw)
      // 设置有效期
      var expDate = new Date()
      expDate.setTime(expDate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      // 字符串拼接cookie，为什么这里用了==，因为加密后的字符串也有个=号，影响下面getcookie的字符串切割，你也可以使用更炫酷的符号。
      window.document.cookie = 'currentPortId' + '==' + cipherAccount + ';path=/;expires=' + expDate.toGMTString()
      window.document.cookie = 'password' + '==' + cipherPsw + ';path=/;expires=' + expDate.toGMTString()
    },
    /**
     * @description 获取cookies
     */
    getCookie () {
      if (document.cookie.length > 0) {
        // console.log('cookie', document.cookie)
        let arr = document.cookie.split(';')
        // console.info('cookie info', arr)
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('==')// 根据==分割
          // 判断查找相对应的值
          if (arr2[0].trim() === 'currentPortId') {
            // Decrypt，将解密后的内容赋值给账号
            let bytes = this.$crypt.AES.decrypt(arr2[1], this.getCryptKey())
            let account = bytes.toString(this.$crypt.enc.Utf8)
            // console.log('account', account)
            this.loginForm.username = account
          } else if (arr2[0].trim() === 'password') {
            // Decrypt，将解密后的内容赋值给密码
            let bytes = this.$crypt.AES.decrypt(arr2[1], this.getCryptKey())
            let pwd = bytes.toString(this.$crypt.enc.Utf8)
            // console.log('pwd', pwd)
            this.loginForm.password = pwd
          }
        }
      }
    },
    /**
     * @description 清楚cookie
     */
    clearCookie () {
      this.setCookie('', '', -1)
    },
    /**
     * @description cookies加密字符串
     */
    getCryptKey () {
      return '5fa72358f0b4fb4f2c5d'
    },
    // 忘记密码
    forget () {
      this.$router.push('/forget')
    },
    setDownUrl () {
      let scode = localStorage.getItem('raid')
      if (scode === null) {
        scode = ''
      }
      this.appDown = true
      this.downUrl = 'https://app.18slot.app/?sc=' + scode + '&url=' + document.domain
    }
  },
  // 生命周期 - 创建前
  beforeCreate () {
    this.$root.$off('setAPPDownUrl')
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    initFacebookSdk()
    // this.setDownUrl()
    this.$root.$on('setAPPDownUrl', () => {
      // this.setDownUrl()
    })

    // 检查是否已经登录，如若已经登录则直接进入主页面
    if (this.checkLogin()) {
      let url = '/api/mobile/getsidebar'
      let params = {
        Token: this.getinfo().token
      }
      this.$https.fetchPost(url, this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            sessionStorage.setItem('sidebar', JSON.stringify({ result: res.data.Result, time: new Date() }))
            this.$router.push('/center/home')
          } else if (res.data.Status === 'LoginExpire') {
            localStorage.removeItem('account')
            // 没有登录 获取验证码
            // this.getVcode()
          }
        }).catch(err => {
          console.log(err)
        }
        )
      // this.$router.push('/center/home')
    } else {
      // 没有登录 获取验证码
      // this.getVcode()
    }
    // 检查是否记住密码
    if (localStorage.getItem('remember_pwd') === 'true') {
      this.remember = true
      this.getCookie()
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // sessionStorage.removeItem('GamePlat')
    if (this.$route.params.goReg) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
}
.loginbar {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.login {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 1.5rem;
  top: 0.8rem;
}
.login .logobar {
  width: 4.52rem;
  height: 1.3rem;
  margin: 3% auto;
}
.login .logobar .logobg {
  width: 4.52rem;
  height: 1.3rem;
  position: absolute;
  /* margin: 0 auto; */
}
.login .logo {
  width: 4.52rem;
  float: left;
  /* left: 35px; */
  top: 10px;
  position: absolute;
  cursor: pointer;
}
.login .logo .logoA {
  width: 193px;
  height: 46px;
  background: url(../../assets/images/login/logoA.png);
  animation: flipInY 1.2s ease-in-out;
  margin: 0 auto;
}
.login .logo .logoB {
  width: 113px;
  height: 21px;
  background: url(../../assets/images/login/logoB.png);
  animation: slideInUp 1.5s ease-in-out;
  margin-left: 66px;
  margin-top: -4px;
}
.login .login-main {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.login .login-main .login-main-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 0.3rem;
  padding: 0.3rem;
  box-sizing: border-box;
  margin-top: 30%;
}
.login .login-main .login-main-box li {
  width: 100%;
  height: 1.3rem;
  /* border-bottom: 0.02rem solid #dadde1; */
  position: relative;
}
.login .login-main .login-main-box li .input_block{
  background: rgba(235, 233, 233, 0.8);
  border-radius: 0.3rem;
  padding: 0.3rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.login .login-main .login-main-box li.lookin_moment,
.login .login-main .login-main-box li.download_app {
  border-bottom: none;
  height: 0.84rem;
}
.login .login-main .login-main-box li.forget {
  border-bottom: none;
  height: 1.3rem;
}
.login .login-main .login-main-box li.text {
  border-bottom: none;
  height: 0.84rem;
}
.login .login-main .login-main-box li.text {
  text-align: center;
}
.login .login-main .login-main-box li.btn {
  border-bottom: none;
  overflow: hidden;
}
.login .login-main .login-main-box li i {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
}
.login .login-main .login-main-box li.user i {
  background: url(../../assets/images/login/ico_login_user_gray.png);
  background-size: 100% 100%;
}
.login .login-main .login-main-box li.key i {
  background: url(../../assets/images/login/ico_login_pass_gray.png);
  background-size: 100% 100%;
}
.login .login-main .login-main-box li.vcode i {
  background: url(../../assets/images/login/login_vcode_ico@2x.png);
  background-size: 100% 100%;
}
.login .login-main .login-main-box li.vcode img {
  cursor: pointer;
  width: auto;
  height: auto;
  position: absolute;
  top: 15px;
  right: 5px;
}
.login .login-main .login-main-box li.forget i {
  background: url(../../assets/images/login/ico_login_remember_gray.png);
  background-size: 100% 100%;
  top: 0.03rem;
}
.login .login-main .login-main-box li.forget span {
  line-height: 0.5rem !important;
}
.login .login-main .login-main-box li.forget i.forget_ico {
  background: url(../../assets/images/login/ico_login_forget_gray.png);
  background-size: 100% 100%;
  top: 0.56rem;
}
.login .login-main .login-main-box li.forget i.on {
  background: url(../../assets/images/login/ico_login_remember_blue.png);
  background-size: 100% 100%;
  top: 0.03rem;
}
.login .login-main .login-main-box li.newuser {
  height: 1rem;
}
.login .login-main .login-main-box li.newuser i{
  background: url(../../assets/images/login/ico_login_newuser_gray.png);
  background-size: 100% 100%;
  top: 18%;
}
.login .login-main .login-main-box li.download_app i{
  background: url(../../assets/images/login/ico_login_download_gray.png);
  background-size: 100% 100%;
  top: 20%;
  left: 22%;
}
.login .login-main .login-main-box li.newuser span{
  font-size: 0.25rem;
  color: #5B5B5C;
  line-height: 0.8rem;
  margin-left: 0.9rem;
}
.login .login-main .login-main-box li input {
  width: 100%;
  height: 100%;
  font-size: 0.35rem;
  color: #727273;
  padding: 0 0.8rem;
  box-sizing: border-box;
}
.login .login-main .login-main-box li input::-webkit-input-placeholder {
  color: #b7b6b6;
}
.login .login-main .login-main-box li.forget span {
  font-size: 0.25rem;
  color: #5B5B5C;
  line-height: 0.8rem;
  margin-left: 0.9rem;
}
.login .login-main .login-main-box li.forget em {
  font-size: 0.25rem;
  color: #5B5B5C;
  margin-top: 0.25rem;
  float: right;
}
.login .login-main .login-main-box li.btn button {
  width: 100%;
  height: 0.98rem;
  border-radius: 0.3rem;
  color: #fff;
  font-size: 0.3rem;
  background: #0088ff;
}
.login .login-main .login-main-box li.text span {
  line-height: 0.84rem;
  color: #5B5B5C;
  font-size: 0.3rem;
}
.login .login-main .login-main-box li.text span em {
  line-height: 0.84rem;
  color: #0088ff;
  margin-left: 0.2rem;
  font-size: 0.3rem;
}
.login .login-main .visitor {
  width: 100%;
  height: 0.98rem;
  border-radius: 0.06rem;
  border: 0.02rem solid rgba(91, 91, 92, 0.5);
  color: #5B5B5C;
  font-size: 0.3rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.98rem;
  margin-top: 0.6rem;
}
.loginbar .download-box {
  width: 1.2rem;
  height: 1rem;
  position: fixed;
  left: 0.3rem;
  bottom: 0.2rem;
}
.loginbar .download-box .img {
  width: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
}
.loginbar .download-box .img a {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loginbar .download-box .img i {
  display: block;
  margin: 0 auto;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.2)
    url(../../assets/images/login/registered_download_ico@2x.png);
  background-size: 100% 100%;
}
.loginbar .service-box {
  width: 1.2rem;
  height: 1rem;
  position: fixed;
  right: 0.3rem;
  bottom: 0.2rem;
}
.loginbar .service-box .img {
  width: 1.6rem;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  right: 0.3rem;
  text-align: center;
}
.loginbar .service-box .img i {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.2)
    url(../../assets/images/login/registered_Customer_ico@2x.png);
  background-size: 100% 100%;
  float: right;
}
.loginbar .service-box .img span,
.loginbar .download-box .img span {
  font-size: 0.35rem;
  color: #5B5B5C;
  top: 10%;
  position: absolute;
  left: 0;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 0.2rem;
  padding: 0.1rem;
}
.loginbar .service-box .service {
  width: 1.82rem;
  height: 0.6rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  position: absolute;
  right: 0.3rem;
}
.loginbar .service-box .service li {
  float: left;
  width: 1.52rem;
  height: 0.3rem;
  margin: 0.15rem 0;
  line-height: 0.3rem;
  text-align: center;
  color: #b7b6b6;
  font-size: 0.25rem;
  border-right: 0.02rem solid #b7b7b7;
}
.loginbar .service-box .service li:last-child {
  border-right: none;
}
.login .RtdFacebookBtn span{
  background: url(../../assets/images/login/fb_icon.png) no-repeat !important;
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 3%;
}
.login .RtdFacebookBtn {
  display: flex;
  background-color: #4267b2;
  height: 0.98rem;
  /* margin-top: 30px; */
  border-radius: 0.3rem;
  justify-content: center;
  align-items: center;
}
.login .RtdFacebookBtn div{
  color: white;
  line-height: 0.98rem;
  text-align: center;
  font-size: 0.3rem;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.2, 0.2, 0.2);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(1.52rem);
  opacity: 0;
}
.video-wrap {
  width: 100%;
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
}
.video-wrap video {
  position: absolute;
  right: 28%;
  width: 100%;
}
.video-wrap .img {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/login/login_bg.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
