<template>
<div class='service'>
  <div class="service-box">
    <button class="first" @click="serv1">LINE1</button>
    <button class="second" @click="serv2">LINE2</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'service',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {

    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 主线客服
     */
    serv1 () {
      // this.sliaonow()
    },
    /**
     * @description 次线客服
     */
    serv2 () {
      // this.sliaonow2()
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '24/7 Chat', 'menu', 'message')
  }
}
</script>
<style scoped>
.service{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0.98rem;
  background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.service .service-box{
  width: 4rem;
  height: 2.56rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.28rem;
  margin-left: -2rem;
}
.service .service-box button{
  width: 4rem;
  height: 0.98rem;
  margin: 0.15rem 0;
  color: #fff;
  font-size: 0.3rem;
  border-radius: 0.06rem;
}
.service .service-box button.first{
  background: #0088ff;
}
.service .service-box button.second{
  background: #00c389;
}
</style>
