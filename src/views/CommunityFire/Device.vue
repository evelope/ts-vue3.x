<template>
  <div class="Device">
    <LazyLoading
     v-if="DeviceMessageDataList.length" :data="lazyLoadingData" :isLoading.sync="lazyLoadingData.isLoading" @getData="pullData"
      :onRefresh="onRefresh">
      <DeviceMessage :touch="false" v-for="(item,index) in DeviceMessageDataList" :key="index" :data="item" @click.native="deviceDetail(item)"></DeviceMessage>
    </LazyLoading>
    <NoData v-else/>
    <!-- <div class="scanning" @click="openScanning" :class="openScanningAnimate">
      <img src="https://jcloud.fubangyun.com:7082/download/jupiter/file/scanning_1543288967_3.png"/>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ajaxDeviceList } from '@/server';

@Component
export default class Device extends Vue {
  // 属性*****************
  private wx: any = (window as any).wx;
  private type: string = 'loading';
  private openScanningAnimate: string = '';
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
    },
  }
  private getListData:object = {
    uid: this.$store.state.user_info.info_user.user_id,
    thing_id: this.$store.state.user_info.info_user.company_id,
    thing_type: this.$store.state.user_info.info_user.company_type,
    company_id: this.$store.state.user_info.info_user.company_id,
    company_type: this.$store.state.user_info.info_user.company_type,
    enum_device_model: '901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,10011,10054,-1',
    device_all: 1,
    page_no: 0,
    page_size: 20,
  }
  private DeviceMessageDataList: Array<any> = [
    // {
    //   id: '123',
    //   src: fire_detector,
    //   device_name: '无线智能火灾探测器',
    //   online_status: '',
    //   device_online_status_id,
    //   status: '在线',
    //   type: 'BLUE',
    //   address: '四层西电梯旁左侧左侧左侧左侧',
    //   data
    // },
    // {
    //   id: '456',
    //   src: electrical_fire,
    //   device_name: '电气火灾探测器',
    //   status: '正常',
    //   type: 'DEFAULT',
    //   address: '四层西电梯旁左侧左侧左侧左侧'
    // },
  ];
  // created ():void {
  //   document.title = '社区消防';
  // }
  activated () {
    document.title = '社区消防';
  }
  mounted ():void {
    this.getData();
  }
  // 方法*****************
  // 获取列表
  private getData(obj:object={indicator:true}): void {
    if(obj['indicator']){
      this['$indicator'].open({
        text: '加载中...',
      });
    }
    ajaxDeviceList(this.getListData).then(res=>{
      if(res.data.list){
        let result = res.data.list.map(item=>({
          id: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'thing_id')||{}).jpath||''),
          src: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_icon')||{}).jpath||''),
          device_name: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                      ?this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                      :this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_model_name')||{}).jpath||''),
          device_type: this['$getObjectValue'](item,'info_device.enum_device_type.thing_type'),
          online_status: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_online_status_name')||{}).jpath||''),
          device_online_status_id: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_online_status_id')||{}).jpath||''),
          status: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_status_name')||{}).jpath||''),
          type: this.showType(this['$getObjectValue'](item,'info_device.enum_device_status.status_category')),
          address: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'device_address')||{}).jpath||'') || ' --',
          data: item
        }))
        this.DeviceMessageDataList.push.apply(this.DeviceMessageDataList, result);
        if(res.data.list.length <= 20){
          this.lazyLoadingData['isLoading'] = false;
        }else if(res.data.total === this.DeviceMessageDataList.length){
          this.lazyLoadingData['isLoading'] = false;
        }
      }else{
        this.lazyLoadingData['isLoading'] = false;
      }
    }).catch(error=>{
      console.log(error);
      this.lazyLoadingData['isLoading'] = false;
      this.lazyLoadingData['okTitle']['showTitle'] = '加载失败';
    }).finally(res=>{
      this['$indicator'].close();
    })
  }
  // 下拉刷新
  private onRefresh(done): void {
    this.DeviceMessageDataList = [];
    this.getListData['page_no'] = 0;
    this.lazyLoadingData['isLoading'] = true;
    this.getData();
    done(); // call done
  }
  // 上拉加载
  private pullData(): void {
    ++this.getListData['page_no'];
    this.getData();
  };
  // 扫一扫
  private openScanning(): void {
    // this.openScanningAnimate = 'openScanningAnimate';
    // setTimeout(()=>{
    //   this.openScanningAnimate = '';
    // },1000)
    // this.wx.scanQRCode({
    //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //   scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
    //   success(res: any) {
    //     alert(res)
    //   }
    // });

    this.$router.push({
      path: '/weixin/communityfire/alarmhistoryinfo',
      query: {
        open_id: 'ooozRwZXHFu1i5P7fR_-zEkkxs5U',
        uuid: '9c467ced-c615-4246-991f-fae38e420359',
      }
    })
  }
  // 跳转详情
  private deviceDetail(data): void {
    let path = '/weixin/communityfire/devicedetail';
    let otherQuery = '';
    
    if(data.data.info_device_video && data.data.info_device_video.device_id){
      path = '/weixin/communityfire/dameradetail';
    }else if( this['$getObjectValue'](data.data,'info_device.enum_device_model.id')=='10018'||this['$getObjectValue'](data.data,'info_device.enum_device_model.id')=='10054' ){
      path = '/weixin/communityfire/componentdetail';
      otherQuery = 'gateway';
    }else if( this['$getObjectValue'](data.data,'info_device.enum_device_type.id')=='10001' ){
      path = '/weixin/communityfire/devicedetail';
    }else{
      path = '/weixin/communityfire/componentdetail';
    }

    this.$router['push']({
      path,
      query:{
        ...this.$route.query,
        device_id: data.id,
        device_type: data.device_type,
        page_type: otherQuery,
      }
    });
  }
  private showType(val:string): string {
    if(val === 'normal'){
      return 'GREEN'
    }else if(val === 'fault'){
      return 'YELLOW'
    }else if(val === 'alarm'){
      return 'RED'
    }else if(val === 'abnormal'){
      return 'RED'
    }else{
      return ''
    }
  }

}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.Device {
  height: 100%;
  .scanning{
    position: fixed;
    .w(110);
    .h(110);
    .r(30);
    .b(155);
    border-radius: 50%; 
    img{
      width: 100%;
      height: 100%;
    }
    &:active{
      filter:hue-rotate(330deg);
    }
  }
  .openScanningAnimate{
    animation: swing 1s 1;
  }
}
</style>
