<template>
<div class='betting'>
  <div class="betting-main">
    <ul
      v-for="(betting, index) in bettingBar"
      :key="index"
    >
      <li>
        <label>{{betting.PlatText}}</label>
        <em>截止日期：{{betting.LastDate}}</em>
      </li>
      <li>
        <span>有效流水：{{betting.ValidStake}}</span>
      </li>
    </ul>
  </div>
  <div class="betting-bottom">
    <div class="ftop">
      <input type="date" id="beginDate" v-model="startDate">
        -
      <input type="date" id="endDate" v-model="nextDate">
      <input type="button" value="Search" @click="dbGetSearch">
    </div>
    <div class="fbottom">
      <span>TOT DEPOSIT: <em>{{totalDepAmount}}</em></span>
      <span>TOT WAGER: <em>{{totalBetAmount}}</em></span>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'betting',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      startDate: this.moment(new Date()).add(-1, 'days').format('YYYY-MM-DD'),
      nextDate: this.moment(new Date()).format('YYYY-MM-DD'),
      totalDepAmount: '0.00',
      totalBetAmount: '0.00',
      bettingBar: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 查询事件
     */
    getSearch () {
      let _this = this
      _this.$bus.$emit('loadingShow')
      let url = '/api/batstat/get'
      let params = {
        StartDate: _this.startDate,
        EndDate: _this.nextDate,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.totalDepAmount = res.data.Result.TotalDepAmount
            _this.totalBetAmount = res.data.Result.TotalBetAmount
            _this.bettingBar = res.data.Result.TableList
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    dbGetSearch: _.debounce(function () {
      console.log('current_time', new Date())
      this.getSearch()
    }, 1000, {
      leading: true,
      trailing: false
    })

  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Wager Record', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.betting{
  width: 100%;
  overflow: hidden;
}
.betting .betting-main{
  width: 100%;
  padding: 0 0.3rem 0.3rem 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 2rem;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.betting .betting-main ul{
  width: 100%;
  background: #121212;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 0.2rem;
}
.betting .betting-main ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.08rem solid #fff;
}
.betting .betting-main ul li:last-child{
  border-bottom:none
}
.betting .betting-main ul li label{
  color: #2b2b2b;
  font-size: 0.3rem;
}
.betting .betting-main ul li em{
  float: right;
  color: #6b6b6b;
  font-size: 0.2rem;
}
.betting .betting-main ul li span{
  color: #0088ff;
  font-size: 0.25rem;
}
.betting .betting-bottom{
  width: 100%;
  height: 2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #121212;
  position: absolute;
  bottom: 0;
  /* box-shadow: 0 0 0.05rem 0 #fff; */
}
.betting .betting-bottom .ftop{
  width: 100%;
  border-bottom: 0.05rem solid #fff;
  padding: 0.2rem 0;
  box-sizing: border-box;
  font-size: 0.25rem;
}
.betting .betting-bottom .ftop input{
  width: 31%;
  height: 0.6rem;
  line-height: 0.6rem;
  background: #f1f1f1;
  border-radius: 0.06rem;
  font-size: 0.22rem;
  padding-left: 0.1rem;
  box-sizing: border-box;
  position: relative;
}
.betting .betting-bottom .ftop input[type='button']{
  background: #0088ff;
  color: #fff;
  border: none;
  float: right;
}
::-webkit-inner-spin-button { visibility: hidden; }
::-webkit-calendar-picker-indicator {
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: inset 0 1px #fff, 0 1px #eee;
  background-color: #eee;
  color: #666;
  margin: 0;
  position: absolute;
  right: 0.1rem;
}
::-webkit-clear-button{
  visibility: hidden;
}
.betting .betting-bottom .fbottom{
  width: 100%;
  padding-top: 0.25rem;
}
.betting .betting-bottom .fbottom span{
  width: 50%;
  float: left;
  color: #fff;
}
.betting .betting-bottom .fbottom span em{
  color: #ff7200;
  font-size: 0.25rem;
}
</style>
