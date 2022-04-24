<template>
<div class='Unionpay' :class="showExternalBar? 'on':''">
  <div class="Union-banner">
    <!-- <div class="btn" :class="{on:weekOfday ===1}" @click="dbGetApply"></div> -->
    <div class="btn on" @click="dbGetApply"></div>
  </div>
  <div class="Union-main">
    <div class="item">
      <div class="tit">活动内容</div>
      <p>众鑫会员在“存款周期”内使用【云闪付】入款，累计存款达到任意奖励等级，即可申请彩金奖励；</p>
      <p>存款周期：自然周周一00:00至周日23:59，存款以上分时间为准；</p>
      <p>例如：周日23:59分存款，00:00后上分的，该笔存款不算当周累计存款；</p>
      <table>
        <thead>
          <th>奖励等级</th>
          <th>存款周期累计金额</th>
          <th>彩金</th>
          <th>流水要求（不限平台）</th>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>≥621</td>
            <td>28</td>
            <td rowspan="5">3倍流水</td>
          </tr>
          <tr>
            <td>B</td>
            <td>≥3013</td>
            <td>88</td>
          </tr>
          <tr>
            <td>C</td>
            <td>≥6013</td>
            <td>128</td>
          </tr>
          <tr>
            <td>D</td>
            <td>≥10013</td>
            <td>208</td>
          </tr>
          <tr>
            <td>E</td>
            <td>≥20013</td>
            <td>308</td>
          </tr>
        </tbody>
      </table>
      <span>申请时间：次周星期一00:00~23:59进入云闪付活动页面点击“申请彩金”，审核通过后，彩金将于周二下午16:00前派发至游戏主账户，逾期将无法申请本活动；</span>
      <span style="color:red"><br/>注：当天使用云闪付充值时提示当前交易触发银联风控规则或交易次数已经超过限制，请使用其他充值方式进行充值！</span>
    </div>
    <div class="item">
      <div class="tit">活动规则</div>
      <p>1.自然周时间为周一00：00至周日23:59；</p>
      <p>2.所有彩金3倍流水即可提款；</p>
      <p>3.此优惠不与其他优惠共享；（返水除外）</p>
      <p>4.此优惠会员每自然周仅可申请一次彩金奖励；</p>
      <p>5.本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>6.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Unionpay',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      weekOfday: 1,
      inClickProcess: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 申请活动
     */
    getApply () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/unionpay/apply'
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
            _this.AlertSuccess(res.data.Message)
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    dbGetApply: _.debounce(function () {
      console.log('current_time', new Date())
      this.getApply()
    }, 1000, {
      leading: true,
      trailing: false
    })

  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // var weekOfdayNo = this.moment().format('E')
    // this.weekOfday = weekOfdayNo
    // console.log('weekOfday', this.weekOfday)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '云闪付优惠', 'back', this.showExternalBar)
    // 组件多用，路由判断
    // var path = this.$route.path.substring(0, 8)
    // if (path !== '/visitor') {
    //   this.$emit('setExternalBar', '云闪付优惠', 'back', this.showExternalBar)
    // } else {
    //   this.$emit('getStatus', '', '', true, true)
    // }
  }
}
</script>
<style scoped>
.Unionpay.on{
 top:0.88rem;
}
.Unionpay{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top:0;
  bottom: 0;
  padding-bottom: 0.4rem;
  background: #fff;
}
.Unionpay .Union-banner{
  width: 100%;
  height: 5.5rem;
  background: url(../../../../assets/images/activity/Unionpay/bg_01.jpg);
  background-size: 100% 100%;
  position: relative;
}
.Unionpay .Union-banner .btn{
  position: absolute;
  width: 2.02rem;
  height: 0.63rem;
  bottom: 0;
  left: 50%;
  margin-left: -1.01rem;
  background: url(../../../../assets/images/activity/Unionpay/apply_gray_ico.png);
  background-size: 100% 100%;
  cursor: pointer;
}
.Unionpay .Union-banner .btn.on{
  position: absolute;
  width: 2.02rem;
  height: 0.63rem;
  bottom: 0;
  left: 50%;
  margin-left: -1.01rem;
  background: url(../../../../assets/images/activity/Unionpay/apply_ico.png);
  background-size: 100% 100%;
  cursor: pointer;

}
.Unionpay .Union-main{
  width: 100%;
  padding: 0 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto;
}
.Unionpay .Union-main .item{
  width: 100%;
  overflow: hidden;
}
.Unionpay .Union-main .item .tit{
  width: 1.5rem;
  height: 0.66rem;
  background: url(../../../../assets/images/activity/Unionpay/tit_bg.png);
  background-size: 100% 100%;
  color: #fff;
  font-size: 0.25rem;
  text-align: center;
  line-height: 0.8rem;
  margin: 0.2rem 0;
}
.Unionpay .Union-main .item p{
  font-size: 0.25rem;
  color: #333;
  margin: 0.1rem 0;
}
.Unionpay .Union-main .item table{
  width: 100%;
  border: 0.02rem solid #8b8b8b;
  margin: 0.2rem 0;
  text-align: center;
}
.Unionpay .Union-main .item table thead th{
  height: 0.6rem;
  font-size: 0.25rem;
  font-weight: bold;
  color: #333;
  border: 0.02rem solid #8b8b8b;
}
.Unionpay .Union-main .item table tbody td{
  height: 0.6rem;
  font-size: 0.25rem;
  font-weight: normal;
  color: #333;
  border: 0.02rem solid #8b8b8b;
}
.Unionpay .Union-main .item span{
  font-size: 0.25rem;
  color: #333;
}
</style>
