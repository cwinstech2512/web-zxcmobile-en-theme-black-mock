<template>
<div class='SportsPolicy' :class="showExternalBar? 'on':''">
  <div class="Sbanner">
    <div class="main">
      <em class="img1" :style="{backgroundImage: 'url('+MatchHomeUrl+')',backgroundSize:'100% 100%'}"></em>
      <em class="img2" :style="{backgroundImage: 'url('+MatchCustomerUrl+')',backgroundSize:'100% 100%'}"></em>
      <span class="name">{{MatchName}}</span>
      <span class="vs">{{MatchHome}}</span>
      <span class="time">{{MatchTime}}</span>
      <span class="vs">{{MatchCustomer}}</span>
      <button><a target="_blank" :href="LinkUrl">{{Text[0].btn}}</a></button>
    </div>
  </div>
  <div class="Sbody">
    <div class="itembar">
      <h2/>
      <em>{{Text[0].time}}</em>
    </div>
    <div class="itembar">
      <h2/>
      <div class="table">
        <p v-html="Text[0].text1"></p>
        <table>
          <thead>
            <tr>
              <th v-for="(th, index) in Text[0].table.thead" :key="index">{{th}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tr, index) in Text[0].table.tbody" :key="index">
              <td>{{tr.td1}}</td>
              <td>{{tr.td2}}</td>
              <td>{{tr.td3}}</td>
              <td>{{tr.td4}}</td>
            </tr>
          </tbody>
        </table>
        <p v-html="Text[0].text2"></p>
      </div>
    </div>
    <div class="itembar">
      <h2/>
      <p v-for="(rules, index) in Text[0].rule" :key="index">{{rules}}</p>
    </div>
  </div>
</div>
</template>

<script>
import SportsPolicyText from '../../../../../static/json/SportsPolicy.json'
export default {
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
    return {
      Text: [SportsPolicyText],
      MatchName: '',
      MatchHome: '',
      MatchCustomer: '',
      MatchTime: '',
      LinkUrl: '',
      MatchHomeUrl: '',
      MatchCustomerUrl: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadDataInfo () {
      let _this = this
      let url = '/api/policy/info'
      let params = {
        Domain: window.location.host,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.MatchName = res.data.Result.MatchName
            _this.MatchHome = res.data.Result.MatchHome
            _this.MatchCustomer = res.data.Result.MatchCustomer
            _this.MatchTime = res.data.Result.MatchTime
            _this.LinkUrl = res.data.Result.LinkUrl
            _this.MatchHomeUrl = res.data.Result.MatchHomeUrl
            _this.MatchCustomerUrl = res.data.Result.MatchCustomerUrl
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    gobet () {
      let routeData = this.$router.resolve({
        name: 'Sports',
        query: {
          plat: 'nsp'
        }
      })
      var win = window.open(routeData.href, '_blank')
      window.wins.push(win)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadDataInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '体育保单', 'back', this.showExternalBar)
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
<style scoped lang='stylus'>
.SportsPolicy
  width 100%
  overflow hidden
  position absolute
  top 0
  bottom 0
  overflow-x hidden
  overflow-y auto
  &.on
    top 0.88rem
.Sbanner
  width 100%
  height 3.96rem
  position relative
  background: url(../../../../assets/images/activity/SportsPolicy/bg_01.jpg) center no-repeat
  background-size 100% 100%
  .main
    width 6rem
    height 2.5rem
    position absolute
    bottom 0
    left 50%
    margin-left -3rem
    .img1
      width 0.8rem
      height 0.8rem
      position absolute
      bottom 0.2rem
      left 0.6rem
    .img2
      width 0.8rem
      height 0.8rem
      position absolute
      bottom 0.2rem
      right 0.6rem
    .name
      display block
      font-size 0.28rem
      color #fff
      text-align center
      margin 0.4rem 0 0.1rem 0
    .vs
      width 2.04rem
      height 0.44rem
      float left
      font-size 0.22rem
      color #fff
      line-height 0.35rem
      text-align center
      background: url(../../../../assets/images/activity/SportsPolicy/vsbg.png) center no-repeat
      background-size 100% 100%
    .time
      width 1.9rem
      height 0.44rem
      line-height 0.44rem
      text-align center
      float left
      font-size 0.22rem
      color #fff
    button
      position absolute
      width 2.14rem
      height 0.64rem
      text-align center
      color #fff
      cursor pointer
      padding-bottom 0.1rem
      left 50%
      bottom 0.05rem
      margin-left -1.07rem
      background: url(../../../../assets/images/activity/SportsPolicy/button_bg.png) center no-repeat
      background-size 100% 100%
      a
        width 100%
        height 100%
        display block
        color #fff
        font-size 0.28rem
        line-height 0.58rem
.Sbody
  width 100%
  padding-bottom 0.5rem
  background: url(../../../../assets/images/activity/SportsPolicy/bg_02.jpg) center top no-repeat
  background-size 100% 100%
  .itembar
    width 100%
    padding 0 0.3rem
    box-sizing border-box
    overflow hidden
    h2
      width 2.78rem
      height 0.36rem
      margin 0.4rem auto
    &:nth-child(1) h2
      background: url(../../../../assets/images/activity/SportsPolicy/tit_01.png) center no-repeat
      background-size 100% 100%
    &:nth-child(2) h2
      background: url(../../../../assets/images/activity/SportsPolicy/tit_02.png) center no-repeat
      background-size 100% 100%
    &:nth-child(3) h2
      background: url(../../../../assets/images/activity/SportsPolicy/tit_03.png) center no-repeat
      background-size 100% 100%
    em
      display block
      text-align center
      color #f51630
      font-size 0.28rem
      font-weight bold
    p
      color #333
      font-size 0.24rem
      margin 0.1rem 0
      >>> span
        color #ff5757
        font-size 0.24rem
    .table
      width 100%
      overflow hidden
      table
        float left
        width 100%
        margin 0.2rem 0
        background #fff
        text-align center
        border-radius 0.06rem
        overflow hidden
        & thead th
          height 0.6rem
          font-size 0.22rem
          font-weight normal
          color #fff
          background #1c9ee9
        & tbody td
          height 0.8rem
          font-size  0.22rem
          font-weight normal
          color #333
        & tbody tr
          border-bottom 0.02rem solid #ddd
        & tbody tr:last-child
          border-bottom none
</style>
