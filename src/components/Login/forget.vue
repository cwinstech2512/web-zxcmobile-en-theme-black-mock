<template>
  <div class="forget">
    <!-- 头部导航 -->
    <navBar :navBarName="navBarName" :navLeft="navLeft" :navRight="navRight" @openSide="openSide" />
    <!-- 内容 -->
    <div class="forget-main">
      <!-- 第一步 -->
      <div class="forget-main-step" v-show="step==0">
        <div class="forget-main-step-box">
          <ul>
            <li>
              <label></label>
              <input
                type="text"
                name="readonly"
                maxlength="12"
                v-model="gameName"
                placeholder="USERNAME"
              />
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('a')">NEXT</div>
        </div>
      </div>
      <!-- 第二步 -->
      <div class="forget-main-step" v-show="step==1">
        <span>SELECT RESET PASSWORD METHOD</span>
        <div class="forget-main-step-box">
          <ul>
            <li @click="nextStep('b1')">
              <div>
                <em>MOBILE TO RETRIEVE YOUR PASSWORD</em>
                <i></i>
              </div>
            </li>
            <li @click="nextStep('b2')">
              <div>
                <em>MOBILE TO RETRIEVE YOUR PASSWORD</em>
                <i></i>
              </div>
            </li>
            <li @click="nextStep('b3')">
              <div>
                <em>SECURITY PIN TO RETRIEVE YOUR PASSWORD</em>
                <i></i>
              </div>
            </li>
          </ul>
          <span class="btn" @click="prevStep('a')">BACK TO PREVIOUS STEP</span>
        </div>
      </div>
      <!-- 第三步 -->
      <div class="forget-main-step" v-show="step==2">
        <span>Mobile to retrieve your password</span>
        <div class="forget-main-step-box">
          <ul>
            <li>
              <!-- <label>Mobile：</label> -->
              <input type="text" name="readonly" v-model="phone" placeholder="Enter your mobile number" />
            </li>
            <li>
              <!-- <label>Code：</label> -->
              <input type="text" name="readonly" maxlength="8" v-model="phoneCode" placeholder="Enter your code" />
              <b @click="sendPhoneCode" :class="{on:codeBtnInClick}">{{codeBtnText}}</b>
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('c')">NEXT</div>
          <span @click="prevStep('b')">Back to previous step</span>
        </div>
      </div>
      <div class="forget-main-step" v-show="step==3">
        <span>Email to retrieve your password</span>
        <div class="forget-main-step-box">
          <ul>
            <li>
              <!-- <label>Email：</label> -->
              <input type="text" name="readonly" v-model="email" placeholder="Enter your Email" />
            </li>
            <li>
              <!-- <label>Code：</label> -->
              <input type="text" name="readonly" maxlength="8" v-model="emailCode" placeholder="Enter your code"/>
              <b @click="sendEmailCode" :class="{on:codeBtnInClick}">{{codeBtnText}}</b>
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('c')">NEXT</div>
          <span @click="prevStep('b')">Back to previous step</span>
        </div>
      </div>
      <div class="forget-main-step" v-show="step==4">
        <span>Security PIN to retrieve your password</span>
        <div class="forget-main-step-box">
          <ul>
            <li>
              <!-- <label>Question1：</label> -->
              <input type="text" name="readonly" v-model="question1" disabled="disabled" />
            </li>
            <li>
              <!-- <label>Answer1：</label> -->
              <input type="text" name="readonly" v-model="answer1" placeholder="Enter your Answer1" />
            </li>
            <li>
              <!-- <label>Question2：</label> -->
              <input
                type="text"
                name="readonly"
                v-model="question2"
                disabled="disabled"
                placeholder=""
              />
            </li>
            <li>
              <!-- <label>Answer2：</label> -->
              <input type="text" name="readonly" v-model="answer2" placeholder="Enter your Answer2" />
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('c')">NEXT</div>
          <span @click="prevStep('b')">Back to previous step</span>
        </div>
      </div>
      <!-- 第四步 -->
      <div class="forget-main-step" v-show="step==5">
        <span>Please enter new password</span>
        <div class="forget-main-step-box">
          <ul>
            <li>
              <!-- <label>新密码：</label> -->
              <input type="password" name="readonly" v-model="newPassword" placeholder="Enter your new password" />
            </li>
            <li>
              <!-- <label>确认密码：</label> -->
              <input type="password" name="readonly" v-model="repeatPassword" placeholder="Enter your confirm password" />
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('d')">Confirm</div>
        </div>
      </div>
      <!-- 完成 -->
      <div class="forget-main-step" v-show="step==6">
        <div class="forget-main-step-box">
          <div class="success">
            <i></i>
            <h2>Success!!</h2>
          </div>
          <div class="btn" :disabled="inClickProcess" @click="backLogin">Login Now</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/Center/Common/navBar'
