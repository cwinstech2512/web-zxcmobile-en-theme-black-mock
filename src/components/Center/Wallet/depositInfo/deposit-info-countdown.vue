<template>
<div class='countdown'>
<div class="timeBar">
  <div class="circle">
    <div class="outside"></div>
    <div class="inside">
      <em>{{minute}}:{{second}}</em>
    </div>
  </div>
  <h2>In progress</h2>
</div>
<div class="textBar">
  <span>Please monitor your balance. </span>
  <span>If your balance is not updated within 3 minutes，please contact our<em @click="service">24/7 help center</em></span>
</div>
<div class="btn" @click="again">Back</div>
</div>
</template>

<script>
export default {
  props: {
    oldZxc: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    // 这里存放数据
    return {
      newZxc: '',
      minute: 0,
      second: 0,
      timer: null,
      Balance: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    service () {
      this.$router.push('/center/service')
      clearInterval(this.timer)
      clearInterval(this.Balance)
    },
    again () {
      this.$router.go(-1)
      clearInterval(this.timer)
      clearInterval(this.Balance)
    },
    getBalance () {
      var _this = this
      function getbalance () {
        let url = '/api/account/getinfo'
        let params = {
          Token: _this.getinfo().token
        }
        _this.$https.fetchPost(url, _this.secret(params))
          .then((res) => {
            if (res.data.Success === true) {
              _this.newZxc = res.data.Result.Balance
              setTimeout(() => {
                if (_this.newZxc !== _this.oldZxc) {
                  _this.again()
                }
              }, 500)
            } else {
              if (!_this.hasPopup) {
                _this.hasPopup = true
                _this.NormalFailConfirm(res.data)
              }
            }
          }).catch(err => {
            console.log('error', err)
          })
      }
      getbalance()
      _this.Balance = setInterval(getbalance, 30000)
    },
    cloak (time) {
      var that = this
      that.minute = Math.floor(time / 60 % 60)
      that.minute < 10 && (that.minute = '0' + that.minute)
      that.second = Math.floor(time % 60)
      function countDown () {
        that.second--
        that.second < 10 && (that.second = '0' + that.second)
        if (that.second.length >= 3) {
          that.second = 59
          that.minute = '0' + (Number(that.minute) - 1)
        }
        if (that.minute.length >= 3) {
          that.minute = '00'
          that.second = '00'
          that.again()
          clearInterval(that.timer)
        }
        // console.log(that.minute + '分钟' + that.second + '秒')
      }
      that.timer = setInterval(countDown, 1000)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.cloak(179)
    this.getBalance()
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.Balance)
  }, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.countdown{
  width: 100%;
  overflow: hidden;
}
.countdown .timeBar{
  width: 4rem;
  margin: 1.1rem auto 0 auto;
  text-align: center;
}
.countdown .timeBar .circle{
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  position: relative;
}
.countdown .timeBar .circle .outside{
  width: 2rem;
  height: 2rem;
  background: url(../../../../assets/images/wallet/out_ring_ico@2x.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  -ms-animation: load .8s linear infinite;
  animation: load .8s linear infinite;
}
.countdown .timeBar .circle .inside{
  width: 1.7rem;
  height: 1.7rem;
  background: #c3e0fe;
  border-radius: 50%;
  line-height: 1.7rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.85rem;
  margin-left: -0.85rem;
}
.countdown .timeBar .circle .inside em{
  font-size: 0.35rem;
  color: #333;
}
.countdown .timeBar h2{
  color: #017eff;
  font-size: 0.3rem;
  font-weight: normal;
  margin: 0.3rem 0;
}
.countdown .textBar {
  width: 6rem;
  margin: 0 auto;
  text-align: center;
}
.countdown .textBar span{
  display: block;
  font-size: 0.25rem;
  line-height: 0.4rem;
  color: #6b6b6b;
}
.countdown .textBar span em{
  color: #2b2b2b;
  font-size: 0.25rem;
  text-decoration:underline;
  margin: 0 0.1rem;
}
.countdown .btn{
  width: 4rem;
  height: 0.88rem;
  background: #00c389;
  margin: 0.4rem auto;
  border-radius: 0.06rem;
  color: #fff;
  line-height: 0.88rem;
  text-align: center;
}
@keyframes load{

  0%{transform:rotate(0deg);}

  25%{transform:rotate(90deg);}

  50%{transform:rotate(180deg);}

  75%{transform:rotate(270deg);}

  100%{transform:rotate(360deg);}

}
@-ms-keyframes load{

  0%{-ms-transform:rotate(0deg);}

  25%{-ms-transform:rotate(90deg);}

  50%{-ms-transform:rotate(180deg);}

  75%{-ms-transform:rotate(270deg);}

  100%{-ms-transform:rotate(360deg);}

}
@-webkit-keyframes load{

  0%{-webkit-transform:rotate(0deg);}

  25%{-webkit-transform:rotate(90deg);}

  50%{-webkit-transform:rotate(180deg);}

  75%{-webkit-transform:rotate(270deg);}

  100%{-webkit-transform:rotate(360deg);}

}
</style>
