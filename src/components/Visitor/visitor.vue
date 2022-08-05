<template>
<div class='Visitor'>
  <navBar
    :navBarName='navBarName'
    :navLeft='navLeft'
    :navRight='navRight'
    :navHide='navHide'
    @openSide='openSide'
  />
  <transition name="slide-fade">
    <router-view @getStatus='getStatus'/>
  </transition>
  <tabBar
    :routeIndex='routeIndex'
    :sub='sub'
    :tabHide='tabHide'
  />
</div>
</template>

<script>
import navBar from '@/components/Visitor/V-Common/V-navBar'
import tabBar from '@/components/Visitor/V-Common/V-tabBar'

export default {
  name: 'Visitor',
  //  import引入的组件需要注入到对象中才能使用
  components: {navBar, tabBar},
  data () {
  //  这里存放数据
    return {
      routeIndex: null,
      showLoad: false,
      navBarName: '',
      navLeft: '',
      navRight: '',
      sub: '',
      navHide: false,
      tabHide: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    $route () {
      var that = this
      var name = that.$route.name
      switch (name) {
        case 'v_home':
          that.routeIndex = 0
          break
        case 'v_promotion':
          that.routeIndex = 1
          break
        default:
          break
      }
    }
  },
  //  方法集合
  methods: {
    // 获取页面导航状态
    getStatus (name, left, tabHide, sub, hide) {
      this.navBarName = name
      this.navLeft = left
      if (tabHide !== true) {
        this.tabHide = false
      } else {
        this.tabHide = true
      }
      if (sub !== true) {
        this.sub = false
      } else {
        this.sub = true
      }
      if (hide !== true) {
        this.navHide = false
      } else {
        this.navHide = true
      }
    },
    // 左上菜单事件
    openSide () {
      this.$router.back(-1)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    if (this.$route.name === 'visitor') {
      this.$router.push('/')
    } else {
      if (this.$route.path !== '/visitor/v_home' && this.$route.matched[1].name !== 'v_activity') {
        this.$router.push('/visitor/v_home')
      }
    }
  }
}
</script>
<style scoped>
.Visitor{
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
