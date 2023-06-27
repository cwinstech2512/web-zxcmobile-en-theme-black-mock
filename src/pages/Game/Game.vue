<template>
  <div id="Game">

  </div>
</template>

<script>

export default {
  name: 'Game',
  components: {
  },
  methods: {
    init () {
      let plat = this.getQueryString('act')
      let gameCode = this.getQueryString('gameCode')
      let gameType = this.getQueryString('gameType')
      let token = this.getQueryString('token')
      let url = ''
      let _this = this
      let params = {
        'Token': token
      }
      if (plat === 'FC' || plat === 'JILI' || plat === 'AE' || plat === 'RICH88' || plat === 'EVO') {
        let cate = this.getQueryString('cate')
        if (cate) {
          params.PageIndex = 0
          params.PageSize = 1
          url = `/api/${cate}/${plat}Login`
        } else {
          _this.$swal({
            text: ``,
            type: 'error',
            confirmButtonText: 'Confirm'
          })
        }
      } else if (plat === 'REDTIGER' || plat === 'NETENT') {
        let cate = this.getQueryString('cate')
        plat = 'EVO'
        if (cate) {
          params.PageIndex = 0
          params.PageSize = 1
          url = `/api/${cate}/${plat}Login`
        } else {
          _this.$swal({
            text: ``,
            type: 'error',
            confirmButtonText: 'Confirm'
          })
        }
      } else if (plat === 'AESEXY') {
        let cate = this.getQueryString('cate')
        if (cate) {
          params.PageIndex = 0
          params.PageSize = 1
          url = `/api/${cate}/AESEXYBCRT`
        } else {
          _this.$swal({
            text: ``,
            type: 'error',
            confirmButtonText: 'Confirm'
          })
        }
      } else {
        url = '/api/Login/' + plat
      }
      if (gameCode) {
        params.GameCode = gameCode// 有游戏编码就加上
      }
      if (gameType) {
        params.GameType = gameType// 有游戏编码就加上
      }
      this.$https.fetchPost(url, this.Secret(params))
        .then((res) => {
          console.log(res)
          if (res.data.Success === true) {
            if (plat === 'FC' || plat === 'JILI' || plat === 'AE' || plat === 'RICH88' || plat === 'EVO' || plat === 'AESEXY') {
              top.document.location.href = res.data.Message
            } else {
              top.document.location.href = res.data.Result
            }
          } else if (res.data.Status === 'LoginExpire') {
            // 登录过期
            if (window.opener) {
              window.opener.externalLogout()
              window.close()
            } else {
              top.location.href = 'index.html'
            }
          } else {
            _this.AlertError(res.data.Message)
          }
          // window.externalLogout()
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-family: "Microsoft YaHei", "arial";
  font-style: normal;
}
</style>
