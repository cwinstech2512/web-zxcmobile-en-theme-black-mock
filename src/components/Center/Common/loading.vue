<template>
<div class='loading'>
  <div class="loading-box">
    <div class="mosaic-loader">
      <div class="cell d-0"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
      <div class="cell d-5"></div>
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
      <div class="cell d-5"></div>
      <div class="cell d-6"></div>
    </div>
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
.mosaic-loader {
  --cell-size: 20px;
  --cell-spacing: 1px;
  --border-width: 1px;
  --cells: 4;
  --total-size: calc(var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing)));
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -44px;
  margin-left: -44px;
  width: var(--total-size);
  height: var(--total-size);
}
.mosaic-loader > .cell {
  --cell-color: white;
  flex: 0 0 var(--cell-size);
  margin: var(--cell-spacing);
  background-color: transparent;
  box-sizing: border-box;
  border: var(--border-width) solid var(--cell-color);
  animation: 1.5s ripple ease infinite;
}
.mosaic-loader > .cell.d-1 { animation-delay: 100ms; }
.mosaic-loader > .cell.d-2 { animation-delay: 200ms; }
.mosaic-loader > .cell.d-3 { animation-delay: 300ms; }
.mosaic-loader > .cell.d-4 { animation-delay: 400ms; }
.mosaic-loader > .cell.d-5 { animation-delay: 500ms; }
.mosaic-loader > .cell.d-6 { animation-delay: 600ms; }
.mosaic-loader > .cell:nth-child(1) { --cell-color: #d4aee0; }
.mosaic-loader > .cell:nth-child(2) { --cell-color: #8975b4; }
.mosaic-loader > .cell:nth-child(3) { --cell-color: #64518a; }
.mosaic-loader > .cell:nth-child(4) { --cell-color: #565190; }
.mosaic-loader > .cell:nth-child(5) { --cell-color: #44abac; }
.mosaic-loader > .cell:nth-child(6) { --cell-color: #2ca7d8; }
.mosaic-loader > .cell:nth-child(7) { --cell-color: #1482ce; }
.mosaic-loader > .cell:nth-child(8) { --cell-color: #05597c; }
.mosaic-loader > .cell:nth-child(9) { --cell-color: #b2dd57; }
.mosaic-loader > .cell:nth-child(10) { --cell-color: #57c443; }
.mosaic-loader > .cell:nth-child(11) { --cell-color: #05b853; }
.mosaic-loader > .cell:nth-child(12) { --cell-color: #19962e; }
.mosaic-loader > .cell:nth-child(13) { --cell-color: #fdc82e; }
.mosaic-loader > .cell:nth-child(14) { --cell-color: #fd9c2e; }
.mosaic-loader > .cell:nth-child(15) { --cell-color: #d5385a; }
.mosaic-loader > .cell:nth-child(16) { --cell-color: #911750; }
@keyframes ripple {
  0% {
    background-color: transparent;
  }
  30% {
    background-color: var(--cell-color);
  }
  60% {
    background-color: transparent;
  }
  100% {
    background-color: transparent;
  }
}
</style>
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
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
}
/* .outside{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  background: url(../../assets/images/loading/icon1@2x.png);
  background-size: 100% 100%;
  -ms-animation: load .8s linear infinite;
  animation: load .8s linear infinite;

}
.inside{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  background: url(../../assets/images/loading/icon2@2x.png);
  background-size: 100% 100%;
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

} */
</style>
