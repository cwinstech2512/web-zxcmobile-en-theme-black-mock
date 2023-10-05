<template>
  <div class="withdrawal">
    <div class="mode">
      <h2>PAYMENT METHOD</h2>
      <ul class="way">
        <li :class="['onlineTransfer', {on: 'withdrawal' == activeWay}]"
            @click="switchWay('withdrawal')">
          <i></i>
          <span>BANK</span>
        </li>
        <li :class="['usdtTransfer', {on: 'USDT_Withdraw' == activeWay}]"
            @click="switchWay('USDT_Withdraw')">
          <i></i>
          <span>USDT</span>
        </li>
        <li :class="['GcashToPay', {on: 'GCash_Withdrawal' == activeWay}]"
            @click="switchWay('GCash_Withdrawal')">
          <i></i>
          <span>GCash</span>
        </li>
      </ul>
    </div>
    <div v-if="withdrawal_active.bankCard.length>0 && (activeWay == 'withdrawal' || activeWay == 'GCash_Withdrawal')">
      <div class="bank">
        <h2>{{activeWay == 'withdrawal' ? 'BANK' : 'GCash'}} CARD</h2>
        <select v-model="withdrawal_active.bankId">
          <option value
                  disabled="disabled">Please Select bind {{activeWay == 'withdrawal' ? 'BANK' : 'GCash'}} card</option>
          <option v-for="(bankCards, index) in withdrawal_active.bankCard"
                  :key="index"
                  :value="bankCards.BankId.toString()">{{bankCards.BankName}}--Ending with{{bankCards.CardNumber}}</option>
        </select>
      </div>
      <div class="amount">
        <h2>WITHDRAWAL AMOUNT</h2>
        <div class="amount-Main">
          <i>₱</i>
          <input type="number"
                 v-model="withdrawal_active.amount"
                 maxlength="8"
                 placeholder="Enter withdrawal amount"
                 @input="changeAmount" />
          <div class="amountAll"
               @click="withall()">All W/D</div>
          <div class="totalBalance">
            <span>
              Balance：
              <em>PHP {{numberFormat(withdrawal_active.Balance,2)}}</em>
            </span>
            <div class="quickIcon"
                 @click="quickTransfer()">Get All</div>
          </div>
          <ul class="amountBtn">
            <li v-for="(abtn, index) in withdrawal_active.amountBtn"
                :key="index"
                :class="abtn.code"
                @click="addAmount(abtn.code)">{{abtn.text}}</li>
          </ul>
          <span>*Withdrawal PWD must same Sign In PWD.</span>
          <input type="password"
                 v-model="withdrawal_active.password"
                 placeholder="Your withdrawal PWD" />
          <button :class="withdrawal_active.sending? 'dis':''"
                  @click="sendWithdrawal()">Withdrawal Now</button>
        </div>
        <h2>*Note：Remaining withdrawal attempts today: {{withdrawal_active.RemainDrawCount}}，Maximum amount per withdrawal: ₱{{numberFormat(withdrawal_active.MaxLimit,2)}}，Remaining daily withdrawal limit: ₱{{numberFormat(withdrawal_active.RemainDrawSum,2)}}</h2>
      </div>
    </div>
    <div v-if="USDT_Withdraw.bankCard.length>0 && activeWay == 'USDT_Withdraw'">
      <div class="bank">
        <h2>USDT Wallet</h2>
        <select v-model="USDT_Withdraw.bankId">
          <option value
                  disabled="disabled">Select USDT wallet</option>
          <option v-for="(bankCards, index) in USDT_Withdraw.bankCard"
                  :key="index"
                  :value="bankCards.Id.toString()">{{bankCards.ChainName}}--Starting with{{strSlice(bankCards.WalletAddr,3)}}</option>
        </select>
      </div>
      <div class="amount">
        <h2>Withdrawal Amount</h2>
        <div class="amount-Main">
          <i>₱</i>
          <input type="number"
                 v-model="USDT_Withdraw.amount"
                 maxlength="8"
                 placeholder="Withdrawal amount"
                 @input="changeAmount" />
          <!-- <div class="amountAll"
               @click="withall()">全部提币</div> -->
          <!-- <div class="totalBalance">
            <span>
              账户余额：
              <em>{{numberFormat(Balance,2)}}</em>元
            </span>
            <div class="quickIcon"
                 @click="quickTransfer()">一键回收</div>
          </div> -->
          <ul class="amountBtn">
            <li v-for="(abtn, index) in USDT_Withdraw.amountBtn"
                :key="index"
                :class="abtn.code"
                @click="addAmount(abtn.code)">{{abtn.text}}</li>
          </ul>
          <div class="amountBlock">
            <h3>
              Received：{{USDT_Withdraw.amountUSDT}} USDT
            </h3>
            <h4>
              <em>Current exchange rate：{{ toDecimal2(USDT_Withdraw.USDTRate) }} PHP/USDT</em>
            </h4>
          </div>
          <span>*Withdrawal PWD must same Sign In PWD.</span>
          <input type="password"
                 v-model="USDT_Withdraw.password"
                 placeholder="Your withdrawal PWD" />
          <button :class="USDT_Withdraw.sending? 'dis':''"
                  @click="sendUsdtWithdrawal()">Withdrawal Now</button>
        </div>
        <h2>*Note：Remaining withdrawal attempts today: {{withdrawal.RemainDrawCount}}，Maximum amount per withdrawal: ₱{{numberFormat(withdrawal.MaxLimit,2)}}，Remaining daily withdrawal limit: ₱{{numberFormat(withdrawal.RemainDrawSum,2)}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'withdrawal',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      activeWay: 'withdrawal',
      tmpWithdrawal: {},
      GCash_Withdrawal: {},
      withdrawal: {
        password: '',
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
            code: 'clear',
            text: 'Reset'
          }
        ],
        bankCard: [],
        bankId: '',
        MinLimit: 0,
        MaxLimit: 0,
        DrawCount: 0,
        DrawSum: 0,
        RemainDrawCount: 0,
        RemainDrawSum: 0,
        Balance: 0,
        liText: '单日提款上限-次，单次最高-元，单日上限-元',
        sending: false,
        quickBtn: false
      },
      USDT_Withdraw: {
        bankId: '',
        hidBtn: true,
        sending: false,
        USDTRate: 0,
        amountBtn: [
          // {
          //   code: 'sum20',
          //   text: '20'
          // },
          {
            code: 'sum100',
            text: '100'
          },
          {
            code: 'sum500',
            text: '500'
          },
          {
            code: 'sum2000',
            text: '2000'
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
            code: 'clear',
            text: 'Reset'
          }
        ],
        amount: '',
        amountUSDT: '0.00',
        password: '',
        bankCard: []
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {
    withdrawal_active () {
      return this[this.activeWay]
    }
  },
  //  监控data中的数据变化
  watch: {
    'USDT_Withdraw.amount': function (n, o) {
      this.USDT_Withdraw.amountUSDT = this.toDecimal2(n / this.USDT_Withdraw.USDTRate)
    }
  },
  //  方法集合
  methods: {
    // 改变方法
    switchWay (index) {
      this.activeWay = index
      if (index === 'USDT_Withdraw') {
        this.getVirtuala()
        this.getUSDTRate()
      } else {
        this['GCash_Withdrawal'] = Object.assign({}, this.tmpWithdrawal)
        this['withdrawal'] = Object.assign({}, this.tmpWithdrawal)
        this.getInfo()
      }
    },
    // 字串分割
    strSlice (str, number) {
      return str.slice(0, number)
    },
    // 改变金额
    changeAmount () {
      if (this.withdrawal.amount) {
        this.withdrawal.amount = parseInt(this.withdrawal.amount)
      }
      if (this.withdrawal.amount === '') {
        this.withdrawal.amount = 0
      }
    },
    // 全部提款
    withall () {
      if (this.withdrawal.Balance > this.withdrawal.MaxLimit) {
        this.withdrawal.amount = parseInt(this.withdrawal.MaxLimit)
      } else {
        this.withdrawal.amount = parseInt(this.withdrawal.Balance)
      }
    },
    // 增加金额
    addAmount (code) {
      if (this[this.activeWay].amount.length < 1) {
        this[this.activeWay].amount = 0
      } else {
        this[this.activeWay].amount = parseFloat(this[this.activeWay].amount)
      }
      switch (code) {
        case 'sum100':
          this[this.activeWay].amount += 100
          break
        case 'sum500':
          this[this.activeWay].amount += 500
          break
        case 'sum1000':
          this[this.activeWay].amount += 1000
          break
        case 'sum5000':
          this[this.activeWay].amount += 5000
          break
        case 'sum10000':
          this[this.activeWay].amount += 10000
          break
        case 'clear':
          this[this.activeWay].amount = ''
          break
        default:
          break
      }
    },
    // 获取提款信息
    getInfo () {
      let _this = this
      let user = this.getinfo()
      _this.$bus.$emit('loadingShow')
      let url = '/api/withdrawal/getinfo'
      _this.$https
        .fetchPost(url, this.secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this['withdrawal'].bankCard = res.data.Result.BankCards.filter(bankCard => bankCard.BankName !== 'GCash')
            _this['GCash_Withdrawal'].bankCard = res.data.Result.BankCards.filter(bankCard => bankCard.BankName === 'GCash')
            _this[this.activeWay].liText =
              'Remaining withdrawal attempts today: ' +
              res.data.Result.RemainDrawCount +
              '，Maximum amount per withdrawal: ₱' +
              _this.numberFormat(res.data.Result.MaxLimit, 2) +
              '，Remaining daily withdrawal limit: ₱' +
              res.data.Result.RemainDrawSum +
              '元'
            _this[this.activeWay].MinLimit = parseFloat(res.data.Result.MinLimit)
            _this[this.activeWay].MaxLimit = parseFloat(res.data.Result.MaxLimit)
            _this[this.activeWay].DrawCount = parseInt(res.data.Result.DrawCount)
            _this[this.activeWay].DrawSum = parseFloat(
              res.data.Result.DrawSum.replace(/,/g, '')
            )
            _this[this.activeWay].RemainDrawCount = parseInt(res.data.Result.RemainDrawCount)
            _this[this.activeWay].RemainDrawSum = parseFloat(
              res.data.Result.RemainDrawSum.replace(/,/g, '')
            )
            _this[this.activeWay].Balance = parseFloat(
              res.data.Result.Balance.replace(/,/g, '')
            )
            _this.saveinfo(
              user.account,
              user.token,
              _this.Balance,
              user.lastlogintime
            ) // 更新本地余额
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm)
            if (res.data.Result.BankCards.length < 1) {
              _this
                .$swal({
                  text: 'Please bind your withdrawal card first',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Please wait a moment'
                  // closeOnConfirm: false,
                  // closeOnClickOutside: false
                })
                .then(res => {
                  if (res.value) {
                    _this.$router.push('/center/bankCardAdd')
                  }
                })
            }
          } else {
            _this.$bus.$emit('loadingHide')
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    // 獲取錢包
    getVirtuala () {
      let _this = this
      let url = '/api/withdrawal/getvirtualacc'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.USDT_Withdraw.bankCard = res.data.Result.Data
            if (res.data.Result.Data.length < 1) {
              _this
                .$swal({
                  text: 'Please bind your withdrawal card first',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Please wait a moment'
                  // closeOnConfirm: false,
                  // closeOnClickOutside: false
                })
                .then(res => {
                  if (res.value) {
                    _this.$router.push('/center/virtualWalletAdd')
                  }
                })
            }
          } else {
            _this.$bus.$emit('loadingHide')
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    // 獲取匯率
    getUSDTRate () {
      this.$bus.$emit('loadingShow')
      let url = '/api/deposit/GetUSDTRate'
      let params = {
        Token: this.getinfo().token
      }
      let _this = this
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            if (res.data.Result.Rate) {
              _this.USDT_Withdraw.USDTRate = res.data.Result.Rate
            }
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: 'OK'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
          _this.$bus.$emit('loadingHide')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交提款
    sendWithdrawal () {
      if (this[this.activeWay].sending === true) {
        return
      }
      let _this = this
      if (_this[_this.activeWay].bankId.length < 1) {
        _this.$swal({
          text: 'Select bank card',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      localStorage.setItem('bankId', _this[_this.activeWay].bankId)
      if (_this[_this.activeWay].amount.toString().length < 1) {
        _this.$swal({
          text: 'Enter withdrawal amount',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this[_this.activeWay].RemainDrawCount < 1) {
        _this.$swal({
          text: 'You have reached your daily withdrawal limit for today',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this[_this.activeWay].RemainDrawSum < _this[_this.activeWay].amount) {
        _this.$swal({
          text: 'You have exceeded your daily withdrawal limit for today',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this[_this.activeWay].amount > _this[_this.activeWay].MaxLimit) {
        _this.$swal({
          text: 'Maximum withdrawal' + _this[_this.activeWay].MaxLimit + 'PHP',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this[_this.activeWay].amount < _this[_this.activeWay].MinLimit) {
        _this.$swal({
          text: 'Minimum withdrawal' + _this[_this.activeWay].MinLimit + 'PHP',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this[_this.activeWay].password.length < 1) {
        _this.$swal({
          text: 'Please enter your withdrawal password',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      _this[_this.activeWay].sending = true
      let user = this.getinfo()
      let url = '/api/withdrawal/withdraw'
      var params = {
        BankId: _this[_this.activeWay].bankId,
        Amount: _this[_this.activeWay].amount,
        WPwd: _this[_this.activeWay].password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this[_this.activeWay].sending = false
          if (res.data.Success === true) {
            _this[_this.activeWay].Balance -= _this[_this.activeWay].amount
            _this.saveinfo(
              user.account,
              user.token,
              _this[_this.activeWay].Balance,
              user.lastlogintime
            ) // 更新本地余额
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm)
            _this[_this.activeWay].RemainDrawCount -= 1
            _this[_this.activeWay].RemainDrawSum -= _this.amount
            _this[_this.activeWay].amount = ''
            _this[_this.activeWay].password = ''
            _this.$swal({
              text: 'Submit successful',
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
          _this.sending = false
          console.log(err)
        })
    },
    sendUsdtWithdrawal () {
      if (this.USDT_Withdraw.sending === true) {
        return
      }
      let _this = this
      if (_this.USDT_Withdraw.bankId.length < 1) {
        _this.$swal({
          text: 'Select USDT wallet',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.USDT_Withdraw.amount.toString().length < 1) {
        _this.$swal({
          text: 'Enter withdrawal amount',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.USDT_Withdraw.amount < _this.withdrawal.MinLimit) {
        _this.$swal({
          text: 'Minimum withdrawal' + _this.withdrawal.MinLimit + 'PHP',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.USDT_Withdraw.amount > _this.withdrawal.MaxLimit) {
        _this.$swal({
          text: 'Maximum withdrawal' + _this.withdrawal.MaxLimit + 'PHP',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.USDT_Withdraw.password.length < 1) {
        _this.$swal({
          text: 'Enter withdrawal password',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      _this.USDT_Withdraw.sending = true
      let url = '/api/withdrawal/USDTWithdraw'
      var params = {
        Id: _this.USDT_Withdraw.bankId,
        USDT: _this.USDT_Withdraw.amountUSDT,
        CNY: _this.USDT_Withdraw.amount,
        Pwd: _this.USDT_Withdraw.password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.USDT_Withdraw.sending = false
          if (res.data.Success === true) {
            // _this.withdraw.Balance -= _this.withdraw.amount
            _this.USDT_Withdraw.password = ''
            let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            _this.updateSidebarBalacne(sidemenuVm)
            // _this.withdraw.RemainDrawCount -= 1
            // _this.withdraw.RemainDrawSum -= _this.withdraw.amount
            _this.USDT_Withdraw.amount = 0
            _this.getinfo()
            _this.$swal({
              text: 'Submit successful',
              type: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: 'OK'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          _this.USDT_Withdraw.sending = false
          console.log(err)
        })
    },
    // 一键回收
    quickTransfer () {
      if (this.withdrawal.quickBtn) {
        return
      }
      let _this = this
      _this
        .$swal({
          text: 'Are you sure you want to retrieve the balance from other game platforms?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
        })
        .then(isConfirm => {
          if (isConfirm.value) {
            let qgameplat = sessionStorage.getItem('quickPlats')
            if (qgameplat == null) {
              qgameplat = ''
            }
            _this.withdrawal.quickBtn = true
            let url = '/api/transfer/all'
            let params = {
              Plats: qgameplat,
              Token: _this.getinfo().token
            }
            _this.$https
              .fetchPost(url, _this.secret(params))
              .then(res => {
                _this.withdrawal.quickBtn = false
                if (res.data.Success === true) {
                  _this.getInfo()
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
                _this.quickBtn = false
                console.log(err)
              })
          }
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.tmpWithdrawal = this.withdrawal
    this[this.activeWay].bankId = localStorage.getItem('bankId')
    if (
      this[this.activeWay].bankId === null ||
      this[this.activeWay].bankId === undefined ||
      this[this.activeWay].bankId.length < 1
    ) {
      this[this.activeWay].bankId = ''
    }
    this.$root.$on('refreshBal', bal => {
      this[this.activeWay].Balance = bal
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, //  生命周期 - 创建之前
  beforeMount () { }, //  生命周期 - 挂载之前
  beforeUpdate () { }, //  生命周期 - 更新之前
  updated () { }, //  生命周期 - 更新之后
  beforeDestroy () { }, //  生命周期 - 销毁之前
  destroyed () { }, //  生命周期 - 销毁完成
  activated () { } //  如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>
