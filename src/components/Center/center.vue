<template>
<div class='center'>
  <!-- 左侧菜单 -->
  <sideMenu :sideShow="status" @sideHide='sideHide'/>
  <!-- 一级页面 -->
  <homePage :sideHide='status' @sideShow='sideShow'/>
</div>
</template>

<script>
import sideMenu from '@/components/Center/center-sideMenu'
import homePage from '@/components/Center/center-homePage'

export default {
  name: 'center',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    sideMenu,
    homePage
  },
  data () {
  //  这里存放数据
    return {
      status: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    sideShow () {
      this.status = true
    },
    sideHide () {
      this.status = false
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 刷新回到首页，防止当前路由上刷新错误
    if (this.$route.path !== '/center/home' && this.$route.path !== '/center/external') {
      this.$router.push('/center/home')
    }
  }
}
</script>
<style scoped>
.center{
  width: 100%;
  overflow: hidden;
}
</style>
