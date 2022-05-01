<template>
<div class='email'>
  <div class="email-step" v-if="!already">
    <ul>
      <li>
        <label>Email:</label>
        <input
          type="text"
          name="readonly"
          v-model="mobileEmail"
          :readonly="hasEmail"
          placeholder="Enter your email address."
        >
      </li>
      <li>
        <label>Code:</label>
        <input
          type="text"
          name="readonly"
          maxlength="8"
          v-model="mobileCode"
          placeholder="SMS verification code."
        >
        <b @click="sendEmailCode" :disabled="inSending" :class="{on:inSending}">{{codeBtnText}}</b>
      </li>
    </ul>
    <button @click="dbEmailVerify" :disabled="inClickProcess">Verify Now</button>
  </div>
  <div class="email-step" v-if="already">
    <i></i>
    <p>邮箱已经绑定</p>
    <span>({{verifyEmail}})</span>
    <button @click="unbindEmail">Unbind</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'email',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      codeBtnText: 'Send Code',
      already: false,
      userInfo: null,
      hasEmail: false,
      mobileEmail: '',
      mobileCode: '',
      inSending: false,
      countdown: 180,
      inClickProcess: false,
      verifyEmail: '',
      unbindUrl: '',
      unbindMsg: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 加载个人信息
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/account/getinfo'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.userInfo = res.data.Result
            _this.unbindUrl = res.data.Result.UnbindUrl
            _this.unbindMsg = res.data.Result.UnbindMsg
            if (res.data.Result.VerifyEmail) {
              _this.verifyEmail = res.data.Result.VerifyEmail
              _this.already = true
            } else {
              _this.already = false
            }
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    /**
     * @description 发送手机验证验证码
     */
    sendEmailCode () {
      let _this = this
      if (_this.inSending) {
        return false
      }
      var reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/gi
      if (_this.mobileEmail.length < 1 || !reg.test(_this.mobileEmail)) {
        _this.$swal({
          text: '请输入正确的邮箱号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      _this.inSending = true
      let url = '/api/sendemailcode/verify'
      var params = {
        Email: _this.mobileEmail,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.clock = setInterval(function () {
              _this.countdown--
              if (_this.countdown > 0) {
                _this.codeBtnText = _this.countdown + '秒后重新发送'
              } else {
                window.clearInterval(_this.clock)
                _this.inSending = false
                _this.codeBtnText = 'Send Code'
                _this.countdown = 180
              }
            }, 1000)
          } else {
            _this.inSending = false
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.inSending = false
          console.log(err)
        })
    },
    /**
     * @description 验证邮箱
    */
    emailVerify () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      var reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/gi
      if (_this.mobileEmail.length < 1 || !reg.test(_this.mobileEmail)) {
        _this.AlertWarning('请输入正确的邮箱号码')
        return false
      }
      if (_this.mobileCode.length < 1) {
        _this.AlertWarning('请输入验证码')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/account/verifyemail'
      var params = {
        Code: _this.mobileCode,
        Email: _this.mobileEmail,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.verifyEmail =
              _this.mobileEmail.substring(0, 3) +
              '****' +
              _this.mobileEmail.substring(7)
            _this.already = true
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 解绑邮箱
     */
    unbindEmail () {
      if (this.unbindMsg.length > 0) {
        this.AlertWarning(this.unbindMsg)
      } else {
        window.open(this.unbindUrl.concat('&t=2'), '_blank')
      }
    },
    dbEmailVerify: _.debounce(function () {
      console.log('current_time', new Date())
      this.emailVerify()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$route.params.data) {
      this.mobileEmail = this.$route.params.data
      this.hasEmail = true
      if (this.$route.params.verify) {
        this.already = true
        this.verifyEmail = this.$route.params.verify
      }
      this.unbindUrl = this.$route.params.unbindUrl
      this.unbindMsg = this.$route.params.unbindMsg
    } else {
      this.$bus.$emit('loadingShow')
      this.loadDataInfo()
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Bind Email', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.email{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.email .email-step{
  width: 100%;
  background: #fff;
  margin-top: 0.2rem;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
}
.email .email-step ul{
  width: 100%;
  overflow: hidden;
}
.email .email-step ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  position: relative;
  border-bottom: 0.02rem solid #ddd;
}
.email .email-step ul li label{
  font-size: 0.3rem;
  color: #6b6b6b;
}
.email .email-step ul li input{
  width: 4.1rem;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  line-height: 0.98rem;
  background: #fff;
}
.email .email-step ul li input::-webkit-input-placeholder{
  color: #bbb;
}
.email .email-step ul li b{
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
.email .email-step ul li b.on{
  background: #ccc;
}
.email .email-step button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.98rem;
  border-radius: 0.06rem;
  margin: 0.8rem 0;
}
.email .email-step i{
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0.4rem auto;
  background: url(../../../assets/images/account/uer_data_email_ico@2x.png);
  background-size: 100% 100%;
}
.email .email-step p{
  text-align: center;
  font-size: 0.3rem;
  color: #6b6b6b;
}
.email .email-step span{
  display: block;
  text-align: center;
  font-size: 0.25rem;
  color: #0088ff;
}
</style>
