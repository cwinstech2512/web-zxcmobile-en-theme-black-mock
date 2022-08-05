<template>
<div class='VIPoffer' :class="showExternalBar? 'on':''">
  <ul class="VIPofferNav">
    <li
      v-for="(nav, index) in VIPofferNav"
      :key="index"
      :class="[{on: index == active}]"
      @click="switchVIPoffer(index)"
    >
    {{nav}}
    </li>
  </ul>
  <div class="VIPofferMain">
    <div class="swiper-container" id="VIPofferMain">
      <div class="swiper-wrapper">
        <!-- 免费彩金 -->
        <div class="swiper-slide">
          <free/>
        </div>
        <!-- 存送优惠 -->
        <div class="swiper-slide">
          <save/>
        </div>
        <!-- 返水专享 -->
        <div class="swiper-slide">
          <exclusive/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import free from '@/components/External/VIPoffer/VIPoffer-free'
import save from '@/components/External/VIPoffer/VIPoffer-save'
import exclusive from '@/components/External/VIPoffer/VIPoffer-exclusive'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'VIPoffer',
  //  import引入的组件需要注入到对象中才能使用
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {free, save, exclusive},
  data () {
  //  这里存放数据
    return {
      active: 0,
      VIPofferNav: ['免费彩金', '存送优惠', '返水专享'],
      swiperVIPofferMain: null,
      os: 'H5',
      token: '',
      path: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 初始切换动画
    VIPofferMain () {
      var that = this
      that.$nextTick(function () {
        that.swiperVIPofferMain = new Swiper('#VIPofferMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperVIPofferMain.activeIndex
            }
          }
        })
      })
    },
    switchVIPoffer (index) {
      this.active = index
      this.swiperVIPofferMain.slideToLoop(index)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.VIPofferMain()
    this.$emit('setExternalBar', 'VIP优惠', 'back', this.showExternalBar)
  }
}
</script>
<style>
.VIPoffer.on{
  top:0.88rem;
}
.VIPoffer{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top:0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.VIPoffer .VIPofferNav{
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 99;
}
.VIPoffer .VIPofferNav li{
  width: 33%;
  text-align: center;
  line-height: 0.88rem;
  float: left;
  font-size: 0.3rem;
}
.VIPoffer .VIPofferNav li.on{
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
  box-sizing: border-box;
}
.VIPofferMain{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.VIPofferMain .swiper-container{
  height: 100%;
}
.VIPofferMain .swiper-slide{
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.VIPofferMain .swiper-slide .box{
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.VIPofferMain .swiper-slide .box ul{
  width: 80%;
  float: left;
  overflow: hidden;
}
.VIPofferMain .swiper-slide .box ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  color: #6b6b6b;
  font-size: 0.32rem;
}
.VIPofferMain .swiper-slide .box ul li:last-child{
  border-bottom: none
}
.VIPofferMain .swiper-slide .box ul li b{
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
.VIPofferMain .swiper-slide .box ul li .info{
  width: 49%;
  height: 0.6rem;
  margin-top: 0.2rem;
  float: left;
  border-right: 0.02rem solid #ddd;
  position: relative;
}
.VIPofferMain .swiper-slide .box ul li .info:last-child{
  border-right: none
}
.VIPofferMain .swiper-slide .box ul li .info em{
  width: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  display: block;
  font-size: 0.25rem;
  text-align: center;
  color: #6b6b6b;
}
.VIPofferMain .swiper-slide .box ul li .info em.blue{
  color: #0088ff;
}
.VIPofferMain .swiper-slide .box ul li .info p{
  width: auto;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.2rem;
  text-align: center;
  color: #6b6b6b;
}
.VIPofferMain .swiper-slide .box button.on{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_receive_ico@2x.png);
  background-size: 100% 100%;
}
.VIPofferMain .swiper-slide .box button{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_noreceive_ico@2x.png);
  background-size: 100% 100%;
}
</style>
