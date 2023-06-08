<template>
  <div class="bandday">
    <img
      src="../../../../assets/images/activity/BrandDay/img/bd_bg.jpg"
      alt="bg"
      class="bg-img"
    />
    <div class="banner">
      <img
        src="../../../../assets/images/activity/BrandDay/img/main_banner.png"
        alt="banner"
        class="banner-img"
      />
    </div>
    <div class="main">
      <div class="body">
        <div class="content-tab">
          <table class="score_table left">
            <thead>
              <th></th>
              <th>Winner</th>
              <th>Valid Wager</th>
              <th>Rewards(₱)</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rankList" :key="index">
                <td>{{item.RankNo}}</td>
                <td>{{item.UserName}}</td>
                <td>{{numberFormat(item.ValidWagerAmount)}}</td>
                <td>{{numberFormat(item.RewardsAmount)}}</td>
              </tr>
              <tr v-if="rankList.length == 0"><td colspan="4">No Data</td></tr>
            </tbody>
          </table>
        </div>
        <div class="even_des_block">
          <div class="title">
            <img src="../../../../assets/images/activity/BrandDay/img/EVENT_DESCRIPTION.png"/>
          </div>
          <div class="destrib">
            <ul>
              <li>
                <i></i>This event is only valid from 00:00 to 23:59 (GMT+8) on the 18th of each month.
              </li>
              <li>
                <i></i>The eligible bets for this event are only valid from 00:00 to 23:59 (GMT+8) on the 18th of each month.
              </li>
              <li>
                <i></i>This event is exclusive to slot machine platform games.
              </li>
              <li>
                <i></i>This event rewards only members ranked 1 to 50.
              </li>
              <li>
                <i></i>The ranking table will be updated after 14:00 on the following day.
              </li>
              <li>
                <i></i>Rewards will be automatically distributed within 24 hours after the ranking table is updated.
              </li>
              <li>
                <i></i>To withdraw the reward, only 1x rolling wager in slot machine games is required.
              </li>
            </ul>
          </div>
        </div>
        <div class="team_condi_block">
          <div class="title">
            <img src="../../../../assets/images/activity/BrandDay/img/TERMS_AND_CONDITIONS.png"/>
          </div>
          <div class="destrib">
            <ul>
              <li>
                <i></i>This event is exclusive to members who have a successful withdrawal record.
              </li>
              <li>
                <i></i>This event cannot be combined with other promotions. Members who have claimed another promotion on the
    same day or have unfulfilled promotion turnover requirements from previous days are not eligible for this event.
              </li>
              <li>
                <i></i>Any abnormal wager, such as game manipulation or using software to place bets in the same match, will result
    in disqualification of the participant from winning any prizes.
              </li>
              <li>
                <i></i>Each member can only participate in this event using one account and cannot use multiple accounts simultaneously.
     If multiple accounts are found participating in this event simultaneously, all game accounts will be permanently frozen,
    and all funds will be confiscated.
   <br /><span class="notice">*Note: The same registered IP address, computer, name, phone number, and email will be considered as the same game account.</span>
              </li>
              <li>
                <i></i>By participating in this event, members automatically agree to the terms and conditions of this event.
              </li>
              <li>
                <i></i>In case of any ambiguity in the wording, 18SLOT Online reserves the right to make the final interpretation of this event.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'BrandDay',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {
  },
  data () {
    return {
      active: true,
      press: false,
      rankNo: '',
      rankBetAmount: 0,
      rankList: []
    }
  },
  computed: {
    showRankBetAmount () {
      return this.showAmount(this.rankBetAmount)
    }
    // login (status) {
    //   status = localStorage.status
    //   return status
    // }
  },
  methods: {
    showAmount (num) {
      var m = this.unitConvert(num)
      return m.num + m.unit
    },
    /**
     * @description 换算成中文单位
     */
    unitConvert (num) {
      var moneyUnits = ['元', '万', '亿', '万亿']
      var dividend = 10000
      var curentNum = num
      if (!curentNum || isNaN(curentNum)) {
        curentNum = 0
      }
      // 转换数字
      var curentUnit = moneyUnits[0]
      // 转换单位
      for (var i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (this.strNumSize(curentNum) < 5) {
          break
        }
        curentNum = curentNum / dividend
      }
      var m = {num: 0, unit: ''}
      m.num = curentNum.toFixed(2)
      m.unit = curentUnit
      return m
    },
    strNumSize (tempNum) {
      var stringNum = tempNum.toString()
      var index = stringNum.indexOf('.')
      var newNum = stringNum
      if (index !== -1) {
        newNum = stringNum.substring(0, index)
      }
      return newNum.length
    },
    /**
     * @description 加载活动信息
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/brandday/top50list'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.active = true
            _this.press = !_this.active
            _this.rankList = res.data.Result.slice(0, 50)
          } else {
            console.error('进入活动', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 领取彩金防抖
     */
    dbGetReward: _.debounce(function () {
      console.log('current_time', new Date())
      this.getReward()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  created () {
    this.loadDataInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', 'Brand Day', 'back', this.showExternalBar)
  }
}

</script>
<style scoped>
.bandday {
  margin-top: 51px;
}
.bandday .bg-img {
  position: absolute;
  width: 100%;
  top: 6%;
}
.bandday .banner {
  width: 100%;
  position: relative;
}
.bandday .banner img {
  width: 100%;
}
.bandday .main {
  width: 100%;
  /* min-width: 1200px; */
  /* height: 2440px; */
  position: relative;
  float: left;
  padding: 2% 0;
  background-color: #0c0039;
}
.bandday .main .body {
  width: 90%;
  margin:0 auto;
  position: relative;
}
.bandday .main .body .content-tab {
  display: flex;
}
.bandday table.score_table {
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
}
.bandday table.score_table.right {
  border-left: none;
  -moz-border-radius: 0 10px 10px 0;
  -webkit-border-radius: 0 10px 10px 0;
  border-radius: 0 10px 10px 0;
}
.bandday table.score_table {
  border-collapse: separate !important;
  border-spacing: 0;
  background-color: #4A0168;
  width: 100%;
  text-align: left;
  border: solid #E088B2 5px;
  -webkit-box-shadow: 0 1px 1px #E088B2;
  -moz-box-shadow: 0 1px 1px #E088B2;
  box-shadow: 0 1px 1px #E088B2;
}
.bandday table.score_table th {
  background-color: #CB41C7;
  background: -moz-linear-gradient(top, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
  background: -webkit-linear-gradient(top, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
  background: linear-gradient(to bottom, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
  border-top: none;
  text-shadow: 0 1px 0 rgba(255,255,255,.5);
}
.bandday table.score_table td:first-child, .bandday table.score_table th:first-child {
  border-left: none;
}
.bandday table.score_table.left th:first-child {
  -moz-border-radius: 6px 0 0 0;
  -webkit-border-radius: 6px 0 0 0;
  border-radius: 6px 0 0 0;
}
.bandday table.score_table.right th:last-child {
  -moz-border-radius: 0 6px 0 0;
  -webkit-border-radius: 0 6px 0 0;
  border-radius: 0 6px 0 0;
}
.bandday table.score_table th:only-child{
  -moz-border-radius: 6px 6px 0 0;
  -webkit-border-radius: 6px 6px 0 0;
  border-radius: 6px 6px 0 0;
}
.bandday table.score_table tr:last-child td:first-child {
  -moz-border-radius: 0 0 0 6px;
  -webkit-border-radius: 0 0 0 6px;
  border-radius: 0 0 0 6px;
  color: #fd07e9;
}
.bandday table.score_table tr:last-child td:last-child {
  -moz-border-radius: 0 0 6px 0;
  -webkit-border-radius: 0 0 6px 0;
  border-radius: 0 0 6px 0;
}
.bandday table.score_table td, table.score_table th {
  /* border: 5px solid #E088B2; */
  padding: 3px 2px;
  border-left: 5px solid #E088B2;
  border-top: 5px solid #E088B2;
  padding: 10px;
  text-align: left;
}
.bandday table.score_table tbody td {
  font-size: 15px;
  color: #FFFFFF;
  text-align: center;
}
.bandday table.score_table tbody td:first-child {
  color: #fd07e9;
}
.bandday table.score_table thead {
  background: #CB41C7;
  background: -moz-linear-gradient(top, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
  background: -webkit-linear-gradient(top, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
  background: linear-gradient(to bottom, #d870d5 0%, #d054cc 66%, #CB41C7 100%);
}
.bandday table.score_table thead th {
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  /* border-left: 0px solid #D0E4F5; */
}
.bandday table.score_table thead th:first-child {
  /* border-left: none; */
}

.bandday table.score_table tfoot td {
  font-size: 14px;
}
.bandday table.score_table tfoot .links {
  text-align: right;
}
.bandday table.score_table tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
.bandday .main .body .team_condi_block,
.bandday .main .body .even_des_block {
  position: relative;
  padding-top: 8%;
}
.bandday .body .title {
  width: 44%;
  border-radius: 25px;
  background-image: linear-gradient(#f572d2, #cb72f0);
  padding: 10px 10px;
  left: 50%;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, 0);
  top: 3%;
}
.bandday .body .title img {
  width: 100%;
}
.bandday .body .destrib {
  border: solid #E088B2 5px;
  border-collapse: separate !important;
  border-spacing: 0;
  background-color: #4A0168;
  /* width: 100%; */
  text-align: left;
  padding: 5% 1% 1% 1%;
  border-radius: 10px;
}
.bandday .body .destrib > ul{
  margin: 0;
  list-style-type: decimal;
  color: #f503f9;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 180%;
  padding-left: 40px;
}
.bandday .body .destrib > ul > li{
  width: 100%;
  text-align: left;
  font-size: 12px;
  list-style-type: decimal;
  line-height: 17px;
}
.bandday .body .destrib > ul > li span.notice {
  color: #fbdef4;
  font-size: 12px;
  line-height: 17px;
}
</style>
