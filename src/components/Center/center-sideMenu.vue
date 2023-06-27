<template>
  <div class='sideMenu'
       :class="sideShow? 'show':''">
    <div class="sideMenu-Box">
      <div class="sideMenu-Box-Top">
        <div class="userBar">
          <div class="name">
            <i :style="{backgroundImage: 'url('+baseUrl+'/Image/avatar/'+ [avatarKey? avatarKey:1] +'.jpg)',backgroundSize:'100% 100%'}" />
            <div :class="[VipLevelName,'level']">
              <!-- <i /> -->
              <div>
                <span>{{vipName? vipName:'Member'}}</span>
                <span>{{account}}</span>
                <div class="balanceBar">
                  <span>Balance：<em>{{balance}}</em></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="financialBar">
          <li v-for="(financial, index) in financialBar"
              :key="index"
              :class="financial.code"
              @click="menuJump(index)">
            <i /><em>{{financial.name}}</em>
          </li>
        </ul>
      </div>
      <div class="sideMenu-Box-Bottom">
        <ul class="itemBar">
          <li class="record"
              @click="recordJump">
            <i /><em>TXN Record</em>
          </li>
          <li v-for="(activitys, index) in activity"
              :key="index"
              @click="navTopage(index)">
            <i :style="{backgroundImage: 'url('+baseUrl+activitys.IconUrl+')',backgroundSize:'100% 100%'}" />
            <em>{{activitys.MenuName}}</em>
          </li>
          <!-- <li class="download">
            <a target="_blank"
               :href="downUrl"><i /><em>Download APP</em></a>
          </li> -->
          <li class="out"
              @click="logout">
            <i /><em>Logout</em>
          </li>
        </ul>
      </div>
    </div>
    <div class="sideMenu-Mask"
         :class="sideShow? 'show':''"
         @click="sideHide"></div>
  </div>
</template>

