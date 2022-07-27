<template>
<div class='homePage' :class="sideHide? 'hide':''">
  <!-- 步驟 -->
  <!-- <step/> -->
  <!-- 顶部栏 -->
  <navBar
    :navBarName='navBarName'
    :navLeft='navLeft'
    :navRight='navRight'
    :navBarHide='navBarHide'
    @openSide='openSide'
  />
  <!-- 内容页 -->
  <transition name="slide-fade">
    <router-view
      @getStatus="getStatus"
      :gameIndex='$route.params.gameIndex'
    />
  </transition>
  <!-- 底部菜单栏 -->
  <tabBar :routeIndex='routeIndex' :sub='sub'/>
</div>
</template>

<script>
import step from '@/components/Center/Step/step-guide'
import navBar from '@/components/Center/Common/navBar'
import tabBar from '@/components/Center/Common/tabBar'

export default {
  name: 'homePage',
  props: {
    sideHide: {
      type: Boolean
    }
  },
  components: {
    navBar,
    tabBar,
    step
  },
  data () {
  //  这里存放数据
    return {
      navBarName: '',
      navLeft: '',
      navRight: '',
      navBarHide: '',
      sub: '',
      routeIndex: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {
    // 根据路由改变返回tabBar状态
    $route () {
      var that = this
      var name = that.$route.name
      switch (name) {
        case 'home':
          that.routeIndex = 0
          break
        case 'wallet':
          that.routeIndex = 1
          break
        case 'service':
          that.routeIndex = 2
          break
        case 'promotion':
          that.routeIndex = 3
          break
        case 'user':
          that.routeIndex = 4
          break
        default:
          break
      }
    }
  },
  //  方法集合
  methods: {
    // 获取页面导航状态
    getStatus (name, left, right, sub, nav) {
      this.navBarName = name
      this.navLeft = left
      this.navRight = right
      // 当前页是否子页面，是否去掉底部tabbar
      if (sub !== true) {
        this.sub = false
      } else {
        this.sub = true
      }
      // 当前页是否需要顶部navbar
      if (nav !== true) {
        this.navBarHide = false
      } else {
        this.navBarHide = true
      }
    },
    // 左上菜单事件
    openSide () {
      // 正常返回
      if (this.navLeft === 'back') {
        this.$router.back(-1)
        // 老虎机返回
      } else if (this.navLeft === 'slotsBack') {
        this.$router.push({
          name: 'login',
          params: {
            gameIndex: 1
          }
        })
        // 左侧菜单
      } else {
        this.$emit('sideShow')
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.homePage{
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.homePage.hide{
 transform: translateX(6rem);
 transition: transform 0.4s;
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
