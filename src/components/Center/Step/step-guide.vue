<template>
<div class="step" @click="stepRun()" v-if="stepMax > 0">
  <div class="step_group">
    <div class="phone_group" v-if="step == 1">
      <div class="ring"></div>
      <img src="../../../assets/images/home/phone_arrow.png">
      <p>验证手机号</p>
    </div>
    <div class="bankCard_group" v-if="step == 2">
      <div class="ring"></div>
      <img src="../../../assets/images/home/bank_card_arrow.png">
      <p>绑定银行卡</p>
    </div>
    <div class="msg_group">
      <p>亲爱的用户您好:</p>
      <p>充值前需要您先完成【绑定银行卡及验证手机码】</p>
      <p class="red">{{ stepText }}</p>
      <img src="../../../assets/images/home/yes_button.png">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'selfHelp',
  props: {
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      step: 0,
      stepMax: 0,
      stepText: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    stepRun () {
      this.step = this.step + 1
      let _this = this
      switch (this.step) {
        case 2:
          _this.stepText = '您当前还未绑定银行卡'
          break
      }
      if (this.step > this.stepMax) {
        this.step = 0
        this.stepMax = 0
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (to.name === 'wallet') {
        let _this = this
        let url = '/api/account/checkverifyphone'
        let params = {
          Token: _this.getinfo().token
        }
        _this.$https.fetchPost(url, _this.secret(params))
          .then((res) => {
            _this.$bus.$emit('loadingHide')
            if (res.data.Success === true) {
              if (!res.data.Result.Status) {
                if (from.name !== 'user') {
                  this.$router.push({
                    name: 'user'
                  })
                }
                _this.stepMax = _this.stepMax + 1
              }
            }
            let varifyPhone = res.data.Result.Status
            url = '/api/withdrawal/getdrawcard'
            _this.$https
              .fetchPost(url, this.secret({ Token: this.getinfo().token }))
              .then(res => {
                _this.$bus.$emit('loadingHide')
                if (res.data.Success === true) {
                  if (res.data.Result.Data.length < 1) {
                    if (from.name !== 'user') {
                      this.$router.push({
                        name: 'user'
                      })
                    }
                    _this.stepMax = _this.stepMax + 1
                    _this.stepText = '您当前还未绑定银行卡'
                  }
                  if (res.data.Result.Data.length < 1 && !varifyPhone) {
                    _this.step = 1
                    _this.stepText = '您当前还未验证手机号'
                  } else if (!varifyPhone) {
                    _this.step = 1
                    _this.stepText = '您当前还未验证手机号'
                  } else if (res.data.Result.Data.length < 1) {
                    _this.step = 2
                    _this.stepText = '您当前还未绑定银行卡'
                  } else {
                    next()
                  }
                }
              })
              .catch(err => {
                console.log(err)
              })
          }).catch(err => {
            console.log('error', err)
          })
      } else {
        next()
      }
    })
  }
}
</script>
<style scoped>
.step{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
}
.step .step_group{
  width: 100%;
  height: 100%;
  position: relative;
}
.step .step_group .bankCard_group .ring{
  box-shadow: rgb(33 33 33 / 0%) 0px 0px 1px 2px, rgb(33 33 33 / 76%) 0px 0px 0px 5000px;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: 34%;
  right: 9%;
  border: 1px solid white;
}
.step .step_group .bankCard_group img{
  width: 22%;
  position: absolute;
  top: 43%;
  right: 12%;
}
.step .step_group .phone_group .ring{
  box-shadow: rgb(33 33 33 / 0%) 0px 0px 1px 2px, rgb(33 33 33 / 76%) 0px 0px 0px 5000px;
  width: 90px;
  height: 85px;
  position: absolute;
  border-radius: 50%;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
}
.step .step_group .phone_group img{
  top: 50%;
  position: absolute;
  width: 25%;
  left: 30%;
  transform: translateX(-50%);
}
.step .step_group .bankCard_group p,.step .step_group .phone_group p{
  position: absolute;
  color: white;
  display: inline-block;
  border-bottom: 1px solid white;
  font-size: 24px;
}
.step .step_group .bankCard_group p{
  top: 55%;
  right: 8%;
}
.step .step_group .phone_group p{
  top: 59%;
  left: 11%;
}
.step .step_group .msg_group{
  position: absolute;
  width: 85%;
  color: white;
  font-size: 15px;
  top: 16%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}
.step .step_group .msg_group p{
  line-height: 24px;
}
.step .step_group .msg_group p.red{
  color: #fa5e5e;
}
.step .step_group .msg_group img{
  position: absolute;
  width: 37%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: -187%;
}
</style>
