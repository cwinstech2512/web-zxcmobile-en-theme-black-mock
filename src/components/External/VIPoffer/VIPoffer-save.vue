<template>
<div class='save'>
  <div class="box"
    v-for="(save, index) in saveInfos"
    :key="index"
  >
    <ul>
      <li>{{save.LevelName}}<b>Deposit-bonus ratio：{{pointToPercent(save.Rate)}}</b></li>
      <li>
        <div class="info"><em>{{numberFormat(save.Limit,2)}}</em><p>Max. bonus</p></div>
        <div class="info"><em class="blue">{{save.Multiple}}</em><p>(Deposit+Bonus)Turnover multiple</p></div>
      </li>
    </ul>
    <button @click="showTerms(index)" :class="{on:save.Available}" :disabled="!save.Available || inClickProcess" ></button>
  </div>
  <div class="vipTerms" v-show="vipTerms" @click.self="toggleBox">
    <div class="terms">
      <div class="hd"><h2>Terms and Conditions</h2></div>
      <div class="bd">
        <p>1、This promotion is not limited to any gaming platform.</p>
        <p>2、This promotion can be applied for a maximum of once per month.</p>
        <p>3、Deposit bonuses and free chips cannot be applied for at the same time, otherwise all bonus winnings will be deducted；<br>Example: if you claim free chips and use them to apply for a deposit bonus, all bonus winnings will be deducted.</p>
        <p>4、All hedging, draws, etc. (such as betting on both banker and player in the same round, or on a draw) will not be counted towards the valid turnover range.</p>
        <p>5、18SLOT reserves the right of final interpretation for this event.</p>
        <div class="btnbar"><button @click="dbGetSaveBonus(tempSaveIndex)">Confirm Claim </button><span>Confirming the claim is equivalent to agreeing to the above terms and conditions.</span></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'save',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      inClickProcess: false,
      saveInfos: [],
      vipTerms: false,
      tempSaveIndex: -1
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    showTerms (idx) {
      this.tempSaveIndex = idx
      this.vipTerms = true
    },
    toggleBox () {
      this.vipTerms = !this.vipTerms
    },
    /**
     * @description 初始化优惠信息
     * @param index:选项卡序号
     */
    loadinfo () {
      let _this = this
      let url = '/api/vip/forwardinfo'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.saveInfos = res.data.Result.Categorys
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 领取免费彩金
     * @param free:免费彩金信息对象
     */
    getSaveBonus (index) {
      if (index < 0) {
        this.AlertError('Operation failed.')
        return false
      }
      let _this = this
      let ent = _this.saveInfos[index]
      let content = []
      let bal = _.toNumber(_this.getinfo().balance)
      if (bal < 100) {
        _this.AlertError('The main account balance is less than 100 PHP.')
        return false
      }
      let depamount = _.round(ent.Limit / ent.Rate, 2)
      let bonus = bal * ent.Rate
      depamount = bonus >= ent.Limit ? depamount : bal
      bonus = bonus >= ent.Limit ? ent.Limit : bonus
      content.push('Account Balance:')
      content.push(_this.numberFormat(bal, 2))
      content.push('Claim bonus:')
      content.push(_this.numberFormat(bonus, 2))
      content.push('Wagering requirement:')
      content.push(_this.numberFormat((depamount + bonus) * ent.Multiple, 2))
      content.push('【Formula: (Deposit+Bonus)Turnover multiple】')
      this.$swal({
        text: content.join(''),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
        // closeOnConfirm: false
      }).then(res => {
        if (res.value) {
          if (_this.inClickProcess) {
            return false
          }
          _this.inClickProcess = true
          let url = '/api/vip/forwardget'
          let params = {
            LevelNum: _this.saveInfos[index].LevelNum,
            Token: _this.getinfo().token
          }
          if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
            Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
          }
          _this.$https.fetchPost(url, _this.secret(params))
            .then((res) => {
              _this.inClickProcess = false
              if (res.data.Success === true) {
                _this.tempSaveIndex = -1
                _this.vipTerms = false
                _this.$set(_this.saveInfos, index, Object.assign({}, _this.saveInfos[index], {Available: false}))
                // ent.Available = false
                _this.AlertSuccess('Success! Your application has been accepted.')
              } else {
                _this.ExteralFileComfirm(res.data)
              }
            }).catch(err => {
              _this.inClickProcess = false
              console.log('error', err)
            })
        }
      })
    },
    dbGetSaveBonus: _.debounce(function (index) {
      console.log('current_time', new Date())
      this.getSaveBonus(index)
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadinfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, //  生命周期 - 创建之前
  beforeMount () {}, //  生命周期 - 挂载之前
  beforeUpdate () {}, //  生命周期 - 更新之前
  updated () {}, //  生命周期 - 更新之后
  beforeDestroy () {}, //  生命周期 - 销毁之前
  destroyed () {}, //  生命周期 - 销毁完成
  activated () {} //  如果页面有keep-alive缓存功能，这个函数会触发
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
  padding-bottom: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.vipTerms .terms .bd p{
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
