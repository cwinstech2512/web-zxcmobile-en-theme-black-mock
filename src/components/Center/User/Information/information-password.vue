<template>
  <div class='changePW'>
    <div class="changePW-bar">
      <ul>
        <li>
          <label>Platform:</label>
          <select v-model="modifyModel.Plat">
            <option v-for="(plat, index) in plats"
                    :key="index"
                    :value="plat.Code">{{plat.Name}}</option>
          </select>
        </li>
        <li v-show="modifyModel.Plat==='ZXC'">
          <label>Mobile:</label>
          <input type="text"
                 :value="VerifyPhone"
                 readonly="readonly"
                 placeholder="请绑定手机" />
        </li>
        <li v-show="modifyModel.Plat==='ZXC'">
          <label>Verify Code:</label>
          <input type="text"
                 maxlength="8"
                 v-model="modifyModel.Code" />
          <b @click="sendsms"
             :class="{on:codeBtnInClick}">{{codeBtnText}}</b>
        </li>
        <li>
          <label>Current:</label>
          <input type="password"
                 v-model="modifyModel.Pwd"
                 placeholder="Current password">
        </li>
        <li>
          <label>New:</label>
          <input type="password"
                 v-model="modifyModel.NewPwd"
                 placeholder="New password">
        </li>
        <li>
          <label>Confirm:</label>
          <input type="password"
                 v-model="confirmPwd"
                 placeholder="Confirm password">
        </li>
      </ul>
      <button @click="dbSavePwd">{{saveBtnText}}</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'changePW',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      plats: [],
      modifyModel: {
        Code: '',
        Plat: '',
        Pwd: '',
        NewPwd: ''
      },
      VerifyPhone: '',
      codeBtnInClick: false,
      codeBtnText: 'Send Code',
      smscountdown: 60,
      confirmPwd: '',
      saveBtnText: 'SAVE',
      inClickProcess: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 发送手机验证码
     */
    // 发送短信验证码
    sendsms () {
      if (this.codeBtnInClick) {
        return
      }
      let _this = this
      if (!this.VerifyPhone || this.VerifyPhone.length < 1) {
        _this.$swal({
          text: '请先绑定手机号码',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(x => {
          if (x.value) {
            _this.$router.push({
              path: '/center/information'
            })
          }
        })
        return
      }
      this.codeBtnInClick = true
      let url = '/api/sendsmscode/EditPwd'
      var params = {
        // Phone: _this.phone,
        Token: this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.clock = setInterval(function () {
              _this.smscountdown--
              if (_this.smscountdown > 0) {
                _this.codeBtnText = _this.smscountdown + '秒后重新发送'
              } else {
                window.clearInterval(_this.clock)
                _this.codeBtnInClick = false
                _this.codeBtnText = '发送验证码'
                _this.smscountdown = 60
              }
            }, 1000)
          } else {
            _this.codeBtnInClick = false
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.codeBtnInClick = false
          console.log(err)
        })
    },
    /**
     * @description 修改密码
     */
    savePwd () {
      var _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (this.modifyModel.Plat === 'ZXC') {
        if (!this.VerifyPhone || this.VerifyPhone.length < 1) {
          this.AlertWarning('请先绑定手机')
          return false
        }
        if (this.modifyModel.Code.length < 1) {
          this.AlertWarning('请输入验证码')
          return false
        }
      }
      if (_this.modifyModel.Pwd.length < 1) {
        _this.AlertWarning('请输入官网密码')
        return false
      }
      if (_this.modifyModel.NewPwd.length < 1) {
        _this.AlertWarning('请输入新的密码')
        return false
      }
      if (_this.modifyModel.NewPwd !== _this.confirmPwd) {
        _this.AlertWarning('确认密码错误')
        return false
      }
      _this.inClickProcess = true
      _this.saveBtnText = 'SAVING'
      let url = '/api/account/modifyuserpwd'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(Object.assign(_this.modifyModel, params)))
        .then((res) => {
          _this.inClickProcess = false
          _this.saveBtnText = 'SAVE'
          if (res.data.Success === true) {
            _this.AlertSuccess('设置成功')
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          _this.saveBtnText = 'SAVE'
          console.log('error', err)
        })
    },
    dbSavePwd: _.debounce(function () {
      console.log('current_time', new Date())
      this.savePwd()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // let ui = this.$parent.returnUserInfo()
    // let ui = this.$parent.infoData
    // console.log(this.$parent)
    this.VerifyPhone = this.$route.params.VerifyPhone
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.plats = this.$route.params.data
    this.$nextTick(() => {
      this.modifyModel.Plat = 'ZXC'
    })
    this.$emit('getStatus', 'Edit Password', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.changePW {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background: url(../../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.changePW .changePW-bar {
  margin-top: 0.2rem;
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.changePW .changePW-bar ul {
  width: 100%;
  overflow: hidden;
}
.changePW .changePW-bar ul li {
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  position: relative;
}
.changePW .changePW-bar ul li label {
  font-size: 0.3rem;
  color: #6b6b6b;
}
.changePW .changePW-bar ul li select {
  float: right;
  border: none;
  width: 4.8rem;
  height: 0.96rem;
  font-size: 0.3rem;
  color: #6b6b6b;
  background: #fff;
}
.changePW .changePW-bar ul li b {
  width: 2.3rem;
  /* height: 0.62rem; */
  position: absolute;
  right: 0px;
  top: 0.2rem;
  display: block;
  background: #08f;
  cursor: pointer;
  text-align: center;
  line-height: 0.62rem;
  color: #fff;
  border-radius: 0.06rem;
  font-weight: normal;
}
.changePW .changePW-bar ul li b.on {
  background: #cecece;
  cursor: default;
}
.changePW .changePW-bar ul li input {
  width: 4.8rem;
  height: 0.96rem;
  float: right;
  color: #6b6b6b;
  font-size: 0.3rem;
}
.changePW .changePW-bar ul li input::-webkit-input-placeholder {
  color: #bbb;
}
.changePW .changePW-bar button {
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  text-align: center;
  line-height: 0.98rem;
  border-radius: 0.06rem;
  color: #fff;
  font-size: 0.3rem;
  margin: 0.8rem 0;
}
</style>
