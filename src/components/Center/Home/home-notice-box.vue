<template>
<div class='noticeBox' @click.self="toggleBox">
  <div class="boxMain" :class="out? 'out':''">
    <div class="boxHd">
      <h2>NOTICE</h2>
    </div>
    <div class="boxBd">
      <div class="swiper-container" id="Nbox">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in marqueeList" :key="index">
            <div class="tit">
              <h2>【{{item.Name}}】</h2>
              <time>{{item.Time}}</time>
            </div>
            <div class="text">
              <p v-html="item.Content"></p>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <button @click="closeBox()">OK</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'noticeBox',
  props: {
    marqueeList: {
      type: Array,
      required: true
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closeBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('hidden')
        that.out = false
      }, 600)
    },
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('toggleBox')
        that.out = false
      }, 600)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.noticeBox{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: block;
}
.noticeBox .boxMain{
  width: 6.1rem;
  height: 6.1rem;
  background: #fff;
  border-radius: 0.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -3.05rem;
  margin-left: -3.05rem;
  animation: bounceIn .8s linear;
}
.noticeBox .boxMain.out{
  animation: bounceOut .8s linear;
}
.noticeBox .boxMain .boxHd{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.noticeBox .boxMain .boxHd h2{
  font-size: 0.4rem;
  font-weight: normal;
  color: #2b2b2b;
  text-align: center;
  line-height: 0.98rem;
}
.noticeBox .boxMain .boxBd{
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide{
  width: 100%;
  overflow: hidden;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .text{
  width: 100%;
  height: 2.5rem;
  border-bottom: 0.02rem solid #ddd;
  padding-bottom: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .text p{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .text p >>> *{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit{
  width: 100%;
  height: 1rem;
  margin-bottom: 0.2rem;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit h2{
  font-size: 0.3rem;
  font-weight: normal;
  color: #0088ff;
  margin: 0.1rem;
}
.noticeBox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit time{
  font-size: 0.2rem;
  display: block;
  line-height: 0.2rem;
  color: #b1b1b1;
}
.noticeBox .boxMain .boxBd >>>.swiper-pagination{
  bottom: 0.1rem;
}
.noticeBox .boxMain .boxBd button{
  width: 4rem;
  height: 0.88rem;
  background: #0088ff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.88rem;
  color: #fff;
  border-radius: 0.06rem;
  display: block;
  margin: 0.25rem auto;
}
</style>
