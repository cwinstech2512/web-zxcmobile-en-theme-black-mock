<template>
<div class='alipayTransfer'>
  <ul v-show="next">
    <li>
      <label>充值金额：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.Amount"
      >
    </li>
    <li class="btn">
      <!--<span>【协议1】我已明白需要转账：<em>实际转账金额：{{result.Amount}}（包括小数点后两位）元</em></span>-->
      <!-- <span>【协议1】请联系在线客服咨询当前汇率（每日汇率固定）</span> -->
      <span>【协议1】请按系统给出的带小数点金额进行存款</span>
      <!-- <span>【协议2】计算方式：存款金额÷汇率 = 需转币的个数</span> -->
      <!--<span>【协议2】本人已同意，如未转账<em>{{result.Amount}}(包含小数点后两位)</em>导致系统无法匹配存款，本网站概不负责！</span>-->
    </li>
    <li class="btn">
      <button @click="next =!next">提交</button>
    </li>
  </ul>
  <ul v-show="!next">
    <li>
      <label>银行：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.BankName"
      >
      <b @click="handleCopy(result.BankName,$event)">复制</b>
    </li>
    <li>
      <label>姓名：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.Name"
      >
      <b @click="handleCopy(result.Name,$event)">复制</b>
    </li>
    <li>
      <label>账号：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.CardNumber"
      >
      <b @click="handleCopy(result.CardNumber,$event)">复制</b>
    </li>
    <li>
      <label>金额：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.Amount"
      >
    </li>
  </ul>
  <div class="text" v-if="result.BankName!=='邮政银行'">
    <span>注意事项</span>
    <!-- <p>1.单笔存款最低100.00元，上限50000.00元；</p> -->
    <p v-if=" this.code.toLowerCase() === 'alipaytransfer'">1. 支付宝转账为第三方转账，有一定的延迟，具体到账时间以支付宝账单－处理进度为准。</p>
    <p v-else>1.单笔存款最低{{TransferPropety.MinAmount}}元，上限{{TransferPropety.MaxAmount}}元；</p>
    <p>2. 提交充值金额后请按系统给出的带小数点金额存款，以便系统自动上分；
    <!-- <a href="javascript:void(0)" @click="sliaonow()">主线客服</a>
    <a href="javascript:void(0)" @click="sliaonow2()">次线客服</a> -->
    </p>
    <p>3. 存款成功后5分钟内没有到账的请及时联系在线客服；</p>
  </div>
</div>
</template>

<script>
import clipboard from '@/plugin/clipboard.js'

export default {
  name: 'alipayTransfer',
  props: {
    info: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    TransferPropety: {
      type: Object,
      required: true
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      next: true,
      result: JSON.parse(this.info)
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // console.log(this.code)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
</style>
