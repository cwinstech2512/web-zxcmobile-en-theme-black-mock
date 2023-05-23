<template>
  <div class="member" :class="showExternalBar? 'on':''">
    <div class="zxMain">
      <div class="Draw" @click="debounceRotatePanel"><i/></div>
      <div class="tit">
        <span>
          <i></i>
        </span>
        <em></em>
      </div>
      <div class="Progressbar">
        <ul class="icon">
          <li
            :class="[{on: index == active},prog.code]"
            v-for="(prog, index) in Progressbar"
            :key="index"
            @click="Switch(index)"
          >
            <span></span>
            <b></b>
            <p>{{prog.name}}</p>
            <em></em>
          </li>
        </ul>
        <em class="Progress">
          <i ref="Progress" v-bind:style="{ width: progressRate}"></i>
        </em>
      </div>
      <div class="MembershipCard">
        <div class="CardBox"
          v-for="(Cards, index) in MembershipCard"
          :key="index"
          :class="Cards.code"
          v-show="active === index-1"
        >
          <div class='hd'>
            <h2>{{Cards.name}}</h2>
          </div>
          <div class='bd'>
            <p>Promotion criteria:{{Cards.promotion}} </p>
            <p>Relegation criteria:{{Cards.keep}}</p>
          </div>
        </div>
      </div>
      <div class="prerogative">
        <div class="preBox"
          v-for="(pre, index) in prerogative"
          :key="index"
          v-show="active === index-1"
        >
          <i></i>
          <div class='hd'>
            <span>Promotion bonus:<em>{{pre.advance}}</em></span>
            <span>Free bonus:<em>{{pre.free}}</em></span>
          </div>
          <div class='bd'>
            <p>{{pre.name}}Deposit bonus:</p>
            <em v-html="pre.proportion"></em>
            <p>{{pre.name}}Exclusive offer:</p>
            <em>{{pre.exclusive}}</em>
          </div>
        </div>
      </div>
    </div>
    <div class="zxText">
      <div class="area pre">
        <i></i>
        <div class="bd">
          <table>
            <thead>
              <tr>
                <th>Exclusive Offer</th>
                <th>VIP1</th>
                <th>VIP2</th>
                <th>VIP3</th>
                <th>VIP4</th>
                <th>VIP5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Promotion Bonus</td>
                <td>288</td>
                <td>688</td>
                <td>888</td>
                <td>1588</td>
                <td>12888</td>
              </tr>
              <tr>
                <td>Monthly Bonus</td>
                <td>388</td>
                <td>888</td>
                <td>1288</td>
                <td>1688</td>
                <td>6888</td>
              </tr>
              <tr>
                <td>Monthly Deposit Bonus</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>Birthday Bonus</td>
                <td>588-1388</td>
                <td>888-1888</td>
                <td>1888-2888</td>
                <td>2588-3888</td>
                <td>8888</td>
              </tr>
              <tr>
                <td>Exclusive Game Rebate</td>
                <td>--</td>
                <td>--</td>
                <td>
                  JILI/JDB 0.6%
                </td>
                <td>
                  JILI/JDB 0.6%
                </td>
                <td>JILI/JDB 0.8%
                </td>
              </tr>
              <tr>
                <td>Three Major Bonus</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>Year-end mystery bonus</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>Call benefits</td>
                <td>--</td>
                <td>100</td>
                <td>200</td>
                <td>200</td>
                <td>500</td>
              </tr>
              <tr>
                <td>Member Day</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>√</td>
                <td>√</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="area rule">
        <i></i>
        <div class="bd">
          <p>1.【Membership Day】Black Diamond members and above can draw a generous gift on the 18th of every month! After winning the prize, please contact the VIP specialist to receive it.</p>
          <p>2.【Upgrade Bonus】Each member can only claim the promotion bonus once per level, and the money can be paid out after 1 times the turnover. The promotion bonus can be collected by contacting the VIP specialist, and the promotion bonus can be claimed across levels; for example: on the same day If you directly upgrade from ordinary members to diamond members, you can directly receive the promotion bonus of gold members + platinum members + diamond members.</p>
          <p>3.【Free Bonus】After the member is successfully promoted or relegated, he/she can apply for it in "My Account" in the next month, and the bonus can be paid out by 8 times the turnover. If you do not receive it in the next month, Zhongxin Entertainment will consider you to give up. this offer.<br><em>1) Diamond members, Black Diamond members, and specially invited members will start to receive free bonuses on the 8th of the following month.<br>2) Gold members and platinum members will start to receive free bonuses on the 9th of the following month.</em></p>
          <p>4.【Deposit Discount】After the member is successfully promoted or relegated, he/she will apply in "My Account" from the 3rd of the next month. If you do not apply in the next month, Zhongxin Entertainment will consider you to have given up this offer.</p>
          <p>5.【Relegation Review】From the 1st of each month to the last day of each month is the review period for relegation. VIP members who fail to meet the relegation will be downgraded the next month; after being promoted to VIP members, they will enjoy the right to relegation for two months and complete the relegation standard. Relegation can be maintained; for example, if you become a gold member in January, you only need to complete the relegation standard in February and March, and you need to re-upgrade in April.</p>
          <p>6.【Birthday Bonus】VIP members do not need to send an email to apply for the birthday bonus, please contact the VIP commissioner three days before the birthday to apply. Late applications will not be accepted.</p>
          <p>7.【Festival Benefits】During the Spring Festival, Dragon Boat Festival, and Mid-Autumn Festival, relevant welfare activities will be held for members.</p>
          <p>8.【Call Benefits】The monthly call benefits will be recharged to the member's designated mobile phone number on the 2nd and 3rd of the first month of the month.</p>
          <p>9.【Add Method】After the member meets the relative requirements, you can click the "Contact Commissioner" on the bottom left to add the contact information of the commissioner, or the commissioner will contact you within 24 hours.</p>
          <p>10.【Exclusive Rebate】Members with diamond membership level and above will start to enjoy the exclusive game rebate benefits from the next month.<br>Note: AG platform is only limited to live video; the exclusive rebate discount can only be claimed in the month, in order to avoid unnecessary losses, please claim it in time.</p>
          <p>11.【18SLOT】Reserves the right to review risk control, and the same player can only enjoy VIP membership benefits with one account. If a member is found to have risk-free betting/use of preferential terms/violation of website terms, etc., VIP membership benefits and qualifications will be cancelled.</p>
          <p>12.【18SLOT】Reserves the right of final interpretation of the text and the right to terminate the activity in advance.</p>
        </div>
      </div>
    </div>
    <div class="contact" @click="contact"></div>
    <div class="Popups cont" v-show="PopupsCont" @click="closePopupsCont">
      <div class="MainPopup">
        <div class="hd"><i @click="contactClosed">×</i></div>
        <div class="bd">
          <span>Service Hours: 9:00 to 17:00(Mon to Sat)</span>
          <ul>
            <li>
              <p>VIP Exclusive Lane</p>
              <img src="../../../../assets/images/activity/VIPmember/wechat.png" alt="">
            </li>
            <!-- <li>
              <p>QQ客服</p>
              <img src="../../../../assets/images/activity/VIPmember/QQ.png" alt="">
            </li> -->
          </ul>
          <span>Scan the QR code to add our VIP service and claim your exclusive offer.</span>
        </div>
      </div>
    </div>
    <div class="Popups rotate" v-show="PopupsRotate" @click="closePopupsRotate" :validCount="validCount">
      <div class="MainPopup">
        <div class="hd"><i @click="rotatePanelClosed">×</i></div>
        <div class="bd">
          <div class="rotate">
            <div class="ly-plate">
              <div class="rotate-hd">
                <div class="text"><i></i>Member Day - You deserve it! As long as you are a 【VIP4】or above, you can draw a prize once a month on the 18th.</div>
              </div>
              <div class="rotate-record">
                <div class="rechd"></div>
                <div class="recbd">
                  <ul>
                    <li
                      v-for="(record, index) in historys"
                      :key="index"
                    >
                      <span>{{record.BonusText}}</span>
                      <em>{{record.GetTime}}</em>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="rotate-bg"></div>
              <div class="lottery-star" id="lotteryBtn"></div>
            </div>
          </div>
          <div class="annpop-ups">
            <div class="main">
              <div class="text"></div>
              <div id="close-annpop"></div>
              <div class="pic">
                <div class="img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import '../../../../../static/js/VIPmember/jquery.min'
