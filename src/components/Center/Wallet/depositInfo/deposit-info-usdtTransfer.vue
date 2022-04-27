<template>
  <div>
    <div class="bank"
         v-if="bank">
      <h2>Chain Name For USDT</h2>
      <select v-model="bankName">
        <option value
                  disabled="disabled">Select chain name for USDT</option>
        <option v-for="(banks, index) in bank"
                :key="index">{{banks}}</option>
      </select>
    </div>
    <div class="amount">
      <h2>Deposit Amount</h2>
      <div class="amount-Main">
        <i>₱</i>
        <div v-if="fixAmount.length === 0">
          <input type="number"
                 v-model="amount"
                 maxlength="8"
                 placeholder="Enter a deposit amount"
                 @keyup="inputChange" />
          <ul class="amountBtn">
            <li v-for="(abtn, index) in amountBtn"
                :key="index"
                @click="addAmount(abtn)">{{ abtn==-1 ? 'Reset':abtn}}</li>
          </ul>
          <textarea
            type="text"
            v-model="walletAddr"
            placeholder="Please enter a full transfer-out wallet address"
          ></textarea>
          <div class="amountBlock">
            <h3>
              Transfer：{{amountUSDT}} USDT
            </h3>
            <h4>
              <em>Current exchange rate：{{ toDecimal2(USDTRate) }} PHP/USDT</em>
            </h4>
          </div>
          <button @click="deposit()">Deposit Now</button>
        </div>
      </div>
    </div>
    <div class="text">
      <span>注意事项</span>
      <p>1.单笔存款最低{{onlineAmount.minAmount}}元，上限{{onlineAmount.maxAmount}}元；</p>
      <p>2. 每次充值请重新获取新USDT地址，充至非当前地址导致一切损失概不负责；</p>
      <p>3. 自行选择USDT链名称为ERC20或TRC20进行充值，请同链充值，否则导致一切损失自行承担；</p>
      <p>4. 当前汇率为：{{toDecimal2(USDTRate)}} CNY/USDT（汇率有变动，仅供参考）；</p>
      <p>
        5. 若充值后未到账请联系在线客服。
      </p>
    </div>
  </div>
</template>

