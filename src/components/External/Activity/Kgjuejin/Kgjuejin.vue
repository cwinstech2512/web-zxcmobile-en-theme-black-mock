<template>
    <div class="kgjuejin" :class="showExternalBar ? 'on':''">
            <section class="c_top">
                <img src="../../../../assets/images/activity/Kgjuejin/bg01.jpg">
                <div class="c_content">
                    <img src="../../../../assets/images/activity/Kgjuejin/title1.png">
                    <img src="../../../../assets/images/activity/Kgjuejin/title2.png">
                </div>
            </section>
            <section class="c_bottom">
                <img src="../../../../assets/images/activity/Kgjuejin/bg02.jpg">
                <div class="c_content">
                    <div class="c_area_1">
                        当日KG快乐彩【加拿大】【澳洲】【斯洛伐克】【加拿大西】五行玩法出现1个“金”即可最低累积1笔28元至奖池内，凡快乐彩有效投注≥1000元即可参与当日奖池瓜分。
                    </div>
                    <div class="c_area_2">
                        <table>
                            <tr>
                                <th class="vertical">有效投注</th>
                                <th>≥1000元</th>
                                <th>≥10000元</th>
                            </tr>
                            <tr>
                                <th class="vertical">"金"价</th>
                                <th>28元/个</th>
                                <th>58元/个</th>
                            </tr>
                            <tr>
                                <th class="vertical">奖池彩金</th>
                                <th>“金”个数x28元</th>
                                <th>“金”个数x58元</th>
                            </tr>
                            <tr>
                                <th class="vertical">预计奖池</th>
                                <th>4000元</th>
                                <th>8200元</th>
                            </tr>
                        </table>
                        <p>举例说明：12月22日KG快乐彩【加拿大】【澳洲】【斯洛伐克】【加拿大西】一共出现150个“金”且有55个会员投注超过10000元，则奖池彩金为：150x58=8700元，人均可瓜分到158.18元彩金。</p>
                    </div>
                    <div class="c_area_3">
                        <p class="p1"><span>KG平台投注快乐彩（KENO）当期出现“金”且为负盈利即可申请100%包赔。</span></p>
                        <table>
                            <tr>
                                <th>会员等级</th>
                                <th>100%包赔彩金上限</th>
                            </tr>
                            <tr>
                                <th>普通会员</th>
                                <th>88元</th>
                            </tr>
                            <tr>
                                <th>黄金会员</th>
                                <th>288元</th>
                            </tr>
                            <tr>
                                <th>铂金会员</th>
                                <th>388元</th>
                            </tr>
                            <tr>
                                <th>钻石会员</th>
                                <th>588元</th>
                            </tr>
                            <tr>
                                <th>黑钻会员</th>
                                <th>888元</th>
                            </tr>
                            <tr>
                                <th>特邀会员</th>
                                <th>2888元</th>
                            </tr>
                        </table>
                        <p class="p2">举例说明：黄金会员A当期投注KG快乐彩【加拿大】[大]玩法200元，结果开出“金”，出现负盈利即可提供投注期号联系在线客服申请【100%包赔】200元。</p>
                    </div>
                    <div class="c_area_4">
                        <ul>
                            <li>参加本活动需完善“姓名+手机验证+绑定银行卡”;</li>
                            <li>活动期间内奖池每日开一次，包赔每日只能申请一次且仅限当日申请；</li>
                            <li>奖池瓜分彩金于次日12:00前自动派发，包赔彩金申请后24小时内派发；</li>
                            <li>包赔说明：投注同盘口当期所有注单和为负盈利即可包赔</li>
                            <li>该活动仅与返水共享；</li>
                            <li>该活动仅限投注于KG平台快乐彩（KENO）游戏，不限玩法；</li>
                            <li>所有彩金只需1倍流水；</li>
                            <li>同一IP、同一设备、同一电话、同一邮箱则视为违规账户，将取消所有优惠并冻结所有资金；</li>
                            <li>任何会员或团体以非正常的方式进行套取活动优惠，众鑫娱乐保留在不通知的情况下冻结或关闭相关账户的权利，并不退还款项且永久列入黑名单；</li>
                            <li>众鑫娱乐对本活动保有最终解释权</li>
                        </ul>
                    </div>
                </div>
            </section>
    </div>
