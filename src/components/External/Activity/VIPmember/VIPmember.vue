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
            <p>晋级条件：{{Cards.promotion}} </p>
            <p>保级条件：{{Cards.keep}}</p>
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
            <span>晋级彩金：<em>{{pre.advance}}</em></span>
            <span>免费彩金：<em>{{pre.free}}</em></span>
          </div>
          <div class='bd'>
            <p>{{pre.name}}存送优惠：</p>
            <em v-html="pre.proportion"></em>
            <p>{{pre.name}}专属优惠：</p>
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
                <th>专享优惠</th>
                <th>黄金会员</th>
                <th>铂金会员</th>
                <th>钻石会员</th>
                <th>黑钻会员</th>
                <th>特邀会员</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>晋级彩金</td>
                <td>288</td>
                <td>688</td>
                <td>888</td>
                <td>1588</td>
                <td>12888</td>
              </tr>
              <tr>
                <td>每月免费彩金</td>
                <td>388</td>
                <td>888</td>
                <td>1288</td>
                <td>1688</td>
                <td>6888</td>
              </tr>
              <tr>
                <td>每月存送优惠</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>生日彩金</td>
                <td>588-1388</td>
                <td>888-1888</td>
                <td>1888-2888</td>
                <td>2588-3888</td>
                <td>8888</td>
              </tr>
              <tr>
                <td>专享游戏返水</td>
                <td>--</td>
                <td>--</td>
                <td>
                  AG/EA 0.9%
                  <br />LB 1.1%
                </td>
                <td>
                  AG/EA 0.9%
                  <br />LB 1.1%
                </td>
                <td>AG/EA 1.2%
                  <br />LB 1.5%
                </td>
              </tr>
              <tr>
                <td>三大节日彩金</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>年底神秘福利</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>话费福利</td>
                <td>--</td>
                <td>100</td>
                <td>200</td>
                <td>200</td>
                <td>500</td>
              </tr>
              <tr>
                <td>会员日</td>
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
          <p>1.【会员日】黑钻会员及以上等级，每月18日可抽取一次丰厚礼品！中奖后请联系VIP专员领取；</p>
          <p>2.【晋级彩金】每位会员每个等级的晋级彩金仅限领取一次，1倍流水即可出款，晋级彩金可联系VIP专员领取，晋级彩金可跨级领取；例如：当天从普通会员直接晋级到钻石会员，那么可直接领取黄金会员+铂金会员+钻石会员的晋级彩金；</p>
          <p>3.【免费彩金】会员晋级或保级成功后，次月在“我的账户”自助进行申请，彩金8倍流水即可出款，次月未领取的，众鑫娱乐将视您为放弃此优惠；<br><em>1) 钻石会员、黑钻会员、特邀会员将在次月8号开始领取免费彩金；<br>2) 黄金会员、铂金会员将在次月9号开始领取免费彩金；</em></p>
          <p>4.【存送优惠】会员晋级成功或保级成功后，次月3号开始，在“我的账户”自助进行申请，次月未申请的，众鑫娱乐将视您为放弃此优惠；</p>
          <p>5.【保级审核】每月1号至每月最后一天为保级审核期，未达到保级的VIP会员，次月进行降级处理；晋级为VIP会员后，享有两个月的保级权，完成保级标准即可保级；例如：1月晋级黄金会员，2月及3月只需完成保级标准，4月需要重新晋级；</p>
          <p>6.【生日彩金】VIP会员无需发邮件申请生日彩金，请于生日前三天联系VIP专员申请即可，概不接受逾期申请；</p>
          <p>7.【节日福利】春节，端午，中秋将为会员举行相关福利活动；</p>
          <p>8.【话费福利】每月话费福利，将于月初2~3号，统一充值到会员指定手机号码中；</p>
          <p>9.【添加方式】会员达到相对要求后，可点击左下方‘联系专员’添加专员的联系方式，或24小时内专员于您进行联系；</p>
          <p>10.【专享返水】钻石会员等级及以上的会员，次月开始享受专享游戏返水福利；<br>注：AG平台只限真人视讯；专享返水优惠仅限当月领取，为避免不必要的损失，请及时领取；</p>
          <p>11.【众鑫娱乐】保有风控审核权，同一玩家只可一个账号享受VIP会员福利，如发现会员存在无风险投注/利用优惠条款/违反网站条款等情况，将取消VIP会员福利与资格；</p>
          <p>12.【众鑫娱乐】保留文字最终解释权与提前终止活动权。</p>
        </div>
      </div>
    </div>
    <div class="contact" @click="contact"></div>
    <div class="Popups cont" v-show="PopupsCont" @click="closePopupsCont">
      <div class="MainPopup">
        <div class="hd"><i @click="contactClosed">×</i></div>
        <div class="bd">
          <span>上班时间：9：00~17：00（星期一至星期六）</span>
          <ul>
            <li>
              <p>QQ客服</p>
              <img src="../../../../assets/images/activity/VIPmember/wechat.png" alt="">
            </li>
            <!-- <li>
              <p>QQ客服</p>
              <img src="../../../../assets/images/activity/VIPmember/QQ.png" alt="">
            </li> -->
          </ul>
          <span>扫一扫二维码添加客服，领取您的专属优惠</span>
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
                <div class="text"><i></i>会员日-你值得拥有！只要你是【黑钻会员】以上，每月18日即可抽取一次奖品！！</div>
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
          name: '黄金会员'
        },
        {
          code: 'Platinum',
          name: '铂金会员'
        },
        {
          code: 'Diamond',
          name: '钻石会员'
        },
        {
          code: 'BlackDiamond',
          name: '黑钻会员'
        },
        {
          code: 'Special',
          name: '特邀会员'
        }
      ],
      MembershipCard: [
        {
          code: 'normal',
          name: '普通会员',
          promotion: '无',
          keep: '无'
        },
        {
          code: 'Gold',
          name: '黄金会员',
          promotion: '月存款金额≥10万 + 月有效流水≥30万',
          keep: '月存款金额≥6万 + 月有效流水≥20万'
        },
        {
          code: 'Platinum',
          name: '铂金会员',
          promotion: '月存款金额≥20万 + 月有效流水≥60万',
          keep: '月存款金额≥12万 + 月有效流水≥45万'
        },
        {
          code: 'Diamond',
          name: '钻石会员',
          promotion: '月存款金额≥50万 + 月有效流水≥160万',
          keep: '月存款金额≥30万 + 月有效流水≥120万'
        },
        {
          code: 'BlackDiamond',
          name: '黑钻会员',
          promotion: '月存款金额≥150万 + 月有效流水≥600万',
          keep: '月存款金额≥120万 + 月有效流水≥480万'
        },
        {
          code: 'Special',
          name: '特邀会员',
          promotion: '仅限受特邀玩家加入',
          keep: '永久会籍享有'
        }
      ],
      prerogative: [
        {
          name: '普通会员',
          advance: '无',
          free: '无',
          proportion: '无',
          exclusive: '无'
        },
        {
          name: '黄金会员',
          advance: '288',
          free: '388',
          proportion: '存送比例：20%<br>最高彩金：500<br>流水要求：（彩金+本金）*15',
          exclusive: '每月存送优惠 、 最高生日彩金1388 、 三大节日彩金 、 年底神秘福利'
        },
        {
          name: '铂金会员',
          advance: '688',
          free: '888',
          proportion: '存送比例：25%<br>最高彩金：1000<br>流水要求：（彩金+本金）*18',
          exclusive: '每月存送优惠 、 最高生日彩金1888 、 三大节日彩金 、 年底神秘福利 、 话费福利100元'
        },
        {
          name: '钻石会员',
          advance: '888',
          free: '1288',
          proportion: '存送比例：30%<br>最高彩金：2000<br>流水要求：（彩金+本金）*20',
          exclusive: '每月存送优惠 、 最高生日彩金2888 、 三大节日彩金 、 年底神秘福利 、 话费福利200元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）'
        },
        {
          name: '黑钻会员',
          advance: '1588',
          free: '1688',
          proportion: '存送比例：40%<br>最高彩金：4000<br>流水要求：（彩金+本金）*22',
          exclusive: '每月存送优惠 、 最高生日彩金3888 、 三大节日彩金 、 年底神秘福利 、 话费福利100元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）、众鑫会员日'
        },
        {
          name: '特邀会员',
          advance: '12888',
          free: '6888',
          proportion: '存送比例：60%<br>最高彩金：10000<br>流水要求：（彩金+本金）*20',
          exclusive: '每月存送优惠 、 最高生日彩金8888 、 三大节日彩金 、 年底神秘福利 、 话费福利500元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）、众鑫会员日'
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
        _this.AlertWarning('您暂无抽奖次数')
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
    this.$emit('setExternalBar', 'VIP会员', 'back', this.showExternalBar)
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
  height: 1.8rem;
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
