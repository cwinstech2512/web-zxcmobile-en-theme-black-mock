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
          :class="pro.Id.toString()"
          v-for="(pro, index) in proNav"
          :key="index"
        >
          <div class="pro-box"
            v-show="pro.Id.toString() === proboxs.TypeId.toString() || pro.Id === 101 && proboxs.TypeId !== 4 || pro.Id === 102 && proboxs.Hot === 1"
            v-for="(proboxs, index) in proBox"
            :key="index"
            :class="proboxs.TypeId.toString()"
            @click="ProboxShow(index)"
          >
            <div class="img">
              <img :src="proboxs.Img" alt="">
            </div>
            <div class="tit">
               <h2>{{proboxs.Title}}</h2>
              <time>Post Date：{{moment(proboxs.CreateTime).format('YYYY/MM/DD HH:mm:ss')}}</time><span>Details</span>
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
      promotionMain: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
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
          slidesPerView: 5
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
    ProboxShow (index) {
      this.$router.push({
        name: 'v_promotionInfo',
        params: {
          img: this.proBox[index].Img,
          title: this.proBox[index].Title,
          content: this.proBox[index].Content,
          time: this.proBox[index].CreateTime
        }
      })
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
      let _this = this
      let url = '/api/promo/list'
      _this.$https.fetchPost(url, _this.secret({ Token: this.getinfo().token }))
        .then((res) => {
          if (res.data.Success === true) {
            // console.info('promo_data', res.data.Result)
            _this.proNav = res.data.Result.Category
            _this.proBox = res.data.Result.Data
            _this.proBoxCurrent = res.data.Result.Data
            _this.proBoxBefore = res.data.Result.BeforeData
            Array.prototype.push.apply(_this.proBox, _this.proBoxBefore)
            _this.$bus.$emit('loadingHide')
            _this.$nextTick(function () {
              _this.PromotionNav()
              _this.PromotionMain()
            })
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.$emit('getStatus', 'Promotion', 'hide', false, false, false)
    this.loadData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.promotion{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0.98rem;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.promotionNav{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  top: 0.88rem;
  background: #fff;
  z-index: 99;
}
#promotionNav{
  width: 100%;
  overflow: hidden;
}
#promotionNav .swiper-slide{
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.25rem;
  color: #2b2b2b;
}
#promotionNav .swiper-slide.on{
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
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
  height: 3.64rem;
  border-radius: 0.06rem;
  background: #fff;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.promotionMain .swiper-slide .pro-box .img{
  width: 100%;
  height: 2.5rem;
  background: url(../../../assets/images/home/promotion_placeholder@2x.jpg);
  background-size: 100% 100%;
}
.promotionMain .swiper-slide .pro-box .img img{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.promotionMain .swiper-slide .pro-box .tit{
  width: 100%;
  overflow: hidden;
}
.promotionMain .swiper-slide .pro-box .tit h2{
  margin: 0.1rem 0.2rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: inherit;
}
.promotionMain .swiper-slide .pro-box .tit time{
  margin: 0.2rem;
  font-size: 0.2rem;
  color: #bbb;
}
.promotionMain .swiper-slide .pro-box .tit span{
  float: right;
  margin:  0 0.2rem;
  font-size: 0.2rem;
  color: #6b6b6b;
}
</style>
