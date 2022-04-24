<template>
<div class='Home'>
  <!-- 活动弹窗 -->
  <popup/>
  <!-- 轮播图 -->
  <banner :swiperSlides='swiperSlides'/>
  <!-- 公告栏 -->
  <notice :marqueeList='marqueeList' @display='noticeboxShow'/>
  <noticeBox :marqueeList='marqueeList' @hidden="hiddenShow" @toggleBox='toggleNoticeBox' v-if="boxShow"/>
  <!-- 游戏平台 -->
  <game @gameBoxShow='gameBoxShow' :Index='gameIndex'/>
  <gameBox :gameInfo='gameInfo' @hiddenGame="hiddenGame" @toggleGameBox='toggleGameBox' v-if="gameBox"/>
  <!-- 站内信通知弹窗 -->
  <messageBox @hiddenMsg="hiddenMsg" @toggleMsgBox='toggleMsgBox' @showMsgBox='showMsgBox' v-show="msgBox"/>
</div>
</template>

<script>
import popup from '@/components/External/Popup/popup.vue'
import banner from '@/components/Center/Home/home-banner.vue'
import notice from '@/components/Center/Home/home-notice.vue'
import noticeBox from '@/components/Center/Home/home-notice-box.vue'
import game from '@/components/Center/Home/home-game.vue'
import gameBox from '@/components/Center/Home/home-game-box.vue'
import messageBox from '@/components/Center/User/Message/message-box.vue'

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  name: 'Home',
  props: {
    gameIndex: {
      type: Number
    }
  },
  components: {
    popup,
    banner,
    notice,
    noticeBox,
    game,
    gameBox,
    messageBox
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
      swiperNoticebox: null,
      gameBox: false,
      msgMain: [],
      gameInfo: null,
      cacheTime: 30,
      msgBox: false
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 未读信息
    unreadMsg () {
      return this.msgMain.filter(function (msgM) {
        return msgM.IsRead !== true
      })
    }
  },
  //  监控data中的数据变化
  watch: {
    unreadMsg () {
      if (this.unreadMsg.length > 0) {
        this.$bus.$emit('newMsgShow')
      } else {
        this.$bus.$emit('newMsgHide')
      }
    }
  },
  //  方法集合
  methods: {
    showMsgBox () {
      this.msgBox = true
    },
    hiddenMsg () {
      this.msgBox = false
    },
    toggleMsgBox () {
      this.msgBox = !this.msgBox
    },
    // 打开平台入口
    gameBoxShow (gameInfo) {
      this.gameBox = true
      this.gameInfo = gameInfo
    },
    // 关闭平台入口
    hiddenGame () {
      this.gameBox = false
    },
    // 空白区关闭平台入口
    toggleGameBox () {
      this.gameBox = !this.gameBox
    },
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
    // 公告栏滚动
    Notice () {
      var $notice = $('#Notice')
      var $noticeWidth = $notice.width()
      var that = this
      that.swiperNotice = new Swiper($notice, {
        direction: 'vertical',
        observer: true,
        observeParents: true,
        simulateTouch: false,
        loop: true,
        on: {
          slideChangeTransitionStart () {
            var i = this.activeIndex
            var $text = $('#Notice .swiper-slide')
            var $this = $text.eq(i).find('span')
            $this.css('left', '0')
          },
          slideChangeTransitionEnd () {
            var palyspeed = 5000
            var i = this.activeIndex
            var $text = $('#Notice .swiper-slide')
            var $this = $text.eq(i).find('span')
            var thisWidth = $this.width()

            if (thisWidth >= $noticeWidth) {
              setTimeout(noticeLeft, palyspeed)
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
    },
    // 获取公告栏内容
    getNewsList () {
      var that = this
      that.$bus.$emit('loadingShow')
      let url = '/api/BannerNotice/Get'
      that.$https.fetchPost(url, { os: 'h5' })
        .then((res) => {
          that.marqueeList = res.data.Result.Notice
          that.swiperSlides = res.data.Result.Banner
          that.$nextTick(() => {
            that.Notice()
            that.sbanner()
          })
          that.$bus.$emit('loadingHide')
        }).catch(err => {
          that.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    /**
     * @description 获取公告信息
     */
    getBannerList () {
      var _this = this

      let BON = sessionStorage.getItem('BannerOrNotice')
      if (BON) {
        BON = JSON.parse(BON)
        let time = new Date()
        if (
          new Date(BON.time) >
          time.valueOf() - _this.cacheTime * 60 * 1000
        ) {
          _this.$bus.$emit('loadingHide')
          _this.marqueeList = BON.Notice
          _this.swiperSlides = BON.Banner
          _this.$nextTick(() => {
            _this.Notice()
            _this.sbanner()
          })
          return
        }
      }

      let url = '/api/banner/get'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          sessionStorage.setItem(
            'BannerOrNotice',
            JSON.stringify({ Banner: res.data.Result.Banner, Notice: res.data.Result.Notice, time: new Date() })
          )
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
    // 空白区关闭公告弹窗
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
    },
    // 站内信消息
    loadData () {
      var _this = this

      let MS = sessionStorage.getItem('MessageStatus')
      if (MS) {
        MS = JSON.parse(MS)
        let time = new Date()
        if (
          new Date(MS.time) >
          time.valueOf() - _this.cacheTime * 60 * 1000
        ) {
          _this.msgMain = MS.List
          return
        }
      }
      let url = '/api/Message/GetList'
      let params = {
        'PageIndex': 1,
        'PageSize': 0,
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.msgMain = res.data.Result.List
            sessionStorage.setItem(
              'MessageStatus',
              JSON.stringify({ List: _this.msgMain, time: new Date() })
            )
          }
        }).catch(err => {
          console.log(err)
        }
        )
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    var that = this
    that.$bus.$emit('loadingShow')
    that.getBannerList()
    that.loadData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '众鑫娱乐', 'menu', 'message')
  }
}
</script>
<style scoped>
.Home{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  /* overflow-x: hidden;
  overflow-y: auto; */
  position: absolute;
  top: 0.88rem;
  bottom: 0.98rem;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
