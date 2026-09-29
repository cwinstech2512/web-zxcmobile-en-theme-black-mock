<template>
<div class='carnivals' :class="showExternalBar ? 'on':''">
  <!-- <div :class="{getBack:pcode === 'ZXC0MW'}" @click="goHome"></div> -->
  <div class="Car-banner"></div>
  <div class="Car-main">
    <div class="Car-main-content">
      <div class="box-top">
        <ul class="date">
          <li
             v-for="(dates, index) in date"
             :key="index"
             :class="[{on: index == active},dates]"
             @click="toggle(index)"
          ></li>
        </ul>
        <div class="banner">
          <div class="item b1" v-show="itemShow ==0">
            <div class="btn-top" @click="showRule('b1')">活动规则</div>
            <div class="text-mid">
              <h2>最高奖励588元</h2>
              <em>(不限平台3倍流水)</em>
            </div>
            <div class="btn-mid" :class="{on:dayNum===13}" @click="showShare()">立即邀请</div>
            <div class="text-bot">
              <span>名额：<b>500</b> 人</span>
              <p>活动要求：邀请好友注册即送<em>注册彩金</em>以及<em>邀约人彩金</em>！点击“立即邀请”截图二维码或复制链接发至好友；</p>
            </div>
          </div>
          <div class="item b2" v-show="itemShow ==1">
            <div class="btn-top" @click="showRule('b2')">活动规则</div>
            <div class="text-mid">
              <div class="Progressbar">
                <div :class="[points.code,'point']" v-for="(points, index) in BetPoint" :key="index">
                  <span>{{points.text}}</span><i ref="code1"/>
                </div>
                <div class="progress">
                  <div class="progress-bg" :style="{left:progress1}"></div>
                </div>
              </div>
              <em>（已报名人数：{{BetApplyCount}}）每整点自动更新</em>
            </div>
            <!-- <div class="btn-mid" :class="{on:dayNum===14 && !betExist}" :disabled="inClickProcess || dayNum!==14 || betExist"  @click="dbGetBetBonus">申请彩金</div> -->
            <div class="btn-mid" :class="betExist? '':'on'" @click="dbGetBetBonus">立即报名</div>
            <div class="text-bot">
              <p>活动要求：活动当天任意单一平台有效流水≥200元，即可点击“立即报名”参加每月一次的众鑫嘉年华活动，报名人数越多，彩金越给力！每位会员仅可获得达成条件最高一档的活动奖励。</p>
            </div>
          </div>
          <div class="item b3" v-show="itemShow ==2">
            <div class="btn-top" @click="showRule('b3')">活动规则</div>
            <div class="text-mid">
              <div class="Progressbar">
                <div :class="[points.code,'point']" v-for="(points, index) in DepPoint" :key="index">
                  <span>{{points.text}}</span><i ref="code2"/>
                </div>
                <div class="progress">
                  <div class="progress-bg" :style="{left:progress2}"></div>
                </div>
              </div>
              <em>（已报名人数：{{DepApplyCount}}）每整点自动更新</em>
            </div>
            <!-- <div class="btn-mid" :class="{on:dayNum===15 && !depExist}" :disabled="inClickProcess || dayNum!==15 || depExist"  @click="dbGetDepBonus">申请彩金</div> -->
            <div class="btn-mid" :class="depExist? '':'on'"  @click="dbGetDepBonus">立即报名</div>
            <div class="text-bot">
              <p>活动要求：活动当天存款≥100元，即可点击“立即报名”参加每月一次的众鑫嘉年华活动，报名人数越多，彩金越丰厚！每位会员仅可获得达成条件最高一档的活动奖励。</p>
            </div>
          </div>
          <div class="item b4" v-show="itemShow ==3">
            <div class="btn-top" @click="showRule('b4')">活动规则</div>
            <div class="text-mid">
              <h2>388元~3888元</h2>
              <em>(不限平台3倍流水)</em>
            </div>
            <div class="text-bot">
              <span>名额：<b>50</b> 人</span>
              <p>活动要求：任意参加一项13-15日的活动</p>
            </div>
          </div>
          <div class="rule" v-show="itemShow ==4">
            <div class="closed" @click="hideRule(active)"></div>
            <div class="rule-main">
             <p v-html="rule[active].ruleB"></p>
             </div>
          </div>
        </div>
      </div>
      <div class="box-bottom">
        <div class="tit">
          <i></i><span>活动规则</span><i></i>
        </div>
        <div class="text">
          <p>1、本活动仅适用于所有已“绑定手机”的会员；</p>
          <p>2、本活动所有彩金3倍流水即可出款；</p>
          <p>3、嘉年华活动开始前，当月有一笔≥100元存款记录，即可参与“激流勇进max”“存款达人max”活动；</p>
          <p>4、有效投注计算方式：<br>【体育平台】任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；<br>【真人娱乐/彩票平台】所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单流水将不计为有效流水； <br>( 注：以上仅对已结算并产生输赢结果的投注额计算为有效投注 )</p>
          <p>5、本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
          <p>6、每位有效玩家、每一个手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回礼品及所产生的利润权利；</p>
          <p>7、如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share" v-show="share">
    <div class="img">
      <em  @click="hideShare">关闭</em>
      <div class="code"></div>
      <div class="copy">
          <span>{{shareUrl}}</span>
          <button @click="handleCopy(shareUrl,$event)">复制</button>
      </div>
      <div class="text">
          <p>温馨提示：微信点击此链接无法登陆官网，复制到浏览器即可登陆。</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Rule from '../../../../../static/json/carnivalsRule.json'
