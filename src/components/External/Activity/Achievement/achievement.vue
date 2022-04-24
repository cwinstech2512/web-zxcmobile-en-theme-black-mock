<template>
<div class='achievement'>
  <div class="return" v-show="returnCard" @click="returnBtn"></div>
  <!-- 第一层卡片 -->
  <div class="cardtype" v-show="cardFirst">
    <div
      v-for="(cardtypes, index) in cardtype"
      :key="index"
      :class="[cardtypes.code,'card',{on: index == click}]"
      @click="chooseType(cardtypes.type,index)"
    >
      <div class="number">{{cardtypes.number}}</div>
      <em></em>
    </div>
  </div>
  <!-- 第二层卡片 -->
  <div class="cardbox" v-show="cardSecond">
    <div class="card_container">
      <div class="SmallCard">
        <div class="scard"
          v-for="(smallCards, index) in cardbox"
          :key="index"
          :class="smallCards.status"
          @click="seeDetails(smallCards.img,smallCards.info)"
        >
          <em></em>
          <img :src="'static/img/scard/'+smallCards.img" alt="">
        </div>
      </div>
    </div>
  </div>
  <!-- 第三层卡片 -->
  <transition name="bounce">
  <div class="cardshow" v-show="cardThird" @click="HideThird">
    <div class="ViceCard"
      :style="{backgroundImage: 'url(static/img/scard/'+ viceCard + ')',backgroundSize:'100% 100%'}"
    >
      <div class="text">{{details}}</div>
      <div class="star"></div>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'achievement',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      click: -1,
      type: null,
      viceCard: '',
      details: '',
      returnCard: false,
      cardFirst: true,
      cardSecond: false,
      cardThird: false,
      cardtype: [
        // 巅峰之路
        {
          type: 'A',
          code: 'cardA',
          number: '0'
        },
        // 千奇百怪
        {
          type: 'B',
          code: 'cardB',
          number: '3'
        },
        // 财富之门
        {
          type: 'C',
          code: 'cardC',
          number: '3'
        },
        // 无与伦比
        {
          type: 'D',
          code: 'cardD',
          number: '0'
        },
        // 功勋卓著
        {
          type: 'E',
          code: 'cardE',
          number: '3'
        }
      ],
      smallCard: [
        {
          type: 'B', // 类型
          status: 'on', // 是否拥有
          img: 'Bc_cjdr.png', // 图片名
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元' // 文案
        },
        {
          type: 'B',
          status: '',
          img: 'Bc_cjmvp.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'B',
          status: 'on',
          img: 'Bc_xctj.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'C',
          status: '',
          img: 'Cc_lltj.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'C',
          status: 'on',
          img: 'Cc_lsrs.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'C',
          status: 'on',
          img: 'Cc_wbxz.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'E',
          status: '',
          img: 'Ec_ryth.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'E',
          status: '',
          img: 'Ec_wxr.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        },
        {
          type: 'E',
          status: '',
          img: 'Ec_xxxy.png',
          info: '2018年1月1日起在众鑫娱乐存款≥201.8元，且在任意平台达到有效投注≥100元'
        }
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 过滤卡片类型
    cardbox () {
      if (this.type === 'A') {
        return this.smallCard.filter(function (smallCards) {
          return smallCards.type === 'A'
        })
      } else if (this.type === 'B') {
        return this.smallCard.filter(function (smallCards) {
          return smallCards.type === 'B'
        })
      } else if (this.type === 'C') {
        return this.smallCard.filter(function (smallCards) {
          return smallCards.type === 'C'
        })
      } else if (this.type === 'D') {
        return this.smallCard.filter(function (smallCards) {
          return smallCards.type === 'D'
        })
      } else {
        return this.smallCard.filter(function (smallCards) {
          return smallCards.type === 'E'
        })
      }
    }
  },
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
    // 选择类型卡片
    chooseType (type, index) {
      var that = this
      that.click = index
      that.$nextTick(function () {
        setTimeout(function () {
          that.type = type
          that.cardFirst = false
          that.cardSecond = true
          that.returnCard = true
        }, 800)
      })
    },
    // 返回按钮
    returnBtn () {
      this.click = -1
      this.returnCard = false
      this.cardFirst = true
      this.cardSecond = false
    },
    // 查看卡片信息
    seeDetails (img, info) {
      this.viceCard = img
      this.details = info
      this.cardSecond = false
      this.cardThird = true
    },
    // 关闭卡片信息
    HideThird () {
      this.cardThird = false
      this.cardSecond = true
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '成就系统', 'back', this.showExternalBar)
  }
}
</script>
<style scoped>
.achievement{
  width: 100%;
  padding: 1rem 0.8rem;
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background: url(../../../../assets/images/activity/Achievement/bg.jpg) top no-repeat;
  background-size: 100% 100%;
}
/*第一层卡片*/
.achievement .cardtype{
    width: 100%;
}
.achievement .cardtype .number{
  font-size: 0.2rem;
  color: #dedede;
  position: absolute;
  top: 5%;
  width: 100%;
  text-align: center;
}
.achievement .cardtype .card{
  width: 2rem;
  height: 3.2rem;
  margin: 0.15rem 0.45rem;
  border-radius: 0.1rem;
  position: relative;
  float: left;
  cursor: pointer;
  overflow: hidden;
}
.achievement .cardtype .card.on{
  animation: flip .8s ease
}
.achievement .cardtype .cardA{
  background: url(../../../../assets/images/activity/Achievement/card1.png);
  background-size: 100% 100%;
  animation: hvr_bob 2s -1s  ease-in-out infinite forwards  alternate
}
.achievement .cardtype .cardB{
  background: url(../../../../assets/images/activity/Achievement/card2.png);
  background-size: 100% 100%;
  animation: hvr_bob 3.5s -1s  ease-in-out infinite forwards  alternate
}
.achievement .cardtype .cardC{
  background: url(../../../../assets/images/activity/Achievement/card3.png);
  background-size: 100% 100%;
  animation: hvr_bob 2s -1s  ease-in-out infinite forwards  alternate
}
.achievement .cardtype .cardD{
  background: url(../../../../assets/images/activity/Achievement/card4.png);
  background-size: 100% 100%;
  animation: hvr_bob 3.5s -1s  ease-in-out infinite forwards  alternate
}
.achievement .cardtype .cardE{
  background: url(../../../../assets/images/activity/Achievement/card5.png);
  background-size: 100% 100%;
  animation: hvr_bob 2s -1s  ease-in-out infinite forwards  alternate
}
.achievement .cardtype em{
  position: absolute;
  width: 2rem;
  height: 3rem;
  background: url(../../../../assets/images/activity/Achievement/star.png);
  z-index: 2;
  background-size: 100% 100%;
  animation:flash 3s -1s  ease-in-out infinite forwards  alternate;
}

