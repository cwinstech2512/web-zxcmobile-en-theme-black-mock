<template>
    <div class="LBweekstake" :class="showExternalBar ? 'on':''">
        <section class="c_top">
            <img src="../../../../assets/images/activity/LBweekstake/bg01.jpg">
            <div class="c_content">
                <div class="c_area_1">
                    活动时间：2021年1月18日起
                </div>
                <div class="c_area_2">
                     <div class="c_left"><h3>活动时间</h3>2021年1月18日起</div>
                    <div class="c_center"><h3>活动对象</h3>众鑫会员</div>
                    <div class="c_right"><h3>派发方式</h3><span>每周一下午16:00系统自动发放</span></div>
                </div>
            </div>
        </section>
        <section class="c_bottom">
            <img src="../../../../assets/images/activity/LBweekstake/bg02.jpg">
            <div class="c_content">
                <div class="c_area_1">
                    LB周周返现，最高返现11888元!
                </div>
                <div class="c_area_2">
                    <table>
                        <tr>
                            <td>流水要求</td>
                            <td style="color: black;">最高彩金奖励</td>
                            <td>LB快乐彩周投注额</td>
                        </tr>
                        <tr>
                            <td>1倍</td>
                            <td>188</td>
                            <td>≥5W</td>
                        </tr>
                        <tr>
                            <td>2倍</td>
                            <td>888</td>
                            <td>≥20W</td>
                        </tr>
                        <tr>
                            <td>4倍</td>
                            <td>2688</td>
                            <td>≥100W</td>
                        </tr>
                        <tr>
                            <td>4倍</td>
                            <td>5888</td>
                            <td>≥400W</td>
                        </tr>
                        <tr>
                            <td>8倍</td>
                            <td>11888</td>
                            <td>≥700W</td>
                        </tr>
                    </table>
                </div>
                <div class="c_area_3">
                    *注：每个会员每周仅限一次申请机会（长期单边投注不享有该优惠。例如，只投注“大”或只投注“小”）
                </div>
                <div class="c_area_4">
                    <ul>
                        <li>该活动除每日签到、返水外，不与其他活动流水共享；</li>
                        <li>该优惠只针对LB平台游戏投注有效</li>
                        <li>活动时间以自然周为单位</li>
                        <li>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者每周只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利的权利</li>
                        <li>无论是个人或团体，如有任何威胁、滥用此优惠套取利益，一经核实，众鑫娱乐有权利取消、收回优惠以及优惠产生的盈利</li>
                        <li>众鑫娱乐保留对本次活动的修改、修订和最终解释权，以及在无通知情况下修改本次活动的权利</li>
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
    this.$emit('setExternalBar', 'LB周返现流水活动', 'back', this.showExternalBar)
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
.LBweekstake{
    margin: 0;
    padding: 0;
}
.LBweekstake section{
    position: relative;
}
.LBweekstake img{
    width: 100%;
    display: block;
}
.LBweekstake section > .c_content{
    position: absolute;
    top: 0;
}
.LBweekstake section.c_top > .c_content{
    left: 49.8%;
    transform: translateX(-50%);
    width: 94.5%;
    height: 100%;
}
.c_top > .c_content > div.c_area_1{
    position: relative;
    left: 49%;
    transform: translateX(-50%);
    width: 34%;
    top: 55%;
    height: 4%;
    color: #f7e2cb;
    font-size: 2.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.c_top > .c_content > div.c_area_2{
    position: relative;
    top: 66%;
    height: 9.5%;
    display: flex;
    justify-content: space-between;
}
.c_top > .c_content > div.c_area_2 > div{
    width: 32%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    color: #f7e2cb;
    padding: 1% 0;
    font-size: 2.5vw;
}
.c_top > .c_content > div.c_area_2 >  div > h3{
    color: #f7e2cb;
    font-size: 2.5vw;
    margin: 0;
    width: 100%;
}
.c_top > .c_content > div.c_area_2 >  div > span{
    font-size: 1.9vw;
    display: block;
    width: 100%;
    color: #f7e2cb;
}

.c_bottom > .c_content{
    left: 50%;
    transform: translateX(-50%);
    width: 78%;
    height: 100%;
}
.c_bottom > .c_content > div.c_area_1{
    position: relative;
    height: 2.4%;
    top: 0;
    color: #f7e2cb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4.5vw;
}
.c_bottom > .c_content > div.c_area_2{
    position: relative;
    width: 100%;
    top: 0%;
    height: 40.8%;
    color: #f7e2cb;
    padding: 0.91% 1%;
}

.c_bottom > .c_content > div.c_area_3{
    position: relative;
    top: 0;
    height: 5%;
    color: #f7e2cb;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4.5vw;
}
.c_bottom > .c_content > div.c_area_4{
    position: relative;
    height: 38%;
    top: 6%;
    color: white;
    display: flex;
    align-items: center;
}
.c_area_2 > table {
    height: 100%;
    width: 100%;
}
.c_area_2 > table  tr:nth-child(1){
    height: 8.9%;
}
.c_area_2 > table  td{
    width: calc(90.1%/3);
    font-size: 4vw;
    text-align: center;
    padding: 0 1.5%;
}
.c_area_4 > ul{
    margin: 0;
    height: 100%;
    padding: 2% 2.5% 2% 10%;
    color: #f7e2cb;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.c_area_4 > ul > li{
    font-size: 4.5vw;
    list-style-type: decimal;
    width: 100%;
}
</style>
