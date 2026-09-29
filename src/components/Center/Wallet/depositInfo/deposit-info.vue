<template>
<div class='depositInfo'>
  <div class="deposit-box">
    <countdown v-if="type === 'countdown'" :oldZxc='oldZxc'/>
    <onlineTransfer v-if="type === 'onlineTransfer' && BankName !=='邮政银行'" :info='pdata'/>
    <alipayTransfer v-if="type !== 'countdown' && type !== 'onlineTransfer' || type === 'onlineTransfer' && BankName === '邮政银行' " :info='pdata' :code='type' :TransferPropety='TransferPropety' />
  </div>
</div>
</template>

<script>
import onlineTransfer from '@/components/Center/Wallet/depositInfo/deposit-info-onlineTransfer'
import alipayTransfer from '@/components/Center/Wallet/depositInfo/deposit-info-alipayTransfer'
import countdown from '@/components/Center/Wallet/depositInfo/deposit-info-countdown'

export default {
  name: 'depositInfo',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    onlineTransfer,
    alipayTransfer,
    countdown
  },
  data () {
  //  这里存放数据
    return {
      type: this.$route.params.type,
      BankName: this.$route.params.data.BankName,
      TransferPropety: this.$route.params.TransferPropety,
      oldZxc: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {
    pdata () {
      if (this.$route.params.data) {
        var data = JSON.stringify(this.$route.params.data)
        return data
      } else {
        return '{}'
      }
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    getBalance () {
      var _this = this
      let url = '/api/account/getinfo'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.oldZxc = res.data.Result.Balance
          } else {
            if (!_this.hasPopup) {
              _this.hasPopup = true
              _this.NormalFailConfirm(res.data)
            }
          }
        }).catch(err => {
          console.log('error', err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // console.log(JSON.stringify(this.$route.params.TransferPropety))
    // console.log(this.pdata)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getBalance()
    var name = this.$route.params.navBarName
    this.$emit('getStatus', name, 'back', 'hide', true)
  }
}
</script>
<style scoped>
.depositInfo{
  width: 100%;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top:0.88rem;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.depositInfo .deposit-box{
  width: 100%;
  overflow: hidden;
}
.depositInfo .deposit-box >>> ul{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  background: #fff;
  overflow: hidden;
}
.depositInfo .deposit-box >>> ul li{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.depositInfo .deposit-box >>> ul li:last-child{
  border-bottom: none
}
.depositInfo .deposit-box >>> ul li.btn{
  height: 2rem;
}
.depositInfo .deposit-box >>> ul li.btn span{
  float: left;
  font-size: 0.25rem;
  margin: 0.15rem 0;
  color: #6b6b6b;
}
.depositInfo .deposit-box >>> ul li.btn span em{
  font-size: 0.25rem;
  color: #ff7200;
}
.depositInfo .deposit-box >>> ul li label{
  line-height: 0.98rem;
  font-size: 0.3rem;
  color: #6b6b6b;
}
.depositInfo .deposit-box >>> ul li input {
  width: 4.1rem;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  line-height: 0.98rem;
}
.depositInfo .deposit-box >>> ul li b{
  width: 1.2rem;
  font-weight: normal;
  background: #0088ff;
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.06rem;
  cursor: pointer;
  font-size: 0.3rem;
}
.depositInfo .deposit-box >>> ul li button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  font-size: 0.3rem;
  color: #fff;
  border-radius: 0.06rem;
  margin-top: 0.5rem;
}
.depositInfo .deposit-box >>> .text{
  width: 100%;
  overflow: hidden;
}
.depositInfo .deposit-box >>> .text span{
  font-size: 0.3rem;
  display: block;
  margin: 0.1rem 0;
  color: #6b6b6b;
}
.depositInfo .deposit-box >>> .text p{
  font-size: 0.25rem;
  margin: 0.1rem 0;
  color: #6b6b6b;
}
</style>
