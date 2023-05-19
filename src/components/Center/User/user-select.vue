<template>
<div class="bankSelect">
  <div class="redirect_group">
    <div class="redirectBtn secondBtn" @click="redirect(0)">GCash</div>
    <div class="redirectBtn primaryBtn" @click="redirect(1)">Bank Card</div>
    <div class="redirectBtn normalBtn" @click="redirect(2)">USDT</div>
    <!-- <div class="normalBtn redirectBtn">虚拟钱包</div> -->
  </div>
</div>
</template>

<script>
export default {
  name: 'bankSelect',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      select: 'bankSelect',
      bankSelect: ['gcashCard', 'bankCard', 'virtualWallet'],
      withdrawalSelect: ['gcash', 'wallet', 'usdtWallet']
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    redirect (index) {
      var _this = this
      var name = ''
      if (!_this.select) {
        name = _this.withdrawalSelect[index]
      } else {
        name = _this[_this.select][index]
      }

      this.$router.push({
        name: name,
        params: { index: this.$route.params.index }
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.$bus.$emit('loadingShow')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.select = sessionStorage.getItem('select')
    var title = ''
    switch (this.select) {
      case 'bankSelect':
        title = 'Wallet To Bind'
        break
      case 'withdrawalSelect':
        title = 'Bank Card & Crypto'
        break
      default:
        title = 'Bank Card & Crypto'
        break
    }
    this.$emit('getStatus', title, 'back', 'hide', true)
  }
}
</script>
<style scoped>
.bankSelect{
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.bankSelect .redirect_group{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.bankSelect .redirect_group .redirectBtn{
  width: 100%;
  height: 0.98rem;
  overflow: hidden;
  margin-bottom: 0.7rem;
  color: #ffffff;
  border-radius: 0.06rem;
  font-size: 0.5rem;
  text-align: center;
  line-height: 0.98rem;
  border-radius: 0.08rem;
  font-size: 0.4rem;
  font-weight: bold;
}
.primaryBtn {
  background: #0097f6 !important;
}
.secondBtn{
  background: #5d95c7 !important;
}
.normalBtn{
  background: #ABB5BE !important;
}
</style>