import '../../../static/js/gt/gt.js'
export default {
  name: 'forget',
  //  import引入的组件需要注入到对象中才能使用
  components: { navBar },
  data () {
    //  这里存放数据
    return {
      navBarName: 'Forgot Password',
      navLeft: 'back',
      navRight: 'hide',
      step: 0,
      gameName: '',
      phone: '',
      phoneCode: '',
      email: '',
      emailCode: '',
      question1: '我的中学老师叫什么名字?',
      answer1: '',
      question2: '',
      answer2: '',
      newPassword: '',
      repeatPassword: '',
      token: '',
      vcode: '',
      codeBtnInClick: false,
      codeBtnText: 'Send Code',
      totalTimespan: 60,
      timerName: 'countdown',
      inClickProcess: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    gameName: function (val) {
      this.gameName = val.replace(/\W/g, '')
    },
    phone: function (val) {
      this.phone = val.replace(/\D/g, '')
      if (val.length > 11) {
        this.phone = val.slice(0, 11)
      }
    }
  },
  //  方法集合
  methods: {
    /**
     * @description step1.输入游戏账号并提交
     */
    submitInputAccount () {
      var _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (_this.gameName.length < 4) {
        _this.$swal({
          text: '请输入正确的用户名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      _this.inClickProcess = true
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
              let url = 'api/forgotpwd/step1ByGeetest'
              let params = {
                UserName: _this.gameName,
                seccodeGeetest: result.geetest_seccode,
                validateGeetest: result.geetest_validate,
                challengeGeetest: result.geetest_challenge
              }
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  if (res.data.Success === true) {
                    _this.token = res.data.Result.Token
                    if (res.data.Result.QAData.length === 2) {
                      _this.question1 = res.data.Result.QAData[0].Question
                      _this.question2 = res.data.Result.QAData[1].Question
                    }
                    _this.inClickProcess = false
                    _this.step = 1
                  } else {
                    _this.inClickProcess = false
                    _this.AlertError(res.data.Message)
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }).onError(function () {
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
     * @description step2-2根据手机号找回密码
     */
    pageFindByPhone () {
      this.step = 2
    },
    /**
     * @description step2-3根据邮箱找回密码
     */
    pageFindByEmail () {
      this.step = 3
    },
    /**
     * @description step2-4根据密保找回密码
     */
    pageFindBySafety () {
      this.step = 4
    },
    /**
     * @description step3.重置密码
     */
    pageResetPwd () {
      if (this.step === 2) {
        // 手机找回
        this.submitFindByPhone()
      } else if (this.step === 3) {
        // 邮箱找回
        this.submitFindByEmail()
      } else if (this.step === 4) {
        // 密保找回
        this.submitFindBySafety()
      }
    },
    /**
     * @description 发送手机验证码
     */
    sendPhoneCode () {
      var _this = this
      if (_this.codeBtnInClick) {
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (!_this.phone || !reg.test(_this.phone)) {
        _this.AlertWarning('Please enter phone number')
        return false
      }
      _this.codeBtnInClick = true
      let url = '/api/sendsmscode/forgot'
      var params = {
        Phone: _this.phone,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.timerName = setInterval(function () {
              _this.totalTimespan--
              if (_this.totalTimespan > 0) {
                _this.codeBtnText = _this.totalTimespan + 's后重新发送'
              } else {
                // 当倒计时小于等于0时清除定时器
                _this.codeBtnInClick = false
                window.clearInterval(_this.timerName)
                _this.codeBtnText = 'Send code'
                _this.totalTimespan = 60
              }
            }, 1000)
          } else {
            _this.codeBtnInClick = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.codeBtnInClick = false
          console.log(err)
        })
    },
    /**
     *@description 提交手机验证信息
     */
    submitFindByPhone () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (!_this.phone || !reg.test(_this.phone)) {
        _this.AlertWarning('Please enter phone number')
        return false
      }
      if (_this.phoneCode.length < 1) {
        _this.AlertWarning('Please enter code')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/forgotpwd/step2verifysms'
      var params = {
        Phone: _this.phone,
        Code: _this.phoneCode,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.inClickProcess = false
            _this.step = 5
          } else {
            _this.inClickProcess = false
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'Ok'
            })
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log(err)
        })
    },
    /**
     * @description 发送邮箱验证码
     */
    sendEmailCode () {
      var _this = this
      if (_this.codeBtnInClick) {
        return false
      }
      if (!_this.email) {
        _this.AlertWarning('请输入邮箱号码')
        return false
      }
      _this.codeBtnInClick = true
      let url = '/api/sendemailcode/forgot'
      var params = {
        Email: _this.email,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.timerName = setInterval(function () {
              _this.totalTimespan--
              if (_this.totalTimespan > 0) {
                _this.codeBtnInClick = _this.totalTimespan + '秒后重新发送'
              } else {
                window.clearInterval(_this.timerName)
                _this.codeBtnInClick = false
                _this.codeBtnInClick = 'Send code'
                _this.totalTimespan = 60
              }
            }, 1000)
          } else {
            _this.codeBtnInClick = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.codeBtnInClick = false
          console.log(err)
        })
    },
    /**
     * @description 提交邮箱验证信息
     */
    submitFindByEmail () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (_this.email.length < 1) {
        _this.AlertWarning('请输入正确的邮箱号码')
        return false
      }
      if (_this.emailCode.length < 1) {
        _this.AlertWarning('请输入验证码')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/forgotpwd/step2verifyemail'
      var params = {
        Email: _this.email,
        Code: _this.emailCode,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.inClickProcess = false
            _this.step = 5
          } else {
            _this.inClickProcess = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log(err)
        })
    },
    /**
     * @description 提交密保验证信息
     */
    submitFindBySafety () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (_this.answer1.length < 1 || _this.answer2.length < 1) {
        _this.AlertWarning('请输入安保问题的答案')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/forgotpwd/step2verifysqa'
      var params = {
        Answer1: _this.answer1,
        Answer2: _this.answer2,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.inClickProcess = false
            _this.step = 5
          } else {
            _this.inClickProcess = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log(err)
        })
    },
    /**
     * @description 提交重置密码信息
     */
    submitResetPwd () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (!_this.newPassword || !_this.repeatPassword) {
        _this.AlertWarning('请输入新密码')
        return false
      }
      if (_this.newPassword !== _this.repeatPassword) {
        _this.AlertWarning('输入的密码不一致')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/forgotpwd/step3'
      var params = {
        VCode: _this.vcode,
        Password: _this.newPassword,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.inClickProcess = false
            _this.step = 6
          } else {
            _this.inClickProcess = false
            _this.AlertError(res.data.Message)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log(err)
        })
    },
    openSide () {
      this.$router.back(-1)
    },
    // 下一步
    nextStep (n) {
      switch (n) {
        case 'a':
          this.submitInputAccount()
          break
        case 'b1':
          this.pageFindByPhone()
          break
        case 'b2':
          this.pageFindByEmail()
          break
        case 'b3':
          this.pageFindBySafety()
          break
        case 'c':
          this.pageResetPwd()
          break
        default:
          this.submitResetPwd()
          break
      }
    },
    // 上一步
    prevStep (p) {
      if (p === 'a') {
        this.step = 0
      } else {
        this.step = 1
      }
    },
    // 返回登录页
    backLogin () {
      this.$router.push('/login')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
}
.forget {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.forget .forget-main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.3rem;
  box-sizing: border-box;
  position: absolute;
  top: 1.08rem;
  bottom: 0;
  z-index: 99;
}
.forget .forget-main .forget-main-step {
  width: 100%;
  overflow: hidden;
  color: #727273;
  background: rgba(108, 108, 110, 0.7);
  border-radius: 0.2rem;
  padding: 0.4rem 0.4rem;
  box-sizing: border-box;
  font-weight: 900;
}
.forget .forget-main .forget-main-step span {
  display: block;
  font-size: 0.36rem;
  color: #fff;
  margin-bottom: 0.2rem;
}
.forget .forget-main .forget-main-step .forget-main-step-box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.06rem;
  /* background: #fff; */
  overflow: hidden;
}
.forget .forget-main .forget-main-step .forget-main-step-box span {
  display: block;
  text-align: center;
  font-size: 0.2rem;
  color: #fff;
  margin-top: 0.4rem;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul {
  width: 100%;
  overflow: hidden;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li {
  width: 100%;
  height: 0.98rem;
  /* border-bottom: 0.02rem solid #ddd; */
  position: relative;
  padding: 0.2rem 0rem;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li.hideline {
  border-bottom: none;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li i {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  float: right;
  margin-top: 0.24rem;
  background: url(../../assets/images/login/user_fogotpassword_arrow_ico@2x.png);
  background-size: 100% 100%;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li > div {
  background: rgba(91, 92, 92, 0.8);
  box-shadow: 0 1px rgba(208, 207, 207, 0.9);
  border-radius: 0.3rem;
  padding: 0.1rem 0.1rem;
  max-height: 83%;
  width: 95%;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li em {
  line-height: 0.8rem;
  font-size: 0.25rem;
  color: #fff;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li b {
  width: 1.82rem;
  height: 0.62rem;
  background: #0088ff;
  display: block;
  position: absolute;
  right: 0;
  top: 0.2rem;
  text-align: center;
  line-height: 0.62rem;
  color: #fff;
  border-radius: 0.06rem;
  font-weight: normal;
}
.forget .forget-main .forget-main-step li input::-webkit-input-placeholder {
  color: #fff;
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li b.on {
  background: rgba(255, 255, 255, 0.226);
}
.forget .forget-main .forget-main-step .forget-main-step-box ul li label {
  line-height: 0.98rem;
  font-size: 0.3rem;
  text-align: right;
  display: block;
  float: left;
  width: 1.6rem;
  color: #6b6b6b;
}
/* .forget .forget-main .forget-main-step .forget-main-step-box ul li input {
  width: 4.1rem;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  line-height: 0.98rem;
} */
.forget .forget-main .forget-main-step .forget-main-step-box ul li input {
  width: 4.1rem;
  height: 0.98rem;
  background: rgba(91, 92, 92, 0.8);
  box-shadow: 0 1px rgba(208, 207, 207, 0.9);
  border-radius: 0.3rem;
  padding: 0.4rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 0.9rem;
  color: #fff;
}
.forget
  .forget-main
  .forget-main-step
  .forget-main-step-box
  ul
  li
  input::-webkit-input-placeholder {
  color: #fff;
  font-size: 0.3rem;
}
.forget .forget-main .forget-main-step .forget-main-step-box .btn {
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 0.98rem;
  font-size: 0.3rem;
  border-radius: 0.3rem;
  margin: 0.8rem 0 0.4rem 0;
}
.forget .forget-main .forget-main-step .forget-main-step-box .success {
  width: 2rem;
  height: 2rem;
  margin: 0.5rem auto 0 auto;
  text-align: center;
}
.forget .forget-main .forget-main-step .forget-main-step-box .success i {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto;
  background: url(../../assets/images/login/successful_ico@2x.png);
  background-size: 100% 100%;
}
.forget .forget-main .forget-main-step .forget-main-step-box .success h2 {
  font-size: 0.4rem;
  color: #0088ff;
  font-weight: normal;
}
</style>
