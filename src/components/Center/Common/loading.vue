<template>
<div class='loading'>
  <div class="loading-box">
    <div class="outside"></div>
    <div class="inside"></div>
    <span>{{loadingText? loadingText:'Loading'}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loadingText: {
      type: String
    }
  }
}
</script>
<style scoped>
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.loading-box{
  width: 2rem;
  height: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.25rem;
  margin-left: -1rem;
  border-radius: 0.2rem;
  background: rgba(0, 0, 0, 0.8);
}
.outside{
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1rem;
  margin-left: -0.75rem;
  background: url(../../../assets/images/loading/icon1_w@2x.png);
  background-size: 100% 100%;
  -ms-animation: load .8s linear infinite;
  animation: load .8s linear infinite;
}
.inside{
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1rem;
  margin-left: -0.75rem;
  background: url(../../../assets/images/loading/icon2_w@2x.png);
  background-size: 100% 100%;
}
span{
  font-size: 0.25rem;
  color: #fff;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0.3rem;
  animation: text 2s linear infinite;

}
@keyframes load{

  0%{transform:rotate(0deg);}

  25%{transform:rotate(90deg);}

  50%{transform:rotate(180deg);}

  75%{transform:rotate(270deg);}

  100%{transform:rotate(360deg);}

}
@-ms-keyframes load{

  0%{-ms-transform:rotate(0deg);}

  25%{-ms-transform:rotate(90deg);}

  50%{-ms-transform:rotate(180deg);}

  75%{-ms-transform:rotate(270deg);}

  100%{-ms-transform:rotate(360deg);}

}
@-webkit-keyframes load{

  0%{-webkit-transform:rotate(0deg);}

  25%{-webkit-transform:rotate(90deg);}

  50%{-webkit-transform:rotate(180deg);}

  75%{-webkit-transform:rotate(270deg);}

  100%{-webkit-transform:rotate(360deg);}

}
@keyframes text{
from{
  opacity: 0.2;
}
to{
  opacity: 1;
}
}
@-webkit-keyframes text{
from{
  opacity: 0.2;
}
to{
  opacity: 1;
}
}
</style>
