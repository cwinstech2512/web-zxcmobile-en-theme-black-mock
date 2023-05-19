<template>
  <div class="deposit">
    <div class="mode">
      <h2>Payment Method</h2>
      <ul class="way">
        <li v-for="(methods, index) in depositMethod"
            :key="index"
            :class="[methods.code, {on: index == activeWay}]"
            @click="switchWay(index)">
          <i></i>
          <span>{{methods.name}}</span>
        </li>
      </ul>
    </div>
    <depositIndoUSDT v-if="isUSDTTransfer" :bank="bank" :onlineAmount="onlineAmount"></depositIndoUSDT>
    <depositIndoWechatSK
      v-else-if="isWechatPaySk"
      :aisleShow="aisleShow"
      :depositMethod="depositMethod[activeWay]">
    </depositIndoWechatSK>
    <div v-else>
      <div class="bank"
           v-show="bankShow">
        <h2>Select Bank</h2>
        <select v-model="bankName">
          <option v-for="(banks, index) in bank"
                  :key="index">{{banks}}</option>
        </select>
      </div>

      <div class="aisle"
           v-show="aisleShow">
        <h2>Channel</h2>
        <ul>
          <li v-for="(aisles, index) in aisle"
              :key="index"
              :class="{on: index == activeAisle}"
              @click="switchAisle(index)">{{aisles}}</li>
        </ul>
      </div>

      <div class="writeBank"
           v-show="writeBankShow">
        <h2>Enter your bank card number</h2>
        <input type="text"
               v-model.trim.number="writeBank"
               maxlength="50"
               placeholder="Please enter your bank card number" />
      </div>

      <!-- <div class="writeBank" v-show="alipayNameShow">
        <h2>请输入支付宝真实姓名，否则无法自动到账</h2>
        <input type="text" v-model.trim="alipayName" maxlength="50" placeholder="请输入支付宝真实姓名" />
      </div>-->
      <div class="writeBank"
           v-show="isBankToCardSm || writeBankH5Sm">
        <h2>Enter the remitter name</h2>
        <input type="text" v-model.trim="RealName" maxlength="50" placeholder="Please enter remitter name for this transfer" />
      </div>
      <div class="bank"
           v-show="olBankShow">
        <h2>Select Bank</h2>
        <select v-model="olBank">
          <option v-for="(item, index) in olBanks"
                  :key="index"
                  :value="item.Value">{{item.Text}}</option>
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
                   placeholder="Enter deposit amount"
                   @keyup="inputChange" />
            <em class="dec"
                v-if="decValue>0">.{{decValue}}</em>
            <span v-if="decValue>0">
              Please transfer the amount stated above, including two decimal places.
              <b>.{{decValue}}</b>
            </span>
            <ul class="amountBtn">
              <li v-for="(abtn, index) in amountBtn"
                  :key="index"
                  @click="addAmount(abtn)">{{ abtn==-1 ? 'Clear':abtn}}</li>
            </ul>
            <button @click="deposit()">Deposit Now</button>
            <button class="green"
                    v-show="tutorialBtn"
                    @click="tutorial">Tutorial</button>
          </div>
          <div v-else>
            <select v-model="amount"
                    class="else">
              <option disabled="disabled"
                      value="0"
                      selected="selected">Select amount</option>
              <option v-for="(fix,index) in fixAmount"
                      :value="fix"
                      :key="index">{{fix}}</option>
            </select>
            <button @click="deposit()">Deposit Now</button>
          </div>
        </div>
      </div>
      <div class="text">
        <span>NOTICE</span>
        <p>1.Minimum deposit PHP{{minAmount}}，Maximum PHP{{maxAmount}}.</p>
        <template v-if="isWechatTransfer">
          <p>2.提交充值金额后请按系统给出的带小数点金额存款，以便系统自动上分；</p>
          <p>3.存款成功后5分钟内没有到账的请及时联系在线客服；</p>
        </template>
        <template v-else>
          <p>2.Pay via Bank card step guide: ① Enter or select deposit amount. ② Select bank name then click "Next Step" ③ Using your online banking to transfer.</p>
          <p>3. If the recharge not received, please contact our 24/7 help center.</p>
          <p v-if="isBankToCard">5.收款账户不定时更新，请认准当前显示账户信息，仔细核对银行及卡号，
          如因个人原因转账错误或转入已下架异常银行卡，导致金额损失，均由个人承担；</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import depositIndoUSDT from '@/components/Center/Wallet/depositInfo/deposit-info-usdtTransfer'
