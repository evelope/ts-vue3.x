<template>
  <div class="AlarmHistory">
    <LazyLoading v-if="alarmDataList.length" :data="lazyLoadingData" :isLoading.sync="lazyLoadingData.isLoading" @getData="pullData"
    :onRefresh="onRefresh">
      <DeviceMessage v-for="(item,index) in alarmDataList" :key="index" :data="item" :touch="false"></DeviceMessage>
    </LazyLoading>
    <NoData v-else/>


  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ajaxEventList } from '@/server';

import fire_detector from '../../assets/image/fire_detector.png';
import electrical_fire from '../../assets/image/electrical_fire.png';
import Independent_flammability from '../../assets/image/Independent_flammability.png';
import camera from '../../assets/image/camera.png';
import scanning from '../../assets/image/scanning.png';
// 声明组件*****************
@Component({
  components: {
  }
})
export default class AlarmHistory extends Vue {
  // 属性*****************
  private getListData:object = {
    uid: this.$store.state.user_info.info_user.user_id,
    thing_id: this.$store.state.user_info.info_user.company_id,
    thing_type: this.$store.state.user_info.info_user.company_type,
    company_id: this.$store.state.user_info.info_user.company_id,
    company_type: this.$store.state.user_info.info_user.company_type,
    page_no: 0,
    page_size: 20,
  }
  private alarmDataList: Array<any> = [
    // {
    //   id: '789',
    //   src: Independent_flammability,
    //   device_name: '独立式探测器',
    //   status: '异常',
    //   type: 'RED',
    //   address: '四层西电梯旁左侧左侧左侧左侧'
    // },
  ];
  private lazyLoadingData: object = {
    styles:{
      
    },
    isLoading: true,
    loadingTitle:{
      showIcon: 'icon-jiazai',
      showTitle: '加载中',
    },
    okTitle:{
      showIcon: '',
      showTitle: '没有更多数据',
    }
  }

  activated ():void {
    document.title = '历史报警';
  }
  mounted (): void {
    this.getData();
  }
  // 方法*****************
  private getData(): void {
    this['$indicator'].open({
      text: '加载中...',
    });
    ajaxEventList(this.getListData).then(res=>{
      if(res.data.list){
        let result = res.data.list.map(item=>({
          id: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'thing_id')||{}).jpath||''),
          src: this.showSrc(this['$getObjectValue'](item,"rt_event_confirm.enum_device_class.id")),
          device_name: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_model_name')||{}).jpath||''),
          status: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_status_name')||{}).jpath||''),
          type: this.showType(this['$getObjectValue'](item,"rt_event_confirm.enum_confirm_type.id")),
          address: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'compos_specific')||{}).jpath||''),
        }))
        this.alarmDataList.push.apply(this.alarmDataList, result);
        if(res.data.list.length < 20){
          this.lazyLoadingData['isLoading'] = false;
        }else if(res.data.total === this.alarmDataList.length){
          this.lazyLoadingData['isLoading'] = false;
        }
      }else{
        this.lazyLoadingData['isLoading'] = false;
      }
    }).catch(error=>{
      console.log(error);
      this.lazyLoadingData['isLoading'] = false;
      this.lazyLoadingData['loadingTitle']['okTitle']['showTitle'] = '加载失败';
    }).finally(res=>{
      this['$indicator'].close();
    })
  }

  // 下拉刷新
  private onRefresh(done): void {
    this.alarmDataList = [];
    this.getListData['page_no'] = 0;
    this.getData();
    done(); // call done
  }
  // 上拉加载
  private pullData(): void {
    ++this.getListData['page_no'];
    this.getData();
  };

  private showType(val): string {
    if(val === 2 && val === 5 && val === 8 && val === 9){
      return 'GREEN'
    }else{
      return 'RED'
    }
  }
  private showSrc(val): string {
    if(val === 5 || val === 1){
      return electrical_fire
    }else if(val === 10001){
      return fire_detector
    }else if(val === 3){
      return Independent_flammability
    }else{
      return electrical_fire
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.AlarmHistory {
  height: 100%;
}
</style>
