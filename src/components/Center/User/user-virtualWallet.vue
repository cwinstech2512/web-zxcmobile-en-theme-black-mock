<template>
<div class='virtualWallet'>
  <div class="card"
    v-for="(cards, index) in card"
    :key="index"
  >
    <div class="top">
      <i></i><h2>{{cards.ChainName}}</h2>
    </div>
    <div class="bottom">
      <span>{{cards.WalletAddr}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'virtualWallet',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      card: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 獲取錢包
    getVirtuala () {
      let _this = this
      let url = '/api/withdrawal/getvirtualacc'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.card = res.data.Result.Data
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getVirtuala()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'My Crypto', 'back', 'virtualadd', true)
  }
}
</script>
<style scoped>
.virtualWallet{
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
  background: #fff;
}
.virtualWallet .card:last-child{
  margin-bottom: 0.2rem;
}
.virtualWallet .card{
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
}
.virtualWallet .card .top{
  width: 100%;
  height: 1rem;
  float: left;
}
.virtualWallet .card .top i{
  display: block;
  float: left;
  width: 0.44rem;
  height: 0.44rem;
  margin-top: 0.3rem;
  margin-left: 0.3rem;
  background: url(../../../assets/images/account/bankcard_logo@2x.png);
  background-size: 100% 100%;
}
.virtualWallet .card .top h2{
  color: #fff;
  font-size: 0.35rem;
  font-weight: normal;
  float: left;
  margin-top: 0.25rem;
  margin-left: 0.2rem;
}
.virtualWallet .card .bottom {
  width: 100%;
  height: 1rem;
}
.virtualWallet .card .bottom span{
  color: #fff;
  font-size: 0.4rem;
  font-weight: normal;
  margin-left: 0.3rem;
}
.virtualWallet .card:nth-child(1n+1){
  background: url(../../../assets/images/account/bankcard_red@2x.png);
  background-size: 100% 100%;
}
.virtualWallet .card:nth-child(2n+2){
  background: url(../../../assets/images/account/bankcard_green@2x.png);
  background-size: 100% 100%;
}
.virtualWallet .card:nth-child(3n+3){
  background: url(../../../assets/images/account/bankcard_blue@2x.png);
  background-size: 100% 100%;
}
</style>