import '../../../../../static/js/VIPmember/jQueryRotate.2.2'
import '../../../../../static/js/VIPmember/rotate'

import { vipRotateSwitch, vipRandomOffset, vipRotateFunc } from '../../../../../static/js/VIPmember/exportFunc'
export default {
  name: 'member',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {
  },
  data () {
    return {
      active: -1,
      PopupsCont: false,
      PopupsRotate: false,
      levelNum: 0,
      levelName: '',
      progressRate: '0%',
      historys: [],
      validCount: 0,
      clickInprocess: false,
      Progressbar: [
        {
          code: 'Gold',
          name: 'VIP1'
        },
        {
          code: 'Platinum',
          name: 'VIP2'
        },
        {
          code: 'Diamond',
          name: 'VIP3'
        },
        {
          code: 'BlackDiamond',
          name: 'VIP4'
        },
        {
          code: 'Special',
          name: 'VIP5'
        }
      ],
      MembershipCard: [
        {
          code: 'normal',
          name: 'Premium',
          promotion: 'N/A',
          keep: 'N/A'
        },
        {
          code: 'Gold',
          name: 'VIP1',
          promotion: 'Monthly deposit amount ≥ 100000 + Monthly effective turnover ≥ 300000',
          keep: 'Monthly deposit amount ≥ 60000 + Monthly effective turnover ≥ 200000'
        },
        {
          code: 'Platinum',
          name: 'VIP2',
          promotion: 'Monthly deposit amount ≥ 200000 + Monthly effective turnover ≥ 600000',
          keep: 'Monthly deposit amount ≥ 120000 + Monthly effective turnover ≥ 450000'
        },
        {
          code: 'Diamond',
          name: 'VIP3',
          promotion: 'Monthly deposit amount ≥ 500000 + Monthly effective turnover ≥ 1600000',
          keep: 'Monthly deposit amount ≥ 300000 + Monthly effective turnover ≥ 1200000'
        },
        {
          code: 'BlackDiamond',
          name: 'VIP4',
          promotion: 'Monthly deposit amount ≥ 1500000 + Monthly effective turnover ≥ 6000000',
          keep: 'Monthly deposit amount ≥ 1200000 + Monthly effective turnover ≥ 4800000'
        },
        {
          code: 'Special',
          name: 'VIP5',
          promotion: 'Invited players only',
          keep: 'Lifetime Membership'
        }
      ],
      prerogative: [
        {
          name: 'Premium',
          advance: 'N/A',
          free: 'N/A',
          proportion: 'N/A',
          exclusive: 'N/A'
        },
        {
          name: 'VIP1',
          advance: '288',
          free: '388',
          proportion: 'Deposit ratio: 20%<br>Maximum bonus: 500<br>Running water requirements:（Bonus + Principal）*15',
          exclusive: 'Monthly deposit bonus, Highest birthday bonus 1388PHP, Three major bonus, Year-end mystery bonus'
        },
        {
          name: 'VIP2',
          advance: '688',
          free: '888',
          proportion: 'Deposit ratio: 25%<br>Maximum bonus: 1000<br>Running water requirements:（Bonus + Principal）*18',
          exclusive: 'Monthly deposit bonus, Highest birthday bonus 1888PHP, Three major bonus, Year-end mystery bonus, Call benefits 100PHP'
        },
        {
          name: 'VIP3',
          advance: '888',
          free: '1288',
          proportion: 'Deposit ratio: 30%<br>Maximum bonus: 2000<br>Running water requirements:（Bonus + Principal）*20',
          exclusive: 'Monthly deposit bonus, Highest birthday bonus 2888PHP, three major bonus, Year-end mystery bonus, Call benefits 200PHP、 Exclusive game rebate（JILI/JDB 0.6%）'
        },
        {
          name: 'VIP4',
          advance: '1588',
          free: '1688',
          proportion: 'Deposit ratio: 40%<br>Maximum bonus: 4000<br>Running water requirements:（Bonus + Principal）*22',
          exclusive: 'Monthly deposit bonus, Highest birthday bonus 3888PHP, Three major bonus, Year-end mystery bonus, Call benefits 200PHP、 Exclusive game rebate（JILI/JDB 0.6%）、18SLOT Member Day'
        },
        {
          name: '特邀会员',
          advance: '12888',
          free: '6888',
          proportion: 'Deposit ratio: 60%<br>Maximum bonus: 10000<br>Running water requirements:（Bonus + Principal）*20',
          exclusive: 'Monthly deposit bonus, Highest birthday bonus 8888PHP, Three major bonus, Year-end mystery bonus, Call benefits 500PHP、 Exclusive game rebate（JILI/JDB 0.8%）、18SLOT Member Day'
        }
      ],
      rotateRecord: [
        {
          name: '苹果无线耳机',
          time: '2019.06.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.05.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.04.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.03.18'
        }
      ]

    }
  },
  computed: {
    login (status) {
      status = localStorage.status
      return status
    }
  },
  methods: {
    /**
     * @description 切换级别
     */
    Switch (index) {
      this.active = index
    },
    /**
     * @description 弹出专员联系方式
     */
    contact () {
      this.PopupsCont = true
    },
    /**
     * @description 关闭专员联系方式窗口
     */
    contactClosed () {
      this.PopupsCont = false
    },
    /**
     * @description 点击任意区域关闭专员联系方式窗口
     */
    closePopupsCont () {
      var div = document.querySelector('.cont .MainPopup')
      if (div) {
        if (!div.contains(event.target)) {
          this.PopupsCont = false
        }
      }
    },
    /**
     * @description 弹出转盘
     */
    rotatePanel () {
      this.PopupsRotate = true
      let _this = this
      let url = '/api/vip/rotate'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.historys = res.data.Result.Historys
            _this.validCount = res.data.Result.Count
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 关闭弹出转盘
     */
    rotatePanelClosed () {
      this.PopupsRotate = false
    },
    /**
     * @description 点击任意区域关闭弹出转盘
     */
    closePopupsRotate () {
      var div = document.querySelector('.rotate .MainPopup')
      if (div) {
        if (!div.contains(event.target)) {
          this.PopupsRotate = false
        }
      }
    },
    /**
     *@description 抽奖数据交互
     */
    getLuckyFunc (startRotate) {
      let _this = this
      if (_this.validCount === 0) {
        _this.AlertWarning('Sorry, you don′t have any lucky draws yet')
        return false
      }
      if (_this.clickInprocess) {
        return false
      }
      _this.clickInprocess = true
      let url = '/api/vip/lucky'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            let code = res.data.Result.Code
            let text = res.data.Result.Text
            vipRotateSwitch(code, text)
            _this.validCount = 0
          } else {
            _this.ExteralFileComfirm(res.data)
          }
          _this.clickInprocess = false
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 初始化页面信息
     */
    loadinfo () {
      let _this = this
      let url = '/api/vip/info'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.levelNum = res.data.Result.LevelNum
            _this.levelName = res.data.Result.LevelName
            _this.progressRate = res.data.Result.ProcessBar
            if (_this.levelNum !== 0) {
              _this.Switch((res.data.Result.LevelNum - 30) / 10)
            }
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    debounceRotatePanel: _.debounce(function () {
      console.log('current_time', new Date())
      this.rotatePanel()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  /**
   * @description 创建[内置钩子函数]
   */
  created () {
    this.loadinfo()
  },
  /**
   * @description 挂载[内置钩子函数]
   */
  mounted () {
    this.$emit('setExternalBar', 'VIP', 'back', this.showExternalBar)
    // 将vue内部方法push给window
    window.vipGetRotateFunc = this.getLuckyFunc
    window.vipRotateSwitch = vipRotateSwitch
    window.vipRandomOffset = vipRandomOffset
    window.vipRotateFunc = vipRotateFunc
    // 将外部js文件动态引入
    // const jQuerymin = document.createElement('script')
    // jQuerymin.type = 'text/javascript'
    // jQuerymin.src = './static/js/jquery.min.js'
    // jQuerymin.defer = 'defer'
    // document.body.appendChild(jQuerymin)
    // const jQueryRotate = document.createElement('script')
    // jQueryRotate.type = 'text/javascript'
    // jQueryRotate.src = './static/js/VIPmember/jQueryRotate.2.2.js'
    // jQueryRotate.defer = 'defer'
    // document.body.appendChild(jQueryRotate)
    // const rotate = document.createElement('script')
    // rotate.type = 'text/javascript'
    // rotate.src = './static/js/VIPmember/rotate.js'
    // rotate.defer = 'defer'
    // document.body.appendChild(rotate)
  }
}

</script>
<style scoped>
.member .contact,
.Progressbar,
.MembershipCard,
.prerogative,
.zxText .area{
  -webkit-animation:fadeInUp 2s 3.5s ease both;
  animation:fadeInUp 2s 3.5s ease both;
}
.member .zxMain .Draw,
.member .zxMain .tit span{
  -webkit-animation: fadeInDown 2s ease-in-out;
    animation: fadeInDown 2s ease-in-out;
}
.member.on{
  z-index: 99;
  top:0.88rem;
}
.member{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top:0;
  bottom: 0;
  background: url(../../../../assets/images/activity/VIPmember/VIPbg.jpg) top no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.member .zxMain{
  width: 100%;
  height: 15.5rem;
  padding: 0 0.2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}
.member .zxMain .Draw{
  width: 1.5rem;
  height: 1.5rem;
  background: url(../../../../assets/images/activity/VIPmember/VIPday1-icon.png);
  background-size: 100% 100%;
  position: absolute;
  right: 0.2rem;
  top: 0.5rem;
}
.member .zxMain .Draw i{
  position: absolute;
  z-index: -1;
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  background: url(../../../../assets/images/activity/VIPmember/bg_light.png);
  background-size: 100% 100%;
  -webkit-animation: hvr_pulse 4s ease-out infinite;
    -moz-animation: hvr_pulse 4s ease-out infinite;
    animation: hvr_pulse 4s ease-out infinite;
}
.member .contact{
  width: 1.88rem;
  height: 1.28rem;
  background: url(../../../../assets/images/activity/VIPmember/VIPContact-icon.png);
  background-size: 100% 100%;
  position: fixed;
  left: 2%;
  bottom: 2%;
  cursor: pointer;
}
.member .zxMain .tit{
  width: 4.44rem;
  height: 2.86rem;
  position: absolute;
  top: 6%;
  left: 50%;
  margin-left: -2.22rem;
}
.member .zxMain .tit span{
  width: 4.44rem;
  height: 2.86rem;
  display: block;
  background: url(../../../../assets/images/activity/VIPmember/VIP-titC-min.png);
  background-size: 100% 100%;
  position: relative;
}
.member .zxMain .tit span i{
  width: 4rem;
  height: .54rem;
  display: block;
  background: url(../../../../assets/images/activity/VIPmember/VIP-titC-line.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.1rem;
  right: 1.5rem;
  -webkit-animation: flash 3.5s  ease-in-out;
    animation: flash 3.5s ease-in-out;
}
.member .zxMain .tit em{
  width: 4.06rem;
  height: 0.42rem;
  display: block;
  margin: 0 auto;
  background: url(../../../../assets/images/activity/VIPmember/VIP-titE.png);
  background-size: 100% 100%;
  -webkit-animation: flash 3.5s  ease-in-out;
    animation: flash 3.5s ease-in-out;
}
.Progressbar{
  width: 7.1rem;
  height: 1.8rem;
  position: absolute;
  top: 25%;
  left: 50%;
  margin-left: -3.55rem;
  z-index: 5;
}
.Progressbar .Progress{
  width: 100%;
  height: 0.1rem;
  display: block;
  border-radius: 0.5rem;
  border: 0.02rem solid #e1d5b7;
  background: #57461b;
  position: absolute;
  top: 50%;
  margin-top: 0.7rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.Progressbar .Progress i{
  width: 0;
  height: 0.04rem;
  display: block;
  background: #ffff98;
  border: 0.02rem solid #fead00;
}
.Progressbar .icon{
  width: 100%;
  position: absolute;
  z-index: 1;
  margin-top: 0.3rem
}
.Progressbar .icon li{
  width: 20%;
  height: 1.9rem;
  float: left;
  position: relative;
}
.Progressbar .icon li p{
  font-size: 0.2rem;
  color: #98845a;
  position: absolute;
    bottom: 0;
  left: 0.3rem;
}
.Progressbar .icon li.on p{
  font-size: 0.25rem;
  color: #ebc36e;
}
.Progressbar .icon li span{
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  position: absolute;
  left: 50%;
  top: 20%;
  margin-left: -0.3rem;
}
.Progressbar .icon li.Gold span{
  background: url(../../../../assets/images/activity/VIPmember/icon01.png);
  background-size: 100% 100%;
}
.Progressbar .icon li.Platinum span{
  background: url(../../../../assets/images/activity/VIPmember/icon02.png);
  background-size: 100% 100%;
}
.Progressbar .icon li.Diamond span{
  background: url(../../../../assets/images/activity/VIPmember/icon03.png);
  background-size: 100% 100%;
}
.Progressbar .icon li.BlackDiamond span{
  background: url(../../../../assets/images/activity/VIPmember/icon04.png);
  background-size: 100% 100%;
}
.Progressbar .icon li.Special span{
  background: url(../../../../assets/images/activity/VIPmember/icon05.png);
  background-size: 100% 100%;
}
.Progressbar .icon li.on em{
  display: block;
  -webkit-animation: flip 1.5s ease-in-out  infinite;
  animation: flip 1.5s ease-in-out  infinite;
}

/*鼠标提示*/
.Progressbar .icon li em{
  position: absolute;
  z-index: 2;
  width: 0.4rem;
  height: 0.46rem;
  top: -0.2rem;
  left: 50%;
  margin-left: -0.2rem;
  display: none;
  background:url(../../../../assets/images/activity/VIPmember/arrow-icon.png);
  background-size: 100% 100%;
}
.MembershipCard{
  position: absolute;
  width: 6.24rem;
  height: 3.1rem;
  left: 50%;
  top: 42%;
  margin-left: -3.12rem;
}
.MembershipCard .CardBox{
   width: 100%;
  height: 100%;
}
.MembershipCard .CardBox.Gold{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard01.png);
  background-size: 100% 100%;
}
.MembershipCard .CardBox.Platinum{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard02.png);
  background-size: 100% 100%;
}
.MembershipCard .CardBox.Diamond{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard03.png);
  background-size: 100% 100%;
}
.MembershipCard .CardBox.BlackDiamond{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard04.png);
  background-size: 100% 100%;
}
.MembershipCard .CardBox.Special{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard05.png);
  background-size: 100% 100%;
}
.MembershipCard .CardBox.normal{
  background: url(../../../../assets/images/activity/VIPmember/VIPtypecard00.png);
  background-size: 100% 100%;
}
.MembershipCard .hd{
  width: 100%;
  height: 1.2rem;
  padding: 0.2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.MembershipCard .hd h2{
  font-size: 0.45rem;
  float: left;
  color: #e5d5a5;
}
.MembershipCard .hd em{
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #e5d5a5;
    font-weight: bold;
}
.MembershipCard .bd{
  width: 100%;
  height: 1.2rem;
  padding: 0.2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.MembershipCard .bd p{
  font-size: 0.25rem;
  color: #fddeb9;
  text-align: left;
}
.MembershipCard .bd p em{
  font-size: 0.3rem;
  color: #fddeb9;
  margin-left: 0.2rem;
}
.prerogative{
  width: 7.1rem;
  height: 4.2rem;
  position: absolute;
  bottom: 6%;
}
.prerogative i{
    position: absolute;
    z-index: 2;
    width: 0.4rem;
    height: 0.46rem;
    display: block;
    left: 50%;
  top: -15%;
    margin-left: -0.2rem;
    background: url(../../../../assets/images/activity/VIPmember/arrow-icon.png);
    background-size: 100% 100%;
}
.prerogative .hd{
  width: 7.1rem;
  height: 0.74rem;
  background:url(../../../../assets/images/activity/VIPmember/VIPwelfare-titbg.png);
  background-size: 100% 100%;
  float: right;
  margin-bottom: 0.15rem;
}
.prerogative .hd span{
  width: 50%;
  height: 0.74rem;
  float: left;
  font-size: 0.3rem;
  color: #e4c8a5;
  text-align: center;
  line-height: 0.74rem;
}
.prerogative .hd span em{
  font-size: 0.35rem;
  color: #ffeea7;
}
.prerogative .bd{
  width: 100%;
  float: right;
    background: #5e4325;
  padding: 0.25rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.prerogative .bd p{
  font-size: 0.25rem;
  color: #e3c29b;
}
.prerogative .bd em{
    font-size: 0.25rem;
    display: block;
    color: #c89c68;
    margin: 0.05rem 0.25rem;
}
.zxText{
  width: 100%;
  padding: 0 0.2rem 0.8rem 0.2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
    margin: 0 auto;
    position: relative;
}
.zxText .area{
  width: 7.1rem;
    margin: 0 auto 0.5rem auto;
    overflow: hidden;
}
.zxText .area i{
  width: 7.1rem;
  height: 0.44rem;
    display: block;
}
.zxText .area.pre i{
    background:  url(../../../../assets/images/activity/VIPmember/VIPwindow-tit03.png);
  background-size: 100% 100%;
}
.zxText .area.rule i{
    background:  url(../../../../assets/images/activity/VIPmember/VIPwindow-tit04.png);
  background-size: 100% 100%;
}
.zxText .area .bd{
  width: 100%;
  padding: 0.2rem;
  background: #563715;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.zxText .area .bd table{
  width: 100%;
  text-align: center;
}
.zxText .area .bd table thead tr{
  width: 100%;
  height: 0.6rem;
  background: #7c572f;
  color: #ffe2bc;
  font-size: 0.25rem;
}
.zxText .area .bd table tbody tr{
  width: 100%;
  height: 0.5rem;
  background: #7c572f;
  color: #ffe2bc;
}
.zxText .area .bd table tbody td,
.zxText .area .bd table thead th{
  border: 0.02rem solid  #5e4325;
  font-size:0.25rem;
}
.zxText .area .bd table tbody tr:nth-child(even){
  background:#7c572f;
}
.zxText .area .bd p{
    font-size: 0.2rem;
    margin: 0.15rem 0;
    color: #fff5cc;
}
.zxText .area .bd span{
  width: 100%;
    height: 0.7rem;
  line-height: 0.7rem;
    font-size: 0.2rem;
    background: #7c572f;
    margin: 0.2rem 0 0 0;
    display: block;
    color: #f2a848;
    padding-left: 0.1rem;
    -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.zxText .area .bd span em{
    font-size: 0.2rem;
    color: #fff5cc;
}

.Popups{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:99;
  /* display:none; */
  overflow-x:hidden;
  overflow-y:auto;
  background-color:rgba(0,0,0,.6);
}
.Popups .MainPopup{
  width: 7.1rem;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:-3.55rem;
  margin-top:-4rem;
  -webkit-animation: bounceInDown 1.5s linear;
  -moz-animation: bounceInDown 1.5s linear;
  animation: bounceInDown 1.5s linear;
}
.Popups .MainPopup .hd{
  width: 100%;
  height: 0.44rem;
  text-align: center;
  position: relative;
}
.Popups.cont .MainPopup .hd{
  background:  url(../../../../assets/images/activity/VIPmember/VIPwindow-tit02.png);
  background-size: 100% 100%;
}
.Popups.rotate .MainPopup .hd{
  background:  url(../../../../assets/images/activity/VIPmember/VIPwindow-tit01.png);
  background-size: 100% 100%;
}
.Popups .MainPopup .hd i{
  position:absolute;
    right: 0.1rem;
    top: 0.2rem;
  font-size: 0.5rem;
  color: #fff;
  cursor: pointer;
}
.Popups .MainPopup .hd i:hover{
  color:#feda12;
}
.Popups .MainPopup .bd{
  width: 100%;
  padding: 0.4rem;
  background: #563715;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.Popups .MainPopup .bd p{
  font-size: 0.25rem;
  margin: 0.1rem 0;
  color: #fff5d9;
}
.Popups .MainPopup .bd p em{
  font-size: 0.25rem;
  font-weight: bold;
  margin: 0.1rem 0;
  display: block;
  color: #ffce82;
}
.Popups .MainPopup .bd ul{
  width: 100%;
  height: 3rem;
  margin-bottom: 0.1rem;
  text-align: center;
}
.Popups .MainPopup .bd ul li{
  width: 100%;
  height: 3rem;
  float: left;
  text-align: center;
  margin: 0.4rem 0;
}
.Popups .MainPopup .bd ul li:nth-child(even){
  box-shadow:inset 1px 0 0px #7d5e3b;
}
.Popups .MainPopup .bd span{
  display: block;
  text-align: center;
  font-size: 0.25rem;
  color:#fff;
}
.Popups .MainPopup .bd img{
  width: 2.5rem;
  height: 2.5rem;
  display: block;
  margin: 0 auto;
}

.Popups .MainPopup .bd .rotate {
  width:100%;
  height: 7rem;
}
.Popups .MainPopup .bd .rotate .ly-plate {
    width: 100%;
    height: 100%;
}
.Popups .MainPopup .bd .rotate .ly-plate .rotate-hd{
  width: 100%;
  height: 0.4rem;
}
.Popups .MainPopup .bd .rotate .ly-plate .rotate-hd .text{
  width: 100%;
  padding: 0.1rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: rgba(249,246,243,0.2);
  color: #ffe5bc;
  line-height: 0.3rem;
  float: left;
  font-size: 0.2rem;
  border-radius: 0.1rem;
}
.Popups .MainPopup .bd .rotate .rotate-bg {
  width: 4.44rem;
  height: 4.44rem;
  background: url(../../../../assets/images/activity/VIPmember/rotate-bg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 1.8rem;
  left: 50%;
    margin-left: -2.22rem;
}
.Popups .MainPopup .bd .rotate .ly-plate div.lottery-star {
  width: 1.2rem;
  height: 1.5rem;
  position: absolute;
  top: 50%;
    margin-left: 2.55rem;
    margin-top: -0.9rem;
  background-image:url(../../../../assets/images/activity/VIPmember/rotate-static.png);
  background-size: 100% 100%;
  cursor: pointer;
  z-index:5;
}
.Popups .MainPopup .bd .rotate-record{
  width: 6.4rem;
  height: 4rem;
  background: #482e12;
  border: 0.04rem solid #c38949;
  border-radius: 0.1rem;
  position: absolute;
  right: 0.3rem;
  bottom: 0.4rem;
}
.Popups .MainPopup .bd .rotate-record .rechd{
  position: absolute;
  left: 0.2rem;
  bottom: 40%;
  width: 1.2rem;
  height: 0.4rem;
  background: url(../../../../assets/images/activity/VIPmember/VIPwindow-Draw-recordtit.png);
  background-size: 100% 100%;
}
.Popups .MainPopup .bd .rotate-record .recbd{
    width: 6rem;
    height: 1.2rem;
    background: #734e25;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    text-align: center;
    color: #FFF6E0;
    overflow-y: auto;
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar {
width: 4px;
background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar-track {
width: 4px;
background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar-thumb {
width: 4px;
background-color:#ffb94a;
}
.Popups .MainPopup .bd .rotate-record .recbd ul{
  height: auto;
  width: 100%;
  overflow: hidden;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li{
  width: 100%;
  height: 0.6rem;
    line-height: 0.6rem;
  padding: 0 0.1rem;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li:nth-child(even){
  background: #9f692e;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li span{
  float: left;
  font-size: 0.2rem;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li em{
  float: right;
  font-size: 0.2rem;
}
.Popups .MainPopup .bd .annpop-ups {
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  display:none;
  background-color:rgba(0,0,0,0.8);
  z-index:99;
}
.Popups .MainPopup .bd .annpop-ups .main {
  width: 7rem;
    height: 7rem;
    position: absolute;
    margin-left: -3.5rem;
    margin-top: -3.5rem;
    left: 50%;
    top: 50%;
  animation: annpopups 0.5s forwards;
  -webkit-animation: annpopups 0.5s forwards;
}
@-webkit-keyframes annpopups {
0%{
  opacity:0;
  -webkit-transform: translate3d(0, -20%, 0);
  transform: translate3d(0, -20%, 0);
}
100% {
  opacity:1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
@keyframes annpopups {
0%{
  opacity:0;
  transform: translate3d(0, -20%, 0);
}

100% {
  opacity:1;
  transform: translate3d(0, 0, 0);
}
}
.annpop-ups .main .pic {
  width:6.68rem;
  height:8.64rem;
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -3.34rem;
  margin-top: -4.32rem;
  z-index:0;
}
.annpop-ups .main .pic .img{
  width:100%;
  height:100%;
  background: url(../../../../assets/images/activity/VIPmember/rotate-win.png) center no-repeat;
  background-size: 100% 100%;
}
.annpop-ups .main .text {
  width:100%;
  position:absolute;
  text-align:center;
  bottom: 0;
  z-index:1;
}
.annpop-ups .main .text >>> span {
  font-size:0.3rem;
  color:#ffe22a;
}
.annpop-ups .main .text >>> em {
  font-size:0.55rem;
  padding:0 0.1rem;
}
.annpop-ups .main .text >>> p {
  font-size:0.3rem;
  color:#fff29b;
  margin-bottom:0.2rem;
}
#close-annpop{
  width: 0.64rem;
  height: 0.64rem;
  position: absolute;
  background: url(../../../../assets/images/activity/VIPmember/close-annpop.png);
  background-size: 100% 100%;
    bottom: -0.8rem;
    left: 50%;
    margin-left: -0.32rem;
  z-index: 2;
  cursor: pointer;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes flash {
  from,60%,80%{
    opacity: 0;
  }
  70%,90%{
    opacity: 1;
  }
}
@keyframes flash {
  from,60%,80%{
    opacity: 0;
  }
  70%,90%{
    opacity: 1;
  }
}
@-webkit-keyframes fadeInUp {
0% {
opacity:0;
transform:translateY(20px)
}
100% {
opacity:1;
transform:translateY(0)
}
}
@keyframes fadeInUp {
0% {
opacity:0;
transform:translateY(20px)
}
100% {
opacity:1;
transform:translateY(0)
}
}
@-webkit-keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  20% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 30px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
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

  20% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
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
@-webkit-keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
@-moz-keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
@keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
</style>
