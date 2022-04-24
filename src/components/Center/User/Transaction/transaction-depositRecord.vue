<template>
<div class="swiper-slide" ref="slide">
  <div class='depositRecord' ref="contentPanel">
    <div
      v-for="(deposits, index) in currentPageData"
      :key="index"
      :class="[deposits.status,'box']"
    >
      <ul>
        <li><span :class="deposits.State=='无效订单'? 'r':''">充值：{{deposits.Amount}}</span><em :class="deposits.State=='已支付'? 'b': deposits.State=='无效订单'? 'r':''">{{deposits.State}}</em></li>
        <li>
          <p>{{deposits.Notes}}</p>
          <time>{{deposits.CreateTime}}</time>
          <b v-show="deposits.Notes && deposits.Notes.length>10" @click="handleCopy(deposits.Notes,$event)">复制订单号</b>
        </li>
      </ul>
    </div>
    <div class="no_message" v-show="currentPageData.length<1">
     <i></i><p>您还没有充值记录哦！</p>
    </div>
  </div>
  </div>
</template>

<script>
import _ from 'lodash'
import clipboard from '@/Plugin/clipboard.js'
export default {
  name: 'depositRecord',
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
    // 复制信息
    handleCopy (text, event) {
      clipboard((text).replace(/[^0-9]/ig, ''), event)
    },
    // 监听滚动条
    handleScroll () {
      var scrollTop = this.$refs.slide.scrollTop // 滚动距离
      var clientHeight = this.$refs.slide.offsetHeight // 可见高度
      var scrollHeight = this.$refs.contentPanel.offsetHeight // 内容高度
      // console.log('滚动距离--', scrollTop)
      // console.log('可视高度--', clientHeight)
      // console.log('内容高度--', scrollHeight)
      // if (scrollHeight - scrollTop <= clientHeight) {
      //   console.log('这是你的底线！')
      // }
      if (scrollTop / (scrollHeight - clientHeight) >= 1) {
        // console.log('scroll to bottom')
        // console.log('totalpage', this.totalPage)
        // console.log('currentPage', this.currentPage)

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
        Type: 1,
        PageIndex: pageIndex,
        PageSize: _this.pageSize,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.secret(params))
        .then((res) => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.totalPage = res.data.Result.PageCount
            // _this.currentPageData = res.data.Result.List
            // _this.currentPageData.push.apply(_this.currentPageData, res.data.Result.List) // 数组合并写法1 apply （自身改变） concat自身不改变
            res.data.Result.List.map(item => { this.currentPageData.push(item) }) // 数组合并写法2 es6 map 写法
          } else {
            _this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    dbHandleScroll: _.debounce(function () {
      console.log('current_time', new Date())
    }, 500, {
      leading: true,
      trailing: false
    })
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
