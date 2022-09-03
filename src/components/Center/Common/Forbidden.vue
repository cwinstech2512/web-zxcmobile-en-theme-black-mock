<template>
<div class='errorinfo'>
    <!-- 顶部栏 -->
  <navBar
    :navBarName='navBarName'
    :navRight='navRight'
    @openSide='openSide'
  />
  <div class='forbidden'>
    <div class="forbidden-inner">
        <div class="forbidden-img">
          <img src="../../../assets/images/account/forbidden.png"/>
        </div>
        <div class="forbidden-hh">
            <div class="forbidden-hh-text">
                <h2>Sorry！We are not serving your location</h2>
                <h2>Your IP：<span>{{userIP}}</span></h2>
            </div>
        </div>
        <div class="forbidden-dd forbidden-dd-en">
            <div>
                We are not serving your location. Apologise for any inconvenience that this may
                have caused.
                <br /><br />
                Need assistance, Feel free to contact our Customer Service Support
                24/7 via Live Chat or drop us.
                <br /><br />
                which we would be delighted to assistyou accordingly.
                Thank you.
            </div>
        </div>
        <div class="forbidden-fd">
            <div class="forbidden-email"><br /><br />Contact us：support@18slot.vip</div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import navBar from '@/components/Center/Common/navBar'
export default {
  name: 'errorinfo',
  //  import引入的组件需要注入到对象中才能使用
  components: {navBar},
  data () {
  //  这里存放数据
    return {
      navBarName: '404',
      navLeft: 'back',
      navRight: 'hide',
      userIP: 'xxxxxxxxx'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 左上菜单事件
    openSide () {
      this.$router.back(-1)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.userIP = sessionStorage.getItem('ip')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
}
.errorinfo{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.errorinfo .forbidden{
  position: absolute;
  top: 20%;
  padding: 0 3%;
}
.errorinfo .forbidden .forbidden-img {
  text-align: center;
}
.errorinfo .forbidden .forbidden-img img {
  width: 70%;
}
.errorinfo .forbidden .forbidden-hh {
  padding: 0 3%;
  line-height: 26px;
}
.errorinfo .forbidden .forbidden-hh h2{
  font-size: 0.35rem;
  -webkit-text-stroke: 1px #000;
  font-weight: bolder;
}
.errorinfo .forbidden .forbidden-hh h2 > span{
  font-size: 0.33rem;
  -webkit-text-stroke: 1px #599AF3;
  font-weight: bolder;
}
.errorinfo .forbidden .forbidden-dd {
  padding: 3% 5%;
  background-color: #EBEBE9;
  border-radius: 0.1rem 0.1rem 0 0;
}
.errorinfo .forbidden .forbidden-dd > div{
  font-size: 0.3rem;
}
.errorinfo .forbidden .forbidden-fd {
  padding: 3% 5%;
  background-color: #EBEBE9;
  border-radius: 0 0 0.1rem 0.1rem;
}
.errorinfo .forbidden .forbidden-fd > .forbidden-email{
  width: 100%;
  text-align: center;
  position: relative;
}
.errorinfo .forbidden i{
  display: block;
  width: 2.06rem;
  height: 1.6rem;
  margin: 0.3rem auto;
  background: url(../../../assets/images/account/no-page_ico@2x.png);
  background-size: 100% 100%;
}
.errorinfo .forbidden p{
  text-align: center;
  font-size: 0.26rem;
  color: #2b2b2b;
}
</style>
