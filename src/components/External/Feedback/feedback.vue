<template>
<div class='feedback' :class="showExternalBar? 'on':''">
  <ul class="feedbackNav">
    <li
      v-for="(nav, index) in feedbackNav"
      :key="index"
      :class="[{on: index == active}]"
      @click="switchfeedback(index)"
    >
    {{nav}}
    </li>
  </ul>
  <div class="feedbackMain">
    <div class="swiper-container" id="feedbackMain">
      <div class="swiper-wrapper">
        <!-- 平台返水 -->
        <div class="swiper-slide">
          <plat/>
        </div>
        <!-- 高返水 -->
        <div class="swiper-slide">
          <high/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import plat from '@/components/External/Feedback/feedback-plat'
import high from '@/components/External/feedback/feedback-high'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'feedback',
  //  import引入的组件需要注入到对象中才能使用
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {plat, high},
  data () {
  //  这里存放数据
    return {
      active: 0,
      feedbackNav: ['Platform Rebate', 'High Rebate'],
      swiperfeedbackMain: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 初始切换动画
    feedbackMain () {
      var that = this
      that.$nextTick(function () {
        that.swiperfeedbackMain = new Swiper('#feedbackMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperfeedbackMain.activeIndex
            }
          }
        })
      })
    },
    switchfeedback (index) {
      this.active = index
      this.swiperfeedbackMain.slideToLoop(index)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.feedbackMain()
    this.$emit('setExternalBar', 'Rebate Offer', 'back', this.showExternalBar)
  }
}
</script>
<style>
.feedback.on{
  top:0.88rem;
}
.feedback{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top:0;
  bottom: 0;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.feedback .feedbackNav{
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 99;
}
.feedback .feedbackNav li{
  width: 50%;
  text-align: center;
  line-height: 0.88rem;
  float: left;
  font-size: 0.3rem;
}
.feedback .feedbackNav li.on{
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
  box-sizing: border-box;
}
.feedbackMain{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.feedbackMain .swiper-container{
  height: 100%;
}
.feedbackMain .swiper-slide{
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.feedbackMain .swiper-slide .box{
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.feedbackMain .swiper-slide .box ul{
  width: 80%;
  float: left;
  overflow: hidden;
}
.feedbackMain .swiper-slide .box ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  color: #6b6b6b;
  font-size: 0.32rem;
}
.feedbackMain .swiper-slide .box ul li:last-child{
  border-bottom: none
}
.feedbackMain .swiper-slide .box ul li b{
  padding: 0.05rem 0.2rem;
  background: #ff9250;
  color: #fff;
  border-radius: 1rem;
  font-weight: normal;
  font-size: 0.2rem;
  float: right;
  margin-right: 0.2rem;
  margin-top: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.feedbackMain .swiper-slide .box ul li .info{
  width: 49%;
  height: 0.6rem;
  margin-top: 0.2rem;
  float: left;
  border-right: 0.02rem solid #ddd;
  position: relative;
}
.feedbackMain .swiper-slide .box ul li .info:last-child{
  border-right: none
}
.feedbackMain .swiper-slide .box ul li .info em{
  width: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  display: block;
  font-size: 0.25rem;
  text-align: center;
  color: #6b6b6b;
}
.feedbackMain .swiper-slide .box ul li .info em.blue{
  color: #0088ff;
}
.feedbackMain .swiper-slide .box ul li .info p{
  width: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.2rem;
  text-align: center;
  color: #6b6b6b;
}
.feedbackMain .swiper-slide .box button.on{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_receive_ico@2x.png);
  background-size: 100% 100%;
}
.feedbackMain .swiper-slide .box button{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_noreceive_ico@2x.png);
  background-size: 100% 100%;
}
.feedbackMain .swiper-slide button.getAll{
  width: 100%;
  height: 0.98rem;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
  font-size: 0.35rem;
  line-height: 0.98rem;
  text-align: center;
  color: #f8583d;
}
.feedbackMain .swiper-slide button.getAll span{
  font-size: 0.22rem;
  color: #333;
}
.feedbackMain .swiper-slide button.getAll span em{
  font-size: 0.22rem;
  color: #0088ff;
}
</style>
