<template>
  <div class="transfer" v-if="GamePlats.length>0">
    <ul class="balance">
      <li v-for="(Game, index) in GamePlats" :key="index">
        <em>{{Game.GameName}}</em>
        <span>{{ !isNaN(Game.Bal)?numberFormat(Game.Bal,2):Game.Bal}}</span>
      </li>
    </ul>
    <ul class="platform">
      <li>
        <select v-model="Outval" @change="changeAcc('out',Outval)">
          <option value="out" disabled="disabled">FROM</option>
          <option
            v-for="(item, index) in GamePlats"
            :key="index"
            :value="item.Plat"
          >{{item.GameName}}</option>
        </select>
      </li>
      <li class="cutover">
        <i @click="changeVal()"></i>
      </li>
      <li>
        <select v-model="Inval" @change="changeAcc('in',Inval)">
          <option value="in" disabled="disabled">TO</option>
          <option
            v-for="(item, index) in GamePlats"
            :key="index"
            :value="item.Plat"
          >{{item.GameName}}</option>
        </select>
      </li>
    </ul>
    <div class="amount">
      <div class="amount-Main">
        <i>₱</i>
        <input type="number" v-model="amount" maxlength="8" placeholder="Enter amount" />
        <ul class="amountBtn">
          <li
            v-for="(abtn, index) in amountBtn"
            :key="index"
            :class="abtn.code"
            @click="addAmount(abtn.code)"
          >{{abtn.text}}</li>
        </ul>
        <button
          :class="['quick',{dis:!quickBtn||(quickok<1||quickok<GamePlats.length)}]"
          @click="quickTransfer()"
        >All Reversal</button>
        <button :class="['half',sending? 'dis':'']" @click="send()">Transfer Now</button>
      </div>
      <h2>*Note: The one-click recovery function will transfer all game platforms balances back to the your account wallet at once.</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      amount: '',
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
          code: 'sum5000',
          text: '5000'
        },
        {
          code: 'sum10000',
          text: '10000'
        },
        {
          code: 'all',
          text: 'All'
        }
        // ,
        // {
        //  code: 'clear',
        //  text: '清除'
        // }
      ],
      Outval: 'out',
      Inval: 'in',
      GamePlats: [],
      quickok: 0,
      quickPlats: [],
      quickBtn: true,
      sending: false,
      getbaling: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 转账选择账户切换
    changeAcc (item, val) {
      if (item === 'out') {
        if (val === 'ZXC') {
          this.Inval = 'in'
        } else {
          this.Inval = 'ZXC'
        }
      } else {
        if (val === 'ZXC') {
          this.Outval = 'out'
        } else {
          this.Outval = 'ZXC'
        }
      }
      this.amount = ''
    },
    // 转账点击切换账户
    changeVal (Outval, Inval) {
      if (this.Outval !== 'out' && this.Inval !== 'in') {
        Outval = this.Outval
        Inval = this.Inval
        this.Outval = Inval
        this.Inval = Outval
      }
      this.amount = ''
    },
    // 增加金额
    addAmount (code) {
      if (this.amount.length < 1) {
        this.amount = 0
      } else {
        this.amount = parseInt(this.amount)
      }
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
        case 'sum5000':
          this.amount += 5000
          break
        case 'sum10000':
          this.amount += 10000
          break
        case 'clear':
          this.amount = ''
          break
        case 'all':
          if (this.Outval === 'out' || this.getbaling === true) {
            return
          }
          this.getbaling = true
          let _this = this
          let url = '/api/balance/get'
          let params = {
            Plat: this.Outval,
            Token: this.getinfo().token
          }
          _this.$https
            .fetchPost(url, this.secret(params))
            .then(res => {
              _this.getbaling = false
              if (res.data.Success === true) {
                _this.amount = parseInt(res.data.Result.replace(/,/g, ''))
              } else {
                _this.amount = 0
              }
            })
            .catch(err => {
              _this.getbaling = false
              _this.amount = 0
              console.log(err)
            })
          break
        default:
          break
      }
    },
    // 获取游戏平台
    getGamePlat () {
      var platRevse = ['JILI', 'CQ9', 'AE', 'KA', 'JDB', 'RICH88', 'FC', 'BNG', 'EVO']
      let _this = this
      let url = '/api/gameplat/get'
      _this.$https
        .fetchPost(url, {})
        .then(res => {
          if (res.data.Success === true) {
            for (var j = 0; j < res.data.Result.length; j++) {
              var indexIs = platRevse.findIndex(element => element === res.data.Result[j].Plat)
              if (indexIs >= 0) {
                _this.GamePlats[indexIs] = res.data.Result[j]
              }
            }
            // _this.GamePlats = res.data.Result
            _this.GamePlats.unshift({ GameName: '18SLOT', Plat: 'ZXC' })
            for (var i = 0; i < _this.GamePlats.length; i++) {
              _this.GamePlats[i].Bal = '...'
              _this.getGameBalance(_this.GamePlats[i].Plat)
            }
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取游戏平台余额
    getGameBalance (plat) {
      let _this = this
      let user = this.getinfo()
      let bal = ''
      let curplatindex = _this.GamePlats.findIndex(plats => plats.Plat === plat)
      _this.GamePlats[curplatindex].Bal = '...'
      _this.$set(_this.GamePlats, curplatindex, _this.GamePlats[curplatindex])
      _this.$bus.$emit('loadingShow')
      let url = '/api/balance/get'
      let params = {
        Plat: plat,
        Token: this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.quickok++
          if (res.data.Success === true) {
            bal = res.data.Result
          } else {
            bal = res.data.Message
          }
          if (
            _this.checkBal(bal) &&
            _this.quickPlats.findIndex(p => p === plat) < 0 &&
            plat !== 'ZXC'
          ) {
            _this.quickPlats.push(plat)
          }
          sessionStorage.setItem('quickPlats', _this.quickPlats.join(','))
          _this.GamePlats[curplatindex].Bal = bal
          _this.$set(
            _this.GamePlats,
            curplatindex,
            _this.GamePlats[curplatindex]
          )
          _this.$bus.$emit('loadingHide')
          if (plat === 'ZXC') {
            _this.saveinfo(
              user.account,
              user.token,
              res.data.Result,
              user.lastlogintime
            ) // 更新本地余额
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm) // 更新左边栏的余额
            _this.$root.$emit('refreshBal', res.data.Result) // 更新提款界面的余额
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          _this.quickok++
          bal = '网络异常'
          _this.GamePlats[curplatindex].Bal = bal
          _this.$set(
            _this.GamePlats,
            curplatindex,
            _this.GamePlats[curplatindex]
          )
          console.log(err)
        })
    },
    // 判断余额
    checkBal (bal) {
      // bal = bal.replace(/,/g, '')
      if (!isNaN(bal)) {
        let f = parseFloat(bal)
        if (f > 0) {
          return true
        }
      }
      return false
    },
    // 一键回收
    quickTransfer () {
      if (
        !this.quickBtn ||
        (this.quickok < 1 || this.quickok < this.GamePlats.length)
      ) {
        return
      }
      let _this = this
      _this
        .$swal({
          text: 'Withdraw the remaining balance from other platforms？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
        })
        .then(isConfirm => {
          if (isConfirm.value) {
            _this.quickBtn = false
            let url = '/api/transfer/all'
            let params = {
              Plats: _this.quickPlats.join(','),
              Token: _this.getinfo().token
            }
            _this.$https
              .fetchPost(url, _this.secret(params))
              .then(res => {
                _this.quickBtn = true
                if (res.data.Success === true) {
                  _this.getGameBalance('ZXC')
                  for (var i = 0; i < _this.quickPlats.length; i++) {
                    _this.getGameBalance(_this.quickPlats[i])
                  }
                  _this.$swal({
                    text: res.data.Message,
                    type: 'success',
                    confirmButtonText: 'OK'
                  })
                } else {
                  _this.$swal({
                    text: res.data.Message,
                    type: 'error',
                    confirmButtonText: 'OK'
                  })
                }
              })
              .catch(err => {
                _this.quickBtn = true
                console.log(err)
              })
          }
        })
    },
    // 提交转账
    send () {
      if (this.sending === true) {
        return
      }
      let _this = this
      if (_this.Outval === 'out') {
        _this.$swal({
          text: 'Select account to transfer-out',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.Inval === 'in') {
        _this.$swal({
          text: '请Select account to transfer-in',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.amount < 1) {
        _this.$swal({
          text: 'Minimum transfer: 1 peso.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (!/^[0-9]*[1-9][0-9]*$/.test(_this.amount)) {
        _this.$swal({
          text: 'Transfer amount must be a whole number.',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      _this.sending = true
      let url = '/api/transfer/post'
      _this.$bus.$emit('loadingShow', 'Transferring...')
      var params = {
        OutGame: _this.Outval,
        InGame: _this.Inval,
        Amount: _this.amount,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.sending = false
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.amount = ''
            _this.getGameBalance(_this.Inval)
            _this.getGameBalance(_this.Outval)
            _this.$swal({
              text: 'Transfer successful.',
              type: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          _this.sending = false
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getGamePlat()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
</style>
