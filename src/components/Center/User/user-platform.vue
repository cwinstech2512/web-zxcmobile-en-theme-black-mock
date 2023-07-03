<template>
<div class='PlatBalance'>
  <div class="box">
    <ul>
      <li><span>18SLOT A/C</span><em>{{zxcBalance}}</em></li>
    </ul>
  </div>
  <div class="box">
    <ul>
      <li
        v-for="(plt, index) in plats"
        :key="index"
      >
        <span>{{plt.GameName}}</span><em @click="getPlatBalance(index)">{{plt.Balance}}</em>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PlatBalance',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      plats: [],
      zxcBalance: '0.00'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
    /**
     * @description 查询主账户余额
     */
    getBalance () {
      var _this = this
      let url = '/api/Balance/Get'
      var params = {
        Token: _this.getinfo().token,
        Plat: 'ZXC'
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.zxcBalance = _this.numberFormat(_.toNumber(res.data.Result), 2)
          } else {
            _this.zxcBalance = res.data.Message
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 查询余额
     */
    getPlatBalance (index) {
      var _this = this
      let url = '/api/Balance/Get'
      _this.$set(_this.plats, index, Object.assign({}, _this.plats[index], {Balance: 'Loading...'}))
      var params = {
        Token: _this.getinfo().token,
        Plat: _this.plats[index].Plat
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$set(_this.plats, index, Object.assign({}, _this.plats[index], {Balance: _this.numberFormat(_.toNumber(res.data.Result), 2)}))
          } else {
            _this.$set(_this.plats, index, Object.assign({}, _this.plats[index], {Balance: res.data.Message}))
          }
        }).catch(err => {
          _this.$set(_this.plats, index, Object.assign({}, _this.plats[index], {Balance: 'Error'}))
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getBalance()
    this.plats = this.$route.params.data
    this.plats.forEach(function (p) {
      p.Balance = '0.00'
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Platform Balance', 'back', 'hide', true)
    for (let index = 0; index < this.plats.length; index++) {
      this.getPlatBalance(index)
    }
  }
}
</script>
<style scoped>
.PlatBalance{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.PlatBalance .box{
  width: 100%;
  background: #121212;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0.2rem 0;
}
.PlatBalance .box ul{
  width: 100%;
  float: left;
  overflow: hidden;
}
.PlatBalance .box ul li{
  height: 0.98rem;
  line-height: 0.98rem;
  background: rgba(115, 114, 114, 1);
  box-shadow: 0 1px rgb(208 207 207 / 90%);
  border-radius: 0.3rem;
  padding: 0 0.3rem;
  margin-top: 0.3rem;
  color: rgba(255, 255, 255, 0.748);
  font-size: 0.32rem;
  display: flex;
  justify-content: space-between;
}
.PlatBalance .box:first-child ul li:first-child{
  /* border-bottom: none */
  background: rgba(0, 151, 246, 1);
}
.PlatBalance .box ul li span{
  float: left;
  font-size: 0.35rem;
  color: rgba(255, 255, 255, 0.748);
  min-width: 25%;
  font-weight: 700;
}
.PlatBalance .box ul li em{
  float: right;
  font-size: 0.35rem;
  color: rgba(255, 255, 255, 0.748);
  white-space: nowrap;
  font-weight: 700;
}
</style>
