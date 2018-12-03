<template>
  <div class="DeviceMessage">
    <mt-cell-swipe
    :right="touch?[
      {
        content: '删除',
        style: { background: '#f3544a', color: '#fff', display: 'flex', alignItems: 'center', fontSize:'0.38666667rem' },
        handler: deleteMessage
      }
    ]:null">
    <div class="cell">
      <div class="cell-top"> 
        <img v-if="data.src" :src="data.src"/>
        <p>{{data.device_name}}</p>
        <button :class="statusType">{{data.status}}</button>
      </div>
      <div class="cell-bottom">
        <span>位置:</span>
        <p>{{data.address}}</p>
      </div>
      <div v-if="data.online_status" class="rightStatus" :style="{color:data.device_online_status_id==666?'#ffa15d':'',borderColor:data.device_online_status_id==666?'#ffa15d':''}">
        {{data.online_status}}
      </div>
    </div></mt-cell-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MessageBox } from 'mint-ui';
// 声明组件*****************
@Component
export default class DeviceMessage extends Vue {
  // 属性*****************

  // 参数*****************
  // props
  @Prop({ default:()=>({}) }, Object) 
  private data!: object;

  @Prop({ default:()=>true }, Object) 
  private touch!: boolean;
  

  // 方法*****************
  // 删除
  private deleteMessage(): void {
      MessageBox.confirm('是否删除?','').then(action => {
        console.log('888')
      }).catch(error=>{
        console.log(error)
      })
  }


  // 计算属性
  get statusType (): string {
    switch(this.data['type']){
      case 'RED':
        return 'status-red';
      case 'BLUE':
        return 'status-blue'
      case 'GREEN':
        return 'status-green'
      case 'YELLOW':
        return 'status-yellow'
      case 'DEFAULT':
        return ''
      default:
        return ''
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
@deepCss: ~'>>>';
.DeviceMessage {
  background: #fff;
  .h(130);
  .mint-cell.mint-cell-swipe{
    @{deepCss} .mint-cell-title{
      display: none;
    }
    @{deepCss} .mint-cell-value{
      width: 100%;
      height: 100%;
      .cell{
        width: inherit;
      }
    }
    height: 100%;
    @{deepCss} .mint-cell-wrapper{
      background: #fff;
      padding: 0;
      height: 100%;
      .px2rem(padding-left,20);
      .px2rem(padding-right,20);
    }
    @{deepCss} .cell{
      background: #fff;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      .px2rem(padding-right,85);
      .rightStatus{
        white-space: nowrap;
        position: absolute;
        .r(8);
        border: 1px solid #e7e7e7;
        border-radius: 50%;
        .w(72);
        .h(72);
        top: 50%;
        transform: translateY(-50%);
        .fs(23);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b0b0b0;
      }
      .cell-top{
        background: #fff;
        .h(75);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          .w(40);
          color: #333333;
          .px2rem(margin-right,20);
        }
        p{
          .fs(28);
          color: #333333;
        }
        button{
          .px2rem(margin-left,16);
          // .px2rem(min-width,80);
          white-space: nowrap;
          .br(8);
          .p(5);
          .px2rem(padding-left,10);
          .px2rem(padding-right,10);
          .fs(16);
          transform: scale(0.9);
          color: #fff;
          background: #35aef5;
          border: none;
        }
        button.status-red{
          background: #fa5656;
        }
        button.status-green{
          background: #2dcb90;
        }
        button.status-yellow{
          background: #ffa15d;
        }
        button.status-blue{
          background: #35aef5;
        }
      }
      .cell-bottom{
        background: #fff;
        display: flex;
        align-items: flex-start;
        flex: 1;
        .fs(25);
        color: #999999;
        p{
          // color: #666666;
          .nowrap;
        }
      }
    }
  }
}
.DeviceMessage+.DeviceMessage{
  border-top: 1px solid #e7e7e7;
}
</style>
