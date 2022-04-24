<template>
  <div class="EuroCup"
    :class="showExternalBar? 'on':''">
    <div style="position:relative;">
      <img
        src="../../../../assets/images/activity/EuroCup/img/n_main.png"
        alt="banner"
        class="banner-img"
      />
      <!--表格-->
      <div class="container">
        <div class="active_date"><h5>活动时间：2021年12月18日起</h5></div>
        <div class="active_content_title">
          <img
            src="../../../../assets/images/activity/EuroCup/img/n_title_act.png"
          />
          <h5>【仅限AI体育平台】每周六指定赛事负盈利100%包赔</h5>
          </div>
        <img
          src="../../../../assets/images/activity/EuroCup/img/n_table-top.png"
          alt="Snow"
          class="table-top"
        />
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" :class="dataFlag==0?'btn-active':''" @click="changeFlag(0)" class="btn btn-play" >近期赛事</button>
          <button type="button" :class="dataFlag==1?'btn-active':''" @click="changeFlag(1)" class="btn btn-play">历史赛事</button>
        </div>
        <table id="tbFuture" v-if="dataFlag==0">
          <thead>
              <tr>
                <th class="play-title">比赛日期</th>
                <th class="play-title">赛事名称</th>
                <th class="play-title">主队名称</th>
                <th class="play-title">客队名称</th>
              </tr>
            </thead>
          <tr v-for="(item, index) in futurnData.slice(0, 6)" :key="index" >
              <td class="text-center">{{formatDate(item.DateTimeValidStart) }}</td>
              <td class="text-center">{{item.OptValue}}</td>
              <td class="text-center">{{item.OptName}}</td>
              <td class="text-center">{{item.OptText}}</td>
          </tr>
        </table>
        <table id="tbHistory" v-else>
            <thead>
              <tr>
                <th class="play-title">比赛日期</th>
                <th class="play-title">赛事名称</th>
                <th class="play-title">主队名称</th>
                <th class="play-title">客队名称</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in historyData.slice(0, 6)" :key="index" >
                <td class="text-center">{{formatDate(item.DateTimeValidStart) }}</td>
                <td class="text-center">{{item.OptValue}}</td>
                <td class="text-center">{{item.OptName}}</td>
                <td class="text-center">{{item.OptText}}</td>
            </tr>
        </table>
      </div>
      <div class="section1">
        <div class="r_content">
          <img src="../../../../assets/images/activity/EuroCup/img/n_line_act.png" alt="banner" style="width:100%;" >
          <p>近一周内满足相应有效投注额即可在周六指定赛事享受100%包赔，最高1888元。</p>
        </div>
        <div class="r_content">
          <img src="../../../../assets/images/activity/EuroCup/img/n_line_gift.png" alt="banner" style="width:100%;" >
          <div class="table_wrapper">
            <table>
              <thead>
                <tr>
                  <th>近一周总有效投注</th>
                  <th>包赔上限</th>
                  <th class="rightColumn">流水</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>≥5000</td>
                  <td>58元</td>
                  <td rowspan="8" class="rightColumn">一倍流水</td>
                </tr>
                <tr>
                  <td>≥10000</td>
                  <td>88元</td>
                </tr>
                <tr>
                  <td>≥20000</td>
                  <td>188元</td>
                </tr>
                <tr>
                  <td>≥50000</td>
                  <td>288元</td>
                </tr>
                <tr>
                  <td>≥100000</td>
                  <td>388元</td>
                </tr>
                <tr>
                  <td>≥200000</td>
                  <td>588元</td>
                </tr>
                <tr>
                  <td>≥500000</td>
                  <td>888元</td>
                </tr>
                <tr>
                  <td>≥1000000</td>
                  <td>1888元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="r_content">
          <img src="../../../../assets/images/activity/EuroCup/img/n_line_role.png" alt="banner" style="width:100%;" >
          <div class="c_area_7">
            <ul>
              <li>
                <i></i>1. 该活动仅与返水共享；
              </li>
              <li>
                <i></i>2. 近一周内需单笔有效存款≥500元；注：近一周指上周六00:00~本周五23:59，且计算有效投注均以结算时间为准。
              </li>
              <li>
                <i></i>3. 仅限第一笔投注于早盘独赢、让球及大小盘口注单;
              </li>
              <li>
                <i></i>4. 彩金将于赛事结束后24小时内自动派发；
              </li>
              <li>
                <i></i>5. 若指定赛事出现腰斩，凡满足要求的会员均可获得幸运红包88元；
              </li>
              <li>
                <i></i>6. 同一IP、同一设备、同一电话、同一邮箱则视为违规账户，将取消所有优惠并冻结所有资金；
              </li>
              <li>
                <i></i>7. 任何会员或团体以非正常的方式进行套取活动优惠，众鑫娱乐保留在不通知的情况下冻结或关闭相关账户的权利，并不退还款项且永久列入黑名单；
              </li>
              <li>
                <i></i>8. 众鑫娱乐对本活动保有最终解释权。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    showExternalBar: {
      type: Boolean
    }
  },
  components: {},
  data () {
    return {
      futurnData: [],
      historyData: [],
      dataFlag: 0
    }
  },
  // Filters: {
  //   formatDate (val) {
  //     if (val) {
  //       return moment(String(val)).format('MM/DD/YYYY hh:mm')
  //     }
  //   }
  // },
  computed: {},
  watch: {},
  methods: {
    formatDate (val) {
      if (val) {
        return moment(String(val)).format('MM/DD/YYYY hh:mm')
      }
    },
    changeFlag (val) {
      this.dataFlag = val
    },
    loadDataInfo () {
      let _this = this
      let url = 'api/EuropeanCup/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            this.futurnData = res.data.Result.future
            this.historyData = res.data.Result.history

            if (_this.futurnData.length < 7) {
              for (var i = 0; i < 7 - _this.futurnData.length; i++) {
                _this.futurnData.push({
                  DateTimeValidStart: '',
                  OptValue: '',
                  OptName: '',
                  OptText: ''
                })
              }
            }

            if (_this.historyData.length < 7) {
              for (var j = 0; j < 7 - _this.historyData.length; j++) {
                _this.historyData.push({
                  DateTimeValidStart: '',
                  OptValue: '',
                  OptName: '',
                  OptText: ''
                })
              }
            }
          }
        }).catch(err => {
          console.log('error', err)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadDataInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('setExternalBar', 'AI体育・免单盛宴', 'back', this.showExternalBar)
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
@import "../../../../assets/images/activity/EuroCup/style/bootstrap.min.css";
@import "../../../../assets/images/activity/EuroCup/style/bootstrap-theme.min.css";
</style>
<style scoped>
h5 {
  font-size: 2.5vw;
}
button {
  padding: 3px 6px !important;
}
.EuroCup {
  margin-top: 44px;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 840px;
}
.banner-img{
  width: 100%;
}

button.btn.btn-play {
    background: #a0a0a0;
    color: white;
    border: 1px solid #cbcbcb;
    border-radius:50px;
    font-size: 2vw;
}
button.btn.btn-play:active {
    background: #f78c00;
}

button.btn.btn-play:hover {
    background: #f78c00;
}
.btn-active{
    background: #f78c00 !important;
}
.btn-group {
    position: relative;
    /* top: 141.5vw; */
    color: black;
    font-size: 1vw;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    width: 92%;
    left: 50%;
    height: 5%;
    -webkit-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
    background: #d5f2ff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 2% 0;
}
.table-top {
  position: relative;
  left: 50%;
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  width: 92%;
}
table#tbFuture,
table#tbHistory {
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  position: relative;
  width: 92%;
  left: 50%;
  min-height: 35%;
}
table#tbFuture th,
table#tbHistory th {
  background: #d5f2ff;
  color: #2e2e2e;
  text-align: center;
  font-size: 2vw;
  /* border: 1px solid #ffffff; */
}
table#tbFuture td,
table#tbHistory td {
  background: #d5f2ff;
  text-align: center;
  font-size: 2vw;
  /* border: 1px solid #ffffff; */
  height: 30px;
  color: #2e2e2e;
}
.active_date {
  position: relative;
  /* top: 66.2%; */
  width: 90%;
  margin: 0 auto;
  height: 127vw;
}
.active_date > h5 {
  color: #ac3224;
  text-align: center;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 0%);
  left: 50%;
  width: 100%;
}
.active_content_title {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 90%;
  text-align: center;
}
.active_content_title  > h5{
  letter-spacing: 1px;
}
.active_content_title > img {
  width: 70%;
}
.section1 {
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 90%;
  top: 840px;
}
.section1 > .r_content {
  position: relative;
  padding-top: 1%;
}
.section1 > .r_content > p {
  padding: 2%;
  font-size: 3vw;
  letter-spacing: 2px;
}
.section1 > .r_content > .table_wrapper {
  position: relative;
  padding: 2% 0;
}
.section1 > .r_content > .table_wrapper > table {
  position: relative;
  width: 90%;
  margin: 0 auto;
}
.section1 > .r_content > .table_wrapper > table td {
  background: #b3d9f5;
  text-align: center;
  font-size: 3vw;
  border: 1px solid #ffffff;
  height: 30px;
  color: #2e2e2e;
}
.section1 > .r_content > .table_wrapper > table th {
  background: #2e2e2e;
  color: #fff;
  text-align: center;
  border: 1px solid #ffffff;
  font-size: 2vw;
}
.section1 > .r_content > .table_wrapper > table thead {
  height: 40px;
}
.section1 > .r_content .c_area_7 > ul{
    margin: 0;
    list-style-type: decimal;
    color: #666666;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 4.5%;
    line-height: 230%;
}
.section1 > .r_content .c_area_7 > ul > li{
    width: 100%;
    text-align: left;
    font-size: 3vw;
}
.section1 > .r_content > div.c_area_7{
    position: relative;
    /* top: 26.4%;
    height: 24.3%; */
    padding: 1.4%;
}
@media (min-width: 360px){
  table#tbFuture,
  table#tbHistory {
    min-height: 70vw;
  }
}
@media (min-width: 375px){
  table#tbFuture,
  table#tbHistory {
    min-height: 60vw;
  }
}
@media (min-width: 411px){
  table#tbFuture,
  table#tbHistory {
    min-height: 47vw;
  }
}
@media (min-width: 414px){
  table#tbFuture,
  table#tbHistory {
    min-height: 46vw;
  }
}
@media (min-width: 540px){
  .section1 {
    top: 1075px;
  }
  .container {
    height: 1075px;
  }
}
@media (min-width: 768px){
  .section1 {
    top: 1390px;
  }
  .container {
    height: 1390px;
  }
  table#tbFuture,
  table#tbHistory {
    min-height: 26vw;
  }
}
@media (min-width: 1024px){
  .section1 {
    top: 1790px;
  }
  .container {
    height: 1790px;
  }
  .active_date[data-v-de0365a2] {
    height: 126vw;
  }
  table#tbFuture,
  table#tbHistory {
    min-height: 23vw;
  }
}

</style>
