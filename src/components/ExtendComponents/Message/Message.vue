<template>
  <div v-if="show" class="Message">
    {{value}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class Message extends Vue {
  // 属性*****************
  // private type: string = 'loading';
  private show: boolean = true;
  private timer: any = 3000;
  private value: string = '';
  mounted () {
      let timer = setTimeout(()=>{
          this.show = false;
      },this.timer)
  }

  // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.Message {
    position: fixed;
    .w(604);
	  .br(8);
    .b(250);
    .lh(40);
    .p(20);
    .fs(30);
    background-color: rgba(0, 0, 0, 0.5);
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #fff;
    animation: messageFade 3s 1;
    text-align: center;
    z-index: 3000;
}
</style>