<script>
var isdepositSubmit = false
export default {
  name: 'deposit-usdt-transfer',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    bank: {
      type: Array,
      required: true
    },
    onlineAmount: {
      type: Object,
      required: true
    }
  },
  data () {
    //  这里存放数据
    return {
      bankName: '', // 手动存款选择的银行
      isDecimal: null, // 1 小数 2 整数
      decValue: 0, // 0到100
      walletAddr: '',
      fixAmount: [], // 固定金额
      USDTRate: 0.00,
      amount: null,
      amountUSDT: 0.00,
      amountBtn: [100, 500, 1000, 5000, 10000, -1]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    'amount': function (n, o) {
      this.amountUSDT = this.toDecimal2(n / this.USDTRate)
    },
    'USDTRate': function (n, o) {
      this.amountUSDT = this.toDecimal2(this.amount / n)
    }
  },
  //  方法集合
  methods: {
    tutorial () {
      this.$bus.$emit('tutorialShow')
    },
    // 选择通道
    switchAisle (index) {
      this.activeAisle = index
      let group = this.depositMethod[this.activeWay].GroupList[this.activeAisle]
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.minAmount = this.depositMethod[this.activeWay].GroupList[
        this.activeAisle
      ].MinAmount
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.maxAmount = this.depositMethod[this.activeWay].GroupList[
        this.activeAisle
      ].MaxAmount
      if (group.FixAmount.length > 0) {
        this.fixAmount = group.FixAmount.split(',')
      } else {
        this.fixAmount = []
      }
      this.isDecimal = group.IsDecimal
      if (this.isDecimal === 1) {
        this.decValue = Math.floor(Math.random() * 100)
      } else {
        this.decValue = 0
      }
      this.setAmountBtn()
      this.olBanks = group.Banks
      this.olBankShow = this.olBanks.length > 1 // 是否需要选择银行
      if (!this.olBankShow) {
        // 如果不可见
        this.olBank = this.olBanks[0].Value
      }
      // this.olBankShow = true // 是否需要选择银行
    },
    // 增加金额
    addAmount (amount) {
      if (amount === -1) {
        this.amount = null
      } else if (this.amount === '') {
        this.amount = null
        this.amount =
          (this.amount === null ? 0 : parseInt(this.amount)) + amount
        if (this.amount > this.onlineAmount.maxAmount) {
          this.amount = this.onlineAmount.maxAmount
        }
      } else {
        this.amount =
          (this.amount === null ? 0 : parseInt(this.amount)) + amount
        if (this.amount > this.onlineAmount.maxAmount) {
          this.amount = this.onlineAmount.maxAmount
        }
      }
    },
    inputChange () {
      // 输入框值改变
      this.amount = this.amount.replace(/[^\d]/g, '')
    },
    vaifyWalletAddr (str) {
      var reg = /[^A-Z|a-z|0-9]{1,}/g
      if (str.length > 0) {
        if (
          reg.test(str)
        ) {
          return false
        } else {
          if (this.bankName === 'TRC20') {
            if (str.substr(0, 1) === 'T' && str.length === 34) {
              return true
            }
          } else if (this.bankName === 'ERC20') {
            if (str.substr(0, 2) === '0x' && str.length === 42) {
              return true
            }
          }
          return false
        }
      } else {
        return true
      }
    },
    // 提交充值
    deposit () {
      let isOL = true
      if (isOL) {
        //  手动存款
        if (this.bankName === '') {
          this.$swal({
            text: '请选择USDT链名称',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return false
        }
        if (
          this.amount === null ||
          this.amount > this.onlineAmount.maxAmount ||
          this.amount < this.onlineAmount.minAmount
        ) {
          this.$swal({
            text: '充值金额错误',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return false
        }
        if (isdepositSubmit) {
          return false
        }
        if (
          this.walletAddr == null ||
          !this.vaifyWalletAddr(this.walletAddr)
        ) {
          this.$swal({
            text: '转出钱包错误',
            type: 'warning',
            confirmButtonText: '确定'
          }).then(x => {
            // this.$refs.walletAddr.focus()
          })
          return false
        }
        isdepositSubmit = true
        this.$bus.$emit('loadingShow')
        let params = {
          USDT: this.amountUSDT,
          CNY: this.amount,
          ChainName: this.bankName,
          From_WalletAddr: this.walletAddr,
          Token: this.getinfo().token
        }
        let url = '/api/deposit/CreateUSDTOrder'
        let that = this
        this.$https
          .fetchPost(url, this.secret(params))
          .then(res => {
            isdepositSubmit = false
            this.$bus.$emit('loadingHide')
            if (res.data.Success === true) {
              // that.$nextTick(function () {
              that.$router.push({
                name: 'depositInfoTransferOut',
                params: {
                  AmountUSDT: res.data.Result.Amount,
                  BankName: res.data.Result.ChainName,
                  TransferPropety: that.onlineAmount,
                  WalletAddr: res.data.Result.WalletAddr,
                  USDTRate: that.USDTRate
                }
              })
              // })
            } else {
              this.$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          })
          .catch(err => {
            isdepositSubmit = false
            console.log(err)
          })
      }
    },
    // 获取充值方式
    getUSDTRate () {
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
              _this.USDTRate = res.data.Result.Rate
            }
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
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
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getUSDTRate()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.amountBlock {
  width: 100%;
  height: 1.8rem;
  overflow: hidden;
  line-height: 0.68rem;
  position: relative;
}
.amountBlock > h3 {
  color: #0088ff;
  font-size: x-large;
}
.amountBlock > h4 {
  color: #dc3545;
}
.amount-Main textarea {
  width: 100%;
  height: 1.3rem;
  font-size: 0.3rem;
  color: #007eff;
  border: 0.02rem solid #e5e5e5;
}
</style>
