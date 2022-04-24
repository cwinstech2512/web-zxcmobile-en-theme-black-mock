<template>
<div class='message'>
  <div class="messageNav">
    <li
      v-for="(msg, index) in msgNav"
      :key="index"
      :class="[{on: index == active}]"
      @click="switchMsg(index)"
    >
    {{msg.name}}
    </li>
  </div>
  <div class="messageMain">
    <div class="swiper-container" id="messageMain">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="msg-box"
            v-for="(msgM, index) in unreadMsg"
            :key="index"
            @click="msgInfo(index,msgM.IsRead)"
          >
            <div class="tit">
               <h2>{{msgM.Title}}</h2>
               <time>{{moment(msgM.Time).format('YYYY.MM.DD')}}</time>
            </div>
            <div class="info">
              <p v-html="msgM.Content"></p>
            </div>
          </div>
          <div class="no_message" v-show="unreadMsg.length<1">
            <i></i><p>您还没有消息哦！</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="msg-box"
            v-for="(msgM, index) in readMsg"
            :key="index"
            @click="msgInfo(index,msgM.IsRead)"
          >
            <div class="tit">
               <h2>{{msgM.Title}}</h2>
               <time>{{moment(msgM.Time).format('YYYY.MM.DD')}}</time>
            </div>
            <div class="info">
              <p v-html="msgM.Content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  name: 'message',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      msgNav: [
        {
          code: 'unread',
          name: '未读'
        },
        {
          code: 'read',
          name: '已读'
        }
      ],
      msgMain: [],
      messageMain: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 未读信息
    unreadMsg () {
      return this.msgMain.filter(function (msgM) {
        return msgM.IsRead !== true
      })
    },
    // 已读信息
    readMsg () {
      return this.msgMain.filter(function (msgM) {
        return msgM.IsRead !== false
      })
    }
  },
  //  监控data中的数据变化
  watch: {

  },
  //  方法集合
  methods: {
    /**
     * @description 获取所有的信息
     */
    loadData () {
      let url = '/api/Message/GetList'
      let params = {
        // 'ReadSate': isRead, // 读取状态1 ,0
        PageIndex: 1,
        PageSize: 0,
        Token: this.getinfo().token
      }
      this.$bus.$emit('loadingShow')
      this.$https.fetchPost(url, this.secret(params))
        .then((res) => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            this.msgMain = res.data.Result.List
          } else {
            this.NormalFailConfirm(res.data)
          }
        }).catch(err => {
          this.$bus.$emit('loadingHide')
          console.log('error', err)
        }
        )
    },
    /**
     * @description 切换选项卡
     * @param index:选项卡序号
     */
    switchMsg (index) {
      this.active = index
      this.messageMain.slideToLoop(index)
    },
    /**
     * @description 查看站内信
     * @param index:信息编号
     * @param read : 是否已读
     */
    msgInfo (index, read) {
      this.$router.push({
        name: 'messageInfo',
        params: {
          index: index,
          read: read,
          msglist: this.msgMain
        }
      })
    },
    /**
     * @description 初始化面板内容
     */
    initMessagePanel () {
      var that = this
      that.$nextTick(function () {
        that.messageMain = new Swiper('#messageMain', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          spaceBetween: 20,
          on: {
            slideChangeTransitionStart: function () {
              that.active = that.messageMain.activeIndex
            }
          }
        })
      })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadData()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.initMessagePanel()
    this.$emit('getStatus', '站内信', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.message{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background:url(../../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.message .messageNav{
  width: 100%;
  height: 0.88rem;
  position: absolute;
  background: #fff;
  z-index: 99;
}
.message .messageNav{
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background: #fff;
}
.message .messageNav li{
  width: 50%;
  text-align: center;
  line-height: 0.88rem;
  float: left;
  font-size: 0.3rem;
}
.message .messageNav li.on{
  color: #0088ff;
  height: 0.87rem;
  border-bottom: 0.04rem solid #0088ff;
  box-sizing: border-box;
}
.message .messageMain{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
}
.message .messageMain .swiper-container{
  height: 100%;
}
.message .messageMain .swiper-slide{
  min-height: 100%;
  padding-top: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.message .messageMain .swiper-slide .msg-box{
  width: 100%;
  height: 1.32rem;
  background: #fff;
  border-radius: 0.06rem;
  margin-bottom: 0.2rem;
  padding: 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
}
.message .messageMain .swiper-slide .msg-box .tit{
  width: 100%;
  height: 0.3rem;
}
.message .messageMain .swiper-slide .msg-box .tit h2{
  width: 70%;
  font-size: 0.3rem;
  float: left;
  color: #2b2b2b;
  white-space: nowrap;
  overflow: hidden;
  font-weight: normal;
  text-overflow: ellipsis;
}
.message .messageMain .swiper-slide .msg-box .tit time{
  float: right;
  font-size: 0.2rem;
  color: #bbb;
}
.message .messageMain .swiper-slide .msg-box .info{
  float: left;
  width: 100%;
  height: 0.3rem;
  margin-top: 0.1rem;
  overflow: hidden;
}
.message .messageMain .swiper-slide .msg-box .info p{
  color: #949494;
  font-size: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: inherit;
}
.message .messageMain .swiper-slide .no_message{
  width: 100%;
  height: 2rem;
}
.message .messageMain .swiper-slide .no_message i{
  display: block;
  width: 2.06rem;
  height: 1.6rem;
  margin: 0.3rem auto;
  background: url(../../../../assets/images/account/no-message_ico@2x.png);
  background-size: 100% 100%;
}
.message .messageMain .swiper-slide .no_message p{
  text-align: center;
  font-size: 0.26rem;
  color: #2b2b2b;
}
</style>
