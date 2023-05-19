<template>
  <div class="withdrawal"
       v-if="bankCard.length>0">
    <div class="bank">
      <h2>Select USDT wallet</h2>
      <select v-model="bankId">
        <option value
                disabled="disabled">Select withdrawal wallet</option>
        <option v-for="(bankCards, index) in bankCard"
                :key="index"
                :value="bankCards.Id.toString()">{{bankCards.ChainName}}--Starting with{{strSlice(bankCards.WalletAddr,3)}}</option>
      </select>
    </div>
    <div class="amount">
      <h2>Withdrawal amount</h2>
      <div class="amount-Main">
        <i>₱</i>
        <input type="number"
               v-model="amount"
               maxlength="8"
               placeholder="Enter Withdrawal amount"
               @input="changeAmount" />
        <!-- <div class="amountAll"
             @click="withall()">全部提币</div> -->
        <div class="totalBalance">
        <!--   <span>
            账户余额：
            <em>{{numberFormat(Balance,2)}}</em>元
          </span> -->
          <!-- <div class="quickIcon"
               @click="quickTransfer()">一键回收</div> -->
        </div>
        <ul class="amountBtn">
          <li v-for="(abtn, index) in amountBtn"
              :key="index"
              :class="abtn.code"
              @click="addAmount(abtn.code)">{{abtn.text}}</li>
        </ul>
        <span>*Withdrawal password is the same as login password.</span>
        <input type="password"
               v-model="password"
               placeholder="输入您的密码" />
        <button :class="sending? 'dis':''"
                @click="sendUsdtWithdrawal()">立即提币</button>
      </div>
      <h2>*Note：Remaining withdrawal attempts today: {{withdrawal.RemainDrawCount}}，Maximum amount per withdrawal: ₱{{numberFormat(withdrawal.MaxLimit,2)}}，Remaining daily withdrawal limit: ₱{{numberFormat(withdrawal.RemainDrawSum,2)}}</h2>
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
      password: '',
      amount: '',
      amountBtn: [
        {
          code: 'sum20',
          text: '20'
        },
        {
          code: 'sum100',
          text: '100'
        },
        {
          code: 'sum500',
          text: '500'
        },
        {
          code: 'sum5000',
          text: '5000'
        },
        {
          code: 'sum8000',
          text: '8000'
        },
        {
          code: 'clear',
          text: '清除'
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
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 改变金额
    changeAmount () {
      if (this.amount) {
        this.amount = parseInt(this.amount)
      }
      if (this.amount === '') {
        this.amount = 0
      }
    },
    // 字串分割
    strSlice (str, number) {
      return str.slice(0, number)
    },
    // 全部提款
    withall () {
      if (this.Balance > this.MaxLimit) {
        this.amount = parseInt(this.MaxLimit)
      } else {
        this.amount = parseInt(this.Balance)
      }
    },
    // 增加金额
    addAmount (code) {
      if (this.amount.length < 1) {
        this.amount = 0
      } else {
        this.amount = parseFloat(this.amount)
      }
      switch (code) {
        case 'sum20':
          this.amount += 20
          break
        case 'sum100':
          this.amount += 100
          break
        case 'sum500':
          this.amount += 500
          break
        case 'sum5000':
          this.amount += 5000
          break
        case 'sum8000':
          this.amount += 8000
          break
        case 'clear':
          this.amount = ''
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
            _this.MinLimit = parseFloat(res.data.Result.MinLimit)
            _this.MaxLimit = parseFloat(res.data.Result.MaxLimit)
            _this.DrawCount = parseInt(res.data.Result.DrawCount)
            _this.DrawSum = parseFloat(
              res.data.Result.DrawSum.replace(/,/g, '')
            )
            _this.RemainDrawCount = parseInt(res.data.Result.RemainDrawCount)
            _this.RemainDrawSum = parseFloat(
              res.data.Result.RemainDrawSum.replace(/,/g, '')
            )
            _this.Balance = parseFloat(
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
            this.bankCard = res.data.Result.Data
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
    // 提交提款
    sendUsdtWithdrawal () {
      if (this.sending === true) {
        return
      }
      let _this = this
      if (_this.bankId.length < 1) {
        _this.$swal({
          text: 'Select USDT wallet',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      // localStorage.setItem('bankId', _this.bankId)
      if (_this.amount.toString().length < 1) {
        _this.$swal({
          text: 'Enter withdrawal amount',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.amount < 20) {
        _this.$swal({
          text: 'Min. withdrawal: 20USDT',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      if (_this.password.length < 1) {
        _this.$swal({
          text: 'Enter withdrawal password',
          type: 'warning',
          confirmButtonText: 'OK'
        })
        return
      }
      _this.sending = true
      // let user = this.getinfo()
      let url = '/api/withdrawal/usdtwithdraw'
      var params = {
        Id: _this.bankId,
        USDT: _this.amount,
        Pwd: _this.password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          _this.sending = false
          if (res.data.Success === true) {
            // _this.Balance -= _this.amount
            // _this.saveinfo(
            //   user.account,
            //   user.token,
            //   _this.Balance,
            //   user.lastlogintime
            // ) // 更新本地余额
            // let sidemenuVm = _this.$parent.$parent.$parent.$children[0]
            // _this.updateSidebarBalacne(sidemenuVm)
            // _this.RemainDrawCount -= 1
            // _this.RemainDrawSum -= _this.amount
            _this.amount = ''
            _this.password = ''
            _this.getInfo()
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
    // 一键回收
    // 一键回收
    quickTransfer () {
      if (this.quickBtn) {
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
            let qgameplat = sessionStorage.getItem('quickPlats')
            if (qgameplat == null) {
              qgameplat = ''
            }
            _this.quickBtn = true
            let url = '/api/transfer/all'
            let params = {
              Plats: qgameplat,
              Token: _this.getinfo().token
            }
            _this.$https
              .fetchPost(url, _this.secret(params))
              .then(res => {
                _this.quickBtn = false
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
    this.bankId = localStorage.getItem('bankId')
    if (
      this.bankId === null ||
      this.bankId === undefined ||
      this.bankId.length < 1
    ) {
      this.bankId = ''
    }
    this.getInfo()
    this.getVirtuala()
    this.$root.$on('refreshBal', bal => {
      this.Balance = bal
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
