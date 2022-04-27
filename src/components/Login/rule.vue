<template>
  <div class="rule">
    <!-- 头部导航 -->
    <navBar :navBarName="navBarName" :navLeft="navLeft" :navRight="navRight" @openSide="openSide" />
    <div class="rule-main">
      <div class="box">
        <h2>1.1. INTRODUCTION</h2>
        <p>We advise that you read the Terms and Conditions governing all elements of the Service carefully before accepting them. In the event that you do not wish to agree and accept the Terms and Conditions, please do not open an Account with the Company, and stop using any account which you have already opened. Any further use of the Service shall constitute your unconditional acceptance of all Terms and Conditions.</p>
        <br />
        <p>The Terms and Conditions are governed under the laws of Cyprus.</p>
        <h2>1.2. PARTIES</h2>
        <ol>
          <li>Information provided on the Service is supplied by the operating 18slot.com is owned and operated by 18slot as a License Holder. And have provide processing services on the website as Billing Agents.</li>
          <li>All rights reserved and protected by law.  All paragraphs of the Terms and Conditions containing the words "us", "our", "we" or the word "Company" refer to the Company, with which the customer enters into agreement in accordance with paragraph 1.1 of the Terms and Conditions.</li>
        </ol>
        <h2>1.3. CHANGE OF TERMS</h2>
        <ol>
          <li>1. The Company is entitled to alter or amend any product offered on the Service. In addition, to ensure the continuous operation of the Service, the Company reserves the right to make changes at any time without giving prior notice to customers.</li>
          <li>2. The Company is entitled to restrict customers’ access to some sections of the Service for the purpose of maintaining the regular operation of the Service or for altering any products that are offered by it.</li>
          <li>3. The Company also reserves the right to update these Terms and Conditions. Herewith the new edition of the Terms and Conditions will be effective and used immediately as of the moment it is published on the Service. The Company is not obligated to notify customers of any minor or insubstantial changes which may be made, therefore we recommend that customers review the Terms and Conditions regularly.</li>
        </ol>
        <h2>1.4. LEGAL REQUIREMENTS</h2>
        <ol>
          <li>1. By opening an Account with the Company, you acknowledge that:</li>
            <em>・you understand and accept the risk that you may lose as well as win money by using the Service</em><br />
            <em>・you have reached the age of majority in your jurisdiction</em><br />
            <em>・gambling is not prohibited in the territory of the country in which you are present</em><br />
            <em>・you are legally able (capable) of entering into binding contracts in accordance with the law</em><br />
            <em>・your participation in gambling has not been limited and you have not had accounts closed by the Company pursuant to the Terms and Conditions</em><br />
            <em>・any bet placed by you is deemed to be confirmation that you agree to and accept the Terms and Conditions</em><br />
          <li>2. Access to the Service, or use of any of the products offered by the Service, may not be legal for persons located in certain countries. Access to the Service, or use of any of the products offered by the Service, may not be legal for persons located in certain countries and is prohibited for sanctioned countries such as USA, Netherlands, France, Dutch West Indies,Iran, Curacao etc. The fact that our Service is available in a country or displayed in the official language of any of these countries cannot be regarded as the legality of use of the Service and depositing of funds into an account or withdrawal of winnings from it. The availability of our services does not constitute an offer, solicitation, or invitation from us for the use of gambling in any jurisdiction in which such activities are prohibited by law.</li>
          <li>3. It is your responsibility to determine the law that applies to gambling in your location. By opening an Account and using the Service you confirm and guarantee that your actions comply with the legislation, statutes, and policies governing gambling in your location.</li>
          <li>4. You are liable for any violation of these Terms and Conditions. In the event that the Terms and Conditions are violated, the Company reserves the right to refuse payment of any winnings, to withhold deposits, to cancel any bets, or to refuse to accept any type of bet without providing a reason. The Company shall not be responsible for the length of an investigation which allows it to uncover violations of the Terms and Conditions by a customer.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/Center/Common/navBar'
export default {
  name: 'rule',
  //  import引入的组件需要注入到对象中才能使用
  components: { navBar },
  data () {
    //  这里存放数据
    return {
      navBarName: 'Terms & Conditions',
      navLeft: 'back',
      navRight: 'hide'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    openSide () {
      this.$router.back(-1)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.rule {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.rule .rule-main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  position: absolute;
  top: 0.88rem;
  bottom: 0.88rem;
  z-index: 99;
}
.rule .rule-main .box {
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  margin-bottom: 1rem;
  background: #fff;
}
.rule .rule-main .box p {
  font-size: 0.25rem;
  margin: 0.05rem 0;
  letter-spacing: 0.02rem;
  text-align: start;
  color: #6b6b6b;
}
.rule .rule-main .box li,
.rule .rule-main .box em {
  letter-spacing: 0.02rem;
  text-align:start;
  font-size: 0.25rem;
  margin: 0.05rem 0;
  color: #6b6b6b;
}
.rule .rule-main .box h2 {
  font-size: 0.28rem;
  font-weight: normal;
  margin: 0.1rem 0;
  color: #0088ff;
}
</style>
