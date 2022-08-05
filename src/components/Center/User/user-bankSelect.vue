<template>
<div class="bankSelect">
  <div class="redirect_group">
    <div class="redirectBtn" @click="redirect('bankCard')">Bank Card</div>
    <div class="redirectBtn" @click="redirect('virtualWallet')">Crypto</div>
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
      card: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    redirect (data) {
      this.$router.push({
        name: data
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.$bus.$emit('loadingShow')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '银行卡&钱包绑定', 'back', 'hide', true)
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
  background: #fff;
  border-radius: 0.06rem;
  font-size: 0.5rem;
  text-align: center;
  line-height: 0.98rem;
}
</style>
