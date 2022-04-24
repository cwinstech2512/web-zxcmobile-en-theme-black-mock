<template>
<div class='external' >
  <iframe
    :src="url+routeCode"
    frameborder="0"
    scrolling="auto"
  />
</div>
</template>

<script>
export default {
  name: 'external',
  components: {},
  data () {
  //  这里存放数据
    return {
      url: 'External.html#/'
    }
  },
  //  监听属性 类似于data概念
  computed: {
    routeCode () {
      if (this.$route.query.routename) {
        return this.$route.query.routename.concat('?pcode=' + this.$route.query.pcode)
      } else if (this.$route.params.routename) {
        return this.$route.params.routename.concat('?pcode=' + this.$route.params.pcode)
      } else {
        return ''
      }
    }
  },
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    setTimeout(() => {
      this.$bus.$emit('loadingHide')
    }, 2000)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$emit('getStatus', '', '', '', true, true)
  }
}
</script>
<style scoped>
.external{
  width: 100%;
  overflow: hidden;
  overflow-x: hidden;
  position: absolute;
  top:0;
  bottom: 0;
}
iframe{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
}
</style>
