<template>
  <div class="notice">
    <div class="main" id="noticeMain">
      <div class="bd">
        <div class="icon"></div>
        <div class="swiper-container swiper-no-swiping" id="Notice">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="(item, index) in marqueeList"
              :key="index"
              @click="nbShow(index)"
            >
              <span>
                <em>【{{item.Name}}】</em>
                <i v-html="item.Content"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
    marqueeList: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  data () {
    //  这里存放数据
    return {
      index: ''
    }
  },
  //  方法集合
  methods: {
    nbShow (index) {
      this.index = index
      this.$emit('display', this.index)
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.notice {
  width: 6.9rem;
  height: 0.44rem;
  margin: 0.1rem 0;
  position: absolute;
  top: 3.6rem;
}
.notice .main {
  width: 100%;
  height: 0.44rem;
  margin: 0 auto;
  position: relative;
}
.notice .main .bd {
  width: 100%;
  height: 0.44rem;
  float: left;
  overflow: hidden;
}
.notice .main .bd .icon {
  width: 0.3rem;
  height: 0.3rem;
  float: left;
  margin-top: 0.05rem;
  background: url(../../../assets/images/home/home_sign_ico@2x.png);
  background-size: 100% 100%;
}
.notice .main .bd .swiper-container {
  width: 6.4rem;
  height: 0.4rem;
  float: right;
  overflow: hidden;
  position: relative;
}
.notice .main .bd >>> .swiper-container .swiper-slide {
  height: 0.4rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.notice .main .bd .swiper-container .swiper-slide span {
  position: absolute;
  z-index: 1;
  left: 0px;
  font-size: 0.2rem;
  cursor: pointer;
  white-space: nowrap;
  text-size-adjust: none;
  color: #ffffff;
}
.notice .main .bd .swiper-container .swiper-slide span i{
  line-height: 0.4rem;
  font-size: 0.2rem;
  text-size-adjust: none;
}
.notice .main .bd .swiper-container .swiper-slide span >>>*{
  font-size: 0.2rem;
  color: #ffffff;
  text-size-adjust: none;
}
</style>
