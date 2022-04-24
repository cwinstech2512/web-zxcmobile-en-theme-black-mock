<template>
<div class='RedPopup' >
  <div
    class="RP_bg"
    :style="{backgroundImage: 'url(static/images/popup/'+ PicName + ')',backgroundSize:'100% 100%'}"
  >
    <div class="text">
      <h2>恭喜您！获得一个红包</h2>
      <span><em>{{redPopupAmount}}</em></span>
      <p>红包已派发至主账户<br/>请查收</p>
    </div>
    <div
      class="RP_close"
      :style="{backgroundImage: 'url(static/images/popup/'+ closeBtn + ')',backgroundSize:'100% 100%'}"
      @click="closePopup"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RedPopup',
  props: {
    redPopupText: {
      type: String
    },
    redPopupAmount: {
      type: String
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      closeBtn: 'redbox_closed.png',
      PicName: 'renbox.png'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closePopup () {
      if (sessionStorage.getItem('current_os') !== null) {
        window.location.href = 'closewindowview://'
      } else {
        this.$emit('closePopup', 'red')
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.redPopupAmount = '0.00'
    if (sessionStorage.getItem('current_os') !== null) {
      this.redPopupText = this.$route.params.ptext
      this.redPopupAmount = this.$route.params.pcode
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.RedPopup{
  width:100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  background-color:rgba(0,0,0,.6);
}
.RedPopup .RP_bg{
  width: 6rem;
  height: 8.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -5.3rem;
  margin-left: -3rem;
  animation: bounceInDown .8s linear;
}
.RedPopup .RP_bg .text{
  width: 6rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
  margin-top: 3rem;
}
.RedPopup .RP_bg .text h2{
  color: #ffffff;
  font-size: 0.4rem;
  text-shadow: 0.559px 0.829px 1px rgba(153, 20, 8, 0.74);
  font-weight: normal;
  text-align: center;
}
.RedPopup .RP_bg .text span{
  display: block;
  text-align: center;
  color: #ffe26c;
  font-size: 0.4rem;
  text-shadow: 0.559px 0.829px 1px rgba(153, 20, 8, 0.74);
  line-height: 50px;
}
.RedPopup .RP_bg .text span em{
  font-size: 1.6rem;
  display: block;
  margin: 0.64rem auto;
  font-family: "Arial";
  font-weight: bold;
}
.RedPopup .RP_bg .text p{
  font-size: 0.36rem;
  color: #ffde01;
  text-align: center;
}
.RedPopup .RP_close{
  width: 0.88rem;
  height: 0.88rem;
  position: absolute;
  bottom: -1.08rem;
  right: 50%;
  margin-right: -0.44rem;
}
</style>
