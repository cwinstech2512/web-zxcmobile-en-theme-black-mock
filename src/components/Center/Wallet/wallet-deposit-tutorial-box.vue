<template>
<div class='tutorial'>
  <div class="tutMain">
    <i @click="closed"></i>
    <div class="swiper-container" id="tutMain">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(info, index) in imgText"
          :key="index"
        >
          <img :src="'static/images/tutorial/'+info.img" alt="">
          <div class="text"><p>{{info.text}}</p></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'tutorial',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      imgText: [
        {
          img: 'unionpay_tutorial_01@2x.png',
          text: '第一步：如何下载‘云闪付’APP'
        },
        {
          img: 'unionpay_tutorial_02@2x.png',
          text: '第二步：如何注册‘云闪付’APP'
        },
        {
          img: 'unionpay_tutorial_03@2x.png',
          text: '第三步：如何在‘云闪付’APP中绑定银行卡'
        },
        {
          img: 'unionpay_tutorial_04@2x.png',
          text: '第四步：如何使用‘云闪付’APP扫一扫支付'
        }
      ],
      swiperTutorial: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closed () {
      this.$bus.$emit('tutorialHide')
    },
    tutorial () {
      var that = this
      that.$nextTick(function () {
        that.swiperTutorial = new Swiper('#tutMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperTutorial.activeIndex
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
    this.tutorial()
  }
}
</script>
<style scoped>
.tutorial{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: block;
}
.tutorial .tutMain{
  width: 6.3rem;
  height: 9rem;
  border-radius: 0.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -5rem;
  margin-left: -3.15rem;
  animation: bounceInUp .8s linear;
}
.tutorial .tutMain i{
  position: absolute;
  right: 0;
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background: url(../../../../static/images/tutorial/tutorial_closed_ico@2x.png);
  background-size: 100% 100%;
  z-index: 99;
}
.tutorial .tutMain img{
  width: 3.76rem;
  height: 7.8rem;
  display: block;
  margin: 0 auto;
  background-size: 100% 100%;
}
.tutorial .tutMain .text{
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5rem;
  margin-top: 0.5rem;
}
.tutorial .tutMain .text p{
  color: #fff;
  font-size: 0.2rem;
  text-align: center;
  padding: 0.1rem;
}
.swiper-pagination{
  bottom: 0.6rem;
}
</style>