import depositIndoWechatSK from '@/components/Center/Wallet/depositInfo/deposit-info-wechatSK'
var isdepositSubmit = false
export default {
  name: 'deposit',
  //  import引入的组件需要注入到对象中才能使用
  components: {depositIndoUSDT, depositIndoWechatSK},
  data () {
    //  这里存放数据
    return {
      activeWay: 0,
      depositMethod: [],
      bankName: '', // 手动存款选择的银行
      minAmount: 10,
      maxAmount: 5000,
      onlineAmount: {},
      isDecimal: null, // 1 小数 2 整数
      decValue: 0, // 0到100
      fixAmount: [], // 固定金额
      alipayName: '',
      alipayNameShow: false,
      writeBank: '',
      writeBankShow: false,
      olBankShow: false,
      writeBankH5Sm: false,
      RealName: '',
      olBanks: [], // 在线选择银行
      olBank: '',
      bankShow: true, // 手动存款的银行
      bank: [], // 手动存款的银行
      aisleShow: false,
      aisle: [],
      activeAisle: 0,
      wechatRate: 0.00,
      wechatRateCon: 0.14,
      amount: null,
      amountBtn: [],
      depositUrl: [], // 在线中转的域名
      tutorialBtn: false, // 教程按钮
      cacheTime: 5, // 充值数据缓存时间，单位分
      isBankToCard: false, // 第3方网银转账
      isBankToCardSm: false, // 第3方网银转账
      isOnlineTransfer: false, // 网银转账
      isWechatTransfer: false, // 微信轉帳
      isUSDTTransfer: false, // 微信轉帳
      isWechatPaySk: false // 微信轉帳
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    tutorial () {
      this.$bus.$emit('tutorialShow')
    },
    // 选择支付方式
    switchWay (index) {
      this.activeWay = index
      this.isBankToCard = this.depositMethod[index].code === 'BankToCard'
      this.isOnlineTransfer = this.depositMethod[index].code === 'onlineTransfer'
      this.isWechatTransfer = this.depositMethod[index].code === 'wechatTransfer'
      this.isUSDTTransfer = this.depositMethod[index].code === 'usdtTransfer'
      this.isBankToCardSm = this.depositMethod[index].code === 'BankToCardSm'
      this.isWechatPaySk = this.depositMethod[index].code === 'WechatPaySk'
      this.amount = null
      if (this.depositMethod[index].isOL) {
        let groupList = this.depositMethod[index].GroupList
        this.aisle = []
        groupList.forEach((element, index) => {
          this.aisle.push('Channel' + (index + 1))
        })
        if (groupList.length > 0) {
          this.switchAisle(0)
        }
      } else {
        this.fixAmount = []
        this.decValue = 0
        this.bank = this.depositMethod[index].TransferPropety.BankNames
        this.bankName = ''
        this.minAmount = this.depositMethod[index].TransferPropety.MinAmount
        this.maxAmount = this.depositMethod[index].TransferPropety.MaxAmount
        this.setAmountBtn()
        this.$nextTick(() => {
          this.bankName = this.bank[0]
        })
      }
      // 判断是否需要通道的方式
      this.aisleShow = this.depositMethod[index].isOL
      this.bankShow = !this.aisleShow

      // 网银H5 需要填银行卡号
      if (this.depositMethod[index].code === 'BankH5') {
        this.writeBankShow = true
        this.writeBank = localStorage.getItem('bankh5')
      } else {
        this.writeBankShow = false
      }

      // 网银H5 SM 需要填银行卡号
      if (this.depositMethod[index].code === 'BankH5Sm') {
        this.writeBankShow = true
        this.writeBankH5Sm = true
        this.writeBank = localStorage.getItem('bankh5')
      } else {
        this.writeBankShow = false
      }
      // 支付宝转卡
      // if (this.depositMethod[index].code === 'AlipayToCard') {
      //   this.alipayNameShow = true
      // } else {
      //   this.alipayNameShow = false
      // }
      // 需要教程的方式
      if (this.depositMethod[index].code === 'UnionPay') {
        this.tutorialBtn = true
      } else {
        this.tutorialBtn = false
      }
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
    setAmountBtn () {
      var amountBtnArr = [100, 500, 1000, 5000, 10000]
      // if (this.isWechatPaySk) {
      //   amountBtnArr = [4500, 15000, 25000, 35000, 40000]
      // }
      if (this.isOnlineTransfer) {
        amountBtnArr = [100, 500, 1000, 3000, 5000, 10000, 50000]
      }
      if (this.isBankToCard) {
        amountBtnArr = [100, 500, 1000, 5000, 10000, 30000, 50000]
      }
      let that = this
      this.amountBtn = amountBtnArr.filter(function (ele) {
        return ele >= that.minAmount && ele <= that.maxAmount
      })
      this.amountBtn.push(-1) // -1 是清除
    },
    // 增加金额
    addAmount (amount) {
      if (amount === -1) {
        this.amount = null
      } else if (this.amount === '') {
        this.amount = null
        if (this.isWechatPaySk) {
          this.amount = amount
        } else {
          this.amount =
            (this.amount === null ? 0 : parseInt(this.amount)) + amount
        }
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      } else {
        if (this.isWechatPaySk) {
          this.amount = amount
        } else {
          this.amount =
            (this.amount === null ? 0 : parseInt(this.amount)) + amount
        }
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      }
    },
    inputChange () {
      // 输入框值改变
      this.amount = this.amount.replace(/[^\d]/g, '')
    },
    // 提交充值
    deposit () {
      let isOL = this.depositMethod[this.activeWay].isOL
      if (!isOL) {
        //  手动存款
        if (this.bankName === '') {
          this.$swal({
            text: 'Select receiving bank',
            type: 'warning',
            confirmButtonText: 'OK'
          })
          return false
        }
        if (
          this.amount === null ||
          this.amount > this.maxAmount ||
          this.amount < this.minAmount
        ) {
          this.$swal({
            text: 'Deposit amount error',
            type: 'warning',
            confirmButtonText: 'OK'
          })
          return false
        }
        if (isdepositSubmit) {
          return false
        }
        isdepositSubmit = true
        this.$bus.$emit('loadingShow')
        let params = {
          Type: this.depositMethod[this.activeWay].code,
          Amount: this.amount,
          BankName: this.bankName,
          Token: this.getinfo().token
        }
        let url = '/api/deposit/createorder'
        let that = this
        this.$https
          .fetchPost(url, this.secret(params))
          .then(res => {
            isdepositSubmit = false
            this.$bus.$emit('loadingHide')
            if (res.data.Success === true) {
              // that.$nextTick(function () {
              that.$router.push({
                name: 'depositInfo',
                params: {
                  navBarName: that.depositMethod[that.activeWay].name,
                  bankName: that.bankName,
                  TransferPropety: this.depositMethod[that.activeWay].TransferPropety ? this.depositMethod[that.activeWay].TransferPropety : '',
                  data: res.data.Result,
                  type: params.Type
                }
              })
              // })
            } else {
              this.$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: 'OK'
              })
            }
          })
          .catch(err => {
            isdepositSubmit = false
            console.log(err)
          })
      } else {
        /* 网银H5 有没有输入卡号 */
        if (this.depositMethod[this.activeWay].code === 'BankH5') {
          if (this.writeBank.length === 0) {
            this.$swal({
              text: 'Please enter the deposit bank card number',
              type: 'warning',
              confirmButtonText: 'OK'
            })
            return false
          }
          let reg = /^\d{10,}$/
          if (!reg.test(this.writeBank)) {
            this.$swal({
              text: 'Invalid bank card number',
              type: 'warning',
              confirmButtonText: 'OK'
            })
            return false
          }
        }
        // if (this.depositMethod[this.activeWay].code === 'AlipayToCard') {
        //   if (this.alipayName.length === 0) {
        //     this.$swal({
        //       text: '请输入支付宝真实姓名',
        //       type: 'warning',
        //       confirmButtonText: '确定'
        //     })
        //     return false
        //   }
        // }
        if (
          this.amount === null ||
          this.amount > this.maxAmount ||
          this.amount < this.minAmount
        ) {
          this.$swal({
            text: 'Deposit amount error',
            type: 'warning',
            confirmButtonText: 'OK'
          })
          return false
        }

        // eslint-disable-next-line standard/computed-property-even-spacing
        let group = this.depositMethod[this.activeWay].GroupList[
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
              confirmButtonText: 'OK'
            })
            return false
          }
        }

        if (this.olBankShow) {
          if (this.olBank.length === 0) {
            this.$swal({
              text: 'Select Bank',
              type: 'warning',
              confirmButtonText: 'OK'
            })
            return false
          }
        }
        if (isdepositSubmit) {
          return false
        }
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
          text: 'Please check if the deposit was successful',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0088ff',
          confirmButtonText: 'Success',
          cancelButtonText: 'Failed'
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
    // 获取充值方式
    getMethods () {
      let methods = sessionStorage.getItem('mobMethods')
      if (methods) {
        methods = JSON.parse(methods)
        let time = new Date()
        if (
          new Date(methods.time) >
          time.valueOf() - this.cacheTime * 60 * 1000
        ) {
          this.init(methods.result)
          return
        }
      }

      this.$bus.$emit('loadingShow')
      let url = '/api/deposit/getrechargetype'
      let params = {
        Token: this.getinfo().token
      }
      // let _this = this
      this.$https
        .fetchPost(url, this.secret(params))
        .then(res => {
          if (res.data.Success === true) {
            sessionStorage.setItem(
              'mobMethods',
              JSON.stringify({ result: res.data.Result, time: new Date() })
            ) // 保留在本地
            this.init(res.data.Result)
          } else {
            if (res.data.Message === 'Please bind your bank card first' || res.data.Message === 'Please bind your bank card first') {

            } else {
              this.NormalFailConfirm(res.data)
            }
          }
          this.$bus.$emit('loadingHide')
        })
        .catch(err => {
          this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    init (result) {
      this.depositMethod = []
      result.Methods.forEach(element => {
        // if (element.TypeCode === 'onlineTransfer') {
        //   this.onlineAmount.minAmount = element.TransferPropety.MinAmount
        //   this.onlineAmount.maxAmount = element.TransferPropety.MaxAmount
        // }
        this.depositMethod.push({
          code: element.TypeCode,
          name: element.Name,
          isOL: element.IsOL,
          GroupList: element.GroupList,
          TransferPropety: element.TransferPropety
        })
      })
      this.depositUrl = result.DepositUrl
      if (result.Methods.length > 0) {
        this.switchWay(0) // 选择支付方式
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getMethods()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
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
