<template>
<!-- PT优惠 -->
<div class='selfHelp-Info'>
<!-- 第一页内容 -->
  <div class="box-bar" v-if="!Details">
    <div class="box"
      v-for="(menu, index) in groups.GroupNames"
      :key="index"
    >
      <ul>
        <li><h2>{{menu}}</h2></li>
        <li><p>{{groupTexts[index]}}</p></li>
      </ul>
      <button class="on" @click="seeDetails(index)"></button>
  </div>
 </div>
 <!-- 第二页内容 -->
  <div class="box-info" v-else>
    <!-- 第二页内容头部 -->
    <ul class="box-info-menu">
      <li
        v-for="(menu, index) in detailInfos[info_menu].subMenu"
        :key="index"
        :class="{on: index == active}"
        @click="chooseType(index)"
      >{{menu}}</li>
    </ul>
    <!-- 第二页内容主体 -->
    <ul class="box-info-main"
      v-for="(list, index) in detailInfos[info_menu].subList"
      :key="index"
      :class="{mainShow: index == active}"
    >
      <li
        v-for="(ctt, index) in list.subContent"
        :key="index"
      >
        <span>{{ctt.Label}}</span>
        <em>{{ctt.Value}}</em>
      </li>
    </ul>
    <div class="btnbar">
      <!-- <button @click="dbJoinPromo" :disabled="inClickProcess">立即申请</button> -->
      <button @click="showTerms" :disabled="inClickProcess">立即申请</button>
      <button class="back" @click="backPage">返回上级</button>
    </div>
  </div>
  <div class="vipTerms" v-show="vipTerms" @click.self="toggleBox">
      <div class="terms">
        <div class="hd"><h2>优惠条款</h2></div>
        <div class="bd">
          <div class="text">
            <p>1、本活动奖金只适用于PT,DT,MG,PG老虎机平台的“经典老虎机”和“电动吃角子老虎机” 。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏，所有刮刮乐游戏，所有Pontoon游戏，各种Craps游戏，赌场战争游戏，娱乐场Hold'em游戏，牌九游戏，多旋转老虎机(地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活)，宝石之轮，东方珍兽，舞龙，比基尼派对，马戏团，反转马戏团，钻石浮华，守财奴和老虎机奖金翻倍投注将不计算在内，如投注此类游戏将取消申领资格，扣除所有红利以及赢利；</p>
            <p>2、此优惠促销只适用于拥有一个独立账户的玩家。同一住址、电子邮箱地址﹑电话号码﹑支付方式（相同借记卡/信用卡/银行账户号码）IP地址，同一身份信息，同一网络环境等将可以作为判定是否独立玩家的条件；</p>
            <p>3、领取优惠后需在一周内完成优惠规定流水或结束活动，否则系统将定期扣除不符合要求账号的平台余额；</p>
            <p>4、“众鑫娱乐” 有权延长，缩短，终止或修改该活动，对本活动拥有最终解释权；</p>
            <p>5、优惠需要依次申请，账户余额小于5元或者完成流水提款视为一个优惠结束，反之将累计计算提款所需流水倍数；</p>
            <p>6、除返水优惠活动，其他活动均为一笔存款对应一个活动。</p>
          </div>
          <div class="btnbar"><button @click="dbJoinPromo">确认领取</button><span>确认领取等于同意以上条款</span></div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'selfHelp-Info',
  props: ['panelIndex', 'selfHelpCode', 'selfHelpGroups', 'selfHelpDetails', 'backBar'],
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      info_menu: -1,
      Details: false,
      plat: '',
      groups: [],
      groupTexts: [],
      detailInfos: [],
      inClickProcess: false,
      vipTerms: false
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    showTerms () {
      this.vipTerms = true
    },
    toggleBox () {
      this.vipTerms = !this.vipTerms
    },
    // 首页申请
    seeDetails (index) {
      this.Details = true
      this.info_menu = index
    },
    // 内页头部切换
    chooseType (index) {
      this.active = index
    },
    // 返回首页
    backPage () {
      this.Details = false
      this.active = 0
    },
    /**
     * @description 参加活动
     */
    joinPromo () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/self/slotsget'
      let params = {
        Plat: this.plat,
        PromoType: this.detailInfos[this.info_menu].subList[this.active].subCode,
        PromoItem: this.detailInfos[this.info_menu].subMenu[this.active],
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.AlertSuccess('申请成功')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 数据处理
     */
    computeDataInfo () {
      this.plat = this.selfHelpCode[this.panelIndex]
      this.groups = this.selfHelpGroups[this.panelIndex]
      this.groups.GroupNames.forEach(v => {
        // 设置描述
        if (v === '救援金') {
          this.groupTexts.push('申请成功后彩金自动派发至' + this.plat + '账户')
        } else {
          this.groupTexts.push('转入' + this.plat + '金额 × 存送比例 = 存送彩金')
        }
        // 设置详细菜单及内容
        var subDetails = this.selfHelpDetails.filter(x => { return x.Plat === this.plat && x.GroupName === v })
        var subMenu = subDetails.map(x => x.DonateAmountRate)
        var subList = []
        subDetails.forEach(s => {
          var dict = {'10%': 1, '11%': 3, '12%': 7, '15%': 30}
          var subCode = ''
          var subContent = []
          if (v === '救援金') {
            subCode = 'Rescus'
            subContent.push({Label: '连续存款天数', Value: dict[s.DonateAmountRate]})
            subContent.push({Label: '每天至少有一笔存款', Value: '≥100'})
            subContent.push({Label: '救援金比例', Value: s.DonateAmountRate})
            subContent.push({Label: '流水倍数', Value: s.BetMultiple})
          } else if (v === '笔笔存送') {
            subCode = 'EveryTime'
            subContent.push({Label: '存送比例', Value: s.DonateAmountRate})
            subContent.push({Label: '最低转账', Value: s.ActiveAmountText})
            subContent.push({Label: '最高奖金', Value: s.DonateAmountMax})
            subContent.push({Label: '流水倍数', Value: '（本金+彩金）*' + s.BetMultiple})
          } else if (v === '首笔存送') {
            subCode = 'FirstTime'
            subContent.push({Label: '存送比例', Value: s.DonateAmountRate})
            subContent.push({Label: '最低转账', Value: s.ActiveAmountText})
            subContent.push({Label: '最高奖金', Value: s.DonateAmountMax})
            subContent.push({Label: '流水倍数', Value: '（本金+彩金）*' + s.BetMultiple})
          }
          subList.push({subContent: subContent, subCode: subCode})
        })
        this.detailInfos.push({subMenu: subMenu, subList: subList})
      })
      // console.log('数据', this.detailInfos)
    },
    dbJoinPromo: _.debounce(function () {
      console.info('current_time', new Date())
      this.joinPromo()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.computeDataInfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.vipTerms{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  display: block;
}
.vipTerms .terms{
  width: 6.1rem;
  background: #fff;
  border-radius: 0.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -4.05rem;
  margin-left: -3.05rem;
  box-shadow: 0 0 0.4rem 0 #929292;
}
.vipTerms .terms .hd{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.vipTerms .terms .hd h2{
  font-size: 0.4rem;
  font-weight: normal;
  color: #2b2b2b;
  text-align: center;
  line-height: 0.98rem;
}
.vipTerms .terms .bd{
  padding: 0 0.2rem;
  width: 100%;
  border-bottom: 0.02rem solid #ddd;
  padding-bottom: 0.3rem;
  overflow: hidden;
  box-sizing: border-box;
}
.vipTerms .terms .bd .text{
  width: 100%;
  height: 4rem;
  border-bottom: 0.02rem solid #ddd;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.vipTerms .terms .bd .text p{
  font-size: 0.2rem;
  color: #333;
  margin: 0.1rem 0;
}
.vipTerms .terms .bd .btnbar{
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.vipTerms .terms .bd .btnbar button{
  width: 4rem;
  height: 0.88rem;
  background: #0088ff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.88rem;
  color: #fff;
  border-radius: 0.06rem;
  display: block;
  margin: 0.25rem auto 0 auto;
}
.vipTerms .terms .bd .btnbar span{
  font-size: 0.2rem;
  color: #666;
}
</style>
