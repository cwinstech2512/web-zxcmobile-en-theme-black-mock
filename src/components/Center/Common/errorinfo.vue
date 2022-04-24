<template>
<div class='errorinfo'>
    <!-- 顶部栏 -->
  <navBar
    :navBarName='navBarName'
    :navLeft='navLeft'
    :navRight='navRight'
    @openSide='openSide'
  />
  <div class="no_page">
    <i></i><p>您的页面已经遗失，请返回上一页！</p>
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
      navRight: 'hide'
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

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.errorinfo{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  background:url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.errorinfo .no_page{
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -2.5rem;
}
.errorinfo .no_page i{
  display: block;
  width: 2.06rem;
  height: 1.6rem;
  margin: 0.3rem auto;
  background: url(../../../assets/images/account/no-page_ico@2x.png);
  background-size: 100% 100%;
}
.errorinfo .no_page p{
  text-align: center;
  font-size: 0.26rem;
  color: #2b2b2b;
}
</style>
