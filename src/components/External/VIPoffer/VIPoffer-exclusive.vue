<template>
<div class='exclusive'>
  <div class="box"
    v-for="(feed, index) in feedInfos"
    :key="index"
  >
    <ul>
      <li>{{feed.LevelName}}-{{feed.PlatText}}<b>Rebate ratio：{{pointToPercent(feed.Rate)}}</b></li>
      <li>
        <div class="info"><em>{{numberFormat(feed.RebateStake,2)}}</em><p>BETTING AMOUNT</p></div>
        <div class="info"><em class="blue">{{numberFormat(feed.RebateFactAmount,2)}}</em><p>REBATE AMOUNT</p></div>
      </li>
    </ul>
    <button @click="dbGetFeedBonus(index)" :class="{on:feed.RebateFactAmount!==0}" :disabled="feed.RebateFactAmount===0 || inClickProcess"></button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'exclusive',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      inClickProcess: false,
      feedInfos: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 初始化优惠信息
     * @param index:选项卡序号
     */
    loadinfo () {
      let _this = this
      let url = '/api/vip/feedinfo'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.feedInfos = res.data.Result.Categorys
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 领取返水
     * @param feed:返水信息对象
     */
    getFeedBonus (index) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/vip/feedget'
      let params = {
        Plat: _this.feedInfos[index].Plat,
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            // feed.RebateStake = 0
            // feed.RebateFactAmount = 0
            _this.$set(_this.feedInfos, index, Object.assign({}, _this.feedInfos[index], {RebateStake: 0, RebateFactAmount: 0}))
            _this.AlertSuccess('Claimed')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    dbGetFeedBonus: _.debounce(function (ent) {
      console.log('current_time', new Date())
      this.getFeedBonus(ent)
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

  }
}
</script>
<style scoped>
</style>
