<template>
<div class='External'>
    <!-- 顶部栏 -->
  <externalBar
    :barName='barName'
    :barLeft='barLeft'
    :barShow='barShow'
    @openSide='openSide'
  />
   <router-view :showExternalBar='barShow' @setExternalBar="setExternalBar"/>
</div>
</template>

<script>
import _ from 'lodash'
import externalBar from '@/components/Center/Common/externalBar'
// 初始化自适应单位
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
export default {
  name: 'External',
  components: {externalBar},
  data () {
  //  这里存放数据
    return {
      pathFrom: '',
      pathTo: '',
      token: '',
      os: 'H5',
      uid: '',
      pathname: '',
      routename: '',
      pcode: '',
      barName: '',
      barLeft: '',
      barShow: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    $route (to, from) {
      var that = this
      that.pathFrom = from.path
      that.pathTo = to.path
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 设置导航栏
     */
    setExternalBar (name, left, show) {
      this.barName = name
      this.barLeft = left
      this.barShow = show
    },
    /**
     * @description 导航栏左上角事件
     */
    openSide () {
      this.$router.back(-1)
    },
    externalCheckOut () {
      this.$router.back(-1)
      this.removeinfo()
      this.$router.push('/')
      this.pageInit()
    },
    /**
     * @description 检查是否登录
     */
    checkLogin () {
      return !!localStorage.getItem('account')
    },
    getZxcBalance () {
      var _this = this
      let url = '/api/Balance/Get'
      var params = {
        Token: _this.token,
        Plat: 'ZXC'
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            console.log('query_balance_success')
            _this.saveinfo(
              _this.uid,
              _this.token,
              res.data.Result,
              this.moment(new Date()).format('YYYY/MM/DD HH:mm:ss') || _this.getinfo().lastlogintime
            )
          } else {
            console.log('query_balance_error')
            _this.saveinfo(
              _this.uid,
              _this.token,
              '0.00',
              this.moment(new Date()).format('YYYY/MM/DD HH:mm:ss') || _this.getinfo().lastlogintime
            )
          }
          this.reloadUrl()
        }).catch(err => {
          console.log(err)
        })
    },
    /**
     * @description 获取请求参数
     */
    checkParameters () {
      this.token = this.getQueryString('token')
      this.os = this.getQueryString('os')
      this.uid = this.getQueryString('uid')
      this.pathname = this.getQueryString('pathname')
      this.routename = this.getQueryString('routename')
      this.pcode = this.getQueryString('pcode')
      // console.log('$router_path', this.$route)
      // console.log('$router_query', this.$route.query)
      // console.log('local_host', window.location.host)
      // console.log('local_pathname', window.location.pathname)
      // console.log('local_search', window.location.search)
      // console.log('local_hash', window.location.hash)
      // console.log('uid', this.uid)
      // console.log('os', this.os)
      // console.log('token', this.token)
      // console.log('pathname', this.pathname)
      // console.log('backroute', this.backroute)
      // console.log('pathroute', this.pathroute)
      // console.log('defaultroute', this.defaultroute)
      sessionStorage.setItem('current_token', this.token)
      sessionStorage.setItem('current_os', this.os)
      sessionStorage.setItem('current_uid', this.uid)
      this.queryBalance()
    },
    /**
     * @description 重定向
     */
    reloadUrl () {
      // let url = []
      // url.push(window.location.host)
      // url.push(this.pathname.concat('#'))
      this.$router.push({
        name: this.routename,
        query: {
          pcode: this.pcode
        }
      })
    },
    separateOs () {
      this.barShow = false
      console.log('current_os', sessionStorage.getItem('current_os'))
      if (sessionStorage.getItem('current_os') === 'H5' || sessionStorage.getItem('current_os') === null) {
        this.barShow = true
      }
      if (this.getQueryString('token')) {
        this.barShow = false
        this.checkParameters()
      }
    },
    queryBalance: _.debounce(function () {
      console.log('current_time', new Date())
      this.getZxcBalance()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.barShow = false
    if (sessionStorage.getItem('current_os') === null) {
      this.barShow = true
    }
    if (this.getQueryString('token')) {
      this.barShow = false
      this.checkParameters()
    }
  },
  beforeMount () {
    // this.$emit('getStatus', '', '', true)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 由于入口嵌套了两次或多次，逐级隐藏父组件头部
    // this.$emit('setExternalBar', '', '', false)
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-style: normal;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch
}
ul,ul li{
  list-style: none;
}
ol,ol li{
  list-style: decimal;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input, textarea, button,select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  background: none;
  outline: none;
  border: none;
}
select{
  background: #fff url(../../assets/images/home/wallet_arrowdown_ico@2x.png) 95% no-repeat !important;
  background-size: 0.2rem !important;
}
body{
  padding-right: 0px !important;
}
body.swal2-iosfix {
  position: static !important;
  z-index: 999;
}
.swal2-popup{
  padding: .5em !important;
}
#External{
  width: 100%;
  overflow: hidden;
}
</style>
