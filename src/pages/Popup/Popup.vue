<template>
<!-- 外部页面Popup -->
<div class='Popup'>
   <router-view />
</div>
</template>

<script>
// 初始化自适应单位
import _ from 'lodash'
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
export default {
  name: 'Popup',
  components: {},
  data () {
  //  这里存放数据
    return {
      token: '',
      os: '',
      uid: '',
      pathname: '',
      routename: '',
      pcode: '',
      ptext: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 更新本地信息
     */
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
            console.log('popup_query_balance_success')
            _this.saveinfo(
              _this.uid,
              _this.token,
              res.data.Result,
              this.moment(new Date()).format('YYYY/MM/DD HH:mm:ss') || _this.getinfo().lastlogintime
            )
          } else {
            console.log('popup_query_balance_error')
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
      this.ptext = this.getQueryString('ptext')
      sessionStorage.setItem('current_token', this.token)
      sessionStorage.setItem('current_os', this.os)
      sessionStorage.setItem('current_uid', this.uid)
      this.queryBalance()
    },
    /**
     * @description 重定向
     */
    reloadUrl () {
      this.$router.push({
        name: this.routename,
        params: {
          pcode: this.pcode,
          ptext: this.ptext
        }
      })
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
    if (this.getQueryString('token')) {
      this.checkParameters()
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-style: normal;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input, textarea, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  background: none;
  outline: none;
  border: none;
}
html{
  background: rgba(255, 255, 255, 0)
}
body{
  padding-right: 0px !important;
  background: rgba(255, 255, 255, 0);
}
body.swal2-iosfix {
  position: static !important;
  z-index: 999;
}
.Popup{
  width:100%;
  height:100%;
  position: fixed;
  background: rgba(255, 255, 255, 0)
}
</style>
