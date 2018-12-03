<template>
  <div class="Electricity">
    <div class="box">
      <div v-for="(item,index) in 6" :key="index"></div>
    </div>
    <div class="box-value">
      <span>%</span>
      <p>{{value}}</p>
      <span>剩余电量</span>
    </div>
    <StarrySkyCanvas color="#94cdfb" :line="false" :has="9"/>
  </div>
</template>

<script>
import StarrySkyCanvas from "@/components/StarrySkyCanvas.vue";
export default {
  name: 'Electricity',
  props: {
    value:{
      type: Number,
      default(){
        return 0
      }
    }
  },
  components: {
    StarrySkyCanvas
  }
}
</script>


<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.Electricity {
  background: #1c8df6;
  .h(680);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .box{
    .w(380);
    .h(380);
    position: relative;
    animation: rotat 6s infinite linear;
    z-index: 100;
    div{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #DDF3FF;
      border-radius:50%;
      opacity: 0.62;
      transform: scale(0);
      animation-fill-mode: forwards!important; 
    }
    div:nth-child(1){
      left: -8%;
      top: -4%;
      animation: bounceIn 1s 0.1s 1;
    }
    div:nth-child(2){
      left: 7%;
      top: -7%;
      animation: bounceIn 1s 0.2s 1;
    }
    div:nth-child(3){
      left: 7%;
      top: 7%;
      animation: bounceIn 1s 0.25s 1;
    }
    div:nth-child(4){
      left: -5%;
      top: 8%;
      animation: bounceIn 1s 0.3s 1;
    }
    div:nth-child(5){
      left: -5%;
      top: -7%;
      animation: bounceIn 1s 0.4s 1;
    }
    div:nth-child(6){
      left: 7%;
      top: 5%;
      animation: bounceIn 1s 0.45s 1;
    }
  }
  &>.box-value{
    z-index: 100;
    position: absolute;
    color: #1c8df6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .px2rem(padding-left, 40);
    .px2rem(padding-right, 40);
    p{
      .fs(120);
      font-weight:400; 
    }
    &>span:first-child{
      position: absolute;
      right: 0;
      top: 0;
      .fs(40);
    }
    &>span:last-child{
      .fs(22);
      .px2rem(margin-top, -30);
    }
  }
}
@keyframes rotat {
  0%{transform: rotateZ(-360deg)}
}
</style>
