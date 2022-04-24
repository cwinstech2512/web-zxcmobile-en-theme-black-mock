<template>
<div class='ActivityPopup' @click="closeActivityPopup">
  <div
    class="AP_bg"
    :style="{backgroundImage: 'url(static/images/popup/'+ PicName + ')',backgroundSize:'100% 100%'}"
    @click.stop="gotoPromoPage"
  >
    <div
      class="AP_close"
      :style="{backgroundImage: 'url(static/images/popup/'+ closeBtn + ')',backgroundSize:'100% 100%'}"
      @click.stop="closePopup"
    />
    <div
      class="AP_Btn"
      v-show="promoUrl && promoUrl.length() > 0"
      :style="{backgroundImage: 'url(static/images/popup/'+ urlBtn.name + ')',backgroundSize:'100% 100%'}"
    >{{urlBtn.text}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ActivityPopup',
  props: {
    promoUrl: {
      type: String
    }
  },
  components: {},
  data () {
  //  这里存放数据.
    return {
      closeBtn: 'GoldenPig_bg.png',
      PicName: 'redpackage_windows.jpg',
      urlBtn: {
        name: 'GoldenPig_btn.png',
        text: '点击查看'
      },
      routeName: 'redPopup'
    }
  },
  //  监听属性 类似于data概念
  computed: {
    toUrl: function () {
      let url = '/#/center/external?routename=' + this.routeName + '&pcode='
      if (sessionStorage.getItem('current_os') !== null) {
        url = '..' + url
      }
      return url
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 点击任意区域关闭窗口
     */
    closeActivityPopup () {
      var div = document.querySelector('.ActivityPopup .AP_bg')
      if (div) {
        if (!div.contains(event.target)) {
          if (sessionStorage.getItem('current_os') !== null) {
            window.location.href = 'closewindowview://'
          } else {
            this.$emit('closePopup', 'act')
          }
        }
      }
    },
    /**
     * @description 关闭按钮
     */
    closePopup () {
      if (sessionStorage.getItem('current_os') !== null) {
        window.location.href = 'closewindowview://'
      } else {
        this.$emit('closePopup', 'act')
      }
    },
    gotoPromoPage () {
      // 要在APP里跳转，需要在 Popup.js 里加路由表
      let routeName = this.routeName
      if (sessionStorage.getItem('current_os') !== null) {
        // if (sessionStorage.getItem('current_os') === 'IOS') {
        //   this.$router.push(routeName)
        //   // IOS 升级新版本后用以下方法
        //   // window.location.href = 'openwindow:///Popup.html#/' + routeName
        // } else {
        //   this.$router.push(routeName)
        // }
        window.location.href = 'openwindow:///Popup.html#/' + routeName
      } else {
        this.$router.push({
          path: '/center/external',
          query: {
            routename: routeName,
            pcode: ''
          }
        })
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (sessionStorage.getItem('current_os') !== null) {
      this.promoUrl = ''
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.ActivityPopup{
  width:100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:0;
  left: 0;
  z-index:998;
  background-color:rgba(0,0,0,.6);
}
.ActivityPopup .AP_bg{
  width: 7rem;
  height: 5rem;
  border-radius: 0.1rem;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4rem;
  margin-left: -3.5rem;
  animation: bounceInDown .8s linear;
}
.ActivityPopup .AP_close{
  width: 0.6rem;
  height: 0.82rem;
  position: absolute;
  top: 0;
  right: 3%;
}
.ActivityPopup .AP_Btn{
  position: absolute;
  left: 50%;
  bottom: 0.2rem;
  width: 2.56rem;
  height: 0.6rem;
  margin-left: -1.28rem;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.3rem;
}
</style>
