<template>
  <div class="StateInfo">
   <div class="info">
       <!-- <h3>{{data.title}}</h3> -->
       <ul>
            <li v-for="(item,index) in data.list" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.value}}</p>
                <button v-if="item.status">{{item.status}}</button>
            </li>
       </ul>
   </div>
   <div v-if="data.opera" @click="data.operaMethod" class="show-info">
       <img v-if="data.operaIcon" :src="data.operaIcon"/>
       <span>
        {{data.opera}}
       </span>
   </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class StateInfo extends Vue {
    // props
    @Prop({ default:()=>({}) }, Object) 
    private data!: object
    //   属性*****************


    // 方法*****************
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.StateInfo {
    .px2rem(margin-bottom,20);
   .info{
       .p(20);
       background: #fff;
       h3{
            display: inline;
            .fs(30);
            color: #333333;
            background: linear-gradient(0, #def0fd 50%, transparent 50%);
            .p(5);
            .px2rem(padding-left,13);
            .px2rem(padding-right,13);
       }
       ul{
           color: #666666;
           .fs(26);
           li{
               display: flex;
               align-items: center;
               .px2rem(min-height,64);
               display: flex;
               align-items: center;
               p:first-child{
                   .w(160);
               }
               p:last-of-type{
                   flex: 1;
               }
                button{
                    .px2rem(margin-left,10);
                    .p(4);
                    .px2rem(padding-left,13);
                    .px2rem(padding-right,13);
                    border: none;
                    background: #e8f3ff;
                    color: #2380e2;
                    .fs(18);
                }
           }
       }
   }
   .show-info{
       background: #fafafa;
       display: flex;
       justify-content: center;
       align-items: center;
       color: #666666;
       .px2rem(margin-top, 2);
       .fs(30);
       .h(84);
       img{
           .w(37);
           .h(37);
           .px2rem(margin-right, 10);
       }
   }
}
</style>
