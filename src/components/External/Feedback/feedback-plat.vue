<template>
<div class='plat'>
  <button class="getAll" v-show="feedInfo.length>0" @click="backwaterGetAll" :disabled="totalFee===0 || inClickProcess">GET ALL<span> ( AVAILABLE ₱<em>{{numberFormat(totalFee,2)}}</em> )</span></button>
  <template v-for="(plats, index) in feedInfo">
    <div class="box"
      v-if="plats.Plat !== 'SP'"
      :key="index"
    >
      <ul>
        <li>{{plats.PlatText}}<b>Rebate rate:{{pointToPercent(plats.Rete)}}</b></li>
        <li>
          <div class="info"><em>{{numberFormat(plats.RebateStake,2)}}</em><p>WAGER AMOUNT</p></div>
          <div class="info"><em class="blue">{{numberFormat(plats.RebateFactAmount,2) >= 1.0 ? numberFormat(plats.RebateFactAmount,2) : '0.00'}}</em><p>REBATE AMOUNT</p></div>
        </li>
      </ul>
      <button @click="dbGetBackwater(index)" :class="{on:plats.RebateFactAmount>=1.0}" :disabled="plats.RebateFactAmount<1.0 || inClickProcess"></button>
    </div>
  </template>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'plat',
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
            _this.feedInfo = res.data.Result.Categorys
            _this.totalFee = _.sumBy(_this.feedInfo, function (o) { return o.RebateFactAmount })
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 返水领取
     * @param index: 序号
     */
    getBackwater (index) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/get'
      let params = {
        Plat: _this.feedInfo[index].Plat,
        GameType: _this.feedInfo[index].GameType,
        Token: this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$set(_this.feedInfo, index, Object.assign({}, _this.feedInfo[index], {RebateStake: 0, RebateFactAmount: 0}))
            _this.AlertSuccess('SUCCESS')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
          _this.inClickProcess = false
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    // 一键领取
    backwaterGetAll () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/get'
      let params = {
        'Plat': '',
        'GameType': '',
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            for (let index = 0; index < _this.feedInfo.length; index++) {
              _this.$set(_this.feedInfo[index], 'RebateStake', 0)// 此处为重点
              _this.$set(_this.feedInfo[index], 'RebateFactAmount', 0)// 此处为重点
            }
            _this.totalFee = 0
            _this.AlertSuccess('SUCCESS')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
          _this.inClickProcess = false
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    dbGetBackwater: _.debounce(function (index) {
      console.log('current_time', new Date())
      this.getBackwater(index)
    }, 1000, {
      leading: true,
      tailing: false
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