</template>
<script>
export default {
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
    return {
      ddd: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', '百家乐注单奖励15888', 'back', this.showExternalBar)
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
*{
    box-sizing: border-box;
}
.kgjuejin{
    margin: 0;
    padding: 0;
}
.kgjuejin section{
    position: relative;
}
.kgjuejin img{
    width: 100%;
    display: block;
}
.kgjuejin section > .c_content{
    position: absolute;
    top: 0;
}
.kgjuejin{
    width: 100%;
    position: absolute;
    z-index: 99;
    top:0.88rem;
}
.c_top > .c_content{
    top: 7%;
    left: 6%;
    width: 66%;
}
.c_top > .c_content > img:nth-child(2){
    position: absolute;
    width: 53%;
    left: 50%;
    bottom: -37%;
    transform: translateX(-50%);
}
.c_bottom > .c_content{
    left: 49.2%;
    transform: translateX(-50%);
    width: 78.2%;
    height: 100%;
}
.c_bottom > .c_content > div{
    width: 100%;
}
.c_bottom > .c_content > div.c_area_1{
    position: relative;
    height: 7%;
    top: 3.7%;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 12px;
    align-items: center;
    padding: 0 4%;
    line-height: 1.9;
}
.c_bottom > .c_content > div.c_area_2{
    position: relative;
    width: 100%;
    top: 7.8%;
    height: 25%;
    padding: 3.4% 2.6%;
    color: white;
    font-size: 12px;
}
.c_bottom > .c_content > div.c_area_3{
    position: relative;
    top: 12.5%;
    height: 20.3%;
    padding: 2.3%;
    color: white;
    font-size: 12px;
}
.c_bottom > .c_content > div.c_area_4{
    position: relative;
    height: 20.35%;
    top: 17.6%;
    color: white;
    padding: 2%;
}
.c_bottom > .c_content > .c_area_2 > table{
    width: 100%;
    height: 80%;
    border-collapse: collapse;
}
.c_bottom > .c_content > .c_area_2 > table tr{
    position: relative;
}
.c_bottom > .c_content > .c_area_2 > table tr:last-child{
    font-size: 12px;
    height: 20%;
}
.c_bottom > .c_content > .c_area_2 > table th{
    border: 1px solid white;
}
.c_bottom > .c_content > .c_area_2 > p{
    height: 20%;
    border: 1px solid white;
    border-top: none;
    margin: 0;
    font-size: 3vw;
    padding: 2%;
}
.c_bottom > .c_content > .c_area_3 > table{
    width: 100%;
    font-size: 12px;
    height: 70%;
    border-collapse: collapse;
}
.c_bottom > .c_content > .c_area_3 > table tr:hover{
    background-color: rgb(255 255 255 / 0.2);
}
.c_bottom > .c_content > .c_area_3 > table th{
    border: 1px solid white;
}
.c_bottom > .c_content > .c_area_3 > table > tr:first-child > th{
    border-top: none;
}
.c_bottom > .c_content > .c_area_3 > table > tr:last-child > th{
    border-bottom: none;
}
.c_bottom > .c_content > .c_area_3 > p{
    font-size: 3vw;
    border: 1px solid white;
    margin: 0;
    padding: 0 2%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.c_bottom > .c_content > .c_area_3 > p > span{
    font-size: 2.5vw;
}
.c_bottom > .c_content > .c_area_3 > p.p1{
    height: 12%;
}
.c_bottom > .c_content > .c_area_3 > p.p2{
    height: 18%;
}
.c_bottom > .c_content .c_area_4 > ul{
    margin: 0;
    color: white;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 7.5%;
}
.c_bottom > .c_content .c_area_4 > ul > li{
    width: 100%;
    font-size: 3vw;
    list-style: decimal;
}
</style>
