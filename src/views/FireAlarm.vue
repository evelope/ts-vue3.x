<template>
  <div class="FireAlarm">
    <div class="statistics">
      <StarrySkyCanvas/>
      <div class="alarmBox">
        <div>
          <div>
            <div>
              <div>
                <div class="message">
                  <ul v-if="isbind">
                    <li><span>{{num}}</span>起</li>
                    <li>近7天报警数量</li>
                  </ul>
                  <ul v-else>
                    <li>您还没有</li>
                    <li>绑定账号</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="alarmList.length" class="alarmList">
      <div v-for="(x,i) in alarmList" :key="i">
        <h3>部件类型:{{x.enum_device_type}}</h3>
        <p>部件编号:{{x.thing_id}}</p>
        <p class="nowrap">地址:{{x.address}}</p>
        <span>{{x.time}}</span>
      </div>
    </div>
    <div class="alarmListNo" v-else>
      {{isbind?'暂无报警数据':'请先绑定账号'}}
    </div>
    <WeuiToast v-if="WeuiToastMessage" type="loading"></WeuiToast>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxEventWechatEventList } from '@/server';
import StarrySkyCanvas from "@/components/StarrySkyCanvas.vue";
import {getObjectValue} from '@/assets/js/utils';
import WeuiToast from '@/components/WeuiToast.vue';
// 声明组件*****************
@Component({
  components: {
    StarrySkyCanvas,
    WeuiToast
  }
})
export default class FireAlarm extends Vue {
  // 属性*****************
  private WeuiToastMessage: boolean = true;
  private isbind: boolean = true;
  private alarmList: Array<Object> = [
    // {
    //   enum_device_type: "手动按钮",
    //   thing_id: "5454545454",
    //   address: "北京市昌平区十三陵加油站",
    //   time: "今天 10:09"
    // },
  ];
  created ():void {
    document.title = '报警历史';
  };
  // 挂载完成*****************
  mounted ():void {
    ajaxEventWechatEventList({
      open_id: this['$route']['query']['open_id']
    }).then((res: any)=>{
      const result = getObjectValue(res,'data.list');
      this['alarmList'] = result.map((x: object)=>({
        enum_device_type:getObjectValue(x,'rt_event_confirm.enum_device_type.name'),
        thing_id:getObjectValue(x,'info_device.device_code'),
        address:getObjectValue(x,'info_location.address'),
        time:getObjectValue(x,'rt_event_confirm.accept_time'),
      }))
      this.WeuiToastMessage = false;
    }).catch((error: object)=>{
      this.isbind = false;
      this.WeuiToastMessage = false;
    })
  }
  // computed
  get num(): number {
    return this.alarmList.length;
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/less-css/flexible.less");
.FireAlarm {
  background: rgb(242, 242, 242);
  .statistics {
    position: relative;
    background: rgb(36, 43, 49);
    display: flex;
    justify-content: center;
    align-items: center;
    .h(450);
    .alarmBox {
      .w(400);
      .h(400);
      .p(20);
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(220, 35, 64, 0.4);
      box-sizing: border-box;
      border-radius: 50%;
      transform: scale(0);
      animation: findIn 0.3s 1 forwards;
      div {
        box-sizing: border-box;
        border-radius: 50%;
        .p(20);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(220, 35, 64, 0.4);
        transform: scale(0);
        animation: findIn 0.3s 0.2s 1 forwards;
        div {
          animation: findIn 0.3s 0.4s 1 forwards;
          div {
            animation: findIn 0.3s 0.6s 1 forwards;
            div {
              animation: findIn 0.3s 0.8s 1 forwards;
              div {
                animation: findIn 0.3s 1s 1 forwards;
              }
            }
          }
        }
      }
      .message {
        background: #fff;
        ul {
          display: flex;
          flex-direction: column;
          color: rgb(51, 51, 51);
          li {
            text-align: center;
            .fs(22);
            span {
              font-weight: bold;
              .fs(48);
            }
          }
        }
      }
    }
  }
  .alarmList {
    div {
      .p(25);
      position: relative;
      background: #fff;
      .px2rem(margin-bottom,20);
      h3 {
        .fs(28);
        .px2rem(margin-bottom,20);
      }
      p {
        color: rgb(153, 153, 153);
        .px2rem(margin-bottom,37);
      }
      p:last-of-type {
        color: rgb(153, 153, 153);
        .px2rem(margin-bottom,15);
      }
      span {
        position: absolute;
        .r(26);
        .t(48);
        color: rgb(86, 147, 249);
      }
    }
  }
  .alarmListNo {
    text-align: center;
    .fs(30);
    .lh(60);
    background: #fff;
  }
}
</style>
