<template>
<div class='gcashCard_Add'>
  <!-- <select v-model="info.BankName">
    <option v-for="(banks, index) in bank" :key="index" :value="banks">{{banks}}</option>
  </select> -->
  <input type="text" maxlength="8" v-model.trim="info.Name" :disabled="!editName" :name="editName?'':'readonly'" placeholder="Please enter your bank real info">
  <p style="padding: 0 0.3rem;">*Please enter your bank real info</p>
  <div class="box">
     <ul>
       <li>
        <input type="text" v-model="info.BankName" placeholder="BANK NAME" :disabled="true" :name="'readonly'">
       </li>
       <li>
        <input type="text" v-model="info.BankCardNo" placeholder="MOBILE">
       </li>
       <!-- <li>
        <input type="text" v-model="info.Name" placeholder="Account Name">
       </li> -->
       <li v-show="showAnswer">
        <input type="text"  v-model.trim="info.Answer" placeholder="SECURITY PIN">
       </li>
     </ul>
     <p v-show="showAnswer">*Fill in any security answer (optional for the first binding)</p>
     <button @click="dbAddCard" :disabled="inClickProcess">CONFIRM</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'gcashCard_Add',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      info: {
        Name: '',
        BankName: 'GCash',
        BankCardNo: '',
        Branch: 'GCash',
        RegisteredNumber: '',
        Answer: ''
      },
      cards: [],
      editName: true,
      showAnswer: true,
      inClickProcess: false,
      bank: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    'info.BankCardNo': function (val) {
      this.info.BankCardNo = val.replace(/\D/g, '')
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 添加银行卡
     */
    addCard () {
      if (this.inClickProcess) {
        return false
      }
      let _this = this
      if (_this.info.BankName.length < 1) {
        _this.AlertWarning('Please select issuer bank name')
        return false
      }
      if (_this.info.BankCardNo.length < 11) {
        _this.AlertWarning('Please enter correct mobile number')
        return false
      }
      if (_this.info.Name.length < 1) {
        _this.AlertWarning('Please enter name on card')
        return false
      }
      if (_this.showAnswer === true && _this.info.Answer.length < 1) {
        _this.AlertWarning('Please enter security answer')
        return false
      }
      this.info.RegisteredNumber = _this.info.BankCardNo
      _this.inClickProcess = true
      let url = '/api/withdrawal/binddrawcard'
      var params = {
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(Object.assign({}, params, this.info)))
        .then(res => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.AlertSuccess('Success')
            _this.info.BankName = ''
            _this.info.BankCardNo = ''
            _this.info.Branch = ''
            _this.info.Answer = ''
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
     * @description 获取所有提款卡
     */
    getCards () {
      let _this = this
      let url = '/api/withdrawal/getdrawcard'
      _this.$https
        .fetchPost(url, _this.secret({ Token: this.getinfo().token }))
        .then(res => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.cards = res.data.Result.Data
            _this.info.Name = res.data.Result.Name
            _this.bank = res.data.Result.BankList
            // this.$nextTick(() => {
            //   this.info.BankName = this.bank[0]
            // })
            if (_this.cards.length < 1) {
              _this.showAnswer = false
            }
            if (res.data.Result.Name.length > 0) {
              _this.editName = false
            }
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    validMobileNumber (mobileNumber) {
      if (mobileNumber.length < 1) {
        return false
      }
      var reg = /^09[0-9]{9}$/gi
      if (
        mobileNumber.length < 1 ||
        !reg.test(mobileNumber)
      ) {
        return false
      }
      return true
    },
    dbAddCard: _.debounce(function () {
      this.addCard()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getCards()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Add a Bank Card', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.gcashCard_Add{
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
  background: #121212;
}
.gcashCard_Add select{
  width: 100%;
  height: 0.98rem;
  border: none;
  border-radius: 0.06rem;
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  color: #2b2b2b;
  background: #121212;
  font-size: 0.3rem;
}
.gcashCard_Add input{
  width: 100%;
  height: 0.98rem;
  border: none;
  border-radius: 0.06rem;
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #121212;
  font-size: 0.3rem;
  color: #fff;
}
.gcashCard_Add input::-webkit-input-placeholder{
  color: #fff;
}
.gcashCard_Add p{
  line-height: 0.6rem;
  font-size: 0.25rem;
  color: #fff;
}
.gcashCard_Add .box{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #121212;
  border-radius: 0.15rem;
}
.gcashCard_Add .box ul{
  width: 100%;
  overflow: hidden;
}
.gcashCard_Add .box ul li{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.gcashCard_Add .box ul li input{
  margin: 0;
  padding: 0;
}
.gcashCard_Add .box button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  border-radius: 0.15rem;
  font-size: 0.3rem;
  color: #fff;
  margin: 0.6rem 0;
}
</style>
