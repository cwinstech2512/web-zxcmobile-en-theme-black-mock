<template>
  <div class='gameInfo'>
    <div class="gameInfoNav">
      <div class="swiper-container"
           id="gameInfoNav">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               :class="{on: index == active}"
               v-for="(Info, index) in InfoNav"
               :key="index"
               @click="navToggle(index)">{{Info.text}}</div>
        </div>
      </div>
    </div>
    <div class="gameInfoMain">
      <div class="swiper-container"
           id="gameInfoMain">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(Info, index) in InfoNav"
               :key="index"
               @scroll="handleScroll($event,index)">
            <div class="boxbar"
                 v-for="(game, g) in categoryGames[index]"
                 :key="g">
              <div class="box">
                <img :src="'static/images/slots/'+plat+'/' + game.ImageName"
                     v-if="plat ==='PT' || plat ==='MG'">
                <img :src="'static/images/slots/'+plat+'/' + game.ImageName"
                     v-else>
                <a :href="game.GameUrl"
                   target="_blank"
                   v-if="isDireOpenUrl()"
                   :class="game.DemoUrl? '':'center'">开始游戏</a>
                <a @click="LoginPT(game.GameCode)"
                   v-else-if="plat === 'PT'"
                   :class="game.DemoUrl? '':'center'">开始游戏</a>
                <a @click="LoginDT(game)"
                   v-else-if="plat === 'DT'"
                   :class="game.DemoUrl? '':'center'">开始游戏</a>
                <a :href="'Game.html?cate=' + type + '&act=' + plat + '&gameCode=' + game.GameCode + '&gameType=' + game.Category + '&token=' + getinfo().token"
                   target="_blank"
                   v-else
                   :class="game.DemoUrl? '':'center'">开始游戏</a>
                <!-- MG -->
                <a class="try"
                   :href="game.DemoUrl"
                   target="_blank"
                   v-if="game.DemoUrl">试玩</a>
                <h2>{{game.GameName}}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slotsLogin-box"
         v-if="isFirst">
      <!-- 第一次修改平台密码 -->
      <div class="slotsLogin">
        <h1>设置{{plat}}登录密码</h1>
        <i title="关闭"
           @click="isFirst=false"
           class="close">×</i>
        <div class="lab">
          <input type="password"
                 v-model="platPwd.pwd"
                 placeholder="平台密码" />
        </div>
        <div class="lab">
          <input type="password"
                 v-model="platPwd.surePwd"
                 placeholder="确认平台密码" />
        </div>
        <div class="lab">
          <button id="btnSetPlatPass"
                  @click="savePlatPwd()">保存登录</button>
        </div>
        <div>
          <h2>特别提醒：</h2>
          <p>1. 可用此密码在{{plat}}平台登录游戏；</p>
          <p>2. 与众鑫密码相互独立，可设置不同密码。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'gameInfo',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 1,
      plat: '',
      type: '',
      status: '',
      isFirst: false,
      InfoNav: [], // '所有游戏', '热门游戏', '吃角老虎机', '牌桌&纸牌游戏', '街机游戏', '视频扑克', '刮刮乐'
      games: [], // 全部游戏
      categoryAllGames: [], // 每个对应一个选项卡，全部游戏
      categoryGames: [], // 每个对应一个选项卡，显示的游戏
      // categoryPageIndex: [], // 页数
      pageSize: 24,
      gameInfoNav: null,
      gameInfoMain: null,
      platPwd: {
        pwd: '',
        surePwd: ''
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 是否直接打開url
    isDireOpenUrl () {
      switch (this.type) {
        case 'Slots':
          switch (this.plat) {
            case 'KA':
            case 'CQ9':
            case 'JDB':
            case 'BNG':
              return true
            default:
              return false
          }
        case 'Fish':
          switch (this.plat) {
            case 'KA':
            case 'CQ9':
            case 'JDB':
              return true
            default:
              return false
          }
      }
      return false
    },
    // 切换菜单
    navToggle (index) {
      this.active = index
      this.gameInfoNav.slideToLoop(index)
      this.gameInfoMain.slideToLoop(index)
    },
    // 菜单初始动画
    gameNavSwiper () {
      var that = this
      that.$nextTick(function () {
        that.gameInfoNav = new Swiper('#gameInfoNav', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          slidesPerView: 4
        })
      })
    },
    // 内容初始动画
    gameMainSwiper () {
      var that = this
      that.$nextTick(function () {
        that.gameInfoMain = new Swiper('#gameInfoMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.gameInfoMain.activeIndex
              if (that.active > 2) {
                that.gameInfoNav.slideTo(that.active - 2, 500, false)
              } else if (that.active <= 2) {
                that.gameInfoNav.slideTo(0, 500, false)
              }
            }
          }
        })
      })
    },
    getSlotGame () {
      var type = this.$route.query.type
      if (type === 'Slots') {
        type = 'Slots'
      } else if (type === 'Fish') {
        type = 'Fishing'
      }
      let url = `/api/${type}/` + this.$route.query.plat
      let params = {
        Category: '',
        GameName: '',
        PageIndex: 1,
        PageSize: 0,
        Token: this.getinfo().token
      }
      let _this = this
      _this.$bus.$emit('loadingShow')
      this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.InfoNav = res.data.Result.Category
            _this.games = res.data.Result.Data
            _this.status = res.data.Result.Status
            _this.init()
          }
          _this.$bus.$emit('loadingHide')
          _this.gameNavSwiper()
          _this.gameMainSwiper()
          _this.$nextTick(function () {
            if (_this.$route.name === 'gameinfo') {
              _this.gameInfoNav.slideToLoop(1)
              _this.gameInfoMain.slideToLoop(1)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    init () {
      this.plat = this.$route.query.plat
      this.type = this.$route.query.type
      let _this = this
      this.categoryAllGames = []
      // this.categoryPageIndex = []
      this.InfoNav.forEach((nav, navIndex) => {
        // console.log('aaa' + i)
        if (nav.value === '') {
          _this.categoryAllGames.push(this.games)
          _this.categoryGames.push([]) // categoryGames 初始化
          // _this.categoryPageIndex.push(0) // 第1页
          _this.loadRecord(navIndex)
        } else if (nav.value === 'hot') {
          let arr = []
          _this.games.forEach((item) => {
            if (item.Hot === '1') {
              arr.push(item)
            }
          })
          _this.categoryAllGames.push(arr)
          _this.categoryGames.push([])
          // _this.categoryPageIndex.push(0)
          _this.loadRecord(navIndex)
        } else {
          let arr = []
          _this.games.forEach((item) => {
            if (item.Category === nav.value) {
              arr.push(item)
            }
          })
          _this.categoryAllGames.push(arr)
          _this.categoryGames.push([])
          // _this.categoryPageIndex.push(0)
          _this.loadRecord(navIndex)
        }
      })
    },
    loadRecord (navIndex) {
      let arr = this.categoryAllGames[navIndex].slice(this.categoryGames[navIndex].length, this.categoryGames[navIndex].length + this.pageSize)
      this.$set(this.categoryGames, navIndex, this.categoryGames[navIndex].concat(arr))
      setTimeout(() => {
        this.$bus.$emit('loadingHide')
      }, 1000)
    },
    LoginPT (gameCode) {
      let user = this.getinfo()
      window.open(axios.defaults.baseURL + '/LoginPT?t=' + user.token + '&gc=' + gameCode)
    },
    LoginDT (game) {
      switch (this.status) {
        case 'Logged': // 登录成功
          window.open(game.GameUrl, 'DTGame')
          break
        case 'FirstDT': // 第一次
          this.isFirst = true
          break
        case 'LoggFailed':
          this.$swal({
            text: '请刷新重试或者联系客服',
            type: 'warning',
            confirmButtonText: '确定'
          })
          break
      }
    },
    // 保存平台密码
    savePlatPwd () {
      if (this.platPwd.pwd.length < 1) {
        this.$swal({
          text: '请输入平台密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (this.platPwd.surePwd.length < 1) {
        this.$swal({
          text: '请再次输入平台密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (this.platPwd.pwd !== this.platPwd.surePwd) {
        this.$swal({
          text: '两次输入的密码不一致',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let _this = this
      let url = '/api/account/CreatePlatPwd'
      var params = {
        Plat: this.plat,
        Pwd: this.platPwd.pwd,
        Token: this.getinfo().token
      }
      _this.$bus.$emit('loadingShow')
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.isFirst = false
            _this.getSlotGame()
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    handleScroll (event, navIndex) {
      let scrollTop = event.currentTarget.scrollTop // 滚动距离
      let clientHeight = event.currentTarget.offsetHeight // 可见高度
      let scrollHeight = event.currentTarget.scrollHeight // 可见高度
      // let totalPage = Math.ceil(this.categoryAllGames[navIndex].length /this.pageSize)
      if (scrollTop + clientHeight > scrollHeight - 50) {
        if (this.categoryGames[navIndex] < this.categoryAllGames[navIndex]) {
          // 只要还有数据就要加载
          this.$bus.$emit('loadingShow')
          this.loadRecord(navIndex)
        }
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getSlotGame()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    var that = this
    that.$emit('getStatus', that.$route.query.plat + ' ' + that.$route.query.type, 'slotsBack', 'hide', true)
  }
}
</script>
<style scoped>
.gameInfo {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.gameInfoNav {
  width: 100%;
  height: 0.88rem;
  position: absolute;
  top: 0;
  background: #fff;
  z-index: 99;
}
.gameInfoNav .swiper-container {
  width: 100%;
  overflow: hidden;
}
.gameInfoNav .swiper-slide {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.25rem;
  color: #2b2b2b;
}
.gameInfoNav .swiper-slide.on {
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
  box-sizing: border-box;
}
.gameInfoMain {
  width: 100%;
  padding: 0.2rem 0.3rem 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.gameInfoMain .swiper-container {
  height: 100%;
}
.gameInfoMain .swiper-slide {
  min-height: 100%;
  padding-top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.gameInfoMain .swiper-slide .boxbar {
  float: left;
  width: 2.1rem;
  margin-right: 0.25rem;
}
.gameInfoMain .swiper-slide .boxbar:nth-child(3n + 3) {
  margin-right: 0;
}
.gameInfoMain .swiper-slide .boxbar .box {
  float: left;
  width: 2.1rem;
  margin-right: 0.3rem;
}
.gameInfoMain .swiper-slide .boxbar .box img {
  width: 2.1rem;
  height: 1.58rem;
  border-radius: 0.06rem;
  background: url(../../../assets/images/home/promotion_placeholder@2x.jpg);
  background-size: 100% 100%;
}
.gameInfoMain .swiper-slide .boxbar .box h2 {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.25rem;
  text-align: center;
  color: #2b2b2b;
  clear: both;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: inherit;
}
.gameInfoMain .swiper-slide .boxbar .box a {
  float: left;
  width: 1.2rem;
  height: 0.4rem;
  display: block;
  background: #0088ff;
  color: #fff;
  font-size: 0.2rem;
  border-radius: 0.06rem;
  text-align: center;
  line-height: 0.4rem;
}
.gameInfoMain .swiper-slide .boxbar .box a.center {
  float: none;
  margin: 0 auto;
}
.gameInfoMain .swiper-slide .boxbar .box a.try {
  float: right;
  width: 0.8rem;
  background: #fca42c;
}
.gameInfo .slotsLogin-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
}
.gameInfo .slotsLogin-box .close {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 0.6rem;
  color: #faa02a;
}
.gameInfo .slotsLogin-box .slotsLogin {
  width: 6.4rem;
  height: 5.6rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2.8rem;
  margin-left: -3.2rem;
}
.gameInfo .slotsLogin-box .slotsLogin h1 {
  color: #0088ff;
  font-size: 0.3rem;
  line-height: 1rem;
  text-align: center;
}
.gameInfo .slotsLogin-box .slotsLogin .lab {
  width: 100%;
  height: 0.88rem;
  margin-bottom: 0.1rem;
}
.gameInfo .slotsLogin-box .slotsLogin .lab input {
  width: 100%;
  height: 100%;
  padding: 0.1rem;
  box-sizing: border-box;
  border-radius: 0.03rem;
  border: 0.02rem solid #ddd;
}
.gameInfo .slotsLogin-box .slotsLogin .lab button {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 0.4rem;
}
.gameInfo .slotsLogin-box .slotsLogin h2 {
  font-size: 0.3rem;
  margin-bottom: 0.05rem;
  color: #faa02a;
}
.gameInfo .slotsLogin-box .slotsLogin p {
  font-size: 0.25rem;
  margin: 0.1rem 0;
  color: #333;
}
</style>
