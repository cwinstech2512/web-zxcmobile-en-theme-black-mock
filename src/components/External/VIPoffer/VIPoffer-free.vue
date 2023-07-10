<template>
<div class='free'>
  <div class="box"
    v-for="(free, index) in freeInfos"
    :key="index"
  >
    <ul>
      <li>{{free.LevelName}}</li>
      <li>
        <div class="info"><em>{{free.Bonus}}</em><p>BONUS AMOUNT</p></div>
        <div class="info"><em class="blue">{{free.Multiple}}</em><p>TURNOVER MULTIPLE</p></div>
      </li>
    </ul>
    <button @click="dbGetFreeBonus(index)" :class="{on:free.Available}" :disabled="!free.Available ||inClickProcess"></button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'free',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      inClickProcess: false,
      freeInfos: []
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
      let url = '/api/vip/freeinfo'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.freeInfos = res.data.Result.Categorys
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
    getFreeBonus (index) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/vip/freeget'
      let params = {
        LevelNum: _this.freeInfos[index].LevelNum,
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.$set(_this.freeInfos, index, Object.assign({}, _this.freeInfos[index], {Available: false}))
            // ent.Available = false
            _this.AlertSuccess('Claimed')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    dbGetFreeBonus: _.debounce(function (ent) {
      console.log('current_time', new Date())
      this.getFreeBonus(ent)
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
</style>
