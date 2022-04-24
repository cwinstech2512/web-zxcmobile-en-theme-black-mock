<template>
<div class='save'>
  <div class="box"
    v-for="(save, index) in saveInfos"
    :key="index"
  >
    <ul>
      <li>{{save.LevelName}}<b>存送比例：{{pointToPercent(save.Rate)}}</b></li>
      <li>
        <div class="info"><em>{{numberFormat(save.Limit,2)}}</em><p>最高彩金</p></div>
        <div class="info"><em class="blue">{{save.Multiple}}</em><p>（本金+彩金）流水倍数</p></div>
      </li>
    </ul>
    <button @click="showTerms(index)" :class="{on:save.Available}" :disabled="!save.Available || inClickProcess" ></button>
  </div>
  <div class="vipTerms" v-show="vipTerms" @click.self="toggleBox">
    <div class="terms">
      <div class="hd"><h2>优惠条款</h2></div>
      <div class="bd">
        <p>1、本优惠不限制游戏平台；</p>
        <p>2、本优惠每月最多可申请一次；</p>
        <p>3、存送优惠及免费筹码不能同时申请，否则将扣除所有红利彩金；<br>如：领取免费筹码，用免费筹码申请存送优惠，将被扣除所有红利彩金；</p>
        <p>4、所有对冲、和局等（如同一局投注庄和闲、和局）注单流水将不计入有效流水范围；</p>
        <p>5、众鑫娱乐对本次活动保有最终解释权；</p>
        <div class="btnbar"><button @click="dbGetSaveBonus(tempSaveIndex)">确认领取</button><span>确认领取等于同意以上条款</span></div>
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
        this.AlertError('操作失败！')
        return false
      }
      let _this = this
      let ent = _this.saveInfos[index]
      let content = []
      let bal = _.toNumber(_this.getinfo().balance)
      if (bal < 100) {
        _this.AlertError('主账户余额不足100元')
        return false
      }
      let depamount = _.round(ent.Limit / ent.Rate, 2)
      let bonus = bal * ent.Rate
      depamount = bonus >= ent.Limit ? depamount : bal
      bonus = bonus >= ent.Limit ? ent.Limit : bonus
      content.push('账户金额：')
      content.push(_this.numberFormat(bal, 2))
      content.push('申请彩金：')
      content.push(_this.numberFormat(bonus, 2))
      content.push('所需流水：')
      content.push(_this.numberFormat((depamount + bonus) * ent.Multiple, 2))
      content.push('【公式: (本金+彩金) X 流水倍数】')
      this.$swal({
        text: content.join(''),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
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
                _this.AlertSuccess('申请成功')
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
