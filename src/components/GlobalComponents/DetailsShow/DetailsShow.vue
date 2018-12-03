<template>
  <div class="DetailsShow">
    <ul>
        <li v-for="(item,index) in data" :key="index" v-if="!item.hasOwnProperty('show')||item.show">
            <p class="name" :style="item.nameStyle">{{item.name}}</p>
            <p class="value" :style="[{textAlign:item.textAlign},item.valueStyle]">{{item.value}}</p>
            <img v-if="item.enterShow" :src="enter_into"/>
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import enter_into from '../../../assets/image/enter_into.png';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class DetailsShow extends Vue {
  
  // props
  @Prop({ default:()=>({}) }, Object) 
  private data!: object
  
  // 属性*****************
  private enter_into: string = enter_into;
 

  // 方法*****************
    
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.DetailsShow {
    background: #fff;
    .px2rem(margin-bottom,20);
    ul{
        .p(20);
        padding-top:0;
        padding-bottom:0;
        li{
            position: relative;
            .p(20);
            .px2rem(padding-top,10);
            .px2rem(padding-bottom,10);
            box-sizing: border-box;
            .px2rem(min-height,80);
            .fs(28);
            color: #999999;
            display: flex;
            justify-content: space-between;
            .name{
                .w(160);
                .px2rem(min-width,160);
                display: flex;
                align-items: center;
                word-break: break-all;
            }
            .value{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex: 1;
                color: #444444;
                word-break: break-all;
                text-align: right;
            }
            img{
                position: absolute;
                right: 0;
                .w(12);
                top: 50%;
                transform: translateY(-50%);
            }
        }
        li+li{
            border-top: 1px solid #e7e7e7; 
        }
    }
}
</style>
