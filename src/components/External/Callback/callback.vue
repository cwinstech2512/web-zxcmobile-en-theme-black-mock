<template>
<div class='Callback' :class="showExternalBar? 'on':''">
  <div class="Callback-main">
    <p>会员账号</p>
    <input type="text" v-model="userName" :readonly="true">
    <p>联系电话</p>
    <input v-model="phone" type="text" >
    <p>选择回访时间</p>
    <input
      type="date"
      class="time"
      v-model="callDate"
    />
    <select class="time" v-model="callTime1" >
      <option value selected="selected" disabled="disabled"></option>
      <option value="10:00">10:00</option>
      <option value="11:00">11:00</option>
      <option value="12:00">12:00</option>
      <option value="13:00">13:00</option>
      <option value="14:00">14:00</option>
      <option value="15:00">15:00</option>
      <option value="16:00">16:00</option>
      <option value="17:00">17:00</option>
    </select>
    <label>至</label>
    <select class="time" v-model="callTime2" >
      <option value selected="selected" disabled="disabled"></option>
      <option value="11:00">11:00</option>
      <option value="12:00">12:00</option>
      <option value="13:00">13:00</option>
      <option value="14:00">14:00</option>
      <option value="15:00">15:00</option>
      <option value="16:00">16:00</option>
      <option value="17:00">17:00</option>
      <option value="18:00">18:00</option>
    </select>
    <p>问题类型</p>
    <select v-model="ptype" @change="handleChange" >
      <option v-for="(tl, index) in typeList" :key="index" :value="tl.value" ref="newText">{{tl.text}}</option>
    </select>
    <p>问题详情</p>
    <textarea maxlength="240" v-model="content"/>
    <button @click="dbSendCallback" :disabled="isSending">提交</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Callback',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      userName: '',
      phone: '',
      ptype: 1,
      ptext: '',
      content: '',
      callDate: this.moment(new Date()).format('YYYY-MM-DD'),
      callTime1: '',
      callTime2: '',
      isSending: false,
      btnText: '提交',
      typeList: [
        {value: 1, text: '注册、存/提款'},
        {value: 2, text: '体育'},
        {value: 3, text: '真人娱乐'},
        {value: 4, text: '电子游戏'},
        {value: 5, text: '优惠、红利'},
        {value: 6, text: '投诉、建议'},
        {value: 7, text: '其他'}
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    handleChange (val) {
      // console.log(this.$refs.newText[this.ptype - 1].text)
      this.ptext = this.$refs.newText[this.ptype - 1].text
    },
    // 提交
    sendCallback () {
      if (this.isSending === true) {
        return false
      }
      let _this = this
      if (_this.userName.length < 1) {
        _this.$swal({
          text: '请重新登录',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      if (_this.phone.length < 1) {
        _this.$swal({
          text: '请输入联系电话',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (_this.phone.length < 1 || !reg.test(_this.phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (
        _this.callDate.length < 1 ||
        _this.callTime1.length < 1 ||
        _this.callTime2.length < 1
      ) {
        _this.$swal({
          text: '请选择回访时间段',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      if (_this.ptype.length < 1) {
        _this.$swal({
          text: '请选择问题类型',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      if (_this.content.length < 1) {
        _this.$swal({
          text: '请输入问题详情',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      _this.isSending = true
      _this.btnText = '正在提交...'
      let url = '/api/CallBack/Post'
      var params = {
        Phone: _this.phone,
        TroubleType: _this.ptype,
        TroubleText: _this.ptext,
        TroubleContent: _this.content,
        CallBackTime: _this.callDate + ' ' + _this.callTime1 + '-' + _this.callTime2,
        Token: _this.getinfo().token
      }
      // console.log(params)
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          _this.isSending = false
          _this.btnText = '提交'
          if (res.data.Success === true) {
            _this.phone = ''
            _this.callDate = ''
            _this.callTime1 = ''
            _this.callTime2 = ''
            _this.ptype = 0
            _this.content = ''
            _this.AlertSuccess('提交成功')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        })
        .catch(err => {
          _this.isSending = false
          _this.btntext = '确定'
          console.log(err)
        })
    },
    dbSendCallback: _.debounce(function () {
      console.log('current_time', new Date())
      var that = this
      that.$nextTick(function () {
        that.sendCallback()
      })
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.userName = this.getinfo().account || sessionStorage.getItem('current_uid')
    // 浏览器返回键返回后跳回首页
    window.history.pushState(null, null, '#') // 增加一条当前页的历史记录
    window.addEventListener('popstate', function () { // 监听是否操作了浏览器的前后页，然后跳回主页
      window.parent.document.location.href = window.parent.document.location.origin + '/mobile#/center/home'
    }, false)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '回电服务', 'back', this.showExternalBar)
  }
}
</script>
<style scoped>
.Callback.on{
  top:0.88rem;
}
.Callback{
  width: 100%;
  overflow: hidden;
  padding: 0 0.3rem;
  box-sizing: border-box;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  top:0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.Callback-main{
  width: 100%;
  overflow: hidden;
}
.Callback-main p{
  font-size: 0.25rem;
  color: #6b6b6b;
  margin: 0.2rem 0;
}
.Callback-main input{
  width: 100%;
  height: 0.88rem;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
  color: #6b6b6b;
  font-size: 0.32rem;
}
::-webkit-clear-button{
  display: none;
}
::-webkit-input-placeholder{
  color: #cecece;
}
.Callback-main button{
  margin-top: 0.4rem;
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 0.98rem;
  border-radius: 0.06rem;
  font-size: 0.3rem;
}
.Callback-main select{
  width: 100%;
  height: 0.88rem;
  background: #fff;
  border-radius: 0.06rem;
  border: none;
  padding: 0 0.2rem;
  box-sizing: border-box;
  color: #6b6b6b;
}
.Callback-main textarea{
  background: #fff;
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  resize: none;
  font-size: 0.25rem;
  color: #6b6b6b;
}
.Callback-main label{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.Callback-main .time{
  width: 25%;
  font-size: 0.2rem;
}
.Callback-main input.time{
  width: 40%;
  margin-right: 0.2rem;
}
</style>
