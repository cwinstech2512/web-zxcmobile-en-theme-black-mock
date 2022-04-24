<template>
<div class='Home'>
  <banner :swiperSlides='swiperSlides'></banner>
  <notice :marqueeList='marqueeList' @display='noticeboxShow'></notice>
  <noticeBox :marqueeList='marqueeList' @hidden="hiddenShow" @toggleBox='toggleNoticeBox' v-if="boxShow"></noticeBox>
  <game></game>
</div>
</template>

<script>
import banner from '@/components/Visitor/V-Home/V-home-banner.vue'
import notice from '@/components/Center/Home/home-notice.vue'
import noticeBox from '@/components/Center/Home/home-notice-box.vue'
import game from '@/components/Center/Home/home-game.vue'

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  name: 'Home',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    banner,
    notice,
    noticeBox,
    game
  },
  data () {
  //  这里存放数据
    return {
      boxShow: false,
      noticeIndex: '',
      marqueeList: [],
      swiperSlides: [],
      swiperBanner: null,
      swiperNotice: null,
      swiperNoticebox: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // banner初始动画
    sbanner () {
      var that = this
      var time = 6000
      that.$nextTick(function () {
        that.swiperBanner = new Swiper('#Banner', {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: time,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          loop: false,
          effect: 'fade',
          simulateTouch: true
        })
      })
    },
    // 获取公告栏内容
    getNewsList () {
      var that = this
      let url = '/api/BannerNotice/Get'
      that.$https.fetchPost(url, { os: 'h5' })
        .then((res) => {
          that.marqueeList = res.data.Result.Notice
          that.swiperSlides = res.data.Result.Banner
          that.$nextTick(() => {
            that.Notice()
            that.sbanner()
            that.$bus.$emit('loadingHide')
          })
        }).catch(err => {
          console.log(err)
        }
        )
    },
    /**
     * @description 获取公告信息
     */
    getBannerList () {
      var _this = this
      let url = '/api/banner/get'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.marqueeList = res.data.Result.Notice
          _this.swiperSlides = res.data.Result.Banner
          _this.$nextTick(() => {
            _this.Notice()
            _this.sbanner()
          })
          _this.$bus.$emit('loadingHide')
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    // 公告栏滚动
    Notice () {
      var $notice = $('#Notice')
      var $noticeWidth = $notice.width()
      var that = this
      that.$nextTick(function () {
        that.swiperNotice = new Swiper($notice, {
          direction: 'vertical',
          simulateTouch: false,
          loop: true,
          on: {
            slideChangeTransitionStart () {
              var i = this.activeIndex
              var $text = $('#Notice .swiper-slide')
              var $this = $text.eq(i).find('span')
              $this.css('left', '0px')
              $('#Notice .swiper-slide span').each(function () {
                $(this).stop()
              })
            },
            slideChangeTransitionEnd () {
              var palyspeed = 5000
              var i = this.activeIndex
              var $text = $('#Notice .swiper-slide')
              var $this = $text.eq(i).find('span')
              var thisWidth = $this.width()

              if (thisWidth >= $noticeWidth) {
                setTimeout(function () {
                  noticeLeft()
                }, palyspeed)
              } else {
                setTimeout(NextNotice, palyspeed)
              }
              function noticeLeft () {
                var obj = $this.css('left')
                var left = parseInt(obj)
                var speed = ((thisWidth + left) / $noticeWidth) * 20000
                $this.animate({
                  left: -thisWidth
                }, speed, 'linear', function () {
                  that.swiperNotice.slideNext()
                })
              }
              function NextNotice () {
                that.swiperNotice.slideNext()
              }
            }
          }
        })
      })
    },
    // 显示公告弹窗
    noticeboxShow (index) {
      this.boxShow = true
      this.noticeIndex = index
      this.$nextTick(function () {
        this.Noticebox()
      })
    },
    // 关闭公告弹窗
    hiddenShow () {
      this.boxShow = false
    },
    // 空白区隐藏公告弹窗
    toggleNoticeBox () {
      this.boxShow = !this.boxShow
    },
    // 公告弹窗切换
    Noticebox () {
      var $index = this.noticeIndex
      var that = this
      that.$nextTick(function () {
        that.swiperNoticebox = new Swiper('#Nbox', {
          observer: true,
          observeParents: true,
          simulateTouch: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
        that.swiperNoticebox.slideToLoop($index, 0, false)
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$bus.$emit('loadingShow')
    this.$emit('getStatus', '众鑫娱乐', 'hide', false, false, false)
    this.getBannerList()
  }
}
</script>
<style scoped>
.Home{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0.98rem;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
