<template>
<div class='externalBar' :class="barShow? '':'hide'">
  <div
    :class="[barLeft,'barLeft']"
    @click="leftEvent()"
  ></div>
  <div class="barName">{{barName? barName:''}}</div>
</div>
</template>

<script>
export default {
  name: 'externalBar',
  props: {
    barName: {
      type: String
    },
    barLeft: {
      type: String
    },
    barRight: {
      type: String
    },
    barShow: {
      type: Boolean
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
    leftEvent () {
      this.$emit('openSide')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.externalBar{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  z-index: 99;
  top: 0;
  background: #fff;
}
.externalBar.hide{
  display: none;
}
.externalBar .barLeft{
  float: left;
  width: 0.44rem;
  height: 0.44rem;
  margin-left: 0.3rem;
  margin-top: 0.22rem;
}
.externalBar .barLeft.menu{
  background: url(../../../assets/images/nav/nav_menu_ico@2x.png);
  background-size: 100% 100%;
}
.externalBar .barLeft.back{
  background: url(../../../assets/images/nav/back_ico@2x.png);
  background-size: 100% 100%;
}
.externalBar .barLeft.homeback{
  background: url(../../../assets/images/nav/back_ico@2x.png);
  background-size: 100% 100%;
}
.externalBar .barName{
  width: 4rem;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.32rem;
  color: #2b2b2b
}
</style>
