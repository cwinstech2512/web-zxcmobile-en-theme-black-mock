<template>
  <div id="Facebook">

  </div>
</template>

<script>
export default {
  name: 'Facebook',
  components: {
  },
  methods: {
    init () {
      const queryString = window.location.search
      console.log('queryString', queryString)
      const urlParams = new URLSearchParams(queryString)
      const code = urlParams.get('code')
      console.log('code', code)
      let params = {
        code: code
      }
      let _this = this
      this.$https
        .fetchPost('api/Login/FBCallback', this.Secret(params))
        .then(res => {
          // debugger
          if (res.data.Success === true) {
            top.document.location.href = res.data.Result
          } else if (res.data.Status === 'LoginExpire') {
            // 登录过期
            if (window.opener) {
              window.opener.externalLogout()
              _this
                .$swal({
                  text: res.data.Message,
                  type: 'error',
                  confirmButtonText: '确定'
                })
                .then(r => {
                  window.close()
                })
            } else {
              top.location.href = 'index.html'
            }
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
          }
        })
        .catch(err => {
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
  font-size: 14px;
  font-family: "Microsoft YaHei", "arial";
  font-style: normal;
}
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
</style>
