<template>
<div class='navBar' :class="navHide? 'hide':''">
  <div
    :class="[navLeft,'navLeft']"
    @click="leftEvent()"
  ></div>
  <div class="navName">{{navBarName? navBarName:'众鑫娱乐'}}</div>
</div>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    navBarName: {
      type: String
    },
    navLeft: {
      type: String
    },
    navHide: {
      type: Boolean
    }
  },
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
.navBar.hide{
  display: none;
}
.navBar{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  z-index: 99;
  top: 0;
  background: #fff;
}
.navBar .navName{
  width: 2rem;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.32rem;
  color: #2b2b2b
}
.navBar .navLeft{
  float: left;
  width: 0.44rem;
  height: 0.44rem;
  margin-left: 0.3rem;
  margin-top: 0.22rem;
}
.navBar .navLeft.hide{
  display: none;
}
.navBar .navLeft.back{
  background: url(../../../assets/images/nav/back_ico@2x.png);
  background-size: 100% 100%;
}
</style>
