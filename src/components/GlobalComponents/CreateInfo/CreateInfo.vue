<template>
  <router-link v-if="data.show" tag="div" :to="{path:data.path||'',query:$route.query}" class="CreateInfo">
    <span>+</span>
    <p>{{data.title}}</p>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {
      
  }
})
export default class CreateInfo extends Vue {
  // 属性*****************
  // private type: string = 'loading';

  // props
  @Prop({ default:()=>({}) }, Object) 
  private data!: object

  // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.CreateInfo {
    .m(20);
    .px2rem(margin-bottom,0);
    background: #fff;
    border: 1px dashed #cccccc;
    .h(120);
    .br(10);
    display: flex;
    flex-direction: column;
    color: #cccccc;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
        .fs(42);
        display: inline-block;
    } 
    p{
        .fs(30);
    }
}
</style>
