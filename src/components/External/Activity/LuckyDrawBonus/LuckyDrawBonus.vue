<template>
  <div class="LuckyDrawBonus">
    <div class="bg">
    <!-- <img class="bg" src="../../../../assets/images/activity/LuckyDrawBonus/img/bg.jpg"> -->
    <section class="section1">
      <div class="b_content">
        <img src="../../../../assets/images/activity/LuckyDrawBonus/img/title.png">
        <div class="section_content">
            <!-- <div class="c_left"><h3>活动时间:2022年3月7日起</h3></div> -->
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="b_content">
        <img @click="showDrawRecord" class="left_img" src="../../../../assets/images/activity/LuckyDrawBonus/img/draw_record.png">
        <!-- <img @click="showGiftGift" class="right_img" src="../../../../assets/images/activity/LuckyDrawBonus/img/lucky_draw_chance.png"> -->
        <div class="right_img">
          <img class="icon_gift" src="../../../../assets/images/activity/LuckyDrawBonus/img/icon_gift.png">
          <p v-if="getinfo().token !== ''" class="gift_chance">You can get ({{ giftChanceCount }}) lucky draw chance</p>
        </div>
        <hr style="clear:both;margin-bottom:15px;margin-top:32px;border-top: 0px solid #eee">
      </div>
      <div class="b_content">
        <img src="../../../../assets/images/activity/LuckyDrawBonus/img/circle_bg1.png">
        <div class="content_iniline">
          <!--抽奖图标-->
          <div class="light">
            <div class="lucky" id="LuckyBox">
                <ul class="top">
                    <li class="unit unit-0" :class="rollClass(0)"><i class="icon_gogo"></i></li>
                    <li class="unit unit-1 odd" :class="rollClass(1)"><i class="icon_01"></i></li>
                    <li class="unit unit-2" :class="rollClass(2)"><i class="icon_20"></i></li>
                    <li class="unit unit-3 odd" :class="rollClass(3)"><i class="icon_03"></i></li>
                    <li class="unit unit-4" :class="rollClass(4)"><i class="icon_08"></i></li>
                </ul>
                <ul class="right">
                    <li class="unit unit-5 odd" :class="rollClass(5)"><i class="icon_15"></i></li>
                    <li class="unit unit-6" :class="rollClass(6)"><i class="icon_50"></i></li>
                    <li class="unit unit-7 odd" :class="rollClass(7)"><i class="icon_28"></i></li>
                </ul>
                <ul class="foot">
                    <li class="unit unit-12" :class="rollClass(12)"><i class="icon_08"></i></li>
                    <li class="unit unit-11 odd" :class="rollClass(11)"><i class="icon_03"></i></li>
                    <li class="unit unit-10" :class="rollClass(10)"><i class="icon_20"></i></li>
                    <li class="unit unit-9 odd" :class="rollClass(9)"><i class="icon_01"></i></li>
                    <li class="unit unit-8" :class="rollClass(8)"><i class="icon_gogo"></i></li>
                </ul>
                <ul class="left">
                    <li class="unit unit-15 odd" :class="rollClass(15)"><i class="icon_28"></i></li>
                    <li class="unit unit-14" :class="rollClass(14)"><i class="icon_50"></i></li>
                    <li class="unit unit-13 odd" :class="rollClass(13)"><i class="icon_15"></i></li>
                </ul>
            </div>
          </div>
          <!-- <div>
            <img src="../../../assets/images/activity/LuckyDrawBonus/img/circle_yello.png"/>
          </div> -->
        </div>
        <div @click="lottery(100)" class="start_block">
          <img class="start" src="../../../../assets/images/activity/LuckyDrawBonus/img/start.png">
        </div>
      </div>
    </section>
    <section class="section3">
      <div class="b_content">
        <img class="table_title" src="../../../../assets/images/activity/LuckyDrawBonus/img/title_wl.png">
        <div class="c_area_7">
          <vue-seamless-scroll :data="winner_list">
            <div class="ta_row">
              <template v-for="(item, key) in winner_list">
                <div :key="key + 'a'" class="flex_col left"><p>{{item[0].ShowName}}</p></div>
                <div :key="key + 'b'" class="flex_col right"><p>{{item[0].PrizeName}}</p></div>
                <div :key="key + 'c'" class="flex_col left"><p>{{item[1].ShowName}}</p></div>
                <div :key="key + 'd'" class="flex_col right"><p>{{item[1].PrizeName}}</p></div>
              </template>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </section>
    <section class="section3">
      <div class="b_content">
        <img class="table_title" src="../../../../assets/images/activity/LuckyDrawBonus/img/title_tc.png">
        <div class="c_area_7">
          <ul>
            <li><i></i>This Event only for 18SLOT members, and each member has free lucky draw per chance for every day.</li>
            <li>
              <i></i>Non-deposit members need to have once deposit record before then can withdraw.
            </li>
            <li>
              <i></i>Deposited members only need 1x rollover requirement prior to withdraw.
            </li>
            <li>
              <i></i>The bonus is automatically distributed to member account without application.
            </li>
            <li>
              <i></i>18SLOT reserves the right to suspend or terminate any duplicate accounts or any account that does not adhere to the stipulated terms and conditions.
            </li>
            <li>
              <i></i>18SLOT reserve the right to reclaim the bonus and any winnings and/or close an account in a situation of abuse or fraud.
            </li>
          </ul>
        </div>
      </div>
    </section>
    <PopupRecord :records="records" :showActPopup="showActPopup"  @showRecordRecord="showDrawRecord"></PopupRecord>
    <PopupGift :prize="prize" :showGiftPopup="showGiftPopup" @showGiftGift="showGiftGift"></PopupGift>
    </div>
  </div>
