<template>
<div class='service'>
  <div class="service-box">
    <div class="serice_livechat"><button class="first" @click="serv1">Live Chat</button><span id="chatButton"></span></div>
    <button class="second" @click="serv2">Messenger</button>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
var chatButton
export default {
  name: 'service',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {

    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 主线客服
     */
    serv1 () {
      // this.sliaonow()
      chatButton.onClick()
    },
    /**
     * @description 次线客服
     */
    serv2 () {
      this.sliao_messager()
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '24/7 Chat', 'menu', 'message')
    let scriptUrl = 'https://18slot.ladesk.com/scripts/track.js'
    let node = document.createElement('script')
    node.src = scriptUrl
    node.id = 'la_x2s6df8d'
    node.type = 'text/javascript'
    node.async = true
    node.charset = 'utf-8'
    node.onload = function (e) {
      chatButton = window.LiveAgent.createButton('ptaxsxn1', document.getElementById('chatButton'))
      $('.service .service-box .serice_livechat > div').hide()
    }
    document.getElementsByTagName('head')[0].appendChild(node)
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
}
.service{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0.98rem;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #121212;
}
.service .service-box{
  width: 4.6rem;
  height: 2.56rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.service .service-box button{
  width: 4.6rem;
  height: 0.98rem;
  margin: 0.15rem 0;
  color: #fff;
  font-size: 0.4rem;
  border-radius: 0.06rem;
}
.service .service-box button.first{
  background: #e2e2e1;
}
.service .service-box button.second{
  background: #d6e4ea;
}
.service .service-box .serice_livechat > div{
  visibility: hidden;
}
#b_ptaxsxn1_805 {
  visibility: hidden;
}
</style>
