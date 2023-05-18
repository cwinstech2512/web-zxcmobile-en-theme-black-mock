<template>
  <div class='information'>
    <div class="information-bar">
      <ul>
        <li>
          <label>USERNAME</label>
          <em>{{userName}}</em>
        </li>
        <li class="hide"
            @click="changePW()">
          <label>PASSWORD</label>
          <em class="active">EDIT</em>
        </li>
      </ul>
    </div>
    <div class="information-bar">
      <ul>
        <li>
          <label>FIRST NAME</label>
          <em class="active"
              @click="modifyName"
              v-show="!VerifyRealName && userModel.RealName!==null && !haveChangedRealName">{{VerifyText}}</em>
          <input type="text"
                 class="r1"
                 value=""
                 v-model="userModel.RealName"
                 v-show="!VerifyRealName"
                 placeholder="" />
          <em v-if="VerifyRealName">{{VerifyRealName}}</em>
        </li>
        <li>
          <label>TITLE</label>
          <select v-model="userModel.Gender">
            <option v-bind:value="1">男</option>
            <option v-bind:value="0">女</option>
          </select>
        </li>
        <li>
          <label>BIRTHDAY</label>
          <input type="date"
                 value=""
                 v-model="userModel.BirthDay"
                 v-show="userModel.BirthDay===''">
          <em v-show="userModel.BirthDay!==''">{{userModel.BirthDay}}</em>
        </li>
        <li>
          <label>MESSAGER</label>
          <input type="text"
                 value=""
                 v-model="userModel.QQ"
                 placeholder="" />
        </li>
        <li>
          <label>MOBILE</label>
          <em v-show="!VerifyPhone"
              class="active"
              @click="modifyPhone">BIND</em>
          <input type="text"
                 value=""
                 v-model="userModel.Phone"
                 v-show="!VerifyPhone"
                 readonly />
          <em v-if="VerifyPhone"
              @click="modifyPhone">{{VerifyPhone}}</em>
        </li>
        <li>
          <label>EMAIL</label>
          <em class="active"
              v-if="!VerifyEmail"
              @click="modifyMail">BIND</em>
          <input type="text"
                 value=""
                 v-model="userModel.Email"
                 v-show="!VerifyEmail"
                 readonly />
          <em v-if="VerifyEmail"
              @click="modifyMail">{{VerifyEmail}}</em>
        </li>
        <li>
          <label>SECURITY PIN</label>
          <em class="active"
              @click="security">EDIT</em>
        </li>
      </ul>
      <button @click="dbSaveInfo">{{saveBtnText}}</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'information',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      infoData: [],
      userName: '',
      userModel: {
        RealName: '',
        NickName: '',
        BirthDay: '',
        Gender: '',
        QQ: '',
        Phone: '',
        Email: ''
      },
      VerifyRealName: '',
      VerifyPhone: '',
      VerifyEmail: '',
      VerifyText: 'VERIFY',
      tempRealName: '',
      haveChangedRealName: false,
      editPwdPlats: [],
      safeQuestions: [],
      inClickProcess: false,
      saveBtnText: 'SAVE'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    'userModel.RealName': function (val) {
      if (this.tempRealName !== this.userModel.RealName) {
        this.haveChangedRealName = true
      } else {
        this.haveChangedRealName = false
      }
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 去验证邮箱
     */
    modifyMail () {
      if (this.inClickProcess) {
        return false
      }
      this.$router.push({
        name: 'email',
        params: {
          data: this.userModel.Email,
          verify: this.VerifyEmail,
          unbindUrl: this.infoData.UnbindUrl,
          unbindMsg: this.infoData.UnbindMsg
        }
      })
    },
    /**
     * @description 去验证手机
     */
    modifyPhone () {
      if (this.inClickProcess) {
        return false
      }
      this.$router.push({
        name: 'phone',
        params: {
          data: this.userModel.Phone,
          verify: this.VerifyPhone,
          unbindUrl: this.infoData.UnbindUrl,
          unbindMsg: this.infoData.UnbindMsg
        }
      })
    },
    /**
     * @description 验证真实姓名
     */
    modifyName () {
      if (this.inClickProcess) {
        return false
      }
      let _this = this
      let url = '/api/account/verifyrealname'
      var params = {
        Token: _this.getinfo().token
      }
      _this.inClickProcess = true
      _this.VerifyText = 'Verifing...'
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          _this.inClickProcess = false
          _this.VerifyText = 'Verify'
          if (res.data.Success === true) {
            _this.VerifyRealName = res.data.Result
            _this.AlertSuccess('Success')
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          _this.VerifyText = 'Verify'
          console.log('error', err)
        })
    },
    /**
     * @description 保存会员信息
     */
    saveUserInfo () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      if (!_this.userModel.RealName) {
        _this.AlertWarning('请输入真实姓名')
        return false
      }
      if (!_this.userModel.BirthDay) {
        _this.AlertWarning('请输入生日')
        return false
      }
      if (!_this.userModel.QQ.length) {
        _this.AlertWarning('请输入QQ')
        return false
      }
      _this.inClickProcess = true
      _this.saveBtnText = 'SAVING'
      let url = '/api/account/saveinfo'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(Object.assign(_this.userModel, params)))
        .then((res) => {
          _this.inClickProcess = false
          _this.saveBtnText = 'SAVE'
          if (res.data.Success === true) {
            _this.AlertSuccess('Success')
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          _this.saveBtnText = 'SAVE'
          console.log('error', err)
        })
    },
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
            _this.infoData = res.data.Result
            this.userName = this.infoData.UserName
            this.userModel.RealName = this.infoData.RealName
            this.userModel.NickName = this.infoData.NickName
            this.userModel.BirthDay = this.infoData.BirthDay
            this.userModel.Gender = this.infoData.Gender
            this.userModel.QQ = this.infoData.QQ
            this.userModel.Phone = this.infoData.Phone
            this.userModel.Email = this.infoData.Email
            this.VerifyRealName = this.infoData.VerifyRealName
            this.VerifyPhone = this.infoData.VerifyPhone
            this.VerifyEmail = this.infoData.VerifyEmail
            this.editPwdPlats = res.data.Result.EditPwdPlats
            this.safeQuestions = res.data.Result.SafeQuestion
            this.tempRealName = this.userModel.RealName
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    /**
     * @description 去修改密码页面
     */
    changePW () {
      this.$router.push({
        name: 'password',
        params: {
          data: this.editPwdPlats,
          VerifyPhone: this.VerifyPhone
        }
      })
    },
    security () {
      this.$router.push({
        name: 'security',
        params: {
          data: this.safeQuestions,
          unbindUrl: this.infoData.UnbindUrl,
          unbindMsg: this.infoData.UnbindMsg
        }
      })
    },
    dbSaveInfo: _.debounce(function () {
      console.log('current_time', new Date())
      this.saveUserInfo()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Personal', 'back', 'hide', true)
    if (this.$route.params.data) {
      this.infoData = this.$route.params.data
      this.userName = this.infoData.UserName
      this.userModel.RealName = this.infoData.RealName
      this.userModel.NickName = this.infoData.NickName
      this.userModel.BirthDay = this.infoData.BirthDay
      this.userModel.Gender = this.infoData.Gender
      this.userModel.QQ = this.infoData.QQ
      this.userModel.Phone = this.infoData.Phone
      this.userModel.Email = this.infoData.Email
      this.VerifyRealName = this.infoData.VerifyRealName
      this.VerifyPhone = this.infoData.VerifyPhone
      this.VerifyEmail = this.infoData.VerifyEmail
      this.editPwdPlats = this.infoData.EditPwdPlats
      this.safeQuestions = this.infoData.SafeQuestion
      this.tempRealName = this.userModel.RealName
    } else {
      this.$bus.$emit('loadingShow')
      this.loadDataInfo()
    }
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
  font-size: 17px;
}
.information {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.information .information-bar {
  margin-top: 0.2rem;
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.information .information-bar ul {
  width: 100%;
  overflow: hidden;
}
.information .information-bar ul li {
  background: rgba(235, 233, 233, 0.8);
  box-shadow: 0 1px rgb(208 207 207 / 90%);
  border-radius: 0.3rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.9rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.information .information-bar ul li.hide {
  border-bottom: none;
}
.information .information-bar ul li label {
  font-size: 0.35rem;
  color: #6b6b6b;
}
.information .information-bar ul li em {
  font-size: 0.35rem;
  color: #aaa;
  float: right;
}
.information .information-bar ul li em.active {
  color: #0088ff;
  margin-left: 0.2rem;
}
.information .information-bar ul li select {
  float: right;
  border: none;
  width: 0.8rem;
  height: 0.96rem;
  font-size: 0.35rem;
  color: #6b6b6b;
  background: none !important;
  text-align: right;
}
.information .information-bar ul li input {
  width: 2.4rem;
  height: 0.96rem;
  float: right;
  text-align: right;
  color: #6b6b6b;
  font-size: 0.3rem;
}
.information .information-bar ul li input::-webkit-input-placeholder {
  color: #ddd;
  font-size: 0.3rem;
}
.information .information-bar button {
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  text-align: center;
  line-height: 0.98rem;
  border-radius: 0.06rem;
  color: #fff;
  font-size: 0.3rem;
  margin: 0.8rem 0;
  border-radius: 0.3rem;
}
</style>
