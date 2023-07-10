<template>
<div class='promotion'>
  <div class="promotionNav">
    <div class="swiper-container" id="promotionNav">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          :class="{on: index == active}"
          v-for="(pro, index) in proNav"
          :key="index"
          @click="navToggle(index)"
        >{{pro.TypeName}}</div>
      </div>
    </div>
  </div>
  <div class="promotionMain">
    <div class="swiper-container" id="promotionMain">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(pro, index) in proNav"
          :key="index"
        >
          <div class="pro-box"
            v-for="(proboxs, index) in proBox"
            :key="index"
            :class="proboxs.TypeId.toString()"
            v-if="pro.Id.toString() === proboxs.TypeId.toString() || pro.Id === 101 && proboxs.TypeId !== 4 || pro.Id === 102 && proboxs.Hot === 1 && proboxs.TypeId !== 4"
          >
            <div class="imgCicle" >
              <div class="img" @click="ProboxShow(proboxs.Id)">
                <img :src="proboxs.Img" alt="" @error="imgError">
              </div>
            </div>
            <div class="tit">
              <h2>{{proboxs.Title}}</h2>
              <time>Post Date：{{moment(proboxs.CreateTime).format('YYYY/MM/DD HH:mm:ss')}}</time>
              <span
                v-show="!!proboxs.UrlMobile"
                @click="btnEvent (proboxs.UrlMobile)"
              >Details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'promotion',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0, // 当前导航选项卡
      proNav: [], // swiper导航栏
      proBox: [], // 所有优惠数据
      proBoxBefore: [], // 往期优惠数据
      proBoxCurrent: [], // 当前优惠数据
      promotionNav: null,
      promotionMain: null,
      cacheTime: 30
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 菜单初始动画
    PromotionNav () {
      var that = this
      that.$nextTick(function () {
        that.promotionNav = new Swiper('#promotionNav', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          slidesPerView: 4.5,
          spaceBetween: 3
        })
      })
    },
    // 内容初始动画
    PromotionMain () {
      var that = this
      that.$nextTick(function () {
        that.promotionMain = new Swiper('#promotionMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.promotionMain.activeIndex
              if (that.active > 2) {
                that.promotionNav.slideTo(that.active - 2, 500, false)
              } else if (that.active <= 2) {
                that.promotionNav.slideTo(0, 500, false)
              }
            }
          }
        })
      })
    },
    // 查看详情跳转
    ProboxShow (code) {
      this.$router.push({
        path: '/center/external',
        query: {
          routename: 'promotionInfo',
          pcode: code
        }
      })
    },
    // 进入活动按钮
    btnEvent (url) {
      var sub = url.substring(0, 4)
      if (sub !== 'http') {
        var routename = this.getQueryStringByUrl(url, 'routename')
        this.$router.push({
          path: '/center/external',
          query: {
            routename: routename
          }
        })
      } else {
        window.open(url, '_blank')
      }
    },
    // 切换菜单
    navToggle (index) {
      this.active = index
      this.promotionNav.slideToLoop(index)
      this.promotionMain.slideToLoop(index)
    },
    /**
     * @description 加载数据
     */
    loadData () {
      var _this = this

      let PL = sessionStorage.getItem('PromoList')
      if (PL) {
        PL = JSON.parse(PL)
        let time = new Date()
        if (
          new Date(PL.time) >
          time.valueOf() - _this.cacheTime * 60 * 1000
        ) {
          _this.$bus.$emit('loadingHide')
          _this.proBox = PL.Data
          _this.proNav = PL.Category
          _this.$nextTick(function () {
            _this.PromotionNav()
            _this.PromotionMain()
          })
          return
        }
      }

      let url = '/api/promo/list'
      _this.$bus.$emit('loadingShow')
      _this.$https.fetchPost(url, _this.secret({ Token: this.getinfo().token }))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.proNav = res.data.Result.Category
            _this.proBox = res.data.Result.Data
            _this.proBoxCurrent = res.data.Result.Data
            _this.proBoxBefore = res.data.Result.BeforeData
            Array.prototype.push.apply(_this.proBox, _this.proBoxBefore)
            sessionStorage.setItem(
              'PromoList',
              JSON.stringify({ Data: _this.proBox, Category: _this.proNav, time: new Date() })
            )
            _this.$nextTick(function () {
              _this.PromotionNav()
              _this.PromotionMain()
            })
          } else {
            _this.AlertError(res.data.Message)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    imgError (ele) {
      ele.target.hidden = true
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Promotion', 'menu', 'message')
  }
}
</script>
<style scoped>
.promotion{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0.98rem;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.promotionNav{
  width: 100%;
  height: 0.68rem;
  position: absolute;
  top: 0.88rem;
  /* background: #4A4A4A; */
  z-index: 99;
}
#promotionNav{
  width: 100%;
  overflow: hidden;
}
#promotionNav .swiper-slide{
  width: 100%;
  height: 0.58rem;
  line-height: 0.58rem;
  text-align: center;
  font-size: 0.27rem;
  color: #a0a0a3;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #e5e5e5;
  margin: 0 3px;
  text-transform: uppercase;
}
#promotionNav .swiper-slide.on{
  color: #fff;
  height: 0.58rem;
  /* border-bottom: 0.04rem solid #0088ff; */
  background-color: #959595;
  box-sizing: border-box;
}
.promotionMain{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 1.76rem;
  bottom: 0;
}
.promotionMain .swiper-container{
  height: 100%;
}
.promotionMain .swiper-slide{
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.promotionMain .swiper-slide .pro-box{
  width: 100%;
  border-radius: 0.2rem;
  background: #434343;
  overflow: hidden;
  margin-bottom: 0.2rem;
  padding-bottom: 0.2rem;
}
.promotionMain .swiper-slide .pro-box .img{
  /* width: 100%; */
  height: 2.8rem;
  background: url(../../../assets/images/home/promotion_placeholder@2x.jpg);
  background-size: 100% 100%;
  border-radius: 0.2rem;
}
.promotionMain .swiper-slide .pro-box .img img{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.promotionMain .swiper-slide .pro-box .imgCicle {
  padding: 1% 2%;
}
.promotionMain .swiper-slide .pro-box .tit{
  width: 100%;
  overflow: hidden;
}
.promotionMain .swiper-slide .pro-box .tit h2{
  margin: 0.1rem 0.2rem;
  font-size: 0.3rem;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: inherit;
}
.promotionMain .swiper-slide .pro-box .tit time{
  margin: 0.2rem;
  font-size: 0.2rem;
  color: #fff;
}
.promotionMain .swiper-slide .pro-box .tit span{
  float: right;
  margin:  0 0.2rem;
  font-size: 0.2rem;
  color: #fff;
  background: #0088ff;
  border-radius: 0.06rem;
  padding: 0.1rem 0.3rem;
}
.promotionMain .swiper-container {
  /* height: 0.58rem; */
  padding-top: 10px;
}
</style>
