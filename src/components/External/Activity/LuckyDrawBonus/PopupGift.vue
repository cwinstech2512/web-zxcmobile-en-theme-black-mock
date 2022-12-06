<template>
<!-- H5内部Popup -->
<div class='popup' v-show="showGiftPopup">
  <div class='GiftPopup'>
    <div class="AP_title">
      <img src="../../../../assets/images/activity/LuckyDrawBonus/img/pupup_gift_title.png">
    </div>
    <div
      class="AP_bg"
    >
      <div class="AP_content">
        <div class="content_left"><p>YOU GET</p></div>
        <i :class="icon['conin_'+prize]"></i>
        <!-- <img :src="'../../../assets/images/activity/LuckyDrawBonus/img/'"> -->
      </div>
      <div class="gift_sub_content">
        <img src="../../../../assets/images/activity/LuckyDrawBonus/img/pupup_gift_sub.png">
      </div>
      <div
        class="AP_close"
        :style="{backgroundImage: 'url(static/images/popup/GoldenPig_bg.png)',backgroundSize:'100% 100%'}"
        @click.stop="closePopup"
      ></div>
      <div
        class="AP_Btn"
        @click.stop="closePopup"
      ></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'popup-lucky-gift',
  props: {
    prize: {
      type: Number
    },
    showGiftPopup: {
      type: Boolean
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      icon: {
        conin_0: 'icon_gogo',
        conin_1: 'icon_01',
        conin_2: 'icon_20',
        conin_3: 'icon_03',
        conin_4: 'icon_08',
        conin_5: 'icon_15',
        conin_6: 'icon_50',
        conin_7: 'icon_28',
        conin_8: 'icon_gogo',
        conin_9: 'icon_01',
        conin_10: 'icon_20',
        conin_11: 'icon_03',
        conin_12: 'icon_08',
        conin_13: 'icon_15',
        conin_14: 'icon_50',
        conin_15: 'icon_28'
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 关闭弹窗
    closePopup (v, code) {
      this.$emit('showGiftGift')
    },
    showDialog () {
      var _this = this
      let url = '/api/popup/dialog'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          // console.log('popup_data', res.data.Result)
          if (res.data.Success === true) {
            _this.showActPopup = res.data.Result.Popup.Bit
            _this.promoUrl = res.data.Result.Popup.PromoUrl
            _this.showRedPopup = res.data.Result.Redpkg.Bit
            _this.redPopupText = res.data.Result.Redpkg.Msg
            _this.redPopupAmount = res.data.Result.Redpkg.Amount
            res.data.Result.Toasts.forEach(element => {
              if (!_this.$cookies.isKey('popups_code_' + element.Code) && element.ImgName) {
                let expireTime = new Date()
                if (element.Type === '1') {
                  // 只弹一次
                  expireTime = new Date(element.EndTime)
                } else if (element.Type === '2') {
                  // 每天弹一次
                  expireTime.setHours(23)
                } else if (element.Type === '3') {
                  // 每半天弹一次
                  if (expireTime.getHours() < 12) {
                    expireTime.setHours(11)
                  } else {
                    expireTime.setHours(23)
                  }
                } else {
                  // 其他暂定按当天
                  expireTime.setHours(23)
                }
                expireTime.setMinutes(59)
                expireTime.setSeconds(59)
                if (element.Type !== '4') {
                  // 不是每次都弹，就写cookie
                  _this.$cookies.set('popups_code_' + element.Code, element.Code, expireTime)
                }
                _this.popups.push(element)
              }
            })
            if (_this.popups) {
              _this.summ = _this.popups.length
            }
            if (_this.showRedPopup) {
              _this.summ++
            }
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.showDialog()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.popup{
  width:100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:0;
  left: 0;
  z-index:900;
}
.GiftPopup .AP_title {
  position: absolute;
  top: 31%;
  left: 33%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.GiftPopup .AP_title img{
  width: 150%;
  margin: 0 auto;
}
.GiftPopup{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  display:block;
  background-color:rgba(0,0,0,.6);
}
.GiftPopup .AP_content {
  display: flex;
  margin: 14% 9% 0% 9%;
  height: 32%;
}
.GiftPopup .gift_sub_content {
  text-align: center;
}
.GiftPopup .gift_sub_content > img{
  width: 90%;
  margin: 0 auto;
}
.GiftPopup .AP_content .content_left {
  width: 100%;
  margin: 7% 0;
  /* padding: 0% 2%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.GiftPopup .AP_content .content_left > p
{
  font-size: 0.4rem;
  font-weight: 900;
}
.GiftPopup .AP_content > i
{
  width: 85%;
}
.GiftPopup .AP_bg{
  width: 80%;
  height: 40%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  /* animation: bounceInDown .8s linear; */
  cursor: pointer;
  background: url(../../../../assets/images/activity/LuckyDrawBonus/img/pupup_bg_gift.png) no-repeat;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
}
.GiftPopup .AP_close{
  width: 40px;
  height: 54px;
  position: absolute;
  top: 0;
  cursor: pointer;
  right: 3%;
}
.GiftPopup .AP_Btn{
  position: absolute;
  left: 50%;
  bottom: 0px;
  width: 215px;
  height: 60px;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  cursor: pointer;
  background: url(../../../../assets/images/activity/LuckyDrawBonus/img/pupup_gift_ok.png) no-repeat;
  background-size: 100%;
}
.AP_content i.icon_gogo {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_tryagn.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_01 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_1.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_03 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_3.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_08 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_8.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_15 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_15.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_20 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_20.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_28 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_28.png)
    no-repeat;
    background-size:100% 100%;
}
.AP_content i.icon_50 {
    background: url(../../../../assets/images/activity/LuckyDrawBonus/img/coin_50.png)
    no-repeat;
    background-size:100% 100%;
}
</style>
