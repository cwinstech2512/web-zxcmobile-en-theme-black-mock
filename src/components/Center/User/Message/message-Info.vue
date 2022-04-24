<template>
<div class='messageInfo'>
  <div class="messageInfo-Box">
    <div class="boxBd">
      <div class="swiper-container" id="messagebox">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="(msg, index) in msgBox"
            :key="index"
          >
            <div class="tit">
              <h2>【{{msg.Title}}】</h2>
              <time>{{moment(msg.Time).format('YYYY.MM.DD')}}</time>
            </div>
            <div class="text">
              <p v-html="msg.Content"></p>
            </div>
          </div>
        </div>
      </div>
      <ul class="navigation">
        <li class="boxPrev">上一条</li>
        <li class="boxNext">下一条</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  name: 'messageInfo',
  //  import引入的组件需要注入到对象中才能使用
  components: {
  },
  data () {
  //  这里存放数据
    return {
      index: this.$route.params.index,
      msgMain: [],
      messagebox: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
    msgBox () {
      return this.msgMain
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 公告弹窗切换
     */
    initMessagebox () {
      var _this = this
      _this.$nextTick(function () {
        _this.messagebox = new Swiper('#messagebox', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          // loop: true,
          navigation: {
            nextEl: '.boxNext',
            prevEl: '.boxPrev'
          },
          on: {
            // 滑块变化事件
            slideChange: function () {
              _this.getMessageById(this.activeIndex)
            }
          }
        })
        // 初始化滑块
        this.messagebox.slideToLoop(this.index)
      })
    },
    /**
     * @description 标记已经读取
     */
    getMessageById (index) {
      let obj = this.msgMain[index]
      if (obj.IsRead) {
        return false
      }
      let url = '/api/Message/Get/'
      let params = {
        Token: this.getinfo().token
      }
      this.$https.fetchPost(url + obj.Id, this.secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            console.log('read', 'yes')
            sessionStorage.removeItem('MessageStatus')
          } else {
            this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          console.log(err)
        }
        )
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.initMessagebox()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 挂载从路由获取的数据
    this.msgMain = this.$route.params.msglist
  }
}
</script>
<style scoped>
.messageInfo{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background:  url(../../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.messageInfo .messageInfo-Box{
  width: 100%;
  /* height: 5.9rem; */
  background: #fff;
  border-radius: 0.06rem;
  margin-top: 0.2rem;
}
.messageInfo .messageInfo-Box .boxBd{
  width: 100%;
  /* height: 4.7rem; */
}
#messagebox{
  width: 100%;
}
#messagebox .swiper-slide{
  width: 100%;
  overflow: hidden;
}
.tit{
  width: 100%;
  /* height: 1.2rem; */
  border-bottom: 0.02rem solid #e5e5e5;
  padding: 0.3rem;
  box-sizing:border-box;
  text-align: center;
}
.tit h2{
  font-size: 0.3rem;
  color: #2b2b2b;
  font-weight: normal;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
.tit time{
  font-size: 0.2rem;
  color: #bbb;
}
.text{
  width: 100%;
  height: 3.5rem;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.text p{
 font-size: 0.25rem;
 color: #6b6b6b;
 letter-spacing:0.03rem;
 line-height: 0.4rem;
}
.navigation{
  width: 100%;
  height: 1.2rem;
  border-top: 0.02rem solid #e5e5e5;
}
.navigation li{
  outline: none;
  float: left;
  width: 49.8%;
  text-align: center;
  line-height: 1.2rem;
  font-size: 0.25rem;
  color: #2b2b2b;
  border-right: 0.02rem solid #e5e5e5;
}
.navigation li:last-child{
  border-right: none;
}
.navigation li.swiper-button-disabled{
  color: #ddd;
}
</style>
