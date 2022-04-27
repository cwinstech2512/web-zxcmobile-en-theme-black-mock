<template>
<div class='high'>
  <div class="box"
    v-for="(high, index) in feedInfo"
    :key="index"
  >
    <ul>
      <li>{{high.PlatText}}<b>Rebate rate:{{pointToPercent(high.Rete)}}</b></li>
      <li>
        <div class="info"><em>{{numberFormat(high.RebateStake,2)}}</em><p>Wager Amount</p></div>
        <div class="info"><em class="blue">{{numberFormat(high.RebateFactAmount,2) >= 1.0 ? numberFormat(high.RebateFactAmount,2) : '0.00'}}</em><p>Rebate Amount</p></div>
      </li>
    </ul>
    <button @click="dbGetExtraBackwater(index)" :class="{on:high.RebateFactAmount>=1.0}" :disabled="high.RebateFactAmount<1.0 || inClickProcess"></button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'high',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      feedInfo: [],
      inClickProcess: false,
      totalFee: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 加载返水信息
     */
    loadData () {
      let _this = this
      let url = '/api/backwater/info'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.feedInfo = res.data.Result.ExtraCategorys
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 高返水领取
     * @param fee: 高返水信息对象
     */
    getExtraBackwater (index) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/extra'
      let params = {
        Plat: _this.feedInfo[index].Plat,
        Token: this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.$set(_this.feedInfo, index, Object.assign({}, _this.feedInfo[index], {RebateStake: 0, RebateFactAmount: 0}))
            _this.AlertSuccess('领取成功')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    dbGetExtraBackwater: _.debounce(function (index) {
      console.log('current_time', new Date())
      this.getExtraBackwater(index)
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
</style>