<script>
export default {
  name: 'sideMenu',
  props: {
    sideShow: {
      type: Boolean
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {
      baseUrl: (process.env.NODE_ENV === 'development') ? '/api' : '/data',
      balance: this.getinfo().balance === 0 ? '0.00' : this.numberFormat(this.getinfo().balance, 2),
      downUrl: 'https://app.zxbet.app/',
      vipName: '',
      VipLevel: '',
      VipLevelName: '',
      financialBar: [
        {
          code: 'deposit',
          name: 'Deposit'
        },
        {
          code: 'transfer',
          name: 'Transfer'
        },
        {
          code: 'withdrawal',
          name: 'W/D'
        }
      ],
      activity: [],
      avatarKey: 1
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
    // 交易记录
    recordJump () {
      this.$emit('sideHide')
      this.$router.push('/center/transaction')
    },
    // VIP等级
    loadVipInfo () {
      let _this = this
      let url = '/api/account/getinfo'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.vipName = res.data.Result.VipName
            _this.VipLevel = res.data.Result.VipLevel
            _this.avatarKey = res.data.Result.Avatar
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 钱包跳转
     */
    menuJump (index) {
      var that = this
      that.$emit('sideHide')
      // if (index === 2) {
      //   // sessionStorage.setItem('select', 'withdrawalSelect')
      //   that.$router.push({
      //     name: 'wallet',
      //     params: { index: index }
      //   })
      // } else {
      // }
      // 不同路由下，直接路由传值
      if (that.$route.path !== '/center/wallet') {
        that.$router.push({
          name: 'wallet',
          params: {
            index: index
          }
        })
      } else {
        // 同路由下，先跳转home页面，再路由传值
        that.$router.push('/center/home')
        that.$nextTick(function () {
          that.$router.push({
            name: 'wallet',
            params: {
              index: index
            }
          })
        })
      }
    },
    sideHide () {
      this.$emit('sideHide')
    },
    /**
     * @description 加载左菜单数据
     */
    loadDataLeftmenu () {
      let sidebar = sessionStorage.getItem('sidebar')
      if (sidebar) {
        sidebar = JSON.parse(sidebar)
        let time = new Date()
        if (
          new Date(sidebar.time) >
          time.valueOf() - 5 * 60 * 1000
        ) {
          this.activity = sidebar.result
          return
        }
      }
      let url = '/api/mobile/getsidebar'
      let params = {
        Token: this.getinfo().token
      }
      this.$https.fetchPost(url, this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('左菜单栏', res.data.Result)
            this.activity = res.data.Result
          }
        }).catch(err => {
          console.log(err)
        }
        )
    },
    /**
     * @description 跳转左菜单
     */
    navTopage (index) {
      let url = this.activity[index].MenuUrl
      var routename = this.getQueryStringByUrl(url, 'routename')
      var pcode = this.getQueryStringByUrl(url, 'pcode')
      this.sideHide()
      if (!routename || routename === '') {
        window.open(url)
      } else {
        // 外部页
        this.$router.push({
          path: '/center/external',
          query: {
            routename: routename,
            pcode: pcode
          }
        })
      }
    },
    /**
     * @description 退出登录
     */
    logout () {
      this.$swal({
        html: '<h4 style="color: #fff">Do you want to Logout？</h4>',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0097f6',
        cancelButtonColor: '#adc9d6',
        confirmButtonText: 'LOGOUT',
        cancelButtonText: 'CANCLE',
        background: '#434343'
        // closeOnConfirm: false,
        // closeOnClickOutside: false
      }).then(res => {
        if (res.value) {
          this.removeinfo()
          this.$router.push('/')
          this.pageInit()
        }
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    var that = this
    // console.log(this.$refs.downUrl)
    let scode = localStorage.getItem('raid')
    if (scode === null) {
      scode = ''
    }
    this.downUrl = 'https://app.zxbet.app/?sc=' + scode + '&url=' + document.domain
    that.loadVipInfo()
    that.$bus.$on('getAvatar', (get) => {
      that.avatarKey = get
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.loadDataLeftmenu()
  }
}
</script>
<style scoped>
.sideMenu {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
  left: -6rem;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.sideMenu.show {
  z-index: 99;
  position: fixed;
  transform: translateX(6rem);
  transition: transform 0.4s;
}
.sideMenu .sideMenu-Mask {
  width: 1.5rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 0;
  display: none;
  z-index: 99;
}
.sideMenu .sideMenu-Mask.show {
  display: block;
  animation: showMask 0.8s linear;
}
@keyframes showMask {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.sideMenu .sideMenu-Box {
  width: 6rem;
  height: 100%;
  background: rgba(69, 69, 69, 1);
  padding: 0 0.3rem;
  box-sizing: border-box;
  position: absolute;
  z-index: 99;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top {
  width: 100%;
  margin-bottom: 0.4rem;
  overflow: hidden;
  margin-top: 7%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar {
  width: 100%;
  height: 1.88rem;
  background: #313131;
  border-radius: 0.1rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .name {
  float: left;
  align-items: center;
  display: flex;
  height: 100%;
  padding-left: 4%;
  width: 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .name i {
  display: block;
  width: 1rem;
  height: 1rem;
  margin: 0.04rem 0;
  float: left;
  border-radius: 50%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .name em {
  font-size: 0.28rem;
  color: #1d1d1d;
  line-height: 0.88rem;
  margin-left: 0.1rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level {
  /* float: right; */
  height: 100%;
  padding-left: 3%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level i {
  float: left;
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.22rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level.lv1 i {
  background: url(../../assets/images/account/lv1-ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level.lv2 i {
  background: url(../../assets/images/account/lv2-ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level.lv3 i {
  background: url(../../assets/images/account/lv3-ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level.lv4 i {
  background: url(../../assets/images/account/lv4-ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level.lv5 i {
  background: url(../../assets/images/account/lv5-ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level > div {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level > div > span{
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.58rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .userBar .level em {
  font-size: 0.28rem;
  color: #fff;
  line-height: 0.58rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .balanceBar {
  width: 100%;
  /* height: 0.88rem; */
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .balanceBar span {
  width: 100%;
  height: 0.58rem;
  font-size: 0.3rem;
  color: #fff;
  /* line-height: 0.88rem; */
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .balanceBar span em {
  font-size: 0.3rem;
  color: #0088ff;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar {
  width: 100%;
  height: 0.98rem;
  background: #313131;
  border-radius: 0.1rem;
  margin-top: 5%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li {
  float: left;
  width: 33%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li i {
  display: block;
  float: left;
  margin: 0.25rem 0.05rem 0 0.11rem;
  width: 0.44rem;
  height: 0.44rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li.deposit i {
  background: url(../../assets/images/leftmenu/leftmenu_top-up_ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li.transfer i {
  background: url(../../assets/images/leftmenu/leftmenu_transfer_ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li.withdrawal i {
  background: url(../../assets/images/leftmenu/leftmenu_withdrawal_ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Top .financialBar li em {
  color: white;
  font-size: 0.3rem;
  line-height: 0.98rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom {
  width: 100%;
  height: 10rem;
  overflow: auto;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar {
  width: 100%;
  overflow: hidden;
  padding-bottom: 2.5rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li {
  width: 100%;
  height: 0.88rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li em {
  font-size: 0.3rem;
  line-height: 0.88rem;
  color: #fff;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li i {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  float: left;
  margin-top: 0.22rem;
  margin-right: 0.2rem;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li.record i {
  background: url(../../assets/images/leftmenu/leftmenu_transactionrecord_ico@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li.download i {
  background: url(../../assets/images/leftmenu/leftbar_i_android@2x.png);
  background-size: 100% 100%;
}
.sideMenu .sideMenu-Box .sideMenu-Box-Bottom .itemBar li.out i {
  background: url(../../assets/images/leftmenu/leftmenu_exit_ico@2x.png);
  background-size: 100% 100%;
}
.swal2-icon.swal2-warning {
  border-color: #0097f6 !important;
}
</style>
