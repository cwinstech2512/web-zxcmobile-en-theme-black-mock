<template>
<div class='PromotionInfo'>
  <div class="img">
     <img :src="$route.params.img" alt="">
  </div>
  <div class="hd">
    <h2>{{$route.params.title}}</h2>
    <time>Post Date：{{moment($route.params.time).format('YYYY/MM/DD HH:mm:ss')}}</time>
  </div>
  <div class="bd">
    <p v-html="$route.params.content"></p>
  </div>
</div>
</template>

<script>
export default {
  name: 'PromotionInfo',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {

    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {

  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '活动详情', 'back', false, true, false)
  }
}
</script>
<style scoped>
.PromotionInfo{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  /* background: url(../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed; */
  background: #fff;
}
.PromotionInfo .img{
  width: 100%;
  height: 2.4rem;
  margin-top: 0.2rem;
  border-radius: 0.06rem;
  overflow: hidden;
  background: url(../../../assets/images/home/promotion_placeholder@2x.jpg);
  background-size: 100% 100%;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
}
.PromotionInfo .img img{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.PromotionInfo .hd{
  width: 100%;
  text-align: center;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #c5c5c5;
}
.PromotionInfo .hd h2{
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: #2b2b2b;
}
.PromotionInfo .hd time{
  font-size: 0.2rem;
  color: #6b6b6b;
}
.PromotionInfo .bd {
 padding: 0.2rem 0;
 box-sizing: border-box;
}
.PromotionInfo .bd >>> h2{
 font-size: 0.28rem;
 color: #2b2b2b;
 margin: 0.2rem 0;
}
.PromotionInfo .bd >>> p{
 font-size: 0.25rem;
 margin: 0.05rem 0;
 color: #6b6b6b;
}
.PromotionInfo .bd >>> ol{
  list-style-type: decimal;
}
.PromotionInfo .bd >>> .table {
  width:100%;
  overflow-x:auto;
  overflow-y:hidden;
  box-sizing: border-box;
  margin:0.2rem 0;
  background: #ffffff70;
}
.PromotionInfo .bd >>> table {
  border-collapse: collapse;
  border-spacing: 0;
  width:100%;
  text-align: center;
  border:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table tr {
  color: #fff;
  height:0.6rem;
  border-bottom:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table td{
  padding:0 0.1rem;
  font-size:0.25rem;
  color:#4c4c4c;
  border-left:0.02rem solid #c5c5c5;
}
.PromotionInfo .bd >>> table th {
  background-color:#2d2d2d;
  font-size: 0.2rem;
  font-weight: normal;
  color: #fff;
  border-left:0.02rem solid #c5c5c5;
}
</style>