</template>

<script>
import PopupRecord from '@/components/External/Activity/LuckyDrawBonus/PopupRecord.vue'
import PopupGift from '@/components/External/Activity/LuckyDrawBonus/PopupGift.vue'
import vueSeamless from 'vue-seamless-scroll'
export default {
  components: {PopupRecord, PopupGift, vueSeamless},
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  data () {
    return {
      index: 0, // 当前转动到哪个位置，起点位置
      count: 0, // 总共有多少个位置
      timer: 0, // setTimeout的ID，用clearTimeout清除
      speed: 20, // 初始转动速度
      times: 0, // 转动次数
      cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, // 中奖位置
      prizeId: -1, // 中奖ＩＤ
      dataFlag: 0,
      obj: null,
      active: Array(16).fill(false),
      click: false,
      records: [],
      winner_list: [],
      showActPopup: false,
      showGiftPopup: false,
      isEnterInfo: false,
      isShowGiftChance: false,
      giftChanceCount: 0,
      freePrizeing: false
    }
  },
  Filters: {
  },
  computed: {
  },
  watch: {},
  methods: {
    showDrawRecord () {
      if (this.getinfo().token === '') {
        this.$swal({
          text: 'Please login first.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (!this.showGiftPopup) {
        this.getRecord()
      }
      this.showActPopup = !this.showActPopup
    },
    absoultPosition (amount) {
      let random = []
      switch (amount) {
        case 1:
          this.prizeId = 1
          random = [1, 9]
          break
        case 3:
          this.prizeId = 2
          random = [3, 11]
          break
        case 8:
          this.prizeId = 3
          random = [4, 12]
          break
        case 15:
          this.prizeId = 4
          random = [5, 13]
          break
        case 20:
          this.prizeId = 5
          random = [2, 10]
          break
        case 28:
          this.prizeId = 6
          random = [7, 15]
          break
        case 50:
          this.prizeId = 7
          random = [6, 14]
          break
        case 0:
          this.prizeId = 8
          random = [0, 8]
          break
      }
      this.prize = random[Math.floor(Math.random() * random.length)]
    },
    showGiftGift () {
      this.showGiftPopup = !this.showGiftPopup
    },
    rollClass (index) {
      return this.active[index] ? 'active' : ''
    },
    changeFlag (val) {
      this.dataFlag = val
    },
    lottery (speed, prize) {
      console.log(speed)
      if (!this.freePrizeing) {
        this.speed = speed
        // this.prize = prize
        this.getFreeSpins()
      }
    },
    init: function (id) {
      if (this.active.length > 0) {
        this.count = this.active.length
        this.active[this.index] = true
      };
    },
    roll_dom () {
      this.$set(this.active, this.index, false)
      this.index += 1
      if (this.index > this.count - 1) {
        this.index = 0
      }
      this.active[this.index] = true
      this.$set(this.active, this.index, true)
    },
    stop: function (index) {
      this.prize = index
    },
    getBonus () {
      let _this = this
      let initGeetestUrl = '/api/freedraw/getbonus'
      let params = {
        'Token': _this.getinfo().token,
        'PrizeId': _this.prizeId
      }
      this.$https
        .fetchPost(initGeetestUrl, this.Secret(params))
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    enterInfo () {
      let _this = this
      if (_this.getinfo().token === '') {
        if (this.freePrizeing) {
          this.$swal({
            text: 'Please login first.',
            type: 'warning',
            confirmButtonText: 'OK'
          })
        }
        return
      }
      let initGeetestUrl = '/api/freedraw/info'
      let params = {
        'Token': _this.getinfo().token
      }
      this.$https
        .fetchPost(initGeetestUrl, this.Secret(params))
        .then(res => {
          _this.isEnterInfo = res.data.Result
          _this.giftChanceCount = res.data.Result ? 1 : 0
        })
        .catch(err => {
          console.log(err)
        })
    },
    getWinnerList () {
      let _this = this
      // if (_this.getinfo().token === '') {
      //   return
      // }
      let initGeetestUrl = '/api/freedraw/winnerlist'
      let params = {
        // 'Token': _this.getinfo().token
      }
      this.$https
        .fetchPost(initGeetestUrl, this.Secret(params))
        .then(res => {
          console.log(res)
          var winnerList = Array.isArray(res.data.Result) ? res.data.Result : []
          if (winnerList.length === 0) {
            winnerList.push({
              UserName: '',
              PrizeName: ''
            })
            winnerList.push({
              UserName: '',
              PrizeName: ''
            })
          } else if (winnerList.length % 2 === 1) {
            winnerList.push({
              UserName: '',
              PrizeName: ''
            })
          }
          const chunkSize = 2
          for (let i = 0; i < winnerList.length; i += chunkSize) {
            const chunk = winnerList.slice(i, i + chunkSize)
            _this.winner_list.push(chunk)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getFreeSpins () {
      let _this = this
      if (_this.getinfo().token === '') {
        _this.$swal({
          text: 'Please login first.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (!this.isEnterInfo) {
        this.$swal({
          text: 'You have no chance today!',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      let initGeetestUrl = '/api/freedraw/freespins'
      // _this.$emit('loadingShow')
      let params = {
        'Token': _this.getinfo().token
      }
      this.freePrizeing = true
      this.$https
        .fetchPost(initGeetestUrl, this.Secret(params))
        .then(res => {
          // _this.$emit('loadingHide')
          var resMessage = parseInt(res.data.Result[0].PrizeAmount)
          if (Number.isInteger(resMessage)) {
            _this.absoultPosition(resMessage)
            _this.roll()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRecord () {
      let _this = this
      if (_this.getinfo().token === '') {
        _this.$swal({
          text: 'Please login first.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      let initGeetestUrl = '/api/freedraw/history'
      // _this.$emit('loadingShow')
      let params = {
        'Token': _this.getinfo().token
      }
      this.$https
        .fetchPost(initGeetestUrl, this.Secret(params))
        .then(res => {
          // _this.$emit('loadingHide')
          _this.records = Array.isArray(res.data.Result) ? res.data.Result : []
        })
        .catch(err => {
          console.log(err)
        })
    },
    finishFreeLottery () {
      if (this.freePrizeing) {
        if (this.isEnterInfo) {
          this.showGiftGift()
        } else {
          this.$swal({
            text: 'You have no chance today!',
            type: 'warning',
            confirmButtonText: 'OK'
          })
        }
      }
      this.enterInfo()
      this.getWinnerList()
      this.freePrizeing = false
    },
    roll () {
      this.times += 1
      this.roll_dom()
      var _this = this
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer)
        this.times = 0
        // var prize = this.prize;
        setTimeout(function () {
          _this.finishFreeLottery()
        }, 1000)

        this.click = false
      } else {
        if (this.times < this.cycle) {
          this.speed -= 10
        } else {
          if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
            this.speed += 110
          } else {
            this.speed += 20
          }
        }
        if (this.speed < 40) {
          this.speed = 40
        }
        // console.log(this.times + '^^^^^^' + this.speed + '^^^^^^^' + this.prize)
        this.timer = setTimeout(() => {
          _this.roll()
        }, this.speed)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.enterInfo()
    this.init('LuckyBox')
    this.getWinnerList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '免费抽奖', 'back', this.showExternalBar)
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
@import "../../../../assets/images/activity/LuckyDrawBonus/style/bootstrap.min.css";
@import "../../../../assets/images/activity/LuckyDrawBonus/style/bootstrap-theme.min.css";
@import "../../../../assets/images/activity/LuckyDrawBonus/style/default.css";

.LuckyDrawBonus {
  margin: 47px 0 15% 0;
  padding: 0;
}
/* .LuckyDrawBonus .bg {
  z-index: -1;
  min-width: 100%;
  max-width: 100%;
  object-fit: cover;
  position: absolute;
  background: url(../../../../assets/images/activity/LuckyDrawBonus/img/bg.jpg)
    no-repeat;
} */
.LuckyDrawBonus .bg {
  object-fit: cover;
  position: relative;
  background: url(../../../../assets/images/activity/LuckyDrawBonus/img/bg.jpeg)
    no-repeat;
  background-size: 100% 100%;
}
.LuckyDrawBonus section {
  position: relative;
  padding: 0% 5%;
}
.LuckyDrawBonus img {
  width: 100%;
  display: block;
}
.LuckyDrawBonus section > .b_content .section_content {
  position: absolute;
}
.LuckyDrawBonus section > .b_content {
  position: relative;
  top: 0;
  margin: 0 auto;
  /* padding: 0 10%; */
}
.LuckyDrawBonus .section1 .b_content{
  /* padding: 0 15%; */
}
.LuckyDrawBonus .section2 {
  width: 100%;
  margin: 2% auto;
}
.LuckyDrawBonus .section3 {
  width: 100%;
  margin: 8% auto;
}
section.section1 .b_content > .section_content > .c_left > h3 {
  color: #fbf8f6;
  letter-spacing: 6px;
}
section.section1 .b_content > .section_content {
  top: 59.6%;
  right: 26%;
}
section.section2 .left_img {
  float: left;
  width: 34%;
}
section.section2 .right_img > .icon_gift {
  width: 30px;
  height: 28px;
}
section.section2 .right_img > .gift_chance {
  font-size: x-small;
  font-weight: 900;
  flex: auto;
  margin: 5px 5px 0 5px;
  letter-spacing: -1px;
}
section.section2 .right_img {
  float: right;
  width: 60%;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  letter-spacing: -1px;
}
section.section2 div.start_block {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
section.section2 img.table_title {
  width: 29%;
}
section.section2 .b_content > .table_wrapper {
  margin-top: 3%;
}
section.section3 table tbody > tr > td.left > p  {
  text-align: left;
  font-size: 18px;
}
section.section3 table tbody > tr > td.right > p  {
  text-align: right;
  font-size: 18px;
}
section.section3 table td{
  background-color: transparent;
}
section.section3 > .b_content .c_area_7 > div {
  overflow-y: auto;
  max-height: 280px;
  height: 280px;
}
section.section3 > .b_content .c_area_7 .ta_row{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
section.section3 > .b_content .c_area_7 .flex_col{
  flex: 1 0 25%;
  padding: 0% 2%;
}
section.section3 > .b_content .c_area_7  div.left > p  {
  text-align: left;
  font-size: 0.3rem;
}
section.section3 > .b_content .c_area_7  div.right  > p  {
  text-align: right;
  font-size: 0.3rem;
}
section.section3 > .b_content .c_area_7 > ul{
    margin: 0;
    list-style-type: decimal !important;
    color: #666666;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 4.5%;
    line-height: 170%;
}
section.section3 > .b_content .c_area_7 > ul > li{
    width: 100%;
    text-align: left;
    font-size: 0.25rem;
    list-style: decimal !important;
}
section.section3 > .b_content > div.c_area_7{
    position: relative;
    /* top: 26.4%;
    height: 24.3%; */
    padding: 3% 2.2%;;
    border: 3px solid;
    border-color: #9A0801;
    border-radius: 10px;
}
.LuckyDrawBonus .section3 > .b_content > img {
    width: 52%;
    margin: 0% auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}
.LuckyDrawBonus .section3 .content2 {
    padding: 3% 4.1%;
}
.LuckyDrawBonus .section3 .b_content .flex_content,
.LuckyDrawBonus .section3 .content2 .flex_content {
    display: flex;
}
.LuckyDrawBonus .section3 .content2 .flex_content > .f_left,
.LuckyDrawBonus .section3 .content2 .flex_content > .f_right {
    flex: 1;
    margin: 3%;
    font-size: 16pt;
}
.LuckyDrawBonus .section3 .b_content .flex_content > .f_left,
.LuckyDrawBonus .section3 .b_content .flex_content > .f_right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 5px;
}
/* .LuckyDrawBonus .section3 .flex_content > .f_right {
  padding: 5% 2%;
} */
.LuckyDrawBonus .section3 .flex_content p {
    font-size: 1.7rem;
    color: #666666;
    line-height: 43px;
}
.LuckyDrawBonus .section3 .content2 .first p {
    font-size: 2.3rem;;
    color: #038bfb;
}
.pic_text > p{
    margin-top: 2%;
}

.LuckyDrawBonus1 ,.LuckyFt {
    width:100%;
    overflow:hidden;
    position:relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    padding:0 15px;
}
.LuckyDrawBonus .content_iniline {
    left: 0%;
    top: 0%;
    position: absolute;
    width: 100%;
    height: 100%;
    /* background: url(../images/lucky_bg.png); */
    background-size:100% 100%;
}
.LuckyDrawBonus .content_iniline .light {
    width:100%;
    height:100%;
    position:relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    padding: 4.876% 6.7%;
    /* background:url(../images/light01.png); */
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light.on {
    /* background: url(../images/light02.png); */
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky {
    width:100%;
    height:100%;
    position:relative;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.right{
    width: 20%;
    position: absolute;
    right: 0;
    height: 100%;
    padding: 18% 0 16.4% 0;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.left{
    width:20%;
    position:absolute;
    left:0;
    height: 100%;
    padding: 18% 0 16.4% 0;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.foot{
    width:100%;
    height:20%;
    position:absolute;
    bottom:0;
    margin-bottom: 0px !important;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.top{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.foot .unit,
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.top .unit{
    width: 20%;
    float: left;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.foot li {
    height: 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.top li {
    height: 20%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.right li,
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul.left li {
    height: 32.4%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li {
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    background-color: #fbf8f6;
    background-size:100% 100%;
    border:1px solid #b93811;
    border-radius:10px;
    text-align:center;
    width: 20;
    display: flex;
    justify-content: center;
    align-items: center;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i {
    width: 67%;
    height: 82%;
    display:block;
    margin:5px auto 5px auto;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i.icon_gogo {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_tryagn.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i.icon_01 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_1.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i.icon_03 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_3.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i.icon_08 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_8.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .section2 .content_iniline .light .lucky ul li i.icon_15 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_15.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li i.icon_20 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_20.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li i.icon_28 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_28.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li i.icon_50 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_50.png)
    no-repeat;
    background-size:100% 100%;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li span {
    color:#f03f08;
    font-size:8px;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li.active span {
    color:#fff;
}
.LuckyDrawBonus .content_iniline .light .lucky ul li.active {
    /* background-image:url(../images/icon_bg_03.png); */
    background-size:100% 100%;
    border:1px solid red;
    animation: active 0.2s linear infinite;
    -webkit-animation: active 0.2s linear infinite;
    -webkit-animation-delay:1s; /* Safari 和 Chrome */
    background-color: #f7fa04;
}
</style>
