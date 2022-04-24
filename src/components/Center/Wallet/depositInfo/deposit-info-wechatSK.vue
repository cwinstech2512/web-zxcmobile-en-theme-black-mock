<template>
  <div>
    <div class="aisle"
           v-show="aisleShow">
        <h2>选择通道</h2>
        <ul>
          <li v-for="(aisles, index) in aisle"
              :key="index"
              :class="{on: index == activeAisle}"
              @click="switchAisle(index)">{{aisles}}</li>
        </ul>
      </div>
    <div class="amount">
      <h2>充值金额</h2>
      <div class="amount-Main">
        <div v-if="fixAmount.length === 0">
          <input type="number"
                 v-model="amount"
                 maxlength="8"
                 :disabled="true"
                 placeholder="输入充值金额"
                 @keyup="inputChange" />
          <ul class="amountBtn">
            <li v-for="(abtn, index) in amountBtn"
                :key="index"
                @click="addAmount(abtn)">{{ abtn==-1 ? '清除':abtn}}</li>
          </ul>
          <div class="amountBlock">
            <h3>
              实际扫码(约) {{calcWechatRate(amount, wechatRate)}}
            </h3>
            <h4>
              <em>*到账金额依实际扫码为主</em>
            </h4>
          </div>
          <button @click="deposit()">立即充值</button>
        </div>
      </div>
    </div>
    <div class="text">
      <span>注意事项</span>
      <p>1.单笔存款最低{{minAmount}}元，上限{{maxAmount}}元；</p>
      <template>
          <p>2.当前CNY/T兑币比约为 1:{{wechatRate}} (汇率有不同，仅供参考，依实际扫码金额为主);</p>
          <p>
            <table class="table_amount">
              <tr>
                <td width="10%">T币</td>
                <td width="10%">微信支付 ≈</td>
              </tr>
              <template v-for="(amountItem, key) in amountBtn">
                <tr v-if="amountItem > 0" :key="key">
                  <td width="10%">{{amountItem}}</td>
                  <td width="10%">{{calcWechatRate(amountItem, wechatRate)}}</td>
                </tr>
              </template>
            </table>
          </p>
          <p>3.存款成功后5分钟内没有到账的请及时联系在线客服；</p>
        </template>
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
    depositMethod: {
      type: Object,
      required: true
    },
    aisleShow: {
      type: Boolean,
      required: true
    }
  },
  data () {
    //  这里存放数据
    return {
      bankName: '', // 手动存款选择的银行
      isDecimal: null, // 1 小数 2 整数
      isLimitAvailable: true,
      decValue: 0, // 0到100
      walletAddr: '',
      fixAmount: [], // 固定金额
      activeAisle: 0,
      aisle: [],
      wechatRate: 0.00,
      wechatRateCon: 0.14,
      minAmount: 0,
      maxAmount: 50000,
      amount: null,
      amountBtn: [1500, 3000, 4500, 10000, 15000, -1]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    // 'amount': function (n, o) {
    //   this.amountUSDT = this.toDecimal2(n / this.USDTRate)
    // },
    // 'USDTRate': function (n, o) {
    //   this.amountUSDT = this.toDecimal2(this.amount / n)
    // }
  },
  //  方法集合
  methods: {
    tutorial () {
      this.$bus.$emit('tutorialShow')
    },
    // 选择通道
    switchAisle (index) {
      this.activeAisle = index
      let group = this.depositMethod.GroupList[this.activeAisle]
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.minAmount = this.depositMethod.GroupList[
        this.activeAisle
      ].MinAmount
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.maxAmount = this.depositMethod.GroupList[
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
    setAmountBtn () {
      // var amountBtnArr = [100, 500, 1000, 5000, 10000]
      // // if (this.isWechatPaySk) {
      // //   amountBtnArr = [4500, 15000, 25000, 35000, 40000]
      // // }
      // if (this.isOnlineTransfer) {
      //   amountBtnArr = [100, 500, 1000, 3000, 5000, 10000, 50000]
      // }
      // let that = this
      // this.amountBtn = amountBtnArr.filter(function (ele) {
      //   return ele >= that.minAmount && ele <= that.maxAmount
      // })
      // this.amountBtn.push(-1) // -1 是清除
    },
    // 增加金额
    addAmount (amount) {
      if (amount === -1) {
        this.amount = null
      } else if (this.amount === '') {
        this.amount = null
        // this.amount =
        //   (this.amount === null ? 0 : parseInt(this.amount)) + amount
        // if (this.amount > this.onlineAmount.maxAmount) {
        //   this.amount = this.onlineAmount.maxAmount
        // }
      } else {
        this.amount = amount
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      }
    },
    inputChange () {
      // 输入框值改变
      this.amount = this.amount.replace(/[^\d]/g, '')
    },
    calcWechatRate (tAmount, rate) {
      if (rate > 0.0) {
        return this.toDecimal2(tAmount / rate)
      } else {
        return '计算中'
      }
    },
    // 提交充值
    async deposit () {
      let isOL = true
      if (isOL) {
        // eslint-disable-next-line standard/computed-property-even-spacing
        let group = this.depositMethod.GroupList[
          this.activeAisle
        ]
        let regex = group.Regular
        let regextip = group.RegexRemark
        if (regex && regex.length > 0) {
          let reg = new RegExp(regex)
          if (!reg.test(this.fixAmount)) {
            this.$swal({
              text: regextip,
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
        }
        if (
          this.amount === null ||
          this.amount > this.maxAmount ||
          this.amount < this.minAmount
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
        await this.limitAvailable(this.amount)
        if (!this.isLimitAvailable) return false
        localStorage.setItem('bankh5', this.writeBank)
        isdepositSubmit = true
        window.open(
          'Deposit.html?a=' +
          this.amount +
          '.' +
          this.decValue +
          '&p=' +
          group.Port +
          '&g=' +
          group.Group +
          '&b=' +
          this.olBank +
          '&c=' +
          this.writeBank +
          (this.isBankToCardSm || this.writeBankH5Sm ? '&r=' + this.RealName : '')
          // + '&an=' +
          // encodeURI(this.alipayName)
        )
        // 1.5秒后恢复点击
        this.$swal({
          text: '确认是否充值成功',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0088ff',
          confirmButtonText: '成功',
          cancelButtonText: '失败'
        }).then(res => {
          if (res.value) {
            this.$router.push({
              name: 'depositInfo',
              params: {
                navBarName: this.depositMethod[this.activeWay].name,
                data: '{}',
                type: 'countdown'
              }
            })
          }
        })
        setTimeout(() => {
          isdepositSubmit = false
        }, 1500)
      }
    },
    async limitAvailable (amount) {
      let _this = this
      let params = {
        Token: this.getinfo().token,
        userName: this.getinfo().account,
        amount: amount
      }
      let url = '/api/Deposit/WechatPaySk'
      await _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.isLimitAvailable = true
          } else {
            _this.isLimitAvailable = false
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 当前WechatRate
    getWechatRate () {
      let _this = this
      let url = '/api/Deposit/GetWechatRate'
      _this.$https
        .fetchGet(url, {})
        .then(res => {
          if (res.data.Success === true) {
            var reCurrency = JSON.parse(res.data.Result)
            reCurrency.forEach(element => {
              if (element.result > 0.0) {
                _this.wechatRate = this.toDecimal2(this.toDecimal2(element.result) - this.wechatRateCon)
              }
            })
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getWechatRate()
    if (this.depositMethod.isOL) {
      let groupList = this.depositMethod.GroupList
      this.aisle = []
      groupList.forEach((element, index) => {
        this.aisle.push('通道' + (index + 1))
      })
      if (groupList.length > 0) {
        this.switchAisle(0)
      }
    }
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
.table_amount {
  border: 1px solid;
  width: 50%;
}
.table_amount td {
  border: 1px solid;
  padding: 4px;
  text-align: center;
}
</style>
