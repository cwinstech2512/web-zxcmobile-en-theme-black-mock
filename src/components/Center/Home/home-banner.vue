<template>
  <div class="banner">
    <div class="swiper-container" id="Banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(slide, index) in swiperSlides"
          :key="index"
          :style="{backgroundImage: 'url('+ slide.Path + ')',backgroundSize:'100% 100%'}"
          @click="JumpUrl(slide.ContentPath)"
        ></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    swiperSlides: {
      type: Array,
      required: true
    }
  },
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
    JumpUrl (url) {
      // var str = url.substring(0, 1)
      // if (str === '/') {
      //   this.$router.push(url)
      // } else {
      //   window.open(url, '_blank')
      // }
      if (url !== '') {
        var routename = this.getQueryStringByUrl(url, 'routename')
        var pcode = this.getQueryStringByUrl(url, 'pcode')
        if (!routename || routename === '') {
          window.open(url)
        } else {
        // 外部页
          this.$router.push({
            path: '/center/external',
            query: {
              routename: routename,
              pcode: pcode
            }
          })
        }
      } else {

      }
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
.banner {
  width: 6.9rem;
  height: 3.4rem;
  overflow: hidden;
  position: absolute;
  border-radius: 0.14rem;
  background: url(../../../assets/images/home/banner_gray.jpg);
  background-size: 100% 100%;
  margin-top: 0.2rem;
}
.swiper-container{
  width: 100%;
  height: 100%;
  border-radius: 0.14rem;
}
.swiper-slide{
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.swiper-container >>> .swiper-pagination-bullet{
  background: #fff;
  width: 0.12rem;
  height: 0.12rem;
}
.swiper-container >>> .swiper-pagination-bullet-active{
  width: 0.22rem;
  border-radius: 20px;
  background: #fff;
}
</style>
