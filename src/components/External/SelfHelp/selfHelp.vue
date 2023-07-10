<template>
<div class='selfHelp' :class="showExternalBar? 'on':''">
  <ul class="selfHelpNav">
    <li
      v-for="(nav, index) in selfHelpNav"
      :key="index"
      :class="[{on: index == active}]"
      @click="switchselfHelp(index)"
    >
    {{nav}}
    </li>
  </ul>
  <div class="selfHelpMain">
    <div class="swiper-container" id="selfHelpMain">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(code,index) in selfHelpCode"
          :key="index"
        >
            <selfdetail
              :selfHelpCode='selfHelpCode'
              :selfHelpGroups='selfHelpGroups'
              :selfHelpDetails='selfHelpDetails'
              :panelIndex='index'
            />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import selfdetail from '@/components/External/SelfHelp/selfHelp-detail'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'selfHelp',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {selfdetail},
  data () {
  //  这里存放数据
    return {
      active: 0,
      selfHelpNav: [],
      selfHelpCode: [],
      selfHelpGroups: [],
      selfHelpDetails: [],
      swiperSelfHelpMain: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 初始切换动画
    selMainswiper () {
      var that = this
      that.$nextTick(function () {
        that.swiperSelfHelpMain = new Swiper('#selfHelpMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperSelfHelpMain.activeIndex
            }
          }
        })
      })
    },
    switchselfHelp (index) {
      this.active = index
      this.swiperSelfHelpMain.slideToLoop(index)
    },
    loadinfo () {
      let _this = this
      let url = '/api/self/slotsdata'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.selfHelpCode = res.data.Result.Plats
            _this.selfHelpGroups = res.data.Result.Groups
            _this.selfHelpDetails = res.data.Result.Details
            _this.selfHelpNav = _this.selfHelpCode.map(x => x + '活动')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadinfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.selMainswiper()
    this.$emit('setExternalBar', '自助活动', 'back', this.showExternalBar)
  }
}
</script>
<style scoped>
.selfHelp.on{
  top:0.88rem;
}
.selfHelp{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top:0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.selfHelp .selfHelpNav{
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #121212;
  position: absolute;
  top: 0;
  z-index: 99;
}
.selfHelp .selfHelpNav li{
  width: 30%;
  text-align: center;
  line-height: 0.88rem;
  float: left;
  font-size: 0.3rem;
  color: #a0a0a3;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #535353;
  margin: 5px 5px;
  line-height: 0.7rem;
}
.selfHelp .selfHelpNav li.on{
  color: #fff;
  /* height: 0.87rem; */
  /* border-bottom: 0.04rem solid #0088ff; */
  box-sizing: border-box;
}
.selfHelpMain{
  width: 100%;
  padding: 0.2rem 0.3rem 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.selfHelpMain .swiper-container{
  height: 100%;
}
.selfHelpMain .swiper-slide{
  min-height: 100%;
  padding-top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.selfHelpMain .swiper-slide >>> .box{
  width: 100%;
  background: #c6c6c6;
  opacity: 0.75;
  border-radius: 0.16rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.selfHelpMain .swiper-slide >>> .box ul{
  width: 80%;
  float: left;
  overflow: hidden;
}
.selfHelpMain .swiper-slide >>> .box ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.08rem solid #fff;
  font-size: 0.32rem;
}
.selfHelpMain .swiper-slide >>> .box ul li:last-child{
  border-bottom: none
}
.selfHelpMain .swiper-slide >>> .box ul li h2{
  color: #000;
  font-size: 0.38rem;
  font-weight: normal;
}
.selfHelpMain .swiper-slide >>> .box ul li p{
  color: #6b6b6b;
  font-size: 0.2rem;
}
.selfHelpMain .swiper-slide >>> .box button.on{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_check_ico@2x.png);
  background-size: 100% 100%;
}
.selfHelpMain .swiper-slide >>> .box button{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_nocheck_ico@2x.png);
  background-size: 100% 100%;
}
.selfHelpMain .swiper-slide >>> .box-info{
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 0.06rem;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-menu{
  width: 100%;
  height: 0.88rem;
  overflow: hidden;
  border-bottom: 0.02rem solid #ddd;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-menu li{
  float: left;
  width: 25%;
  text-align: center;
  line-height: 0.88rem;
  color: #2b2b2b;
  font-size: 0.25rem;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-menu li.on{
  color: #fff;
  background: #0088ff
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-main{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  display: none;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-main.mainShow{
  display: block;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-main li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-main li span{
  font-size: 0.25rem;
  color: #686868;
  float: left;
}
.selfHelpMain .swiper-slide >>> .box-info .box-info-main li em{
  font-size: 0.25rem;
  color: #0088ff;
  float: right;
}
.selfHelpMain .swiper-slide >>> .box-info .btnbar{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  margin: 0.4rem 0;
  overflow: hidden;
}
.selfHelpMain .swiper-slide >>> .box-info button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  color: #fff;
  border-radius: 0.06rem;
  line-height: 0.98rem;
  text-align: center;
  margin: 0.2rem 0;
}
.selfHelpMain .swiper-slide >>> .box-info button.back{
  background: #00c389;
}
</style>