/*第二层卡片*/
.achievement .cardbox{
  width: 100%;
}
.achievement .cardbox .card_container {
  width: 100%;
}
.achievement .cardbox .card_container .SmallCard{
  width: 100%;
}
.achievement .cardbox .card_container .SmallCard .scard{
  width: 2rem;
  height: 3.2rem;
  margin: 0.15rem 0.45rem;
  border-radius: 0.1rem;
  position: relative;
  float: left;
  cursor: pointer;
  overflow: hidden;
}
.achievement .cardbox .card_container .SmallCard .scard img{
  width: 100%;
  height: 100%;
  float: left;
  border-radius: 0.1rem;
  cursor:pointer;
  background-size: 100% 100%;
}
.achievement .cardbox .card_container .SmallCard .scard em{
  position: absolute;
  width: 2rem;
  height: 3rem;
  background: url(../../../../assets/images/activity/Achievement/star.png);
  background-size: 100% 100%;
  z-index: 2;
  display: none;
  cursor: pointer;
  animation:flash 2.5s 1s  ease-in-out infinite forwards  alternate;
}
.achievement .cardbox .card_container .SmallCard .scard.on em{
  display: block;
}

/*第三层卡片*/
.achievement .cardshow{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.8);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10;
}
.achievement .cardshow .ViceCard{
  width: 4rem;
  height: 6.4rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -2rem;
  margin-top: -3.2rem;
  border-radius: 0.1rem;
  background-size: 100% 100%;
  overflow: hidden;
}
.achievement .cardshow .star{
  position: fixed;
  width: 4.2rem;
  height: 6.6rem;
  background: url(../../../../assets/images/activity/Achievement/star.png);
  background-size: 100% 100%;
  left: 50%;
  top: 50%;
  margin-left: -2.1rem;
  margin-top: -3.3rem;
  z-index: 2;
  display: none;
  animation:flash 3s -1s  ease-in-out infinite forwards  alternate;
}
.achievement .cardshow .ViceCard .text{
  position: absolute;
  font-size: 0.2rem;
  color: #fff;
  padding: 0 0.3rem;
  bottom: 19%;
  text-align: center;
}

/*返回按钮*/
.achievement .return{
  width: 0.72rem;
  height: 0.72rem;
  background: url(../../../../assets/images/activity/Achievement/prev.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: 10%;
  right: 5%;
  cursor: pointer;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  40% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}
@keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  40% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}

/*上下浮动*/
@-moz-keyframes hvr_bob {
0% {
transform:translateY(-15px)
}
50% {
transform:translateY(0)
}
100% {
transform:translateY(-15px)
}
}
@-webkit-keyframes hvr_bob {
0% {
transform:translateY(-15px)
}
50% {
transform:translateY(0)
}
100% {
transform:translateY(-15px)
}
}
@-o-keyframes hvr_bob {
0% {
transform:translateY(-15px)
}
50% {
transform:translateY(0)
}
100% {
transform:translateY(-15px)
}
}
@keyframes hvr_bob {
0% {
transform:translateY(-15px)
}
50% {
transform:translateY(0)
}
100% {
transform:translateY(-15px)
}
}
/*渐变*/
@-webkit-keyframes flash {
  from,
  50%,
  to {
    opacity: 1;
  }

  15%,
  75% {
    opacity: 0.2;
  }
}

@keyframes flash {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0.2;
  }
}
</style>