import clipboard from '@/plugin/clipboard.js'
import _ from 'lodash'
export default {
  name: 'carnivals',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      pcode: '',
      active: 0,
      itemShow: 0,
      date: ['date13', 'date14', 'date15', 'date16'],
      rule: Rule,
      share: false,
      shareUrl: 'http://zxylbet.net',
      betExist: false,
      depExist: false,
      dayNum: 0,
      inClickProcess: false,
      BetPoint: [
        {
          text: '18元',
          code: 'a'
        },
        {
          text: '38元',
          code: 'b'
        },
        {
          text: '65元',
          code: 'c'
        },
        {
          text: '132元',
          code: 'd'
        },
        {
          text: '388元',
          code: 'e'
        },
        {
          text: '888元',
          code: 'f'
        }
      ],
      DepPoint: [
        {
          text: '18元',
          code: 'h'
        },
        {
          text: '28元',
          code: 'i'
        },
        {
          text: '58元',
          code: 'j'
        },
        {
          text: '126元',
          code: 'k'
        },
        {
          text: '388元',
          code: 'l'
        },
        {
          text: '888元',
          code: 'n'
        }
      ],
      BetApplyCount: 0,
      DepApplyCount: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 进度条
    progress1 () {
      this.countPeople1()
      if (this.BetApplyCount > 2300) {
        return '-0%'
      } else {
        return -(100 - this.BetApplyCount / 23) + '%'
      }
    },
    progress2 () {
      this.countPeople2()
      if (this.DepApplyCount > 2400) {
        return '-0%'
      } else {
        return -(100 - this.DepApplyCount / 24) + '%'
      }
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // goHome () {
    //   if (this.pcode === 'ZXC0MW') {
    //     // let iframe = self.frameElement
    //     // console.log('iframe', iframe.src)
    //     // console.log('window', window.document.location)
    //     // console.log('window', window.document.location.origin)
    //     window.parent.document.location.href = window.parent.document.location.origin
    //     // document.iframes[0]
    //     // window.local.href = '/'
    //   }
    // },
    // 进度点位置
    countPeople1 () {
      var b = this.BetApplyCount
      if (b >= 500) {
        this.$refs.code1[0].className = 'on'
      }
      if (b >= 800) {
        this.$refs.code1[1].className = 'on'
      }
      if (b >= 1100) {
        this.$refs.code1[2].className = 'on'
      }
      if (b >= 1500) {
        this.$refs.code1[3].className = 'on'
      }
      if (b >= 1900) {
        this.$refs.code1[4].className = 'on'
      }
      if (b >= 2300) {
        this.$refs.code1[5].className = 'on'
      }
    },
    countPeople2 () {
      var b = this.DepApplyCount
      if (b >= 500) {
        this.$refs.code2[0].className = 'on'
      }
      if (b >= 800) {
        this.$refs.code2[1].className = 'on'
      }
      if (b >= 1100) {
        this.$refs.code2[2].className = 'on'
      }
      if (b >= 1600) {
        this.$refs.code2[3].className = 'on'
      }
      if (b >= 2000) {
        this.$refs.code2[4].className = 'on'
      }
      if (b >= 2400) {
        this.$refs.code2[5].className = 'on'
      }
    },
    // 切换日期
    toggle (index) {
      this.active = index
      this.itemShow = index
      this.share = false
    },
    // 查看规则
    showRule (item) {
      this.itemShow = 4
    },
    // 关闭规则
    hideRule (index) {
      this.itemShow = index
    },
    // 邀请红包
    showShare () {
      if (this.dayNum !== 13) {
        return false
      }
      this.share = true
    },
    // 关闭红包
    hideShare () {
      this.share = false
    },
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    },
    /**
     * @description 获取数据
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/carnival/info'
      let params = {
        Token: _this.getinfo().token,
        Pcode: _this.pcode
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.betExist = res.data.Result.BetExist
            _this.depExist = res.data.Result.DepExist
            _this.dayNum = res.data.Result.DayNum
            _this.BetApplyCount = res.data.Result.BetApplyCount
            _this.DepApplyCount = res.data.Result.DepApplyCount
            let temindex = this.date.indexOf('date' + this.dayNum)
            _this.active = temindex === -1 ? 0 : temindex
            _this.toggle(_this.active)
          } else {
            // _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 参加激流勇进
     */
    getBetBouns () {
      let _this = this
      // if (_this.inClickProcess || _this.dayNum !== 14 || _this.betExist) {
      //   return false
      // }
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/carnival/bet'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.betExist = true
            _this.AlertSuccess(res.data.Message)
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 参加存款达人
     */
    getDepBouns () {
      let _this = this
      // if (_this.inClickProcess || _this.dayNum !== 15 || _this.depExist) {
      //   return false
      // }
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/carnival/dep'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.depExist = true
            _this.AlertSuccess(res.data.Message)
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    dbGetBetBonus: _.debounce(function () {
      console.log('current_time', new Date())
      if (!this.betExist) {
        this.getBetBouns()
      }
    }, 1000, {
      leading: true,
      trailing: false
    }),
    dbGetDepBonus: _.debounce(function () {
      console.log('current_time', new Date())
      if (!this.depExist) {
        this.getDepBouns()
      }
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // http://localhost:8080/#/center/external?routename=carnivals&pcode=ZXC0MW
    // http://m.zxc168.net/mobile/#/center/external?routename=carnivals&pcode=ZXC0MW
    // http://localhost:8080/#/visitor/v_carnivals?routename=carnivals&pcode=ZXC0MW
    // http://m.zxc168.net/mobile/#/visitor/v_activity/carnivals?routename=carnivals&pcode=ZXC0MW
    // 只要pcode有值即二维码扫码地址
    this.pcode = this.$route.query.pcode
    if (this.pcode === 'ZXC0MW') {
      this.$emit('setExternalBar', '', '', false)
    } else {
      this.$emit('setExternalBar', '嘉年华', 'back', this.showExternalBar)
    }
    this.loadDataInfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    document.addEventListener('click', this.handleClose)
  }
}
</script>
<style scoped>
.carnivals.on{
  top:0.88rem;
}
.carnivals{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top:0;
  bottom: 0;
  background: #bae3ff;
}
.getBack{
  position: fixed;
  width: 1.44rem;
  height: 0.68rem;
  background: url(../../../../assets/images/activity/Carnivals/Return_ico.png);
  background-size: 100% 100%;
  z-index: 99;
  left: 0.2rem;
  top: 0.4rem;
}
.carnivals .Car-banner{
  width: 100%;
  height: 3.7rem;
  background: url(../../../../assets/images/activity/Carnivals/bg_01.jpg);
  background-size: 100% 100%;
}
.carnivals .Car-main{
  width: 100%;
  height: 8.8rem;
  background: url(../../../../assets/images/activity/Carnivals/bg_02.jpg);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content{
  width: 100%;
  padding: 0 0.1rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.carnivals .Car-main .Car-main-content .box-top{
  width: 100%;
  height: 5.88rem;
  background: url(../../../../assets/images/activity/Carnivals/Content_1_bg.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date{
  width: 7.1rem;
  float: left;
  margin: 0.2rem 0.1rem;
}
.carnivals .Car-main .Car-main-content .box-top .date li{
  width: 1.62rem;
  height: 0.78rem;
  margin: 0 0.075rem;
  float: left;
  cursor: pointer;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date13{
  background: url(../../../../assets/images/activity/Carnivals/date_13_dark.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date14{
  background: url(../../../../assets/images/activity/Carnivals/date_14_dark.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date15{
  background: url(../../../../assets/images/activity/Carnivals/date_15_dark.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date16{
  background: url(../../../../assets/images/activity/Carnivals/date_16_dark.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date13.on{
  background: url(../../../../assets/images/activity/Carnivals/date_13_light.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date14.on{
  background: url(../../../../assets/images/activity/Carnivals/date_14_light.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date15.on{
  background: url(../../../../assets/images/activity/Carnivals/date_15_light.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date16.on{
  background: url(../../../../assets/images/activity/Carnivals/date_16_light.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner{
  float: left;
  width: 7.1rem;
  height: 4.38rem;
  margin: 0 0.12rem;
  position: relative;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item{
  width: 100%;
  height: 100%;
  position: relative;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b1{
  background: url(../../../../assets/images/activity/Carnivals/Content_banner_bg_01.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b2{
  background: url(../../../../assets/images/activity/Carnivals/Content_banner_bg_02.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b3{
  background: url(../../../../assets/images/activity/Carnivals/Content_banner_bg_03.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b4{
  background: url(../../../../assets/images/activity/Carnivals/Content_banner_bg_04.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-top{
  width: 1.32rem;
  height: 0.44rem;
  float: right;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  line-height: 0.4rem;
  text-align: center;
  color: #fff;
  font-size: 0.2rem;
  cursor: pointer;
  background: url(../../../../assets/images/activity/Carnivals/rule_button_ico.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid{
  width: 6rem;
  height: 1.08rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -3rem;
  margin-top: -0.8rem;
  text-align: center;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid h2{
  font-size: 0.45rem;
  color: #ffd11a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid em{
  font-size:0.25rem;
  color: #fff;
}
.text-mid .Progressbar{
  width: 100%;
  height: 0.7rem;
  position: relative;
}
.text-mid .Progressbar .progress{
  width: 100%;
  height: 0.1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: absolute;
  bottom: 0.12rem;
  background: url(../../../../assets/images/activity/Carnivals/line_bg_w.png);
  background-size: 100% 100%;
}
.text-mid .Progressbar .progress .progress-bg{
  width: 100%;
  height: 0.1rem;
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  background: url(../../../../assets/images/activity/Carnivals/line_bg.png);
  background-size: 100% 100%;
}
.text-mid .Progressbar .point{
  width: 0.8rem;
  height: 0.6rem;
  position: absolute;
  margin-left: -0.4rem;
  z-index: 1;
}
.text-mid .Progressbar .point.a{
  left: 21.7%;
}
.text-mid .Progressbar .point.b{
  left: 34.7%;
}
.text-mid .Progressbar .point.c{
  left: 47.8%;
}
.text-mid .Progressbar .point.d{
  left: 65.2%;
}
.text-mid .Progressbar .point.e{
  left: 82.6%;
}
.text-mid .Progressbar .point.f,
.text-mid .Progressbar .point.n{
  left: 100%;
}
.text-mid .Progressbar .point.h{
  left: 20.8%;
}
.text-mid .Progressbar .point.i{
  left: 33.3%;
}
.text-mid .Progressbar .point.j{
  left: 45.8%;
}
.text-mid .Progressbar .point.k{
  left: 66.6%;
}
.text-mid .Progressbar .point.l{
  left: 83.3%;
}
.text-mid .Progressbar .point span{
  font-size: 0.2rem;
  color: #fff;
}
.text-mid .Progressbar .point i{
  display: block;
  width: 0.3rem;
  height:  0.3rem;
  margin: 0 auto;
  background: url(../../../../assets/images/activity/Carnivals/line_point_bg2.png);
  background-size: 100% 100%;
}
.text-mid .Progressbar .point i.on{
  background: url(../../../../assets/images/activity/Carnivals/line_point_bg1.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-mid{
  width: 1.78rem;
  height: 0.62rem;
  position: absolute;
  left: 50%;
  margin-left: -0.89rem;
  bottom: 1.2rem;
  line-height: 0.54rem;
  text-align: center;
  color: #fff;
  font-size: 0.3rem;
  background: url(../../../../assets/images/activity/Carnivals/button_dark.png);
  background-size: 100% 100%;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-mid.on{
  background: url(../../../../assets/images/activity/Carnivals/button_light.png);
  background-size: 100% 100%;
  cursor: pointer;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot{
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot span{
  font-size: 0.3rem;
  color: #fff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot span b{
  font-size: 0.3rem;
  color: #fd4825;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot p{
  font-size: 0.2rem;
  color: #fff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot p em{
  font-size: 0.23rem;
  color: #ffd11a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule{
  width: 100%;
  height: 100%;
  background: url(../../../../assets/images/activity/Carnivals/Content_banner_bg_00.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit{
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  float: left;
  overflow: hidden;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit i{
  display: block;
  width: 0.2rem;
  height: 0.15rem;
  background: url(../../../../assets/images/activity/Carnivals/title_bg_s.png);
  background-size: 100% 100%;
  float: left;
  margin: 0.1rem 0.1rem 0 0.1rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit span{
  font-size: 0.25rem;
  font-weight: bold;
  color: #fff;
  float: left;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table{
  float: left;
  width: 90%;
  margin-left: 0.4rem;
  margin-top: 0.14rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table{
  width: 100%;
  text-align: center;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table thead tr{
  width: 100%;
  height: 0.4rem;
  color: #aebcff;
  font-size: 0.25rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table tbody tr{
  width: 100%;
  height: 0.4rem;
  color: #aebcff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table tbody td{
  font-size: 0.22rem;
  border: 0.02rem solid #697de0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table tbody td.th{
  background: #213594;
  font-size: 0.22rem;
  font-weight: bold;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table thead th{
  font-size: 0.22rem;
  border: 0.02rem solid #697de0;
  background: #213594;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> em{
  font-size: 0.22rem;
  color: #aebcff;
  float: left;
  margin: 0.02rem 0.4rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .text{
  color: #aebcff;
  float: left;
  margin: 0.02rem 0.4rem 0 0.4rem;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .text p{
  font-size: 0.25rem;
  color: #aebcff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule .closed{
  width: 0.46rem;
  height: 0.46rem;
  background: url(../../../../assets/images/activity/Carnivals/closed_ico.png);
  background-size: 100% 100%;
  position: absolute;
  right: 0;
}
.carnivals .share{
  width: 100%;
  height: 13.34rem;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
}
.carnivals .share .img{
  width: 100%;
  height: 100%;
  background: url(../../../../assets/images/activity/Carnivals/redbox.jpg) no-repeat;
  background-size: 100% 100%;
  display: block;
  -webkit-animation: big 4s ;
  animation: big 4s ;
}
.carnivals .share .img .code{
  width: 3.6rem;
  height: 3.6rem;
  background: url(../../../../assets/images/activity/Carnivals/share.png);
  background-size: 100% 100%;
  display: block;
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -1.8rem;
}
.carnivals .share .img .copy{
  width:100%;
  position:absolute;
  bottom: 18%;
  padding:0 0.5rem;
  box-sizing:border-box;
}
.carnivals .share .img .copy span{
  color:#fff;
  display:block;
  float:left;
  width:4.6rem;
  height:0.8rem;
  line-height: 0.8rem;
  background:#c55a13;
  border:0.02rem solid #ec8038;
  border-radius:0.06rem;
  padding:0 0.2rem;
  box-sizing:border-box;
  font-size:0.35rem;
}
.carnivals .share .img .copy button{
  float:right;
  width:1.4rem;
  height:0.8rem;
  background:#f38a1a;
  color:#fff;
  border-radius:0.06rem;
  padding:0 0.2rem;
  box-sizing:border-box;
  font-size:0.35rem;
  cursor:pointer;
}
.carnivals .share .img .text{
  width:100%;
  position:absolute;
  padding:0 .2rem;
  box-sizing:border-box;
  bottom:1rem;
}
.carnivals .share .img .text p{
  font-size:0.3rem;
  color:#fff;
}
.carnivals .share .img em{
  font-size: 0.4rem;
  color: #d6ff3c;
  font-weight: bold;
  float: right;
  margin-top: 1rem;
  margin-right: 0.3rem;
}
.carnivals .Car-main .Car-main-content .box-bottom{
  width: 100%;
}
.carnivals .Car-main .Car-main-content .box-bottom .tit{
  margin-left: 0.3rem;
  margin-top: 0.8rem;
  float: left;
  overflow: hidden;
}
.carnivals .Car-main .Car-main-content .box-bottom .tit i{
  display: block;
  width: 0.4rem;
  height: 0.2rem;
  background: url(../../../../assets/images/activity/Carnivals/title_bg_b.png);
  background-size: 100% 100%;
  float: left;
  margin: 0.2rem 0.1rem 0 0.1rem;
}
.carnivals .Car-main .Car-main-content .box-bottom .tit span{
  font-size: 0.45rem;
  font-weight: bold;
  color: #fff;
  float: left;
}
.carnivals .Car-main .Car-main-content .box-bottom .text{
  width: 100%;
  float: left;
  padding: 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.carnivals .Car-main .Car-main-content .box-bottom .text p{
  font-size: 0.25rem;
  color: #464f65;
  margin: 0.1rem 0;
}
@keyframes big {
  0%  {
    opacity: .5;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  transform:scale(0)
  }
  5% {
    opacity: 1;
  transform:scale(2)
  }
10% {
    opacity: 1;
  transform:scale(1)
  }
16% {
    opacity: 1;
  transform:scale(1.2)
  }
22% {
    opacity: 1;
  transform:scale(1)
  }
28% {
    opacity: 1;
  transform:scale(1.05)
  }
34% {
    opacity: 1;
  transform:scale(1)
  }
40% {
    opacity: 1;
  transform:scale(1.02)
  }
46% {
    opacity: 1;
  transform:scale(1)
  }
  100% {
    opacity: 1;
  transform:scale(1)
  }
}
@-webkit-keyframes big {
  0%  {
    opacity: .5;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  transform:scale(0)
  }
  5% {
    opacity: 1;
  transform:scale(2)
  }
10% {
    opacity: 1;
  transform:scale(1)
  }
16% {
    opacity: 1;
  transform:scale(1.2)
  }
22% {
    opacity: 1;
  transform:scale(1)
  }
28% {
    opacity: 1;
  transform:scale(1.05)
  }
34% {
    opacity: 1;
  transform:scale(1)
  }
40% {
    opacity: 1;
  transform:scale(1.02)
  }
46% {
    opacity: 1;
  transform:scale(1)
  }
  100% {
    opacity: 1;
  transform:scale(1)
  }
}
</style>
