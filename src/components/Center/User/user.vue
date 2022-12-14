<template>
<div class='user'>
  <div class="user-card">
    <div class="user-top">
      <div class="userbar-act">
        <div class="userbar">
          <div class="name" @click="showAvatar()">
            <i :style="{backgroundImage: 'url('+baseUrl+'/Image/avatar/'+ [avatarKey? avatarKey:1] +'.jpg)',backgroundSize:'100% 100%'}"></i>
            <div>
              <em>{{account}}</em>
              <span :class="[VipLevelName,'level']">
              <i></i><em>{{vipName? vipName:'Member'}}</em>
              </span>
              <em>Balance：<countTo :endVal='parseFloat(zxc)' :duration=1000 :decimals=2></countTo></em>
            </div>
          </div>
          <div class="hotPromo" @click="promoEnter" v-if="topmenu.length>0">{{topmenu[0].Name}}</div>
        </div>
      </div>
    </div>
    <div class="user-bottom">
      <ul class="financialBar">
        <li
          v-for="(mbars1, index) in mainBar1"
          :key="index"
          :class="mbars1.code"
          @click="menuJump1(mbars1.code,index)"
        >
          <i></i>
          <em>{{mbars1.name}}</em>
        </li>
      </ul>
      <ul class="mainBar" ref="box_mainBar2">
        <li
          v-for="(mbars2, index) in mainBar2"
          :key="index"
          :class="mbars2.code"
          @click="menuJump2(mbars2.code,index)"
        >
          <i></i>
          <em>{{mbars2.name}}</em>
        </li>
      </ul>
      <ul class="mainBar">
        <li
          v-for="(mbars3, index) in mainBar3"
          :key="index"
          :class="mbars3.Code"
          @click="menuJump3(mbars3.Code,index)"
        >
          <i></i>
          <em>{{mbars3.Name}}</em>
        </li>
      </ul>
      <div class="signOut" @click="signOut">LOGOUT</div>
    </div>
    <div class="avatarBar" v-show="avatarShow" @click.self="toggleAvatar">
      <ul>
        <li
          v-for="(avatar, index) in avatarList"
          :key="index"
          @click="ChangeAvatar(index)"
          :style="{backgroundImage: 'url('+ baseUrl + avatar.value + ')',backgroundSize:'100% 100%'}"
          ><i :class="{on: index == avatarindex}"></i></li>
      </ul>
    </div>
    <div v-if="highStepMax > 0" class="introjs-overlay">
      <div class="introjs-tip">
        <ul v-if="highStepMax == 2">
          <li>亲爱的用户您好：</li>
          <li>充值前需要先完成【绑定银行卡及验证手机号】</li>
          <li>您当前还未绑定银行卡及验证手机号</li>
        </ul>
        <ul v-else-if="highStepMax > 0 && highStep == 1">
          <li>亲爱的用户您好：</li>
          <li>充值前需要先完成【绑定银行卡及验证手机号】</li>
          <li>您当前还未验证手机号</li>
        </ul>
        <ul v-else-if="highStepMax > 0 && highStep == 2">
          <li>亲爱的用户您好：</li>
          <li>充值前需要先完成【绑定银行卡及验证手机号】</li>
          <li>您当前还未绑定银行卡</li>
        </ul>
      </div>
      <div class="introjs-button">
        <img
          src="../../../assets/images/intro/confirm.png"
          class="confirm"
          @click="closeIntro()"
        />
      </div>
      <div class="introjs-arrow">
        <img
          src="../../../assets/images/intro/bind_phone.png"
          class="bind_phone"
          v-if="highStep == 1"
        />
        <img
          src="../../../assets/images/intro/bind_bank.png"
          class="bind_bank"
          v-if="highStep == 2"
        />
      </div>
    </div>
    <div v-if="highStepMax > 0" class="introjs-highlight" :style="'top:'+highlight.y+'px;height:'+highlight.height+'px;'">
      <div class="blank" v-if="highStep == 2">
        <i></i>
        <em>银行卡</em>
      </div>
      <div class="phone" v-if="highStep == 1">
        <i></i>
        <em>手机验证</em>
      </div>
    </div>
  </div>
  <!-- <step :highlight="highlight"/> -->
</div>
</template>

<script>

import countTo from 'vue-count-to'
import '../../../../static/style/custom_intro.css'

