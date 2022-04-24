<template>
<div class="swiper-slide" ref="slide">
<div class='transferRecord'  ref="contentPanel">
  <div
    v-for="(transfers, index) in currentPageData"
    :key="index"
    :class="['success','box']"
  >
    <ul>
      <li><span>转账：{{transfers.Amount}}</span><em>成功</em></li>
      <li>
        <p>转账类型：{{transfers.Type}}</p>
        <time>{{transfers.CreateTime}}</time>
      </li>
    </ul>
  </div>
  <div class="no_message" v-show="currentPageData.length<1">
     <i></i><p>您还没有转账记录哦！</p>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'transferRecord',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      currentPageData: [],
      totalPage: 1,
      currentPage: 1,
      pageSize: 8
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 监听滚动条
    handleScroll () {
      var scrollTop = this.$refs.slide.scrollTop // 滚动距离
      var clientHeight = this.$refs.slide.offsetHeight // 可见高度
      var scrollHeight = this.$refs.contentPanel.offsetHeight // 内容高度
      if (scrollTop / (scrollHeight - clientHeight) >= 1) {
        if (this.currentPage < this.totalPage) {
          this.currentPage++
          this.loadRecord(this.currentPage)
        }
      }
    },
    /**
     * @description 获取数据
     */
    loadRecord (pageIndex) {
      let _this = this
      _this.$bus.$emit('loadingShow')
      let url = '/api/Record/Get'
      let params = {
        Type: 3,
        PageIndex: pageIndex,
        PageSize: _this.pageSize,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.totalPage = res.data.Result.PageCount
            res.data.Result.List.map(item => { this.currentPageData.push(item) })
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadRecord(this.currentPage)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$refs.slide.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style scoped>
</style>
