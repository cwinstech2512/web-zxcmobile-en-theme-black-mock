<template>
  <div class="rsecure" v-if="showVerify">
    <div class="logo">
        <div class="logoA"/>
        <div class="logoB"/>
    </div>
    <!-- 内容 -->
    <div class="rsecure-main">
      <!-- 筐内 -->
      <div class="rsecure-main-step" v-if="showOTPBlock">
        <span>*请输入发送到您绑定手机号的短信验证码</span>
        <div class="rsecure-main-step-box">
          <ul>
            <li>
              <label>验证码：</label>
              <input type="text" name="readonly" maxlength="8" v-model="vCode" placeholder="请输入验证码" />
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="vaildCode()">安全验证</div>
        </div>
      </div>
      <!-- 筐内 -->
      <div class="rsecure-main-step" v-if="showphoneBlock">
        <span>因系统检测到登入异常，为了维护您的帐号安全将进行以下验证:</span>
        <div style="text-align: center;margin-top: 3%;">请输入绑定手机号码 ********{{accountData.cellPhone? accountData.cellPhone.substring(accountData.cellPhone.length - 2) : ''}} 的末4码<br/>然后单击“下一步”接收验证码</div>
        <div class="rsecure-main-step-box">
          <ul>
            <li>
              <input type="text" name="readonly" maxlength="8" v-model="vPhone" placeholder="输入绑定手机号的最后4个数字" />
            </li>
          </ul>
          <div class="btn" :disabled="inClickProcess" @click="vaildPhone()">下一步</div>
        </div>
      </div>
      <!-- 筐内 -->
      <div class="rsecure-main-step" v-if="showWarring">
        <div style="text-align: center;margin-top: 13%;"><img style="width: 85px; margin: auto;" width="85px" src="../../assets/images/login/icon_warring.png"></div>
        <span style="text-align: center;margin-top: 3%;">您的登录发生异常，代码:102，请联系在线客服帮助您！</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'verify',
  props: ['showVerify', 'account'],
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      navBarName: '安全验证',
      navRight: 'hide',
      inClickProcess: false,
      vCode: '',
      vPhone: '',
      invalid: '',
      accountData: {
        Username: '',
        Token: '',
        Balance: '',
        isShowIpDiffCheckCode: '',
        LastLoginTime: '',
        cellPhone: ''
      },
      showOTPBlock: false,
      showphoneBlock: true,
      showWarring: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    account: {
      handler (value) {
        this.accountData.Username = value.Username
        this.accountData.Password = value.Password
        this.accountData.Token = value.Token
        this.accountData.Balance = value.Balance
        this.accountData.VCodeKey = value.VCodeKey
        this.accountData.cellPhone = value.cellPhone
        this.accountData.isShowIpDiffCheckCode = value.isShowIpDiffCheckCode
        this.accountData.LastLoginTime = value.LastLoginTime
        if (this.accountData.isShowIpDiffCheckCode) {
          if (this.accountData.cellPhone === '') {
            this.showWarring = true
            this.showOTPBlock = false
            this.showphoneBlock = false
          } else {
            this.timeout()
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  //  方法集合
  methods: {
    vaildPhone () {
      let _this = this
      if (_this.vPhone === '') {
        _this.$swal({
          text: '请输入绑定手机号的最后4个数字！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      _this.inClickProcess = true
      let url = '/api/Login/IpDiffLoginCheckCode1Step'
      let params = {
        UserName: _this.accountData.Username,
        Phone: _this.vPhone
      }
      _this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.Message === '') {
            this.showphoneBlock = false
            this.showWarring = false
            this.showOTPBlock = true
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            }).then(x => {
              this.showVerify = false
              this.showphoneBlock = false
              this.showWarring = false
              this.showOTPBlock = false
              this.$router.push('/')
              this.$router.go(0)
              _this.$emit('closePopupRec')
            })
          }
        })
      _this.inClickProcess = false
    },
    vaildCode () {
      let url = '/api/Login/IpDiffLoginCheckCode'
      let _this = this
      if (_this.vCode === '') {
        _this.$swal({
          text: '请输入OTP！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      let params = {
        UserName: _this.accountData.Username,
        Pwd: _this.accountData.Password,
        DeviceId: localStorage.getItem('mac'),
        VCodeKey: _this.accountData.VCodeKey,
        VCode: _this.vCode,
        ScreenWidth: window.screen.width,
        ScreenHeight: window.screen.height,
        Phone: _this.vPhone
      }

      _this.inClickProcess = true
      _this.$https
        .fetchPost(url, _this.Secret(params))
        .then(res => {
          console.log(res)
          if ((res.data.Message == null || res.data.Message === '') && res.data.Success === true) {
            clearTimeout(_this.invalid)
            _this.saveinfo(
              _this.accountData.Username,
              res.data.Result.Token,
              res.data.Result.Balance,
              res.data.Result.LastLoginTime
            )
            _this.$emit('closeVerifyAndlogin')
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            }).then(x => {
              this.showVerify = false
              this.showphoneBlock = false
              this.showWarring = false
              this.showOTPBlock = false
              this.$router.push('/')
              this.$router.go(0)
            })
          }
          _this.inClickProcess = false
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log(err)
        })
    },
    timeout () {
      console.log('run')
      this.invalid = setTimeout(() => {
        this.$swal({
          text: '验证码失效',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$router.push('/')
          this.$router.go(0)
        })
      }, 300000)
    },
    // 返回登录页
    backLogin () {
      this.$router.push('/')
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
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  /*background: url(../../assets/images/allpage_bg@2x.jpg);*/
  background-color: white;
  background-size: 100% 100%;
  background-attachment: fixed;
  z-index: 10;
}
.rsecure .logo{
  width: 205px;
  height: 65px;
  margin: 0 auto;
  margin-top: 40px;
}
.rsecure .logo .logoA {
  width: 58px;
  height: 58px;
  float: left;
  background: url(../../assets/images/login/logoA.png);
}
.rsecure .logo .logoB {
  width: 136px;
  height: 58px;
  float: right;
  background: url(../../assets/images/login/logoB.png);
}
.rsecure .rsecure-main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.3rem;
  box-sizing: border-box;
  position: absolute;
  top: 120px;
  bottom: 0;
  z-index: 99;
  background-color: white;
}
.rsecure .rsecure-main .rsecure-main-step {
  width: 100%;
  overflow: hidden;
}
.rsecure .rsecure-main .rsecure-main-step span {
  display: block;
  font-size: 0.3rem;
  color: #6b6b6b;
  margin-bottom: 0.2rem;
  text-align: center;
  padding: 0 0.3rem;
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
