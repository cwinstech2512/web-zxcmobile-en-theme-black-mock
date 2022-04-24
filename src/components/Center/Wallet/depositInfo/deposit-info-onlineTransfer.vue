<template>
<div class='onlineTransfer'>
  <ul>
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
    <!-- <li> 20220322 mark掉附言编码
      <label>附言：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.Code"
      >
      <b @click="handleCopy(result.Code,$event)">复制</b>
    </li> -->
  </ul>
  <div class="text">
    <span>注意事项</span>
    <p>1.单笔存款最低100.00元，上限50000.00元；</p>
    <p>2.支付完成前请勿关闭浏览器，否则可能造成支付失败；</p>
    <p>3.若充值后未到账请联系在线客服。</p>
  </div>
</div>
</template>

<script>
import clipboard from '@/Plugin/clipboard.js'

export default {
  name: 'onlineTransfer',
  props: {
    info: {
      type: String,
      required: true
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
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
    // console.log(this.info)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
</style>
