<template>
<div class='virtualWallet_Add'>
  <select v-model="info.chainname">
    <option v-for="(banks, index) in bank" :key="index" :value="banks">{{banks}}</option>
  </select>
  <p>*虚拟钱包填写后不可修改，请填写正确的钱包信息。</p>
  <div class="box">
     <ul>
       <li>
        <input type="text" v-model="info.walletaddr" placeholder="请填写完整钱包地址">
       </li>
       <li>
        <input type="text" v-model="info.Exange" placeholder="所属交易所">
       </li>
       <li v-show="showAnswer">
        <input type="text"  v-model.trim="info.Answer" placeholder="安保答案">
       </li>
     </ul>
     <p v-show="showAnswer">*填写任意一个安保答案（第一次绑定可不填）</p>
     <button @click="dbAddCard" :disabled="inClickProcess">确认</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'virtualWallet_Add',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      info: {
        Name: '',
        chainname: '',
        walletaddr: '',
        Exange: '',
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
    // 'info.walletaddr': function (val) {
    //   this.info.walletaddr = val.replace(/\D/g, '')
    // }
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
      if (_this.info.chainname.length < 1) {
        _this.AlertWarning('请选择链名称')
        return false
      }
      if (_this.info.Exange.length < 1) {
        _this.AlertWarning('请输入交易所名称')
        return false
      }
      let trcRules = new RegExp('^T[0-9a-zA-Z]{33}')
      if (_this.info.chainname.replace(/\s*/g, '') === 'TRC20' && !(trcRules.test(_this.info.walletaddr))) {
        _this.AlertWarning('请输入正确的钱包地址')
        return false
      }
      let ercRules = new RegExp('^0x[0-9a-zA-Z]{40}')
      if (_this.info.chainname.replace(/\s*/g, '') === 'ERC20' && !(ercRules.test(_this.info.walletaddr))) {
        _this.AlertWarning('请输入正确的钱包地址')
        return false
      }

      if (_this.showAnswer === true && _this.info.Answer.length < 1) {
        _this.AlertWarning('请输入安保答案')
        return false
      }
      _this.inClickProcess = true
      let url = '/api/withdrawal/bindvirtualwallet'
      var params = {
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(Object.assign({}, params, this.info)))
        .then(res => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.AlertSuccess('添加成功')
            _this.info.chainname = ''
            _this.info.walletaddr = ''
            _this.info.Exange = ''
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
     * @description 获取所有錢包
     */
    getVirtuala () {
      let _this = this
      let url = '/api/withdrawal/getvirtualacc'
      _this.$https
        .fetchPost(url, _this.secret({ Token: this.getinfo().token }))
        .then(res => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.cards = res.data.Result.Data
            _this.info.Name = res.data.Result.Name
            _this.bank = ['ERC20', 'TRC20']
            this.$nextTick(() => {
              this.info.chainname = 'ERC20'
            })
            // if (_this.cards.length < 1) {
            //   _this.showAnswer = false
            // }
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
    this.getVirtuala()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '添加虚拟钱包', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.virtualWallet_Add{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background:  url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.virtualWallet_Add select{
  width: 100%;
  height: 0.98rem;
  border: none;
  border-radius: 0.06rem;
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  color: #2b2b2b;
  background: #fff;
  font-size: 0.3rem;
}
.virtualWallet_Add input{
  width: 100%;
  height: 0.98rem;
  border: none;
  border-radius: 0.06rem;
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
  font-size: 0.3rem;
}
.virtualWallet_Add input::-webkit-input-placeholder{
  color: #bbb;
}
.virtualWallet_Add p{
  line-height: 0.6rem;
  font-size: 0.25rem;
  color: #6b6b6b;
}
.virtualWallet_Add .box{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.06rem;
}
.virtualWallet_Add .box ul{
  width: 100%;
  overflow: hidden;
}
.virtualWallet_Add .box ul li{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.virtualWallet_Add .box ul li input{
  margin: 0;
  padding: 0;
}
.virtualWallet_Add .box button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  color: #fff;
  margin: 0.6rem 0;
}
</style>
