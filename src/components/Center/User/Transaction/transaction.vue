<template>
<div class='transaction'>
  <div class="transactionNav">
    <div class="swiper-container" id="transactionNav">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          :class="{on: index == active}"
          v-for="(tra, index) in traNav"
          :key="index"
          @click="navToggle(index)"
        >{{tra}}</div>
      </div>
    </div>
  </div>
  <div class="transactionMain">
    <div class="swiper-container" id="transactionMain" ref="foodsWrapper">
      <div class="swiper-wrapper">
          <!-- 充值记录 -->
          <depositRecord/>
          <!-- 提款记录 -->
          <withdrawalRecord/>
          <!-- 转账记录 -->
          <transferRecord/>
          <!-- 优惠记录 -->
          <promotionRecord/>
          <!-- 淘金币记录 -->
          <!-- <tjbRecord/> -->
          <!-- 筹码兑换记录 -->
          <!-- <chipRecord/> -->
          <!-- 优惠代码记录 -->
          <promotionCodeRecord/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import depositRecord from '@/components/Center/User/Transaction/transaction-depositRecord.vue'
import withdrawalRecord from '@/components/Center/User/Transaction/transaction-withdrawalRecord.vue'
import transferRecord from '@/components/Center/User/Transaction/transaction-transferRecord.vue'
import promotionRecord from '@/components/Center/User/Transaction/transaction-promotionRecord.vue'
// import tjbRecord from '@/components/Center/User/Transaction/transaction-tjbRecord.vue'
// import chipRecord from '@/components/Center/User/Transaction/transaction-chipRecord.vue'
import promotionCodeRecord from '@/components/Center/User/Transaction/transaction-promotionCodeRecord.vue'

import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'transaction',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    depositRecord,
    withdrawalRecord,
    transferRecord,
    promotionRecord,
    // tjbRecord,
    // chipRecord,
    promotionCodeRecord
  },
  data () {
  //  这里存放数据
    return {
      active: 0,
      traNav: ['Deposit', 'Withdrawal', 'Transfer', 'Offer', 'Offer Code'],
      transactionNav: null,
      transactionMain: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 切换菜单
    navToggle (index) {
      this.active = index
      this.transactionNav.slideToLoop(index)
      this.transactionMain.slideToLoop(index)
    },
    // 菜单初始动画
    traNavSwiper () {
      var that = this
      that.$nextTick(function () {
        that.transactionNav = new Swiper('#transactionNav', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          slidesPerView: 5
        })
      })
    },
    // 内容初始动画
    traMaiSwipern () {
      var that = this
      that.$nextTick(function () {
        that.transactionMain = new Swiper('#transactionMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.transactionMain.activeIndex
              if (that.active > 2) {
                that.transactionNav.slideTo(that.active - 2, 500, false)
              } else if (that.active <= 2) {
                that.transactionNav.slideTo(0, 500, false)
              }
            }
          }
        })
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.traNavSwiper()
    this.traMaiSwipern()
    this.$emit('getStatus', 'TXN Record', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.transaction{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #000;
}
.transactionNav{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  top: 0;
  background: #000;
  z-index: 99;
}
.transactionNav .swiper-container{
  width: 100%;
  overflow: hidden;
}
.transactionNav .swiper-slide{
  width: 100%;
  /* height: 0.88rem; */
  text-align: center;
  font-size: 0.25rem;
  color: #a0a0a3;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #535353;
  margin: 5px 3px;
  line-height: 0.7rem;
}
.transactionNav .swiper-slide.on{
  color: #fff;
  /* height: 0.87rem; */
  /* border-bottom: 0.04rem solid #0088ff; */
  box-sizing: border-box;
}
.transactionMain{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.transactionMain .swiper-container{
  height: 100%;
}
.transactionMain .swiper-slide{
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.transactionMain .swiper-slide >>> .box{
  width: 100%;
  background: #c6c6c6;
  opacity: 0.75;
  border-radius: 0.16rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.transactionMain .swiper-slide >>> .box ul{
  width: 100%;
  float: left;
  overflow: hidden;
}
.transactionMain .swiper-slide >>> .box ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  color: #6b6b6b;
  font-size: 0.32rem;
}
.transactionMain .swiper-slide >>> .box ul li:last-child{
  border-bottom: none
}
.transactionMain .swiper-slide >>> .box ul li span{
  float: left;
  font-size: 0.3rem;
  color: #fff;
}
.transactionMain .swiper-slide >>> .box ul li span.r{
  color: #bbb;
  text-decoration:line-through;
}
.transactionMain .swiper-slide >>> .box ul li em{
  float: right;
  font-size: 0.3rem;
  color: #fff;
}
.transactionMain .swiper-slide >>> .box ul li em.b{
  color: #0088ff;
}
.transactionMain .swiper-slide >>> .box ul li em.r{
  color: #bbb;
  text-decoration:line-through;
}
.transactionMain .swiper-slide >>> .box.cancel ul li span{
  text-decoration:line-through;
}
.transactionMain .swiper-slide >>> .box ul li p{
  line-height: 0.6rem;
  font-size: 0.25rem;
  color: #fff;
}
.transactionMain .swiper-slide >>> .box ul li p.r{
  color: #bbb;
  text-decoration:line-through;
}
.transactionMain .swiper-slide >>> .box ul li time{
  float: left;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.2rem;
  color: #fff;
}
.transactionMain .swiper-slide >>> .box ul li b{
  float: right;
  height: 0.5rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  border: 0.02rem solid #0088ff;
  border-radius: 0.06rem;
  color: #0088ff;
  font-weight: normal;
  line-height: 0.5rem;
  font-size: 0.2rem;
  text-align: center;
  margin-bottom: 0.2rem;
}

.transactionMain .swiper-slide >>> .no_message{
  width: 100%;
  height: 2rem;
}
.transactionMain .swiper-slide >>> .no_message i{
  display: block;
  width: 2.06rem;
  height: 1.6rem;
  margin: 0.3rem auto;
  background: url(../../../../assets/images/account/no-message_ico@2x.png);
  background-size: 100% 100%;
}
.transactionMain .swiper-slide >>> .no_message p{
  text-align: center;
  font-size: 0.26rem;
  color: #fff;
}
</style>
