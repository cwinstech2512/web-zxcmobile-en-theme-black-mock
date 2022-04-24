<template>
  <div class="activity"
       :class="showExternalBar? 'on':''">
    <div v-show="showCloseBtn"
         @click.stop="closeAppWebView"
         class="AP_close" />
    <div class="banner"></div>
    <div class="body">
      <div class="content">
        <div class="act-time">活动时间：11月20日起</div>
        <div class="table-wrapper">
          <table>
            <tr>
              <td><i class="ico"
                   v-bind:class="{on:signs[0].isSign}">
                  <div class="up">{{signs[0].month}}</div>
                  <div class="down">{{signs[0].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[1].isSign}">
                  <div class="up">{{signs[1].month}}</div>
                  <div class="down">{{signs[1].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[2].isSign}">
                  <div class="up">{{signs[2].month}}</div>
                  <div class="down">{{signs[2].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[3].isSign}">
                  <div class="up">{{signs[3].month}}</div>
                  <div class="down">{{signs[3].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[4].isSign}">
                  <div class="up">{{signs[4].month}}</div>
                  <div class="down">{{signs[4].day}}</div>
                </i></td>
            </tr>
            <tr>
              <td><i class="ico"
                   v-bind:class="{on:signs[5].isSign}">
                  <div class="up">{{signs[5].month}}</div>
                  <div class="down">{{signs[5].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[6].isSign}">
                  <div class="up">{{signs[6].month}}</div>
                  <div class="down">{{signs[6].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[7].isSign}">
                  <div class="up">{{signs[7].month}}</div>
                  <div class="down">{{signs[7].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[8].isSign}">
                  <div class="up">{{signs[8].month}}</div>
                  <div class="down">{{signs[8].day}}</div>
                </i></td>
              <td><i class="ico"
                   v-bind:class="{on:signs[9].isSign}">
                  <div class="up">{{signs[9].month}}</div>
                  <div class="down">{{signs[9].day}}</div>
                </i></td>
            </tr>
            <tr>
              <td colspan="5"
                  style="height:1rem;line-height:1rem">
                <button @click.stop="joinActivity">立即签到</button>
              </td>
            </tr>
          </table>
        </div>
        <div class="tit-wrapper">
          <div class="tit">活动内容</div>
        </div>
        <p>当日单笔存款≥200元，即可进入活动页面点击“签到”，累计签到天数越多奖励越丰厚！</p>
        <div class="table-wrapper2">
          <table>
            <thead>
              <tr>
                <th>累计签到天数</th>
                <th class="rightColumn">签到奖励</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≥4天</td>
                <td style="border-right:0">18</td>
              </tr>
              <tr class="bottomRow">
                <td>≥7天</td>
                <td class="rightColumn">58</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="color:#f9d903">注：活动周期内，累计签到≥7天，可领取18+58=76元彩金；</p>
        <div class="tit-wrapper">
          <div class="tit">活动规则</div>
        </div>
        <p>1.本活动仅适用于所有已“验证姓名+绑定手机”成功后的会员;</p>
        <p>2.活动周期：每十天为一个周期；</p>
        <p>3.当天存款时间为北京时间：00:00~23:59；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;例如：当天23:59分存款，00:00后上分的，该笔存款不算当天有效存款；</p>
        <p>4.达到累计签到天数后，签到奖励自动派发至游戏主账户；</p>
        <p>5.所有彩金1倍有效流水即可提款；</p>
        <p>6.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
        <p style="padding-bottom:50px">7.如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'signinbrother',
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  data () {
    return {
      signs: [
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        },
        {
          month: '',
          day: '',
          isSign: false
        }
      ]
    }
  },
  computed: {
    showCloseBtn: function () {
      if (sessionStorage.getItem('current_os') !== null && !this.showExternalBar) {
        return true
      }
      return false
    }
  },
  methods: {
    loadDataInfo () {
      let _this = this
      let url = '/api/depsign/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            let list = []
            let CycleDays = res.data.Result.CycleDays
            let SigninDays = res.data.Result.SigninDays
            for (let i = 0; i < CycleDays.length; i++) {
              const element = CycleDays[i]
              let day = new Date(element)
              let sign = {
                month: (day.getMonth() + 1) + '月',
                day: day.getDate(),
                isSign: false
              }
              for (let j = 0; j < SigninDays.length; j++) {
                const element2 = SigninDays[j]
                if (element === element2) {
                  sign.isSign = true
                }
              }
              list.push(sign)
            }
            _this.signs = list
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
    joinActivity () {
      let _this = this
      let url = '/api/depsign/get'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.signs.forEach(element => {
              let day = new Date(res.data.Result)
              if (element.month === ((day.getMonth() + 1) + '月') && element.day === day.getDate()) {
                element.isSign = true
              }
            })
            _this.$swal({
              text: res.data.Message,
              type: 'success',
              confirmButtonText: '确定'
            })
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
    closeAppWebView () {
      window.location.href = 'closewindowview://'
    }
  },
  created () {
    document.title = '签到吧兄弟'
    if (this.getinfo().token) {
      this.loadDataInfo()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '签到吧兄弟', 'back', this.showExternalBar)
  }
}
</script>
<style lang="stylus" scoped>
.activity
  width 100%
  overflow hidden
  position absolute
  top 0
  bottom 0
  overflow-x hidden
  overflow-y auto
  background-color #e2e9f3
  &.on
    top 0.88rem
  .AP_close
    width 0.77rem
    height 0.77rem
    position fixed
    top 1.8rem
    right 3%
    background url('../../../../../static/images/popup/redbox_closed.png')
    background-size 100% 100%
    z-index 1000
  .banner
    width 100%
    height 3.4rem
    background url('../../../../assets/images/activity/SignInBrother/bg_01.jpg')
    background-size 100% 100%
  .body
    width 100%
    background url('../../../../assets/images/activity/SignInBrother/bg_02.jpg') no-repeat top
    background-size 100% 100%
    .content
      width calc(100% - 0.2rem)
      margin 0 auto
      .act-time
        height 0.68rem
        line-height 0.68rem
        font-size 0.3rem
        font-weight bold
        color #ffffff
        text-align center
      .table-wrapper
        background-color #f2e6d3
        border-radius 10px
        table
          tr
            td
              height 1.5rem
              width 2.4rem
              line-height 1.5rem
              text-align center
              .ico
                display block
                width 0.8rem
                height 0.8rem
                line-height 0.8rem
                margin 0 auto
                background url('../../../../assets/images/activity/SignInBrother/date_bg2.png') no-repeat
                background-size 100% 100%
                &.on
                  background url('../../../../assets/images/activity/SignInBrother/date_bg.png') no-repeat
                  background-size 100% 100%
                .up
                  height 0.4rem
                  line-height 0.4rem
                  font-size 0.22rem
                  color #ffffff
                .down
                  height 0.4rem
                  line-height 0.4rem
                  font-size 0.3rem
                  color #ffffff
              button
                width 2.4rem
                height 0.6rem
                font-size 0.3rem
                font-weight bold
                color #ffffff
                background-color #ff2e2e
                cursor pointer
      .tit-wrapper
        margin 0.4rem auto
        .tit
          font-size 0.4rem
          color #f2e6d3
          text-align center
      p
        font-size 0.2rem
        color #f2e6d3
      .table-wrapper2
        width 100%
        margin 0 auto
        padding 0.2rem 0
        table
          width 100%
          font-size 0.2rem
          color #000000
          border 0
          border-collapse collapse
          background-color #ffffff
          th, td
            width 50%
            height 0.8rem
            font-size 0.2rem
            text-align center
            border-top 0
            border-right 1px solid #c5c5c5
            border-bottom 1px solid #c5c5c5
            border-left 0
        table tr.bottomRow td, td.rightColumn
          border-bottom 0
        table tr td.rightColumn, table th.rightColumn
          border-right 0
</style>
