<template>
<div class='exchange' :class="showExternalBar? 'on':''">
  <div class="box"
    v-for="(product, index) in products"
    :key="index"
  >
    <ul>
      <li><h2>{{product.Name}}</h2></li>
      <li><p>价格{{numberFormat(product.Price)}}淘金币</p></li>
    </ul>
    <button @click="dbGetChipCash(product)" class="on" :disabled="inChange"></button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'exchange',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      integral: 0,
      products: [],
      inChange: false,
      Info: [
        {
          h2: '38元筹码兑换',
          p: '价格1267淘金币'
        },
        {
          h2: '88元筹码兑换',
          p: '价格2933淘金币'
        },
        {
          h2: '188元筹码兑换',
          p: '价格12933淘金币'
        }
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 获取筹码兑换数据
     */
    loadChipData () {
      let _this = this
      let url = '/api/self/chipdata'
      let params = {
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.integral = res.data.Result.Integral
            _this.products = res.data.Result.Products
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 兑换筹码
     */
    getChipCash (m) {
      let _this = this
      if (_this.inChange) {
        return false
      }
      _this.inChange = true
      let url = '/api/self/chipcash'
      let params = {
        Code: m.Id,
        Price: m.Price,
        Token: this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.inChange = false
          if (res.data.Success === true) {
            _this.AlertSuccess('兑换成功')
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          _this.inChange = false
          console.log('error', err)
        })
    },
    dbGetChipCash: _.debounce(function (m) {
      console.log('current_time', new Date())
      this.getChipCash(m)
    }, 1000, {leading: true, trailing: false})
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChipData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '筹码兑换', 'back', this.showExternalBar)
  }
}
</script>
<style scoped>
.exchange.on{
  top:0.88rem;
}
.exchange{
  width: 100%;
  overflow: hidden;
  padding: 0.2rem 0.3rem 0 0.3rem;
  box-sizing: border-box;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  top:0;
  bottom: 0;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.exchange .box{
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.exchange .box ul{
  width: 80%;
  float: left;
  overflow: hidden;
}
.exchange .box ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
  font-size: 0.32rem;
}
.exchange .box ul li:last-child{
  border-bottom: none
}
.exchange .box ul li h2{
  color: #2b2b2b;
  font-size: 0.32rem;
  font-weight: normal;
}
.exchange .box ul li p{
  color: #6b6b6b;
  font-size: 0.2rem;
}
.exchange .box button.on{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_check_ico@2x.png);
  background-size: 100% 100%;
}
.exchange .box button{
  width: 1rem;
  height: 1rem;
  float: right;
  margin-top: 0.4rem;
  background: url(../../../assets/images/account/apply_nocheck_ico@2x.png);
  background-size: 100% 100%;
}
</style>
