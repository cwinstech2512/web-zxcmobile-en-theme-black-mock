<template>
  <div class='registered'>
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
    <div class="reg-main"
         v-show="!def">
      <ul class="reg-main-nav">
        <template v-for="(navs, index) in regNav">
          <li :key="index"
              v-if="index >= 0"
              :class="{'on': index==active}"
              >{{navs}}</li>
        </template>
      </ul>
      <ul class="reg-main-box"
          v-show="active ==0">
          <li>
          <label>Username：</label>
          <input v-model.trim="phoneReg.UserName"
                 type="text"
                 placeholder="6-10 characters."
                 minlength="6"
                 maxlength="10">
        </li>
        <li>
          <label>手机号码：</label>
          <input v-model.trim="phoneReg.Phone"
                 type="text"
                 placeholder="请填写手机号码"
                 oninput="if(value.length > 11)value = value.slice(0, 11)">
        </li>
        <li>
          <label>短信验证：</label>
          <input v-model="phoneReg.SMSCode"
                 type="text"
                 placeholder="请输入验证码">
          <b @click="debounceSendVerifyCode"
             :class="{on:inClickBtn}">{{btnText}}</b>
        </li>
        <li>
          <label>真实姓名：</label>
          <input v-model.trim="phoneReg.Fullname"
                 type="text"
                 placeholder="请填写真实姓名">
        </li>
        <li>
          <label>设置密码：</label>
          <input v-model="phoneReg.Pwd"
                 type="password"
                 placeholder="请设置账号密码">
        </li>
        <li v-show="!hasRaid">
          <label>邀请码：</label>
          <input v-model="phoneReg.Raid"
                 type="text"
                 placeholder="邀请码必填">
        </li>
        <li class="text">
          <span>注册即代表您已经阅读并同意众鑫<em @click="goRule">规则条款</em></span>
        </li>
        <li class="btn">
          <button @click="debounceSubmitPhoneReg">立即注册</button>
        </li>
        <li class="text">
          <span>已有账号?<em @click="goLogin">前往登录</em></span>
        </li>
      </ul>
      <ul class="reg-main-box"
          v-show="active ==1">
        <li>
          <!-- <label>Username：</label> -->
          <input v-model.trim="accountReg.UserName"
                 type="text"
                 placeholder="USERNAME"
                 minlength="6"
                 maxlength="10">
        </li>
        <li>
          <!-- <label>First Name：</label> -->
          <input v-model.trim="accountReg.FirstName"
                 type="text"
                 placeholder="FIRST NAME">
        </li>
        <li>
          <!-- <label>Last Name：</label> -->
          <input v-model.trim="accountReg.LastName"
                 type="text"
                 placeholder="LAST NAME">
        </li>
        <li>
          <!-- <label>Mobile number：</label> -->
          <input v-model.trim="accountReg.Phone"
                 type="text"
                 placeholder="MOBILE NUMBER"
                 oninput="if(value.length > 11)value = value.slice(0, 11)">
        </li>
        <li>
          <!-- <label>Password：</label> -->
          <input v-model="accountReg.Email"
                 type="text"
                 placeholder="Email">
        </li>
        <li>
          <!-- <label>Password：</label> -->
          <input v-model="accountReg.Pwd"
                 type="password"
                 placeholder="PASSWORD">
        </li>
        <li>
          <!-- <label>Confirm password：</label> -->
          <input v-model="pwdConfirm"
                 type="password"
                 placeholder="CONFIRM PASSWORD">
        </li>
        <li v-show="!hasRaid">
          <label>邀请码：</label>
          <input v-model="accountReg.Raid"
                 type="text"
                 placeholder="邀请码必填">
        </li>
        <li style="display: none;">
          <label>验证码：</label>
          <input v-model.trim="accountReg.VCode"
                 type="text"
                 style="width: 3.0rem;"
                 placeholder="验证码必填">
          <img :src="vcodesrc"
               @click="getVcode()"
               alt="点击刷新图片"
               style="cursor:pointer" />
        </li>
        <li class="text">
          <span>I have read and accept the<em @click="goRule">T&C</em></span>
        </li>
        <li class="btn">
          <button @click="debounceSubmitAccountReg">SIGN UP</button>
        </li>
        <li class="text">
          <span>Already an account?<em @click="goLogin">Play now</em></span>
        </li>
        <li>
          <div class="RtdFacebookBtn">
            <span></span>
            <div
              type="button"
              @click="sendFacebook()">SIGN UP WITH FACEBOOK</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="reg-end"
         v-show="def">
      <div class="success">
        <i></i>
        <h2>SUCCESS！</h2>
        <span>Start your winner way.</span>
      </div>
      <div class="btn"
           @click="goLogin">Sign In Now</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import '../../../static/js/gt/gt.js'
