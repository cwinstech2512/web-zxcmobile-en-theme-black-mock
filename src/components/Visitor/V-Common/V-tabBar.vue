<template>
<div class="tabBar-box" :class="[sub? 'hide':'',tabHide? 'Transparent':'']">
  <div class="login" @click="loginback"></div>
  <ul class='tabBar'>
      <li
        :class="[tabBars.code,{on: index == active}]"
        v-for="(tabBars, index) in tabBar"
        :key="index"
        @click="pageJump(index)"
      >
        <router-link :to="{name:tabBars.code}">
          <i></i>
          <span>{{tabBars.name}}</span>
        </router-link>
      </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'tabBar',
  props: {
    routeIndex: {
      type: Number
    },
    sub: {
      type: Boolean
    },
    tabHide: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      tabBar: [
        {
          code: 'v_home',
          name: 'Home'
        },
        {
          code: 'v_promotion',
          name: 'Promos'
        }
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    // 根据路由改变而改变状态
    $route () {
      this.active = this.routeIndex
    }
  },
  //  方法集合
  methods: {
    pageJump (index) {
      this.active = index
    },
    loginback () {
      this.$router.push('/login')
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
.tabBar-box{
  width: 100%;
  height: 0.98rem;
  position: absolute;
  z-index: 99;
  bottom: 0;
  background: #B0C9D5;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  display: block;
}
.tabBar-box.Transparent{
  background:rgba(0, 0, 0, 0);
  box-shadow: none;
}
.tabBar-box.hide{
  display: none
}
.tabBar-box .tabBar{
  width: 100%;
  overflow: hidden;
}
.tabBar-box.Transparent .tabBar{
  display: none
}
.tabBar li{
  float: left;
  width: 50%;
  height: 100%;
  text-align: center;
}
.tabBar li a{
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tabBar li a span{
  font-size: 0.2rem;
  color: #fff;
}
.tabBar li.on a span{
  font-size: 0.2rem;
  color: #0088ff;
}
.tabBar li a i{
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  margin: 0.1rem auto 0 auto;
  text-align: center;
}
.tabBar li.v_home i{
  background: url(../../../assets/images/tabbar/tabBar_home_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.v_promotion i{
  background: url(../../../assets/images/tabbar/tabBar_promotion_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.v_home.on i{
  background: url(../../../assets/images/tabbar/tabBar_home_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.v_promotion.on i{
  background: url(../../../assets/images/tabbar/tabBar_promotion_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar-box .login{
  position: absolute;
  left: 50%;
  margin-left: -0.55rem;
  top: -0.2rem;
  width: 1.1rem;
  height: 1.1rem;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  background: url(../../../assets/images/tabbar/login_ico_bg@2x.png);
  background-size: 100% 100%;
  font-size: 0.3rem;
}
</style>
