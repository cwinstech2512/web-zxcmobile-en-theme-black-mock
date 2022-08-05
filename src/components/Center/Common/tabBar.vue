<template>
<ul class='tabBar' :class="sub? 'hide':''">
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
</template>

<script>
import _ from 'lodash'
export default {
  name: 'tabBar',
  props: {
    routeIndex: {
      type: Number
    },
    sub: {
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
          code: 'home',
          name: 'Home'
        },
        {
          // code: 'select',
          code: 'wallet',
          name: 'Wallet'
        },
        {
          code: 'service',
          name: '24/7 Chat'
        },
        {
          code: 'promotion',
          name: 'Promos'
        },
        {
          code: 'user',
          name: 'Me'
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
    dbPageJump: _.debounce(function (index) {
      console.log('current_time', new Date())
      this.pageJump(index)
    }, 6000, {
      leading: false,
      trailing: true
    })
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
.tabBar{
  width: 100%;
  height: 0.98rem;
  position: absolute;
  z-index: 99;
  bottom: 0;
  background: #B0C9D5;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  display: block;
}
.tabBar.hide{
  display: none;
}
.tabBar li{
  float: left;
  width: 20%;
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
.tabBar li.home i{
  background: url(../../../assets/images/tabbar/tabBar_home_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.select i{
  background: url(../../../assets/images/tabbar/tabBar_withdrawal_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.wallet i{
  background: url(../../../assets/images/tabbar/tabBar_withdrawal_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.service i{
  background: url(../../../assets/images/tabbar/tabBar_customer_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.promotion i{
  background: url(../../../assets/images/tabbar/tabBar_promotion_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.user i{
  background: url(../../../assets/images/tabbar/tabBar_account_ico_noncheck@2x.png);
  background-size: 100% 100%;
}
.tabBar li.home.on i{
  background: url(../../../assets/images/tabbar/tabBar_home_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.select.on i{
  background: url(../../../assets/images/tabbar/tabBar_withdrawal_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.wallet.on i{
  background: url(../../../assets/images/tabbar/tabBar_withdrawal_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.service.on i{
  background: url(../../../assets/images/tabbar/tabBar_customer_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.promotion.on i{
  background: url(../../../assets/images/tabbar/tabBar_promotion_ico_check@2x.png);
  background-size: 100% 100%;
}
.tabBar li.user.on i{
  background: url(../../../assets/images/tabbar/tabBar_account_ico_check@2x.png);
  background-size: 100% 100%;
}
</style>
