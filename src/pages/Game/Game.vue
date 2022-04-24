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
      let url = '/api/Login/' + plat
      let params = {
        'Token': this.getinfo().token
      }
      if (gameCode) {
        params.GameCode = gameCode// 有游戏编码就加上
      }
      let _this = this
      this.$https.fetchPost(url, this.secret(params))
        .then((res) => {
          // debugger
          if (res.data.Success === true) {
            top.document.location.href = res.data.Result
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
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
