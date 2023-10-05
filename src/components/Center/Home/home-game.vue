<template>
  <div class='game'>
    <ul class="game-nav">
      <li :class="[games.code,{on: index == active}]"
          v-for="(games, index) in gameNav"
          :key="index"
          @click="gameJump(index)">
        <i></i>
        <span>{{games.name}}</span>
      </li>
    </ul>
    <div class="swiper-container"
         id="game-box">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(lists, index) in gameNav"
             :key="index"
             :class="['game-box-list', lists.code]">
             <div >
                <span v-for="(li, index) in lists.list"
                      :key="index"
                      :class="li.GameCategory? li.GameCategory : li.Plat"
                      @click="gameShow(li)">
                </span>
             </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  name: 'game',
  props: {
    Index: {
      type: Number
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      gameNav: [
        // {
        //   code: 'Sports',
        //   name: '体育',
        //   list: []
        // },
        {
          code: 'Slots',
          name: 'Slots',
          list: []
        },
        // {
        //   code: 'Lotto',
        //   name: '彩票',
        //   list: []
        // },
        {
          code: 'Fish',
          name: 'Fishing',
          list: []
        },
        {
          code: 'Live',
          name: 'Live',
          list: []
        }
      ],
      swiperGamebox: null,
      cacheTime: 30
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    gameShow (gameInfo) {
      this.$emit('gameBoxShow', gameInfo)
    },
    gameJump (index) {
      this.active = index
      this.swiperGamebox.slideToLoop(index)
    },
    gamebox () {
      var that = this
      that.$nextTick(function () {
        that.swiperGamebox = new Swiper('#game-box', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.swiperGamebox.activeIndex
            }
          }
        })
      })
    },
    getGame () {
      var _this = this

      let GP = sessionStorage.getItem('GamePlat')
      if (GP) {
        GP = JSON.parse(GP)
        let time = new Date()
        if (
          new Date(GP.time) >
          time.valueOf() - _this.cacheTime * 60 * 1000
        ) {
          _this.gameNav.forEach(g => {
            g.list = []
            GP.result.forEach(element => {
              // 目前先排除小金體育
              if (element.Plat !== 'NSP') {
                if (g.code === element.GameType) {
                  g.list.push(element)
                }
              }
            })
          })
          return
        }
      }

      let url = '/api/GamePlat/HomePlat'
      let params = {
        Token: _this.getinfo().token
      }
      // let gameType = []
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            sessionStorage.setItem('GamePlat', JSON.stringify({result: res.data.Result, time: new Date()})) // 保留在本地
            _this.gameNav.forEach(g => {
              g.list = []
              res.data.Result.forEach(element => {
                // 目前先排除小金體育
                if (element.Plat !== 'NSP') {
                  if (g.code === element.GameType) {
                    g.list.push(element)
                  }
                }
              })
              // console.log(g.list.length)
              // console.log(g.list)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getGame()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.gamebox()
    this.$nextTick(() => {
      // 如果进入了老虎机平台，返回老虎机
      if (this.Index) {
        this.swiperGamebox.activeIndex = this.Index
        this.active = this.Index
      }
    })
  }
}
</script>
<style scoped>
.game {
  width: 6.9rem;
  overflow: hidden;
  position: absolute;
  top: 4.24rem;
  bottom: 0;
}
.game .game-nav {
  width: 100%;
  height: 1.2rem;
  background: #4A4A4A;
  border-radius: 0.1rem;
}
.game .game-nav li {
  float: left;
  width: 20%;
  height: 100%;
  text-align: center;
}
.game .game-nav li span {
  font-size: 0.2rem;
  color: #FFFFFF;
}
.game .game-nav li.on span {
  font-size: 0.2rem;
  color: #2192dc;
}
.game .game-nav li i {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0.15rem auto 0 auto;
  text-align: center;
}
.game .game-nav li.Sports i {
  background: url(../../../assets/images/home/home_game_sports_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Live i {
  background: url(../../../assets/images/home/home_game_casino_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Lotto i {
  background: url(../../../assets/images/home/home_game_lottery_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Slots i {
  background: url(../../../assets/images/home/home_game_slots_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Fish i {
  background: url(../../../assets/images/home/home_game_fishgame_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Sports.on i {
  background: url(../../../assets/images/home/home_game_sports_ico_check@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Live.on i {
  background: url(../../../assets/images/home/home_game_casino_ico_check@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Lotto.on i {
  background: url(../../../assets/images/home/home_game_lottery_ico_check@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Slots.on i {
  background: url(../../../assets/images/home/home_game_slots_ico_check@2x.png);
  background-size: 100% 100%;
}
.game .game-nav li.Fish.on i {
  background: url(../../../assets/images/home/home_game_fishgame_ico_check@2x.png);
  background-size: 100% 100%;
}
#game-box {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 1.2rem;
  bottom: 0;
}
#game-box .swiper-slide {
  width: 100%;
  padding-top: 0.2rem;
  box-sizing: border-box;
  overflow: auto;
  display: block;
}
#game-box .swiper-slide.on {
  display: block;
}
#game-box .swiper-slide > div {
  display: flex;
  flex-wrap: wrap;
}
#game-box .swiper-slide span {
  display: block;
  width: 44vw;
  height: 2.1rem;
  border-radius: 0.14rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
#game-box .swiper-slide span:nth-child(odd){
  background-color: #ccc;
  margin-right: 0.1rem;
}
#game-box .swiper-slide span:nth-child(even){
  background-color: #000;
  margin-left: 0.1rem;
}
#game-box .swiper-slide.Fish span.JILI {
  background: url(../../../assets/images/home/home_game_fish_jili.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.PG {
  background: url(../../../assets/images/home/home_game_slots_pg.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.JILI {
  background: url(../../../assets/images/home/home_game_slots_jili.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.CQ9 {
  background: url(../../../assets/images/home/home_game_fish_cq9.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.CQ9 {
  background-image: url(../../../assets/images/home/home_game_slots_cq9.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.AE {
  background: url(../../../assets/images/home/home_game_slots_ae.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.AE {
  background: url(../../../assets/images/home/home_game_slots_ae.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.KA {
  background: url(../../../assets/images/home/home_game_fish_ka.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.KA {
  background: url(../../../assets/images/home/home_game_slots_ka.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.JDB {
  background: url(../../../assets/images/home/home_game_fish_jdb.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.JDB {
  background: url(../../../assets/images/home/home_game_slots_jdb.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.RICH88 {
  background: url(../../../assets/images/home/home_game_slots_rich88.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.RICH88 {
  background: url(../../../assets/images/home/home_game_slots_rich88.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.FC {
  background: url(../../../assets/images/home/home_game_fish_fc.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.FC {
  background: url(../../../assets/images/home/home_game_slots_fc.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.REDTIGER {
  background: url(../../../assets/images/home/home_game_slots_redtiger.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.NETENT {
  background: url(../../../assets/images/home/home_game_slots_netent.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Fish span.BNG {
  background: url(../../../assets/images/home/home_game_slots_bng.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Slots span.BNG {
  background: url(../../../assets/images/home/home_game_slots_bng.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide span.OG {
  background: url(../../../assets/images/home/home_game_og@2x.jpg);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Live span.AE {
  background: url(../../../assets/images/home/home_game_live_ae.png);
  background-size: 100% 100%;
}
#game-box .swiper-slide.Live span.EVO {
  background: url(../../../assets/images/home/home_game_live_evo.png);
  background-size: 100% 100%;
}
#game-box .Fish span.AG {
  /* AG捕鱼 */
  background: url(../../../assets/images/home/home_game_byw@2x.jpg);
  background-size: 100% 100%;
}
#game-box .Fish span.PT {
  /* PT捕鱼 */
  background: url(../../../assets/images/home/home_game_dyj@2x.jpg);
  background-size: 100% 100%;
}
#game-box .Fish span.AG2 {
  /* AG2捕鱼 */
  background: url(../../../assets/images/home/home_game_byw2.jpg);
  background-size: 100% 100%;
}
</style>
