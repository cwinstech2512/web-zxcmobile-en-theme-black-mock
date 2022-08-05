<template>
<div class='PromotionInfo' :class="showExternalBar? 'on':''" v-if="proBox.length>0">
  <div class="img">
     <img :src="currentBox.Img" alt="">
  </div>
  <div class="hd">
    <h2>{{currentBox.Title}}</h2>
    <time>{{moment(currentBox.CreateTime).format('YYYY-MM-DD HH:mm:ss')}}</time>
  </div>
  <div class="bd" ref="bd">
    <p v-html="currentBox.Content"></p>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PromotionInfo',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      proBox: [],
      proBoxBefore: [],
      currentBox: null,
      pcode: 0
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
    loadData () {
      let _this = this
      let url = '/api/promo/list'
      let params = {
        Token: _this.getinfo().token
      }
      if (sessionStorage.getItem('current_token') !== null && sessionStorage.getItem('current_token') !== 'undefined') {
        Object.assign(params, {Token: sessionStorage.getItem('current_token'), os: sessionStorage.getItem('current_os')})
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.proBox = res.data.Result.Data
            _this.proBoxBefore = res.data.Result.BeforeData
            Array.prototype.push.apply(_this.proBox, _this.proBoxBefore)
            _this.currentBox = _.head(_this.proBox.filter(m => { return m.Id === _.toNumber(_this.pcode) }))
            this.$nextTick(() => {
              if (document.querySelector('#btn_pop')) {
                document.querySelector('#btn_pop').addEventListener('click', this.btnEvent)
              }
            })
          } else {
            _this.ExteralFileComfirm(res.data)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    // 弹窗信息按钮
    btnEvent () {
      this.AlertWarning('优惠活动内部测试')
      // alert('优惠活动内部业务')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadData()
    this.pcode = this.getQueryString('pcode')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '活动详情', 'back', this.showExternalBar)
  }
}
</script>
<style scoped>
.PromotionInfo{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.PromotionInfo.on{
  top: 0.88rem;
}
.PromotionInfo .img{
  width: 100%;
  height: 2.4rem;
  margin-top: 0.2rem;
  border-radius: 0.06rem;
  overflow: hidden;
  background: url(../../../assets/images/home/promotion_placeholder@2x.jpg);
  background-size: 100% 100%;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
}
.PromotionInfo .img img{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.PromotionInfo .hd{
  width: 100%;
  text-align: center;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #c5c5c5;
}
.PromotionInfo .hd h2{
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: #2b2b2b;
}
.PromotionInfo .hd time{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.PromotionInfo .bd {
 padding: 0.2rem 0;
 box-sizing: border-box;
}
.PromotionInfo .bd >>> h2{
 font-size: 0.28rem;
 color: #2b2b2b;
 margin: 0.2rem 0;
}
.PromotionInfo .bd >>> p{
 font-size: 0.25rem;
 margin: 0.05rem 0;
 color: #6b6b6b;
}
.PromotionInfo .bd >>> .table {
  width:100%;
  overflow-x:auto;
  overflow-y:hidden;
  box-sizing: border-box;
  margin:0.2rem 0;
  background: #ffffff70;
}
.PromotionInfo .bd >>> table {
  border-collapse: collapse;
  border-spacing: 0;
  width:100%;
  text-align: center;
  border:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table tr {
  color: #fff;
  height:0.6rem;
  border-bottom:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table td{
  padding:0 0.1rem;
  font-size:0.25rem;
  color:#4c4c4c;
  border-left:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table th {
  background-color:#2d2d2d;
  font-size: 0.2rem;
  font-weight: normal;
  color: #fff;
  border-left:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> .innerbtn{
  width: 2.8rem;
  height:0.76rem;
  border-radius: 0.06rem;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 0.76rem;
  margin: 0 auto;
  font-size: 0.3rem;
  cursor: pointer;
}
.PromotionInfo .bd >>> ol{
  padding: 0 0.3rem;
}
</style>