export default {
  name: 'registered',
  props: {
    def: {
      type: Boolean
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 1,
      hasRaid: false,
      regNav: ['OPEN ACCOUNT'],
      phoneReg: {
        UserName: '',
        Phone: '',
        SMSCode: '',
        Fullname: '',
        LastName: '',
        FirstName: '',
        Pwd: '',
        Raid: '',
        Mac: localStorage.getItem('mac'),
        RefUrl: ''
      },
      accountReg: {
        UserName: '',
        Phone: '',
        Email: '',
        Pwd: '',
        Fullname: '',
        LastName: '',
        FirstName: '',
        Raid: '',
        Mac: localStorage.getItem('mac'),
        RefUrl: ''
      },
      pwdConfirm: '',
      btnText: '发送验证码',
      inClickBtn: false,
      totalTimespan: 60,
      timerName: 'cloak',
      inClickProcess: false,
      vcodesrc: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    'phoneReg.UserName': function (val) {
      var _this = this
      _this.phoneReg.UserName = val.replace(/\W/g, '')
    },
    'phoneReg.Phone': function (val) {
      var _this = this
      _this.phoneReg.Phone = val.replace(/\D/g, '')
    },
    'accountReg.UserName': function (val) {
      var _this = this
      _this.accountReg.UserName = val.replace(/\W/g, '')
    },
    'accountReg.Phone': function (val) {
      var _this = this
      _this.accountReg.Phone = val.replace(/\D/g, '')
    },
    'accountReg.Fullname': function (val) {
      var _this = this
      _this.accountReg.Fullname = val.replace(/[^\u4E00-\u9FFF|\u00B7]/gi, '')
    },
    'phoneReg.Fullname': function (val) {
      var _this = this
      _this.phoneReg.Fullname = val.replace(/[^\u4E00-\u9FFF|\u00B7]/gi, '')
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 账号注册
     */
    submitAccountReg () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (_this.accountReg.UserName.length < 1) {
        _this.AlertWarning('Please enter UserName')
        return false
      }
      if (_this.accountReg.FirstName.length < 1) {
        _this.AlertWarning('Please enter FirstName')
        return false
      }
      if (_this.accountReg.LastName.length < 1) {
        _this.AlertWarning('Please enter LastName')
        return false
      }
      if (_this.accountReg.Email.length < 1) {
        _this.AlertWarning('Please enter Email')
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (_this.accountReg.Phone.length < 1 || !reg.test(_this.accountReg.Phone)) {
        _this.AlertWarning('Please enter phone number')
        return false
      }
      if (_this.accountReg.Pwd.length < 6) {
        _this.AlertWarning('Please enter password')
        return false
      }
      if (_this.accountReg.Pwd !== _this.pwdConfirm) {
        _this.AlertWarning('re-password error not match')
        return false
      }
      if (_this.accountReg.Raid.length < 1 && !_this.hasRaid) {
        _this.AlertWarning('请输入邀请码')
        return false
      }
      // if (_this.accountReg.VCode.length < 1) {
      //   _this.AlertWarning('请输入验证码')
      //   return false
      // }
      _this.inClickProcess = true
      _this.$bus.$emit('loadingShow')
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
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              var result = captchaObj.getValidate()
              _this.accountReg.seccodeGeetest = result.geetest_seccode
              _this.accountReg.validateGeetest = result.geetest_validate
              _this.accountReg.challengeGeetest = result.geetest_challenge
              let params = _this.Secret(_this.accountReg)
              let url = '/api/Reg/AccountByGeetest'
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  _this.isreinClickProcessging = false
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.inClickProcess = false
                    _this.finishReg()
                  } else {
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: 'Confirm'
                    })
                    _this.inClickProcess = false
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  captchaObj.reset()
                  console.log(err)
                })
            }).onError(function () {
              _this.isreging = false
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @description 提交手机号码注册
     */
    submitPhoneReg () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (_this.phoneReg.UserName.length < 1) {
        _this.AlertWarning('请输入游戏账号')
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (_this.phoneReg.Phone.length < 1 || !reg.test(_this.phoneReg.Phone)) {
        _this.AlertWarning('请输入手机号码')
        return false
      }
      // if (_this.phoneReg.SMSCode.length < 1) {
      //   _this.AlertWarning('请输入验证码')
      //   return false
      // }
      if (_this.phoneReg.Fullname.length < 1) {
        _this.AlertWarning('请输入真实姓名')
        return false
      }
      if (_this.phoneReg.Pwd.length < 6) {
        _this.AlertWarning('请输入登录密码')
        return false
      }
      if (_this.phoneReg.Raid.length < 1 && !_this.hasRaid) {
        _this.AlertWarning('请输入邀请码')
        return false
      }
      _this.inClickProcess = true
      _this.$bus.$emit('loadingShow')
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
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              var result = captchaObj.getValidate()
              _this.phoneReg.seccodeGeetest = result.geetest_seccode
              _this.phoneReg.validateGeetest = result.geetest_validate
              _this.phoneReg.challengeGeetest = result.geetest_challenge
              let params = _this.Secret(_this.phoneReg)
              let url = '/api/reg/UserNameBySlidePicture'
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.inClickProcess = false
                    _this.finishReg()
                  } else {
                    _this.inClickProcess = false
                    _this.AlertError(res.data.Message)
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  captchaObj.reset()
                  console.log(err)
                })
            }).onError(function () {
              _this.isreging = false
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @description 发送验证码
     */
    sendVerifyCode () {
      var _this = this
      if (_this.inClickBtn) {
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (!_this.phoneReg.Phone || !reg.test(_this.phoneReg.Phone)) {
        _this.AlertWarning('请填写手机号码')
        return false
      }
      _this.inClickBtn = true
      let url = '/api/sendsmscode/reg'
      var params = {
        Phone: _this.phoneReg.Phone
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.cloak = setInterval(function () {
              _this.totalTimespan--
              if (_this.totalTimespan > 0) {
                _this.btnText = _this.totalTimespan + 's后重新发送'
              } else {
                // 当倒计时小于等于0时清除定时器
                _this.inClickBtn = false
                window.clearInterval(_this.cloak)
                _this.btnText = '发送验证码'
                _this.totalTimespan = 60
              }
            }, 1000)
          } else {
            _this.inClickBtn = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.inClickBtn = false
          console.log(err)
        })
    },
    getVcode () {
      let url = '/api/Reg/VCode'
      let params = {
        Key: this.accountReg.VCodeKey
      }
      let _this = this
      this.vcodesrc = 'static/images/popup/codeload.gif'
      this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcodesrc = 'data:image/jpeg;base64,' + res.data.Result.Img
            _this.accountReg.VCodeKey = res.data.Result.Key
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    goLogin () {
      this.$emit('goLogin')
    },
    goRule () {
      this.$router.push('/rule')
    },
    cutoverNav (index) {
      this.active = index
    },
    finishReg () {
      this.$emit('restore')
    },
    // eslint-disable-next-line no-undef
    debounceSubmitAccountReg: _.debounce(function () {
      console.log('current_time', new Date())
      this.submitAccountReg()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // eslint-disable-next-line no-undef
    debounceSubmitPhoneReg: _.debounce(function () {
      console.log('current_time', new Date())
      this.submitPhoneReg()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // eslint-disable-next-line no-undef
    debounceSendVerifyCode: _.debounce(function () {
      console.log('current_time', new Date())
      this.sendVerifyCode()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.getVcode()
    this.$nextTick(function () {
      let mandat = sessionStorage.getItem('mandat')
      let raid = localStorage['raid']
      // console.log('8ffc4cf7df8b3a038600b32d019e03f2', mandat)
      // console.log('7f57eed2a8e5a2a3c7d70f2efd09bd37', raid)
      if (mandat === '1') {
        this.hasRaid = false
        if (raid) {
          this.hasRaid = true
          this.accountReg.Raid = raid
          this.phoneReg.Raid = raid
        }
      } else {
        this.hasRaid = true
        this.accountReg.Raid = raid || ''
        this.phoneReg.Raid = raid || ''
      }
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
  font-size: 17px;
}
.registered .logobar {
  width: 4.52rem;
  height: 1.3rem;
  margin: 3% auto;
}
.registered .logobar .logobg {
  width: 4.52rem;
  height: 1.3rem;
  position: absolute;
  /* margin: 0 auto; */
}
.registered .logo {
  width: 4.52rem;
  float: left;
  /* left: 35px; */
  top: 10px;
  position: absolute;
  cursor: pointer;
}
.registered .logo .logoA {
  width: 193px;
  height: 46px;
  background: url(../../assets/images/login/logoA.png);
  animation: flipInY 1.2s ease-in-out;
  margin: 0 auto;
}
.registered .logo .logoB {
  width: 113px;
  height: 21px;
  background: url(../../assets/images/login/logoB.png);
  animation: slideInUp 1.5s ease-in-out;
  margin-left: 66px;
  margin-top: -4px;
}
.registered {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 1.5rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
/* .registered .logo {
  width: 2.7rem;
  height: 0.78rem;
  background: url(../../assets/images/login/login_logo@2x.png);
  background-size: 100% 100%;
  margin: 0.2rem auto;
} */
.registered .reg-main .reg-main-box li input {
  color: #fff;
}
.registered .reg-main,
.registered .reg-end {
  width: 100%;
  color: #727273;
  background: rgba(108, 108, 110, 0.7);
  border-radius: 0.2rem;
  padding: 0.4rem 0.8rem;
  box-sizing: border-box;
  font-weight: 900;
}
.registered .reg-main .reg-main-nav {
  width: 100%;
  height: 1.2rem;
  /* border-bottom: 0.02rem solid #444; */
}
.registered .reg-main .reg-main-nav li {
  float: left;
  width: 100%;
  height: 100%;
  line-height: 1.2rem;
  text-align: center;
  color: #9fa4a6;
  font-size: 0.6rem;
}
.registered .reg-main .reg-main-nav li.on {
  color: #858788;
  /* border-bottom: 0.02rem solid #858788; */
}
.registered .reg-main .reg-main-box {
  width: 100%;
  overflow: hidden;
}
.registered .reg-main .reg-main-box li {
  width: 100%;
  height: 1.1rem;
  /* border-bottom: 0.02rem solid #444; */
  position: relative;
}
.registered .reg-main .reg-main-box li label {
  display: block;
  width: 33vw;
  float: left;
  font-size: 0.1rem;
  color: #fff;
  line-height: 1.1rem;
  text-align: left;
}
.registered .reg-main .reg-main-box li input {
  background: rgba(91, 92, 92, 0.8);
  box-shadow: 0 1px rgba(208, 207, 207, 0.9);
  border-radius: 0.3rem;
  padding: 0.4rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 0.9rem;
}
.registered .reg-main .reg-main-box li input::-webkit-input-placeholder {
  color: #fff;
}
.registered .reg-main .reg-main-box li b {
  width: 2rem;
  height: 0.7rem;
  border-radius: 0.06rem;
  padding: 0.15rem;
  box-sizing: border-box;
  color: #fff;
  font-weight: normal;
  background: #0088ff;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0.16rem;
  font-size: 0.28rem;
}
.registered .reg-main .reg-main-box li b.on {
  background: rgba(255, 255, 255, 0.226);
}
.registered .reg-main .reg-main-box li.text {
  border-bottom: none;
  height: 0.84rem;
  text-align: center;
}
.registered .reg-main .reg-main-box li.btn {
  border-bottom: none;
  overflow: hidden;
  margin-top: 0.4rem;
}
.registered .reg-main .reg-main-box li.btn button,
.registered .reg-end .btn {
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  text-align: center;
  border-radius: 0.3rem;
  color: #fff;
  font-size: 0.3rem;
  background: #0088ff;
}
.registered .reg-main .reg-main-box li.text span {
  line-height: 0.84rem;
  color: #fff;
  font-size: 0.3rem;
}
.registered .reg-main .reg-main-box li.text span em {
  line-height: 0.84rem;
  color: #0088ff;
  margin-left: 0.2rem;
  font-size: 0.3rem;
}
.registered .reg-end {
  padding-bottom: 0.5rem;
}
.registered .reg-end .success {
  width: 100%;
  overflow: hidden;
}
.registered .reg-end .success i {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0.5rem auto;
  background: url(../../assets/images/login/successful_ico@2x.png);
  background-size: 100% 100%;
}
.registered .reg-end .success h2 {
  font-size: 0.4rem;
  color: #0088ff;
  text-align: center;
}
.registered .reg-end .success span {
  font-size: 0.3rem;
  color: #fff;
  display: block;
  margin: 0.1rem 0;
  text-align: center;
}
.registered .reg-end .btn {
  margin-top: 1rem;
}
.registered .RtdFacebookBtn span{
  background: url(../../assets/images/login/fb_icon.png) no-repeat !important;
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 3%;
}
.registered .RtdFacebookBtn {
  display: flex;
  background-color: #4267b2;
  height: 0.98rem;
  margin-top: 30px;
  border-radius: 0.3rem;
  justify-content: center;
  align-items: center;
}
.registered .RtdFacebookBtn div{
  color: white;
  line-height: 0.98rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>
