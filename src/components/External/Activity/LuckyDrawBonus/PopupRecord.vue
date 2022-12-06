<template>
<!-- H5内部Popup -->
<div class='popup' v-show="showActPopup">
  <div class='ActivityPopup'>
    <div class="AP_title">
      <img src="../../../../assets/images/activity/LuckyDrawBonus/img/title_draw_record.png">
    </div>
    <div
      class="AP_bg"
    >
      <div
        class="AP_close"
        :style="{backgroundImage: 'url(static/images/popup/GoldenPig_bg.png)',backgroundSize:'100% 100%'}"
        @click.stop="closePopup"
      ></div>
      <div class="pop_content">
        <div class="table_title">
          <span>Prize Name</span>
          <span>Time</span>
          <span>Status</span>
        </div>
        <div class="c_area_7">
          <table>
            <tbody>
              <tr v-for="(record, index) in records"
                :key="index">
                <td width="25%" class="left"><p>{{record.PrizeName}}</p></td>
                <td width="52%" class="center"><p>{{moment(record.DrawTime).format('YYYY/MM/DD HH:mm:ss')}}</p></td>
                <td width="17%" class="right"><p>{{record.Status}}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'popup-lucky-draw',
  props: {
    records: {
      type: Array
    },
    showActPopup: {
      type: Boolean
    }
  },
  data () {
  //  这里存放数据
    return {
      summ: 0,
      promoUrl: '',
      showRedPopup: false,
      redPopupText: '',
      redPopupAmount: '0.00',
      code: '',
      imgName: '',
      popups: []
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
      this.$emit('showRecordRecord')
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
.ActivityPopup{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  display:block;
  background-color:rgba(0,0,0,.6);
}
.ActivityPopup .AP_title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.ActivityPopup .AP_title img{
  width: 100%;
  margin: 0 auto;
}
.ActivityPopup .AP_bg{
  width: 80%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* animation: bounceInDown .8s linear; */
  cursor: pointer;
  background-color: rgba(219,202,207,.9);
  border: 5px solid rgba(177,85,115,.9);
}
.ActivityPopup .AP_close{
  width: 40px;
  height: 54px;
  position: absolute;
  top: 0;
  cursor: pointer;
  right: 3%;
}
.ActivityPopup .AP_Btn{
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 256px;
  height: 60px;
  margin-left: -128px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  cursor: pointer;
}
.ActivityPopup .pop_content {
  margin-top: 36px;
}
.ActivityPopup .pop_content .table_title {
  display: flex;
  justify-content: space-between;
  margin: 0 7%;
  background: url(../../../../assets/images/activity/LuckyDrawBonus/img/pop_title_1.png) no-repeat;
  background-size: 100% 100%;
  padding: 1.5% 5%;
  color: #fff;
}
.ActivityPopup .pop_content .table_title > span{
  font-size: 0.25rem;
  font-weight: 900;
}
.ActivityPopup .pop_content .c_area_7 {
  margin: 0 8%;
}
.ActivityPopup .pop_content table {
  width: 100%;
}
.ActivityPopup .pop_content table tbody > tr > td > p {
  font-size: 0.1rem;
  font-weight: 900;
}
.ActivityPopup .pop_content table tbody > tr > td.left > p  {
  text-align: left;
}
.ActivityPopup .pop_content table tbody > tr > td.center > p  {
  text-align: center;
}
.ActivityPopup .pop_content table tbody > tr > td.right > p  {
  text-align: right;
}
.ActivityPopup .pop_content table td{
  background-color: transparent;
  padding: 5px;
}
</style>
