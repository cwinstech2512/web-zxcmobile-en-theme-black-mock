<template>
<div class='messageBox' @click.self="toggleBox">
  <div class="boxMain" :class="out? 'out':''">
    <div class="boxHd">
      <h2>站内信通知</h2>
    </div>
    <div class="boxBd">
      <div class="tit">
        <h2>【{{messageTitle}}】</h2>
        <time>{{messageTime}}</time>
      </div>
      <div class="text">
        <p v-html="messageContent"></p>
      </div>
      <button @click="closeBox()">知道了</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      messageTitle: '',
      messageTime: '',
      messageContent: '',
      out: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('hiddenMsg')
        that.out = false
      }, 600)
      sessionStorage.removeItem('MessageStatus')
    },
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('toggleMsgBox')
        that.out = false
      }, 600)
      sessionStorage.removeItem('MessageStatus')
    },
    // 站内信弹框
    getMessage () {
      let MsgBox = sessionStorage.getItem('MsgBox')
      if (!MsgBox) {
        let url = '/api/Toast/Message'
        let params = {
          Token: this.getinfo().token
        }
        let _this = this
        this.$https
          .fetchPost(url, this.secret(params))
          .then(res => {
            if (res.data.Success === true) {
              sessionStorage.setItem('MsgBox', true)
              _this.messageTitle = res.data.Result.Title
              _this.messageTime = res.data.Result.Time
              _this.messageContent = res.data.Result.Content
              _this.$emit('showMsgBox')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getMessage()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.messageBox{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: block;
}
.messageBox .boxMain{
  width: 6.1rem;
  height: 6.1rem;
  background: #fff;
  border-radius: 0.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -3.05rem;
  margin-left: -3.05rem;
  animation: bounceIn .8s linear;
}
.messageBox .boxMain.out{
  animation: bounceOut .8s linear;
}
.messageBox .boxMain .boxHd{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.messageBox .boxMain .boxHd h2{
  font-size: 0.4rem;
  font-weight: normal;
  color: #2b2b2b;
  text-align: center;
  line-height: 0.98rem;
}
.messageBox .boxMain .boxBd{
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.messageBox .boxMain .boxBd .text{
  width: 100%;
  height: 2.5rem;
  border-bottom: 0.02rem solid #ddd;
  padding-bottom: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.messageBox .boxMain .boxBd .text p{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.messageBox .boxMain .boxBd .text p >>> *{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.messageBox .boxMain .boxBd .tit{
  width: 100%;
  height: 1rem;
  margin-bottom: 0.2rem;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.messageBox .boxMain .boxBd .tit h2{
  font-size: 0.3rem;
  font-weight: normal;
  color: #0088ff;
  margin: 0.1rem;
}
.messageBox .boxMain .boxBd .tit time{
  font-size: 0.2rem;
  display: block;
  line-height: 0.2rem;
  color: #b1b1b1;
}
.messageBox .boxMain .boxBd button{
  width: 4rem;
  height: 0.88rem;
  background: #0088ff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.88rem;
  color: #fff;
  border-radius: 0.06rem;
  display: block;
  margin: 0.25rem auto;
}
</style>
