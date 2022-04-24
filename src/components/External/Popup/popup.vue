<template>
<!-- H5内部Popup -->
<div class='popup' v-show="summ>0">
  <!-- 常规弹窗 -->
  <actPopup
    v-show="showActPopup"
    @closePopup='closePopup'
    :promoUrl='promoUrl'
  />
  <!-- 红包弹窗 -->
  <redPopup
    v-show="showRedPopup && !showActPopup"
    @closePopup='closePopup'
    :redPopupText='redPopupText'
    :redPopupAmount='redPopupAmount'
  />
</div>
</template>

<script>
import actPopup from '@/components/External/Popup/popup-activity.vue'
import redPopup from '@/components/External/Popup/popup-red.vue'
export default {
  name: 'popup',
  //  import引入的组件需要注入到对象中才能使用
  components: {actPopup, redPopup},
  data () {
  //  这里存放数据
    return {
      summ: 0,
      showActPopup: false,
      promoUrl: '',
      showRedPopup: false,
      redPopupText: '',
      redPopupAmount: '0.00'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 关闭弹窗
    closePopup (v) {
      if (v === 'act') {
        this.showActPopup = false
      } else {
        this.showRedPopup = false
      }
      this.summ--
    },
    showDialog () {
      var _this = this
      let dialog = sessionStorage.getItem('PopupDialog')
      if (!dialog) {
        let url = '/api/popup/dialog'
        let params = {
          Token: _this.getinfo().token
        }
        _this.$https.fetchPost(url, _this.secret(params))
          .then((res) => {
          // console.log('popup_data', res.data.Result)
            sessionStorage.setItem('PopupDialog', true)
            if (res.data.Success === true) {
              _this.showActPopup = res.data.Result.Popup.Bit
              _this.promoUrl = res.data.Result.Popup.PromoUrl
              _this.showRedPopup = res.data.Result.Redpkg.Bit
              _this.redPopupText = res.data.Result.Redpkg.Msg
              _this.redPopupAmount = res.data.Result.Redpkg.Amount
              if (_this.showActPopup) {
                _this.summ++
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
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.showDialog()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
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
</style>
