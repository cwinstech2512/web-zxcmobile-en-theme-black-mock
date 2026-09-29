<template>
  <div id="app">
    <div v-if="mockEnabled" class="mock-mode-badge">MOCK MODE · LOCAL DATA</div>
    <!-- 加载loading -->
    <loading v-show="showLoad" :loadingText="loadingText"/>
    <router-view />
  </div>
</template>

<script>
// 初始化自适应单位
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
// (function (doc, win) {
//   var docEl = doc.documentElement // 根元素html
//   // 判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。
//   var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
//   var recalc = function () {
//     var clientWidth = docEl.clientWidth
//     if (!clientWidth) return
//     // 把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。
//     docEl.style.fontSize = (clientWidth / 7.5) + 'px'
//   }
//   if (!doc.addEventListener) return
//   win.addEventListener(resizeEvt, recalc, false)// addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值
//   doc.addEventListener('DOMContentLoaded', recalc, false)// 绑定浏览器缩放与加载时间
// })(document, window)

export default {
  name: 'App',
  components: {},
  data () {
  //  这里存放数据
    return {
      mockEnabled: process.env.WEB_USE_MOCK,
      showLoad: false,
      loadingText: ''
    }
  },
  created () {
    let _this = this
    _this.pageInit()

    // loading加载动画
    _this.$bus.$on('loadingShow', (text) => {
      _this.showLoad = true
      _this.loadingText = text
    })
    _this.$bus.$on('loadingHide', () => {
      _this.showLoad = false
    })

    // 当浏览器被重置大小时自动刷新
    // window.onresize = () => {
    //   return (() => {
    //     _this.$router.go(0)
    //   })()
    // }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-style: normal;
  text-decoration: none;
  text-size-adjust:none;
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  font-family: "Heiti TC","黑體-繁" !important;
}
input, textarea, button,select{
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  background: none;
  outline: none;
  border: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
select{
  background: #aaaaaa url(../../assets/images/home/wallet_arrowdown_ico@2x.png) 95% no-repeat !important;
  background-size: 0.2rem !important;
}
body{
  padding-right: 0px !important
}
body.swal2-iosfix {
  position: static !important;
  z-index: 999;
}
.swal2-popup{
  padding: .5em;
}
#app{
  width: 100%;
  overflow: hidden;
}
.mock-mode-badge {
  position: fixed;
  right: .16rem;
  bottom: 1.16rem;
  z-index: 99999;
  padding: .1rem .16rem;
  border-radius: .08rem;
  color: #111;
  background: #ffd54f;
  box-shadow: 0 .04rem .12rem rgba(0, 0, 0, .28);
  font: bold .2rem/1.2 Arial, sans-serif !important;
  pointer-events: none;
}
</style>
