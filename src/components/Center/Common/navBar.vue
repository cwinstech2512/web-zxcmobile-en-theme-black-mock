<template>
<div class='navBar' :class="navBarHide? 'hide':''">
  <div
    :class="[navLeft,'navLeft']"
    @click="leftEvent()"
  ></div>
  <div class="navName">
    <div class="logobar">
      <div class="logobg">
        <div class="logo">
          <div class="logoA"
                @click="returnHome()" />
          <div class="logoB"
                @click="returnHome()" />
        </div>
      </div>
    </div>
  </div>
  <div
    :class="[navRight,'navRight']"
    @click="rightEvent(navRight)"
  ><i :class="newMessage? 'on':''"></i>
  </div>
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
    navRight: {
      type: String
    },
    navBarHide: {
      type: Boolean
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      newMessage: null
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
    },
    rightEvent (right) {
      // 跳转站内信
      if (right === 'message') {
        this.$router.push('/center/message')
        // 跳转添加银行卡
      } else if (right === 'add') {
        this.$router.push('/center/bankCardAdd')
      } else if (right === 'virtualadd') {
        this.$router.push('/center/virtualWalletAdd')
      } else if (right === 'gcashadd') {
        this.$router.push('/center/gcashCardAdd')
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // 有新站内信显示红点
    this.$bus.$on('newMsgShow', () => {
      this.newMessage = true
    })
    this.$bus.$on('newMsgHide', () => {
      this.newMessage = false
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.navBar{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  z-index: 99;
  top: 0;
  background: #121212;
}
.navBar.hide{
  display: none;
}
.navBar .navLeft{
  float: left;
  width: 0.44rem;
  height: 0.44rem;
  margin-left: 0.3rem;
  margin-top: 0.22rem;
}
.navBar .navLeft.menu{
  background: url(../../../assets/images/nav/nav_menu_ico@2x.png);
  background-size: 100% 100%;
}
.navBar .navLeft.back{
  background: url(../../../assets/images/nav/back_ico@2x.png);
  background-size: 100% 100%;
}
.navBar .navLeft.slotsBack{
  background: url(../../../assets/images/nav/back_ico@2x.png);
  background-size: 100% 100%;
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
.navBar .navRight{
  width: 0.54rem;
  height: 0.44rem;
  position: absolute;
  right: 0.3rem;
  top: 0.22rem;
  display: block;
}
.navBar .navRight.hide{
  display: none;
}
.navBar .navRight.add,.navBar .navRight.virtualadd{
  background: url(../../../assets/images/nav/add_bankcard_ico@2x.png);
  background-size: 100% 100%;
  height: 0.54rem;
}
.navBar .navRight.add,.navBar .navRight.gcashadd{
  background: url(../../../assets/images/nav/add_bankcard_ico@2x.png);
  background-size: 100% 100%;
  height: 0.54rem;
}
.navBar .navRight.message{
  background: url(../../../assets/images/nav/message_ico@2x.png);
  background-size: 100% 100%;
}
.navBar .navRight.message i{
  display: none;
  width: 0.16rem;
  height: 0.16rem;
  float: right;
  border-radius: 1rem;
  background: #ff6a6a;
}
.navBar .navRight.message i.on{
  display: block;
}
.navBar .logobar .logobg {
  width: 110px;
  height: 30px;
  position: absolute;
  /* margin: 0 auto; */
}
.navBar .logo {
  width: 110px;
  float: left;
  /* left: 35px; */
  top: 10px;
  position: absolute;
  cursor: pointer;
}
.navBar .logo .logoA {
  width: 100px;
  height: 24px;
  background: url(../../../assets/images/nav/logoA.png);
  animation: flipInY 1.2s ease-in-out;
  margin: 0 auto;
}
.navBar .logo .logoB {
  width: 60px;
  height: 11px;
  background: url(../../../assets/images/nav/logoB.png);
  animation: slideInUp 1.5s ease-in-out;
  margin-left: 24px;
  margin-top: -4px;
}
</style>
