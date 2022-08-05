<template>
<div class='navBar' :class="navHide? 'hide':''">
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
    @click="joinEvent()"
  ><span>Join Now</span></div>
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
    },
    joinEvent () {
      this.$router.push({
        name: 'login',
        params: {
          goReg: true
        }
      })
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
  background: #B0C9D5;
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
.navBar div.navRight {
  border-style: solid;
  border-color: #EBEBEB;
  padding: 0.1rem 0.1rem;
  color: #EBEBEB;
}
.navBar .navRight{
  margin-right: 0.2rem;
  margin-top: 0.12rem;
  top: 0;
  position: absolute;
  right: 0;
}
.navBar .navRight.hide{
  display: none;
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