export default {
  name: 'user',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    countTo
  },
  data () {
  //  这里存放数据
    return {
      baseUrl: (process.env.NODE_ENV === 'development') ? '/api' : '/data',
      infoData: null,
      plats: [],
      zxInt: 0,
      zxc: 0,
      vipName: '',
      VipLevel: '',
      VipLevelName: '',
      topmenu: [],
      mainBar1: [
        {
          code: 'deposit',
          name: 'DEPOSIT'
        },
        {
          code: 'transfer',
          name: 'TRANSFER'
        },
        {
          code: 'withdrawal',
          name: 'W/D'
        }
      ],
      mainBar2: [
        {
          code: 'betting',
          name: 'Wager Record'
        },
        {
          code: 'transaction',
          name: 'TXN Record'
        },
        {
          code: 'bankSelect',
          name: 'Bank Info',
          intro_step: 1
        },
        {
          code: 'information',
          name: 'Personal'
        },
        {
          code: 'phone',
          name: 'Mobile Verify',
          intro_step: 2
        },
        {
          code: 'platform',
          name: 'Platform Bal.'
        }
      ],
      mainBar3: [
        {
          Code: 'feedback',
          Name: 'Rebate Offer',
          IconUrl: '',
          LinkUrl: ''
        },
        {
          Code: 'VIPmember',
          Name: 'VIP',
          IconUrl: '',
          LinkUrl: ''
        },
        {
          Code: 'VIPoffer',
          Name: 'VIP Offer',
          IconUrl: '',
          LinkUrl: ''
        },
        // {
        //   Code: 'exchange',
        //   Name: '筹码兑换',
        //   IconUrl: '',
        //   LinkUrl: ''
        // },
        {
          Code: 'selfHelp',
          Name: 'DIY Offer',
          IconUrl: '',
          LinkUrl: ''
        }
        // {
        //   Code: 'achievement',
        //   Name: '成就系统',
        //   IconUrl: '',
        //   LinkUrl: ''
        // }
      ],
      avatarShow: false,
      avatarList: [],
      avatarindex: 0,
      avatarKey: 1,
      cacheTime: 30,
      highlight: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      vaild: {
        phone: true,
        bank: true
      },
      highStep: 0,
      highStepMax: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {
    /**
     * @description 当前登录账号
     */
    account: function () {
      return this.getinfo().account
    }
    /**
     *@description 当前余额
     */
    // balance: function () {
    //   return this.getinfo().balance === 0 ? '0.00' : this.numberFormat(this.getinfo().balance, 2)
    // }
  },
  //  监控data中的数据变化
  watch: {
    VipLevel (val) {
      switch (val) {
        case 0:
          this.VipLevelName = 'hide'
          break
        case 30:
          this.VipLevelName = 'lv1'
          break
        case 40:
          this.VipLevelName = 'lv2'
          break
        case 50:
          this.VipLevelName = 'lv3'
          break
        case 60:
          this.VipLevelName = 'lv4'
          break
        case 70:
          this.VipLevelName = 'lv5'
          break
        default:

          break
      }
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 加载个人信息
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/account/getinfo'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            // console.log(res.data.Result)
            _this.infoData = res.data.Result
            _this.zxInt = res.data.Result.Integral
            _this.zxc = res.data.Result.Balance
            _this.vipName = res.data.Result.VipName
            _this.VipLevel = res.data.Result.VipLevel
            _this.avatarKey = res.data.Result.Avatar
          } else {
            if (!_this.hasPopup) {
              _this.hasPopup = true
              _this.NormalFailConfirm(res.data)
            }
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    /**
     * @description 获取平台列表
     */
    getGamePlats () {
      // var platRevse = ['AI', 'YSB', 'AG', 'AG2', 'EA', 'OG', 'PT', 'MG', 'DT', 'PG', 'LB', 'KG']
      var platRevse = ['JILI', 'CQ9', 'AE', 'KA', 'JDB', 'RICH88', 'FC', 'BNG']
      let _this = this
      let url = '/api/gameplat/get'
      _this.$https.fetchPost(url, {})
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            for (var j = 0; j < res.data.Result.length; j++) {
              var indexIs = platRevse.findIndex(element => element === res.data.Result[j].Plat)
              if (indexIs >= 0) {
                _this.plats[indexIs] = res.data.Result[j]
              }
            }
            // _this.plats = res.data.Result
          } else {
            if (!_this.hasPopup) {
              _this.hasPopup = true
              _this.NormalFailConfirm(res.data)
            }
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    /**
     * @description 获取面板初始化数据
     */
    loadCenterMenu () {
      var _this = this

      let CM = sessionStorage.getItem('CenterMenu')
      if (CM) {
        CM = JSON.parse(CM)
        let time = new Date()
        if (
          new Date(CM.time) >
          time.valueOf() - _this.cacheTime * 60 * 1000
        ) {
          _this.$bus.$emit('loadingHide')
          _this.mainBar3 = CM.CenterMenu
          _this.topmenu = CM.TopMenu
          return
        }
      }

      let url = '/api/mobile/getcentermenu'
      var params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.mainBar3 = res.data.Result.CenterMenu
            _this.topmenu = res.data.Result.TopMenu
            sessionStorage.setItem(
              'CenterMenu',
              JSON.stringify({ CenterMenu: _this.mainBar3, TopMenu: _this.topmenu, time: new Date() })
            )
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    /**
     * @description 退出登录
     */
    signOut () {
      this.$swal({
        text: 'Do you want to Logout？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel'
        // closeOnConfirm: false
      }).then(res => {
        if (res.value) {
          this.removeinfo()
          this.$router.push('/')
          this.pageInit()
        }
      })
    },
    // 菜单1跳转
    async menuJump1 (code, index) {
      // 充值/转账/提款
      if (code === 'withdrawalSelect') {
        sessionStorage.setItem('select', code)
        this.$router.push({
          name: 'select',
          params: { index: index }
        })
      } else if (code === 'deposit') {
        if (await this.syncVaildPhone() & await this.syncVaildBank()) {
          this.$router.push({
            name: 'wallet',
            params: {
              index: index
            }
          })
        }
      } else {
        this.$router.push({
          name: 'wallet',
          params: {
            index: index
          }
        })
      }
    },
    // 菜单2跳转
    menuJump2 (code, index) {
      if (code === 'platform') {
        this.$router.push({
          name: code,
          params: {
            data: this.plats
          }
        })
      } else if (code === 'information') {
        this.$router.push({
          name: code,
          params: {
            data: this.infoData
          }
        })
      } else if (code === 'bankSelect') {
        sessionStorage.setItem('select', code)
        this.$router.push({
          name: 'select'
        })
      } else {
        // 内部页
        this.$router.push('/center/' + code)
      }
    },
    // 菜单3跳转
    menuJump3 (code, index) {
      // 外部页
      this.$router.push({
        path: '/center/external',
        query: {
          routename: code,
          pcode: ''
        }
      })
    },
    // 头部活动
    promoEnter () {
      this.$router.push({
        name: 'external',
        params: {
          routename: this.topmenu[0].Code,
          pcode: ''
        }
      })
    },
    // 显示头像弹窗
    showAvatar () {
      let _this = this
      _this.GetavatarList()
      _this.avatarShow = true
      _this.avatarindex = Number(_this.avatarKey) - 1
    },
    // 关闭头像弹窗
    toggleAvatar () {
      this.avatarShow = !this.avatarShow
    },
    // 更换头像
    ChangeAvatar (index) {
      this.avatarindex = index
      let _this = this
      let url = '/api/Other/SaveAvatar'
      let params = {
        AvatarKey: _this.avatarindex + 1,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            // _this.AlertSuccess('保存成功')
            _this.$bus.$emit('getAvatar', params.AvatarKey)
            _this.avatarKey = params.AvatarKey
          } else {
            if (!_this.hasPopup) {
              _this.hasPopup = true
              _this.NormalFailConfirm(res.data)
            }
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
      _this.avatarShow = false
    },
    // 获取头像列表
    GetavatarList () {
      let _this = this
      let url = '/api/Other/GetAvatar'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.avatarList = res.data.Result
          } else {
            if (!_this.hasPopup) {
              _this.hasPopup = true
              _this.NormalFailConfirm(res.data)
            }
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    // 手机验证
    syncVaildPhone () {
      let _this = this
      let url = '/api/account/checkverifyphone'
      let params = {
        Token: _this.getinfo().token
      }
      return _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            this.vaild.phone = res.data.Result.Status
            if (!this.vaild.phone) {
              if (_this.highStepMax === 0) _this.highStep = 1
              _this.highStepMax = _this.highStepMax + 1
            }
            return this.vaild.phone
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 充值验证
    syncVaildBank () {
      let _this = this
      let url = '/api/withdrawal/getdrawcard'
      let params = {
        Token: _this.getinfo().token
      }
      return _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            this.vaild.bank = res.data.Result.Data.length > 0
            if (!this.vaild.bank) {
              if (_this.highStepMax === 0) _this.highStep = 2
              _this.highStepMax = _this.highStepMax + 1
            }
            return this.vaild.bank
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    updateHighLight (rect) {
      this.highlight.x = rect.x
      this.highlight.y = rect.y
      this.highlight.width = rect.width
      this.highlight.height = rect.height
    },
    closeIntro () {
      this.highStep = this.highStep + 1
      let _this = this
      switch (this.highStep) {
        case 2:
          _this.stepText = '您当前还未绑定银行卡'
          break
      }
      if (this.highStep > this.highStepMax) {
        this.highStep = 0
        this.highStepMax = 0
        this.vaild.phone = true
        this.vaild.bank = true
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    // this.syncVaildPhone()
    // this.syncVaildBank()
    this.refreshBalance()
    this.getGamePlats()
    this.loadDataInfo()
    this.loadCenterMenu()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', 'Account', 'menu', 'message')
    let sidemenuVm = this.$parent.$parent.$children[0]
    this.updateSidebarBalacne(sidemenuVm)
    this.updateHighLight(this.$refs['box_mainBar2'].getBoundingClientRect())
    if (this.$route.params.highStepMax) {
      this.highStep = this.$route.params.highStep
      this.highStepMax = this.$route.params.highStepMax
    }
  }
}
</script>
<style scoped>
* {
  font-family: "Heiti TC","黑體-繁" !important;
}
.user{
  width: 100%;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top:0.88rem;
  bottom: 0.98rem;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.user .user-card {
  background: #ececeb;
  margin: 5%;
  border-radius: 0.1rem;
  padding: 2% 0;
}
.user .userbar-act {
  background: #fff;
  margin-bottom: 16px;
}
.user .user-top{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.user .user-top .userbar{
  width: 100%;
  /* height: 100%; */
  padding-top: 0.3rem;
  padding: 0.3rem 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
}
.user .user-top .userbar .name > div{
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2%;
}
.user .user-top .userbar .name{
  width: 100%;
  float: left;
  position:relative;
  display: flex;
  flex-direction: row;
  padding: 0 3%;
}
.user .user-top .userbar .name i{
  display: block;
  border-radius: 50%;
  float: left;
  width: 1.3rem;
  height: 1.3rem;
}
.user .user-top .userbar .name em > span,
.user .user-top .userbar .name em{
  font-size: 0.37rem;
  font-weight: bold;
  color: #063246;
}
.user .user-top .userbar .name .level{
  float: left;
  height: 0.4rem;
}
.user .user-top .userbar .name .level em{
  margin-left: 0;
  font-size: 0.37rem;
  font-weight: bold;
  line-height: 0.4rem;
  color: #063246;
}
.user .user-top .userbar .name .level i{
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
  background:none;
}
.user .user-top .userbar .name .level.lv1 i{
  background: url(../../../assets/images/account/lv1-ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .userbar .name .level.lv2 i{
  background: url(../../../assets/images/account/lv2-ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .userbar .name .level.lv3 i{
  background: url(../../../assets/images/account/lv3-ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .userbar .name .level.lv4 i{
  background: url(../../../assets/images/account/lv4-ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .userbar .name .level.lv5 i{
  background: url(../../../assets/images/account/lv5-ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .userbar .name .level.hide i{
  display: none;
}
.user .user-top .userbar .hotPromo{
  float: right;
  height: 0.48rem;
  padding: 0 0.2rem;
  background: #ff7200;
  border-radius: 0.3rem;
  line-height: 0.48rem;
  text-align: center;
  font-size: 0.25rem;
  margin-top: 0.2rem;
  color: #fff;
}
.user .user-top .balanceBar{
  width: 100%;
  height: 1.32rem;
  background: #fff;
  border-radius: 0.06rem;
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
}
.user .user-top .balanceBar li{
  float: left;
  width: 30%;
  text-align: center;
  height: 0.88rem;
}
.user .user-top .balanceBar li:first-child{
  background: url(../../../assets/images/account/arrow_bg@2x.png) right no-repeat;
}
.user .user-top .balanceBar li:last-child{
  width: 70%;
  margin-top: 0.25rem;
}
.user .user-top .balanceBar li i{
  display: block;
  margin: 0.2rem 0.5rem 0.2rem 0.3rem;
  width: 0.44rem;
  height: 0.44rem;
  background: #000;
  background: url(../../../assets/images/account/wallet_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-top .balanceBar li em{
  font-size: 0.25rem;
  color: #2b2b2b;
  text-align: left;
  display: block;
}
.user .user-top .balanceBar li span{
  display: block;
  font-size: 0.34rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
  text-align: right;
  color: #2b2b2b;
}
.user .user-top .balanceBar li h2{
  font-size: 0.22rem;
  text-align: right;
  display: block;
  font-weight: normal;
  color: #6b6b6b;
}
.user .user-bottom{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.user .user-bottom .financialBar{
  background: #adc9d6 !important;
}
.user .user-bottom .mainBar,
.user .user-bottom .financialBar{
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.2rem;
  background: #fff;
  border-radius: 0.06rem;
}
.user .user-bottom .financialBar li.transfer {
  width: 2.2rem;
}
.user .user-bottom .financialBar li.withdrawal {
  width: 1.9rem;
}
.user .user-bottom .financialBar li{
  float: left;
  width: 2rem;
  height: 1.1rem;
  text-align: center;
}
.user .user-bottom .financialBar li em{
  font-size: 0.28rem;
  float: left;
  line-height: 1.1rem;
  margin-left: 0.05rem;
  color: #fff;
  font-weight: bold;
}
.user .user-bottom .financialBar li i{
  display: block;
  float: left;
  width: 0.64rem;
  height: 0.64rem;
  background: #000;
  margin-top: 0.24rem;
  margin-left: 0.2rem;
}
.user .user-bottom .financialBar li.deposit i{
  background: url(../../../assets/images/account/account_top-up_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .financialBar li.transfer i{
  background: url(../../../assets/images/account/account_transfer_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .financialBar li.withdrawalSelect i{
  background: url(../../../assets/images/account/account_withdrawal_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .financialBar li.withdrawal i{
  background: url(../../../assets/images/account/account_withdrawal_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li{
  float: left;
  width: 2rem;
  height: 1.6rem;
  text-align: center;
}
.user .user-bottom .mainBar li em{
  font-size: 0.25rem;
  color: #2b2b2b;
}
.user .user-bottom .mainBar li i{
  display: block;
  width: 0.64rem;
  height: 0.64rem;
  background: #000;
  margin: 0.2rem auto;
}
.user .user-bottom .mainBar li.betting i{
  background: url(../../../assets/images/account/account_bettingrecord_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.transaction i{
  background: url(../../../assets/images/account/account_transactionrecord_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.feedback i{
  background: url(../../../assets/images/account/account_receive_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.information i{
  background: url(../../../assets/images/account/account_profile_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.platform i{
  background: url(../../../assets/images/account/account_platformbalancel_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.bankSelect i{
  background: url(../../../assets/images/account/account_bankcard_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.phone i{
  background: url(../../../assets/images/account/account_phone_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.VIPmember i{
  background: url(../../../assets/images/account/account_vip_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.VIPoffer i{
  background: url(../../../assets/images/account/account_vippromotion_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.exchange i{
  background: url(../../../assets/images/account/account_chip_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.selfHelp i{
  background: url(../../../assets/images/account/account_buffet_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .mainBar li.achievement i{
  background: url(../../../assets/images/account/account_cast_ico@2x.png);
  background-size: 100% 100%;
}
.user .user-bottom .signOut{
  width: 100%;
  height: 0.98rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
  background: #0097f6;
  border-radius: 0.38rem;
  font-size: 0.4rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 0.98rem;
}
.user .avatarBar{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}
.user .avatarBar ul{
  width: 6.1rem;
  height: 4.3rem;
  background: url(../../../assets/images/account/portrait_bg@2x.png);
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  margin-left: -3.05rem;
  top: 25%;
  padding: 0.3rem 0.3rem 0 0.3rem;
  box-sizing: border-box;
  animation: bounceInUp .8s linear;
}
.user .avatarBar ul li{
  width: 1.62rem;
  height: 1.62rem;
  border-radius: 50%;
  float: left;
  border: 0.04rem solid #fff;
  margin: 0 0.2rem 0.3rem 0;
  position: relative;
}
.user .avatarBar ul li:nth-child(3n + 3){
  margin-right: 0;
}
.user .avatarBar ul li i{
  position: absolute;
  display: none;
  width: 0.3rem;
  height: 0.3rem;
  background: url(../../../assets/images/account/choose_ico@2x.png);
  background-size: 100% 100%;
  left: 50%;
  margin-left: -0.15rem;
  bottom: -0.2rem;
}
.user .avatarBar ul li i.on{
  display: block;
}
</style>
