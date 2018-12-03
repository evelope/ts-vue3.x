<template>
  <div class="BottomNav">
    <router-link tag="p" v-for="(item,index) in bottomNavList" :key="index" :to="{path:item.to,query:$route.query}"><img :src="$route.path===item.to?item.activeSrc:item.src"/><span>{{item.title}}</span></router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import bottom_device from '../../assets/image/bottom_device.png';
import bottom_device_active from '../../assets/image/bottom_device_active.png';
import alarm_history from '../../assets/image/alarm_history.png';
import alarm_history_active from '../../assets/image/alarm_history_active.png';
import personal_info from '../../assets/image/personal_info.png';
import personal_info_active from '../../assets/image/personal_info_active.png';
// 声明组件*****************
@Component
export default class BottomNav extends Vue {
  // 属性*****************
  name: string = 'BottomNav';
  private bottomNavList: Array<any> = [
      {
          src: bottom_device,
          activeSrc: bottom_device_active,
          title: '设备',
          to: '/weixin/communityfire/device'
      },
    //   {
    //       src: alarm_history,
    //       activeSrc: alarm_history_active,
    //       title: '报警历史',
    //       to: '/weixin/communityfire/alarmhistory'
    //   },
      {
          src: personal_info,
          activeSrc: personal_info_active,
          title: '账号信息',
          to: '/weixin/communityfire/personalinfo'
      },
  ];
 

  // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.BottomNav {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top:1px solid #dddddd;
    .px2rem(padding-top,5);
    box-sizing: border-box;
    .h(98);
    p{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.router-link-active{
            color: #38a2f0;
        }
        img{
            .w(40);
            .h(40);
        }
        span{
             .px2rem(margin-top,5);
             .fs(22);
        }
    }
}
</style>
