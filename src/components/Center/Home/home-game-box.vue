<template>
  <div class='gameBox'
       @click.self="toggleBox">
    <div class="gameBox-main"
         :class="out? 'out':''">
      <div class="gameBox-main-hd">
        <h2>{{name}}</h2>
        <i @click="hide"></i>
      </div>
      <div class="gameBox-main-bd">
        <div class="btnbar"
             :class="[this.gameBtn.length==3? '':this.gameBtn.length==2? 'two':'one']">
          <div class="btn"
               v-for="(item, index) in this.gameBtn"
               :key="index"
               :class="item.code">
            <span v-if="item.target ==='router'"
                  @click="btnClick(item.code)">
              <i></i>
              {{item.name}}</span>
            <a :href="item.href"
               :target="item.target"
               v-else>
              <i></i>
              {{item.name}}
            </a>
          </div>
        </div>
        <div class="transferbar">
          <ul>
            <li>
              <label>From：</label>
              <div class="trabox">
                <span>{{zxName}}</span>
                <i @click="dbRefresh(loadVal1)"
                   :class="load1? 'load':''"></i><em>₱{{ this.numberFormat(TransferOut,2)}}</em>
              </div>
            </li>
            <li>
              <label>To：</label>
              <div class="trabox">
                <span>{{platName}}</span>
                <i @click="dbRefresh(loadVal2)"
                   :class="load2? 'load':''"></i><em>₱{{this.numberFormat(TransferIn,2)}}</em>
              </div>
            </li>
          </ul>
          <div class="cutover">
            <i><b @click="cutover">Switch</b></i>
          </div>
          <ul class="amount">
            <li v-for="(abtn, index) in amountBtn"
                :key="index"
                :class="abtn.code"
                @click="addAmount(abtn.code)">{{abtn.text}}</li>
          </ul>
          <div class="transfer">
            <input v-model.number="amount"
                   type="number"
                   maxlength="9"
                   placeholder="Enter transfer amount">
            <button @click="transfer()">Transfer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'gameBox',
  props: {
    gameInfo: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {
      load1: false, // 刷新动画
      load2: false,
      loadVal1: 0,
      loadVal2: 1,
      name: null,
      amount: null,
      zxName: '18SLOT',
      platName: null,
      TransferOut: 0, // 转出平台余额
      TransferIn: 0, // 转入平台余额
      direction: 'in', // 默认为转入平台
      sending: false,
      amountBtn: [
        {
          code: 'sum100',
          text: '100'
        },
        {
          code: 'sum500',
          text: '500'
        },
        {
          code: 'sum1000',
          text: '1000'
        },
        {
          code: 'all',
          text: 'All'
        }
      ],
      gameBtn: [],
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {
    // BoxName () {}
  },
  //  方法集合
  methods: {
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('toggleGameBox')
        that.out = false
      }, 600)
    },
    hide () {
      let that = this
      that.zxName = '18SLOT'
      that.out = true
      setTimeout(() => {
        this.$emit('hiddenGame')
        that.out = false
      }, 600)
    },
    init () {
      if (this.gameInfo === null) {
        return
      }
      // this.name = this.gameInfo.GameName
      this.TransferOut = this.getinfo().balance
      this.getPlatBalance()

      this.BoxName()
      // Method = 1 去API 请求

      if (!(this.gameInfo.GameType === 'Slots' || this.gameInfo.GameType === 'Fish') && this.gameInfo.DemoUrl.length > 0) {
        let demohref = this.gameInfo.WebOpenUrl
        if (this.gameInfo.Method === '1') {
          demohref = 'Game.html?act=' + this.gameInfo.Plat + 'Demo'
          if (this.gameInfo.Plat.toUpperCase() === 'AG') {
            demohref += '&gameCode=' + this.gameInfo.GameType
          }
        }
        this.gameBtn.push({ code: 'h5', name: 'Game demo', href: demohref, target: '_blank' })
      }

      let browser = this.browserVersions()
      if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) { // 苹果设备
        if (this.gameInfo.IosAppDownUrl.length > 0) {
          this.gameBtn.push({ code: 'downl', name: 'Down APP', href: this.gameInfo.IosAppDownUrl, target: '_blank' })
        }
        if (this.gameInfo.IosAppSchemesUrl.length > 0) {
          this.gameBtn.push({ code: 'app', name: 'Play game', href: this.gameInfo.IosAppSchemesUrl, target: '_blank' })
        }
      } else { // if (browser.versions.android) // 安卓设备
        if (this.gameInfo.AndroidAppDownUrl.length > 0) { // 下载
          this.gameBtn.push({ code: 'downl', name: 'Down APP', href: this.gameInfo.AndroidAppDownUrl, target: '_blank' })
        }
        if (this.gameInfo.WebUriStartAndroidApp.length > 0) {
          this.gameBtn.push({ code: 'app', name: 'Play game', href: this.gameInfo.WebUriStartAndroidApp, target: '_blank' })
        }
        // else if (this.gameInfo.AndroidAppPackageName.length > 0) {
        //   this.gameBtn.push({code: 'app', name: '进入游戏'})
        // }
      }
      // 网页版
      if ((this.gameInfo.GameType === 'Slots' || this.gameInfo.GameType === 'Fish') && this.gameInfo.Plat.toUpperCase() !== 'AG') {
        // 老虎机 进自己的页面
        this.gameBtn.push({ code: 'h5', name: 'Web', href: '', target: 'router' })
      } else if (this.gameInfo.WebOpenUrl.length > 0 || this.gameInfo.Method === '1') {
        // if (this.gameInfo.GameType === 'Fish' && this.gameInfo.Plat.toUpperCase() === 'PT') {
        //   // PT 捕鱼 没有PT捕鱼
        //   this.gameBtn.push({code: 'h5', name: '网页版', href: '', target: 'router'})
        //   return false
        // }
        let href = this.gameInfo.WebOpenUrl
        if (this.gameInfo.Method === '1') {
          // href = 'Game.html?act=' + this.gameInfo.Plat
          href = 'Game.html?cate=' + this.gameInfo.GameType + '&act=' + this.gameInfo.Plat + '&token=' + this.getinfo().token
          if (this.gameInfo.Plat.toUpperCase() === 'AG') {
            href += '&gameCode=' + this.gameInfo.GameType
          }
        }
        this.gameBtn.push({ code: 'h5', name: 'Web', href: href, target: '_blank' })
      }
    },
    getPlatBalance () {
      // sessionStorage.getItem(this.gameInfo.Plat + 'bal')
      let _this = this
      let url = '/api/balance/get'
      let params = {
        Plat: this.gameInfo.Plat,
        Token: this.getinfo().token
      }
      _this.load2 = true
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            if (_this.direction === 'in') {
              // in 转入平台
              _this.TransferIn = res.data.Result
            } else {
              _this.TransferOut = res.data.Result
            }
            // this.platBal = res.data.Result
          } else {
            if (res.data.Status === 'LoginExpire') {

            }
          }
          _this.load2 = false
        })
        .catch(err => {
          _this.load2 = false
          // bal = '网络异常'
          console.log(err)
        })
    },
    getZXBalance () {
      let _this = this
      let url = '/api/balance/get'
      let user = this.getinfo()
      let params = {
        Plat: 'ZXC',
        Token: user.token
      }
      _this.load1 = true
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            if (_this.direction === 'in') {
              // in 转入平台
              _this.TransferOut = res.data.Result
            } else {
              _this.TransferIn = res.data.Result
            }
            _this.saveinfo(user.account, user.token, res.data.Result, user.lastlogintime)
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm)
          }
          _this.load1 = false
        })
        .catch(err => {
          _this.load1 = false
          console.log(err)
        })
    },
    BoxName () {
      var that = this
      switch (that.gameInfo.Plat) {
        case 'JILI':
          that.name = this.gameInfo.GameName
          that.platName = 'JILI'
          break
        case 'CQ9':
          that.name = this.gameInfo.GameName
          that.platName = 'CQ9'
          break
        case 'AE':
          that.name = this.gameInfo.GameName
          that.platName = 'AE'
          break
        case 'KA':
          // if (this.gameInfo.GameType === 'Slots') {
          //   that.name = 'AG老虎机'
          // } else if () {
          //   that.name = 'AG娱乐场'
          // } else {
          //   that.name = 'AG娱乐场'
          // }
          that.name = this.gameInfo.GameName
          that.platName = 'KA'
          break
        case 'JDB':
          that.name = this.gameInfo.GameName
          that.platName = 'JDB'
          break
        case 'RICH88':
          that.name = this.gameInfo.GameName
          that.platName = 'RICH88'
          break
        case 'FC':
          that.name = this.gameInfo.GameName
          that.platName = 'FC'
          break
        case 'BNG':
          that.name = this.gameInfo.GameName
          that.platName = 'BNG'
          break
        case 'EVO':
          that.name = this.gameInfo.GameName
          that.platName = 'EVO'
          break
        case 'PG':
          that.name = this.gameInfo.GameName
          that.platName = 'PG'
          break
        default:
          break
      }
      return that.name
    },
    // 增加金额
    addAmount (code) {
      // if (this.amount === 'NaN') {
      //   this.amount = 0
      // }
      switch (code) {
        case 'sum100':
          this.amount += 100
          break
        case 'sum500':
          this.amount += 500
          break
        case 'sum1000':
          this.amount += 1000
          break
        default:
          this.amount = Math.floor(Math.max(this.TransferOut, this.TransferIn))
          break
      }
      if (this.direction === 'out') {
        if (this.amount > this.TransferOut) {
          this.amount = Math.floor(this.TransferOut)
        }
      } else {
        if (this.amount > this.TransferOut) {
          this.amount = Math.floor(this.TransferOut)
        }
      }
    },
    // 切换金额平台
    cutover () {
      let outName, inName, outAunt, inAunt, load1, load2
      outName = this.zxName
      inName = this.platName
      outAunt = this.TransferOut
      inAunt = this.TransferIn
      load1 = this.loadVal1
      load2 = this.loadVal2

      this.zxName = inName
      this.platName = outName
      this.TransferOut = inAunt
      this.TransferIn = outAunt
      this.loadVal1 = load2
      this.loadVal2 = load1
      // this.amount = null
      this.direction = this.direction === 'in' ? 'out' : 'in' // in转入平台
    },
    refresh (i) {
      // 刷新余额
      if ((i === 0 && this.direction === 'in') || (i === 1 && this.direction === 'out')) {
        this.getZXBalance()
      } else {
        this.getPlatBalance()
      }
    },
    dbRefresh: _.debounce(function (i) {
      this.refresh(i)
    }, 1000, {
      leading: true,
      trailing: false
    }),
    transfer () {
      if (this.amount === null) {
        this.$swal({
          text: 'Enter transfer amount',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return false
      }
      if (this.amount < 1) {
        this.$swal({
          text: 'Invalid transfer amount',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return false
      }
      if (this.sending === true) {
        return
      }
      let _this = this
      let outGame = 'ZXC'
      let inGame = this.gameInfo.Plat
      if (this.direction === 'out') {
        inGame = 'ZXC'
        outGame = this.gameInfo.Plat
      }
      if (!/^[0-9]*[1-9][0-9]*$/.test(this.amount)) {
        _this.$swal({
          text: 'Transfer amount must be an integer.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      _this.sending = true
      this.$bus.$emit('loadingShow')
      let url = '/api/transfer/post'
      var params = {
        OutGame: outGame,
        InGame: inGame,
        Amount: _this.amount,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.sending = false
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            let user = _this.getinfo()
            // debugger
            _this.TransferIn = parseFloat(_this.TransferIn) + parseFloat(_this.amount)
            _this.TransferOut = parseFloat(_this.TransferOut) - _this.amount
            _this.amount = null
            if (this.direction === 'out') { // 转出 平台
              _this.saveinfo(user.account, user.token, _this.TransferIn, user.lastlogintime)
            } else {
              // _this.TransferIn -= _this.amount
              // _this.TransferOut += _this.amount
              _this.saveinfo(user.account, user.token, _this.TransferOut, user.lastlogintime)
            }
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm)
            _this.$swal({
              text: 'Transfer successful',
              type: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            if (res.data.Status === 'LoginExpire') {

            }
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch(err => {
          _this.sending = false
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    btnClick (code) {
      // debugger
      if (code === 'h5' || code === 'demo') {
        if (this.gameInfo.GameType === 'Slots' || this.gameInfo.GameType === 'Live') {
          this.$router.push({ name: 'gameinfo', query: { plat: this.gameInfo.Plat, type: this.gameInfo.GameType, category: this.gameInfo.GameCategory } })
          // this.$router.push('/center/home')
          return false
        } else if (this.gameInfo.GameType === 'Fish') {
          this.$router.push({ name: 'gameinfo', query: { plat: this.gameInfo.Plat, type: this.gameInfo.GameType } })
          // this.$router.push('/center/home')
          return false
        }
      }
      // if (this.gameInfo.Method === '1') {
      //   // 需要去API计算
      // } else {
      //   return true
      // }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // console.log(this.gameInfo)
    this.init()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.gameBox {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: 999;
}
.gameBox .gameBox-main {
  width: 6.1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -3.05rem;
  margin-top: -3.2rem;
  border-radius: 0.06rem;
  background: #fff;
  animation: bounceInUp 0.8s linear;
}
.gameBox .gameBox-main.out {
  animation: bounceOutUp 0.8s linear;
}
.gameBox .gameBox-main .gameBox-main-hd {
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.gameBox .gameBox-main .gameBox-main-hd h2 {
  font-size: 0.35rem;
  line-height: 0.98rem;
  margin-left: 0.3rem;
  font-weight: normal;
  color: #2b2b2b;
}
.gameBox .gameBox-main .gameBox-main-hd i {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  position: absolute;
  top: 0.25rem;
  right: 0.3rem;
  background: url(../../../assets/images/home/window_closed_ico@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar {
  width: 100%;
  padding: 0.3rem 0;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 0.02rem solid #ddd;
  display: block;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar.two .btn {
  margin: 0 0.52rem;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar.one .btn {
  margin: 0 auto;
  float: none;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn {
  float: left;
  width: 1.7rem;
  height: 0.6rem;
  border-radius: 0.06rem;
  text-align: center;
  line-height: 0.6rem;
  margin: 0 0.06rem;
  background: #0088ff;
  color: #fff;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn a {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 0.25rem;
  color: #fff;
  text-align: left;
  overflow: hidden;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn i {
  display: block;
  width: 0.28rem;
  height: 0.28rem;
  float: left;
  margin-left: 0.16rem;
  margin-right: 0.1rem;
  margin-top: 0.18rem;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn.h5 i {
  background: url(../../../assets/images/home/h5_ico@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn.app a i {
  background: url(../../../assets/images/home/iphone_ico@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd .btnbar .btn.downl a i {
  background: url(../../../assets/images/home/download_ico@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar {
  margin: 0.4rem 0;
  width: 100%;
  overflow: hidden;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul {
  width: 80%;
  overflow: hidden;
  margin-bottom: 0.4rem;
  float: left;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li {
  width: 100%;
  height: 0.7rem;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li label {
  line-height: 0.7rem;
  float: left;
  font-size: 0.2rem;
  color: #6b6b6b;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li .trabox {
  float: right;
  width: 3.5rem;
  height: 0.56rem;
  line-height: 0.56rem;
  margin: 0.05rem 0;
  padding: 0 0.1rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  border: 0.02rem solid #ddd;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li .trabox span {
  font-size: 0.25rem;
  color: #2b2b2b;
  float: left;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li .trabox em {
  font-size: 0.25rem;
  color: #2b2b2b;
  float: right;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li .trabox i {
  display: block;
  width: 0.38rem;
  height: 0.38rem;
  float: right;
  margin-top: 0.08rem;
  margin-left: 0.05rem;
  background: url(../../../assets/images/home/refresh_ico@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar ul li .trabox i.load {
  animation: load 0.8s linear infinite;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .cutover {
  width: 20%;
  float: right;
  height: 1rem;
  margin-top: 0.2rem;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .cutover i {
  float: left;
  width: 0.54rem;
  height: 1rem;
  background: url(../../../assets/images/home/line_bg@2x.png);
  background-size: 100% 100%;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .cutover i b {
  width: 0.84rem;
  height: 0.54rem;
  background: #0088ff;
  color: #fff;
  display: block;
  font-weight: normal;
  line-height: 0.48rem;
  border-radius: 0.06rem;
  text-align: center;
  padding: 0.02rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  font-size: 0.25rem;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .amount {
  width: 100%;
  margin-bottom: 0.2rem;
  overflow: hidden;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .amount li {
  float: left;
  width: 1.16rem;
  height: 0.56rem;
  border: 0.02rem solid #ddd;
  border-radius: 0.06rem;
  margin-right: 0.23rem;
  text-align: center;
  line-height: 0.56rem;
  font-size: 0.25rem;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .amount li:last-child {
  margin-right: 0;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .transfer {
  width: 100%;
  height: 0.8rem;
  overflow: hidden;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .transfer input {
  float: left;
  width: 65%;
  height: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  border: 0.02rem solid #ddd;
  font-size: 0.3rem;
}
.gameBox .gameBox-main .gameBox-main-bd .transferbar .transfer button {
  float: right;
  width: 30%;
  height: 100%;
  background: #0088ff;
  color: #fff;
  font-size: 0.25rem;
  border-radius: 0.06rem;
  box-sizing: border-box;
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
