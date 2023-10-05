<template>
  <div class="rsecure">
    <!-- 头部导航 -->
    <navBar :navBarName="navBarName" :navLeft="navLeft" :navRight="navRight" @openSide="openSide" />
    <!-- 内容 -->
    <div class="rsecure-main">
      <!-- 筐内 -->
      <div class="rsecure-main-step">
        <span>*为了保护您的账号安全，本次登录将进行手机安全验证<br />
如有任何验证问题，请联系在线客服</span>
        <div class="rsecure-main-step-box">
          <ul>
            <li>
              <label>手机号码：</label>
              <input type="text" name="readonly" v-model="phone" placeholder="请输入手机号码" />
            </li>
            <li>
              <label>验证码：</label>
              <input type="text" name="readonly" maxlength="8" v-model="phoneCode" />
              <b @click="sendPhoneCode" :class="{on:codeBtnInClick}">{{codeBtnText}}</b>
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="nextStep('c')">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/Center/Common/navBar'
export default {
  name: 'rsecure',
  //  import引入的组件需要注入到对象中才能使用
  components: { navBar },
  data () {
    //  这里存放数据
    return {
      navBarName: '安全验证',
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
      codeBtnText: '发送验证码',
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
        _this.AlertWarning('请输入正确的手机号码')
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
                _this.codeBtnText = _this.totalTimespan + ', will resend'
              } else {
                // 当倒计时小于等于0时清除定时器
                _this.codeBtnInClick = false
                window.clearInterval(_this.timerName)
                _this.codeBtnText = 'Send Code'
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
        _this.AlertWarning('请输入正确的手机号码')
        return false
      }
      if (_this.phoneCode.length < 1) {
        _this.AlertWarning('请输入验证码')
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
              confirmButtonText: '确定'
            })
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
    openSide () {
      this.$router.back(-1)
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
.rsecure {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.rsecure .rsecure-main {
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
.rsecure .rsecure-main .rsecure-main-step {
  width: 100%;
  overflow: hidden;
}
.rsecure .rsecure-main .rsecure-main-step span {
  display: block;
  font-size: 0.2rem;
  color: #6b6b6b;
  margin-bottom: 0.2rem;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.06rem;
  background: #fff;
  overflow: hidden;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box span {
  display: block;
  text-align: center;
  font-size: 0.2rem;
  color: #6b6b6b;
  margin-top: 0.4rem;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul {
  width: 100%;
  overflow: hidden;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li {
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  position: relative;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li.hideline {
  border-bottom: none;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li i {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../assets/images/login/user_fogotpassword_arrow_ico@2x.png);
  background-size: 100% 100%;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li em {
  line-height: 0.98rem;
  font-size: 0.3rem;
  color: #6b6b6b;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li b {
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
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li b.on {
  background: rgba(255, 255, 255, 0.226);
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li label {
  line-height: 0.98rem;
  font-size: 0.3rem;
  text-align: right;
  display: block;
  float: left;
  width: 1.6rem;
  color: #6b6b6b;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box ul li input {
  width: 4.1rem;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  line-height: 0.98rem;
}
.rsecure
  .rsecure-main
  .rsecure-main-step
  .rsecure-main-step-box
  ul
  li
  input::-webkit-input-placeholder {
  color: #bbb;
  font-size: 0.3rem;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box .btn {
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 0.98rem;
  font-size: 0.3rem;
  border-radius: 0.06rem;
  margin: 0.8rem 0 0.4rem 0;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box .success {
  width: 2rem;
  height: 2rem;
  margin: 0.5rem auto 0 auto;
  text-align: center;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box .success i {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto;
  background: url(../../assets/images/login/successful_ico@2x.png);
  background-size: 100% 100%;
}
.rsecure .rsecure-main .rsecure-main-step .rsecure-main-step-box .success h2 {
  font-size: 0.4rem;
  color: #0088ff;
  font-weight: normal;
}
</style>
