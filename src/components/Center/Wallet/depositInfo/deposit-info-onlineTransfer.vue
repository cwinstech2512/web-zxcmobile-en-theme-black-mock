<template>
<div class='onlineTransfer'>
  <ul>
    <li>
      <label>Bank：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.BankName"
      >
      <b @click="handleCopy(result.BankName,$event)">Copy</b>
    </li>
    <li>
      <label>Account Name：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.Name"
      >
      <b @click="handleCopy(result.Name,$event)">Copy</b>
    </li>
    <li>
      <label>Account：</label>
      <input
        type="text"
        name="readonly"
        disabled="disabled"
        v-model="result.CardNumber"
      >
      <b @click="handleCopy(result.CardNumber,$event)">Copy</b>
    </li>
    <li>
      <label>Amount：</label>
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
    <span>NOTICE</span>
    <p>1.Minimum deposit PHP100, Maximum PHP50000.</p>
    <p>2.Pay via Bank card step guide: ① Enter or select deposit amount. ② Select bank name then click "Next Step" ③ Using your online banking to transfer. </p>
    <p>3.If the recharge not received, please contact our 24/7 help center. </p>
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
