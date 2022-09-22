<template>
<div class='bankCard'>
  <div class="card"
    v-for="(cards, index) in card"
    :key="index"
  >
    <div class="top">
      <i></i><h2>{{cards.BankName}}</h2>
    </div>
    <div class="bottom">
      <span>{{cards.CardNumber}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'bankCard',
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
    // 获取提款卡
    getCards () {
      let _this = this
      let url = '/api/withdrawal/getdrawcard'
      _this.$https
        .fetchPost(url, _this.secret({ Token: this.getinfo().token }))
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
    this.getCards()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'My Bank Card', 'back', 'add', true)
  }
}
</script>
<style scoped>
.bankCard{
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
.bankCard .card:last-child{
  margin-bottom: 0.2rem;
}
.bankCard .card{
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
}
.bankCard .card .top{
  width: 100%;
  height: 1rem;
  float: left;
}
.bankCard .card .top i{
  display: block;
  float: left;
  width: 0.44rem;
  height: 0.44rem;
  margin-top: 0.3rem;
  margin-left: 0.3rem;
  background: url(../../../assets/images/account/bankcard_logo@2x.png);
  background-size: 100% 100%;
}
.bankCard .card .top h2{
  color: #717170;
  font-size: 0.35rem;
  font-weight: normal;
  float: left;
  margin-top: 0.25rem;
  margin-left: 0.2rem;
}
.bankCard .card .bottom {
  width: 100%;
  height: 1rem;
}
.bankCard .card .bottom span{
  color: #717170;
  font-size: 0.4rem;
  font-weight: normal;
  margin-left: 0.3rem;
}
.bankCard .card:nth-child(1n+1){
  background: url(../../../assets/images/account/bankcard_style1@1x.png);
  background-size: 100% 100%;
}
.bankCard .card:nth-child(2n+2){
  background: url(../../../assets/images/account/bankcard_style2@1x.png);
  background-size: 100% 100%;
}
.bankCard .card:nth-child(3n+3){
  background: url(../../../assets/images/account/bankcard_style3@1x.png);
  background-size: 100% 100%;
}
.bankCard .card:nth-child(4n+4){
  background: url(../../../assets/images/account/bankcard_style4@1x.png);
  background-size: 100% 100%;
}
.bankCard .card:nth-child(5n+5){
  background: url(../../../assets/images/account/bankcard_style5@1x.png);
  background-size: 100% 100%;
}
</style>
