<template>
  <div class="wallet">
    <ul class="walletNav">
      <li v-for="(nav, index) in walletNav"
          :key="index"
          :class="[{on: index == active}]"
          @click="switchWallet(index)">{{nav}}</li>
    </ul>
    <div class="walletMain">
      <div class="swiper-container"
           id="walletMain">
        <div class="swiper-wrapper">
          <!-- 充值 -->
         <!--  <div class="swiper-slide">
            <deposit />
          </div> -->
          <!-- 转账 -->
          <!-- <div class="swiper-slide">
            <transfer v-if="active ==1" />
          </div> -->
          <!-- 提款 -->
          <div class="swiper-slide">
            <usdtwithdrawal v-if="active === 2 || showWithdrawal " />
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗教程 -->
    <tutorial v-if="tutorial" />
  </div>
</template>

<script>
import deposit from '@/components/Center/Wallet/wallet-deposit'
import transfer from '@/components/Center/Wallet/wallet-transfer'
import usdtwithdrawal from '@/components/Center/Wallet/wallet-usdtwithdrawal'
import tutorial from '@/components/Center/Wallet/wallet-deposit-tutorial-box.vue'

import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'wallet',
  //  import引入的组件需要注入到对象中才能使用
  components: { deposit, transfer, usdtwithdrawal, tutorial },
  data () {
    //  这里存放数据
    return {
      active: 2,
      showWithdrawal: false,
      walletNav: ['', '', '提款'],
      swiperWalletMain: null,
      routeIndex: null,
      tutorial: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 初始切换动画
    Wallet () {
      var that = this
      that.$nextTick(function () {
        that.swiperWalletMain = new Swiper('#walletMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperWalletMain.activeIndex
            }
          }
        })
      })
    },
    // 顶部菜单切换
    switchWallet (index) {
      this.active = index
      if (this.active === 2) {
        this.showWithdrawal = true
      }
      this.swiperWalletMain.slideToLoop(index)
    },
    // 个人中心跳转对应的位置,或登录后直接跳转
    route () {
      var that = this
      that.routeIndex = this.$route.params.index
      if (that.routeIndex !== undefined) {
        that.active = that.routeIndex
        if (that.active === 2) {
          that.showWithdrawal = true
        }
        that.swiperWalletMain.slideToLoop(that.routeIndex)
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    var _this = this
    // 充值教程弹窗
    _this.$bus.$on('tutorialShow', () => {
      _this.tutorial = true
    })
    _this.$bus.$on('tutorialHide', () => {
      _this.tutorial = false
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.Wallet()
    this.$nextTick(function () {
      this.route()
    })
    this.$emit('getStatus', 'Wallet', 'menu', 'message')
  }
}
</script>
<style scoped>
.wallet {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0.98rem;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.wallet .walletNav {
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  top: 0.88rem;
  z-index: 99;
}
.wallet .walletNav li {
  width: 33%;
  text-align: center;
  line-height: 0.88rem;
  float: left;
  font-size: 0.3rem;
}
.wallet .walletNav li.on {
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
  box-sizing: border-box;
}
.walletMain {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 1.76rem;
  bottom: 0;
}
.walletMain .swiper-container {
  height: 100%;
}
.walletMain .swiper-slide {
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.walletMain .swiper-slide >>> .mode {
  width: 100%;
  overflow: hidden;
}
.walletMain .swiper-slide >>> h2 {
  font-size: 0.25rem;
  color: #6b6b6b;
  font-weight: normal;
}
.walletMain .swiper-slide >>> .way {
  margin-top: 0.2rem;
  overflow: hidden;
}
.walletMain .swiper-slide >>> .way li {
  float: left;
  width: 1.5rem;
  height: 1.12rem;
  border-radius: 0.06rem;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.2rem;
  margin-right: 0.29rem;
  text-align: center;
}
.walletMain .swiper-slide >>> .way li:nth-child(4n + 4) {
  margin-right: 0;
}
.walletMain .swiper-slide >>> .way li.on {
  background: #fff url(../../../assets/images/wallet/wallet_checkon_ico@2x.png);
  background-size: 100% 100%;
  animation: bounceIn 0.8s linear;
}
.walletMain .swiper-slide >>> .way li span {
  font-size: 0.2rem;
  color: #2b2b2b;
}
.walletMain .swiper-slide >>> .way li i {
  display: block;
  width: 0.48rem;
  height: 0.48rem;
  margin: 0.1rem auto 0.05rem auto;
}
.walletMain .swiper-slide >>> .way li.onlineTransfer i {
  background: url(../../../assets/images/wallet/wallet_bank_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.alipayTransfer i {
  background: url(../../../assets/images/wallet/wallet_ualpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.wechatTransfer i {
  background: url(../../../assets/images/wallet/wallet_uwechatpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.Online i {
  background: url(../../../assets/images/wallet/wallet_onlinepay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.Alipay i {
  background: url(../../../assets/images/wallet/wallet_alipay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.AlipayToCard i {
  background: url(../../../assets/images/wallet/wallet_ualpaytocard_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.Wechat i {
  background: url(../../../assets/images/wallet/wallet_wechatpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.WechatToCard i {
  background: url(../../../assets/images/wallet/wallet_uwechatpaytocard_ico.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.BankH5 i {
  background: url(../../../assets/images/wallet/wallet_e-bankpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.BankQuick i {
  background: url(../../../assets/images/wallet/wallet_fastpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.Union i {
  /* 银联 */
  background: url(../../../assets/images/wallet/wallet_uunionpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.UnionPay i {
  /* 云闪付 */
  background: url(../../../assets/images/wallet/wallet_unionpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.BankToCard i {
  /* 第3方网银转账 */
  background: url(../../../assets/images/wallet/wallet_ubank_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.UnionPayToCard i {
  background: url(../../../assets/images/wallet/wallet_unionpaytocard_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.JD i {
  background: url(../../../assets/images/wallet/wallet_jdpay_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.WechatSmallAmount i {
  background: url(../../../assets/images/wallet/wallet_uwechatpay_s_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .way li.AlipaySmallAmount i {
  background: url(../../../assets/images/wallet/wallet_ualpaytocard_s_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .aisle {
  overflow: hidden;
}
.walletMain .swiper-slide >>> .aisle ul {
  width: 100%;
  margin-top: 0.2rem;
  overflow: hidden;
}
.walletMain .swiper-slide >>> .aisle ul li {
  float: left;
  width: 1.46rem;
  height: 0.88rem;
  text-align: center;
  line-height: 0.88rem;
  color: #2b2b2b;
  font-size: 0.25rem;
  border-radius: 0.06rem;
  background: rgba(255, 255, 255, 0.6);
  border: 0.02rem solid rgba(255, 255, 255, 0);
  margin-bottom: 0.2rem;
  margin-right: 0.29rem;
}
.walletMain .swiper-slide >>> .aisle ul li:nth-child(4n + 4) {
  margin-right: 0;
}
.walletMain .swiper-slide >>> .aisle ul li.on {
  border: 0.02rem solid #0088ff;
  background: #fff;
}
.walletMain .swiper-slide >>> .bank {
  width: 100%;
  overflow: hidden;
}
.walletMain .swiper-slide >>> select {
  width: 100%;
  height: 0.88rem;
  border: none;
  border-radius: 0.06rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  background: #fff;
}
.walletMain .swiper-slide >>> select.else {
  padding: 0 0.2rem 0 1rem;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e5e5e5;
}
.walletMain .swiper-slide >>> .amount {
  width: 100%;
  overflow: hidden;
  margin: 0.2rem 0;
}
.walletMain .swiper-slide >>> .amount .amount-Main {
  background: #fff;
  border-radius: 0.06rem;
  margin: 0.2rem 0;
  padding: 0 0.2rem;
  position: relative;
}
.walletMain .swiper-slide >>> .amount .amount-Main input {
  width: 100%;
  height: 1.2rem;
  border: none;
  font-size: 0.8rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e5e5e5;
  margin-bottom: 0.2rem;
}
.walletMain
  .swiper-slide
  >>> .amount
  .amount-Main
  input::-webkit-input-placeholder {
  color: #aab2bd;
  line-height: 1.2rem;
  font-size: 0.45rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main input[type="password"] {
  padding: 0 0.2rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main i {
  font-size: 0.6rem;
  position: absolute;
  top: 0.25rem;
  left: 0.4rem;
  color: #2b2b2b;
}
.walletMain .swiper-slide >>> .amount .amount-Main span b {
  font-weight: normal;
  font-size: 0.3rem;
  color: #fd2a2a;
}
.walletMain .swiper-slide >>> .amount .amount-Main em.dec {
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
  font-size: 0.45rem;
  color: #fd2a2a;
}
.walletMain .swiper-slide >>> .amount .amount-Main .amountBtn {
  width: 100%;
  padding-top: 0.2rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main .amountBtn li {
  float: left;
  width: 1.85rem;
  height: 0.66rem;
  line-height: 0.66rem;
  text-align: center;
  border: 0.02rem solid #e5e5e5;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
}
.walletMain
  .swiper-slide
  >>> .amount
  .amount-Main
  .amountBtn
  li:nth-child(3n + 3) {
  margin-right: 0;
}
.walletMain .swiper-slide >>> .amount .amount-Main button {
  width: 100%;
  height: 0.98rem;
  border: none;
  background: #0088ff;
  color: #fff;
  border-radius: 0.06rem;
  margin: 0.2rem 0 0.4rem 0;
  font-size: 0.3rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main button.green {
  background: #00c389;
  margin-top: 0;
}
.walletMain .swiper-slide >>> .amount .amount-Main button.half {
  float: right;
  width: 3.6rem;
  height: 0.98rem;
  border: none;
  background: #0088ff;
  color: #fff;
  border-radius: 0.06rem;
  margin: 0.2rem 0 0.4rem 0;
  font-size: 0.3rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main button.quick {
  width: 2.6rem;
  height: 0.98rem;
  border: none;
  background: #00c389;
  color: #fff;
  border-radius: 0.06rem;
  margin: 0.2rem 0 0.4rem 0;
  font-size: 0.3rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main button.dis {
  background: #cecece;
}
.walletMain .swiper-slide >>> .balance {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 0.06rem;
}
.walletMain .swiper-slide >>> .balance li {
  float: left;
  width: 1.5rem;
  height: 1.12rem;
  margin-bottom: 0.2rem;
  margin-right: 0.29rem;
  text-align: center;
}
.walletMain .swiper-slide >>> .balance li:nth-child(4n + 4) {
  margin-right: 0;
}
.walletMain .swiper-slide >>> .balance li em {
  color: #6b6b6b;
  display: block;
  font-size: 0.25rem;
  margin: 0.15rem 0 0.05rem 0;
}
.walletMain .swiper-slide >>> .balance li span {
  color: #0088ff;
  font-size: 0.25rem;
  margin-top: 0.2rem;
}
.walletMain .swiper-slide >>> .platform {
  width: 100%;
  overflow: hidden;
}
.walletMain .swiper-slide >>> .platform li {
  width: 2.8rem;
  float: left;
}
.walletMain .swiper-slide >>> .platform li.cutover {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.4rem 0.39rem 0.2rem 0.39rem;
}
.walletMain .swiper-slide >>> .platform li.cutover i {
  display: block;
  width: 100%;
  height: 100%;
  background: url(../../../assets/images/wallet/wallet_transfer_ico@2x.png);
  background-size: 100% 100%;
}
.walletMain .swiper-slide >>> .amount .amount-Main .totalBalance {
  width: 100%;
  height: 0.68rem;
  overflow: hidden;
  line-height: 0.68rem;
  position: relative;
}
.walletMain .swiper-slide >>> .amount .amount-Main span {
  font-size: 0.3rem;
  color: #6b6b6b;
}
.walletMain .swiper-slide >>> .amount .amount-Main span em {
  font-size: 0.3rem;
  color: #6b6b6b;
}
.walletMain .swiper-slide >>> .amount .amount-Main .amountAll {
  width: 1.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.06rem;
  border: 0.02rem solid #007eff;
  color: #007eff;
  padding: 0.1rem;
  position: absolute;
  right: 0.2rem;
  top: 0.3rem;
  text-align: center;
  font-size: 0.25rem;
}
.walletMain .swiper-slide >>> .amount .amount-Main .quickIcon {
  width: 1.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.06rem;
  border: 0.02rem solid #007eff;
  color: #007eff;
  padding: 0.1rem;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 0.25rem;
}
.walletMain .swiper-slide >>> .writeBank {
  width: 100%;
  margin: 0.2rem 0;
}
.walletMain .swiper-slide >>> .writeBank input {
  width: 100%;
  height: 0.98rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  border: none;
  background: #fff;
  border-radius: 0.06rem;
  font-size: 0.3rem;
}
.walletMain .swiper-slide >>> .text {
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.walletMain .swiper-slide >>> .text span {
  font-size: 0.3rem;
  display: block;
  margin: 0.1rem 0;
  color: #6b6b6b;
}
.walletMain .swiper-slide >>> .text p {
  font-size: 0.25rem;
  margin: 0.1rem 0;
  color: #6b6b6b;
}
</style>
