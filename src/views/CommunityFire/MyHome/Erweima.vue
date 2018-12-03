<template>
  <div class="Erweima">
    <img :src="xiaofang">
    <p>扫描关注富邦智慧消防服务号</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import xiaofang from '../../../assets/image/xiaofang.png';
// 声明组件*****************
@Component
export default class Erweima extends Vue {
  // 属性*****************
    private xiaofang: string = xiaofang;
  // private type: string = 'loading';
 

  // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.Erweima {
    img{
        width: 100%;
    }
    p{
        text-align: center;
        .fs(30);
    }
}
</style>
