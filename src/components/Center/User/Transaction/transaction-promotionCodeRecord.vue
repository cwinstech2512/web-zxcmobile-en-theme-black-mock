<template>
<div class="swiper-slide" ref="slide">
<div class='promotionCodeRecord'  ref="contentPanel">
  <div
    v-for="(codes, index) in currentPageData"
    :key="index"
    :class="['success','box']"
  >
    <ul>
      <li><span>活动平台：{{codes.Plat}}</span><em>{{codes.State}}</em></li>
      <li>
        <p>优惠代码：{{codes.PromCode}}</p>
        <p>转入金额：{{codes.Amount}}</p>
        <p>投注倍数：{{codes.BetMultiple}}</p>
        <time>有效时间：{{codes.CreateTime}}至{{codes.ValidDate}}</time>
      </li>
    </ul>
  </div>
  <div class="no_message" v-show="currentPageData.length<1">
     <i></i><p>You haven't any record yet!</p>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'promotionCodeRecord',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      promotionCodeRecord: [
        {
          status: '',
          code: 'RR4X4228F6PB00V',
          amount: '>=100',
          multiple: '18',
          hint: '已过期',
          plat: 'PT',
          date: '2019-08-21',
          effectiveDate: '2018-10-15'
        }
      ],
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
        Type: 7,
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
