<template>
<div class='depositInfo'>
  <div class="deposit-box">
    <ul>
      <li style="display: flex;">
        <label>请转入USDT：</label>
        <input
          type="text"
          name="readonly"
          disabled="disabled"
          v-model="AmountUSDT"
        >
        <div style="position: relative;">
          <b @click="handleCopy(AmountUSDT,$event)">复制1</b>
        </div>
      </li>
      <li>
        <label>USDT链名称：</label>
        <input
          type="text"
          name="readonly"
          disabled="disabled"
          v-model="BankName"
        >
      </li>
      <li style="min-height: 1.3rem; display: flex;">
        <label>充币地址：</label>
        <textarea
          type="text"
          name="readonly"
          disabled="disabled"
          v-model="WalletAddr"
        ></textarea>
        <div style="position: relative;">
          <b style="position: absolute;
            width: 33px;
            height: 25px;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            top: 50%;" @click="handleCopy(WalletAddr,$event)">复制</b>
        </div>
      </li>
    </ul>
    <div class="text">
      <p class="notiUSDT">*请确保收款地址收到{{AmountUSDT}} USDT,（不含手续费),否则无法自动到账</p>
      <span>注意事项</span>
      <p>1. 单笔存款最低{{TransferPropety.minAmount}}元，上限{{TransferPropety.maxAmount}}元；</p>
      <p>2. 每次充值请重新获取新USDT地址，充至非当前地址导致一切损失概不负责；</p>
      <p>3. 自行选择USDT链名称为ERC20或TRC20进行充值，请同链充值，否则导致一切损失自行承担；</p>
      <p>4. 当前汇率为：{{toDecimal2(USDTRate)}} CNY/USDT（汇率有变动，仅供参考）；</p>
      <p>
        5. 若充值后未到账请联系在线客服。
      </p>
    </div>
  </div>
</div>
</template>

<script>
import clipboard from '@/Plugin/clipboard.js'

export default {
  name: 'usdtTransferOut',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      BankName: this.$route.params.BankName,
      TransferPropety: this.$route.params.TransferPropety,
      AmountUSDT: this.$route.params.AmountUSDT,
      WalletAddr: this.$route.params.WalletAddr,
      USDTRate: this.$route.params.USDTRate
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // console.log(this.info)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.notiUSDT {
  font-size: 12px !important;
  color: red !important;
}
.depositInfo{
  width: 100%;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top:0.88rem;
  bottom: 0;
  background: url(../../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
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
  display: inline-block;
  min-width: 28vw;
  line-height: 0.98rem;
  font-size: 0.3rem;
  color: #6b6b6b;
}
.depositInfo .deposit-box >>> ul li input {
  width: 45%;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #007eff;
  line-height: 0.98rem;
}
.depositInfo .deposit-box >>> ul li textarea {
  width: 45%;
  height: 1.3rem;
  font-size: 0.3rem;
  color: #007eff;
}
.depositInfo .deposit-box >>> ul li b{
  position: absolute;
  width: 33px;
  height: 25px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
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
