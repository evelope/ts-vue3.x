<template>
  <div v-if="loading" class="AlarmHistoryInfo">
      <div class="alarm-title">
        <p class="icon"><img src="https://jcloud.fubangyun.com:7082/download/icon/app/application_icon_community-fire@3x.png"/></p>
        <p>
          <span>警情概述</span>
          <span>{{alarmValue}}</span>
        </p>
      </div>
      <DetailsShow v-if="alarmEventData.length" v-for="(item,index) in alarmEventData" :key="index" :data="item"/>
  </div>
  <NoData v-else/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxEventInfo } from "@/server";

// mixins
import MyHomeMixins from '../MixinsFunc/MyHomeMixins'; 

// 声明组件*****************
@Component({
  components: {
    
  },
  mixins: [MyHomeMixins]
})
export default class AlarmHistoryInfo extends Vue {
  // 属性*****************
  private loading: boolean = false;
  private alarmEventData = [
    [
      {
        id: "device_model_name",
        name: "部件名称",
        value: '',
        jpath: "rt_event_confirm.enum_device_model.name"
      },
      {
        id: "compos_specific",
        name: "位置",
        value: '',
        jpath: "info_things_compos.specific"
      },
      {
        id: "confirm_type_name",
        name: "当前状态",
        value: '',
        jpath: "rt_event_confirm.enum_confirm_type.name"
      },
      {
        id: "confirm_type_id",
        name: "当前状态",
        value: '',
        jpath: "rt_event_confirm.enum_confirm_type.id",
        show: false
      },
      {
        id: "event_create_time",
        name: "报警时间",
        value: '',
        jpath: "rt_event_confirm.create_time"
      },
      {
        id: "event_accept_end_time",
        name: "恢复时间",
        value: '',
        jpath: "rt_event_confirm.accept_end_time"
      },
      
      {
        id: "subdistrict_name",
        name: "小区",
        value: '',
        jpath: "info_subdistrict.name",
        show: false
      },
      {
        id: "building_name",
        name: "建筑",
        value: '',
        jpath: "info_building.building_name",
        show: false
      },
      {
        id: "floor_name",
        name: "楼层",
        value: '',
        jpath: "info_floor.name",
        show: false
      },
      {
        id: "room_id",
        name: "单元号",
        value: '',
        jpath: "info_things_compos.room_id",
        show: false
      },
    ],
  ]
  created(): void {
    document.title = "报警详情";
  }
  
  async mounted () {
    const status = await this['getUserInfo']();
    if(status==0){
      this.getEvent();
    }
  }

  // 获取报警详情
  private getEvent(): void {
    this['$indicator'].open({
        text: '加载中...',
    });
    return ajaxEventInfo({
      uid: this.$store.state.user_info.info_user.user_id,
      // uuid: '9c467ced-c615-4246-991f-fae38e420359',
      uuid: this.$route.query.uuid
    }).then(res=>{
      this['$getDataInit'](this.alarmEventData, res.data);
      this.alarmEventData[0].forEach(x=>{
        if(x.id=='device_name'){
          x.value = this['$getObjectValue'](res.data,'info_device.name')
                  ?this['$getObjectValue'](res.data,'info_device.name')
                  :this['$getObjectValue'](res.data,'info_device.enum_device_model.name');
        }

        if(x.id=='confirm_type_id'){
          if(x.value=='5'||x.value=='9'){
            this.alarmEventData[0].find(x=>{
              if(x.id=='event_accept_end_time'){
                x.show = false;
                return true
              }
            })
          }
        }
      })
      this.loading = true;
    }).catch(error=>{
      console.log(error);
      this.loading = false;
    }).finally(data=>{
      this['$indicator'].close();
    })
  }


  // computed
  get alarmValue(): string {
    let subdistrict: string = this.alarmEventData[0].find(x=>x.id=='subdistrict_name').value;
    let building_name: string = this.alarmEventData[0].find(x=>x.id=='building_name').value;
    let floor_name: string = this.alarmEventData[0].find(x=>x.id=='floor_name').value;
    let room_id: string = this.alarmEventData[0].find(x=>x.id=='room_id').value;
    let device_model_name: string = this.alarmEventData[0].find(x=>x.id=='device_model_name').value;

    if(!subdistrict||subdistrict==='-1'||subdistrict==='--'){
      subdistrict = '未知小区';
    }
    if(!room_id||room_id==='-1'||subdistrict==='--'){
      room_id = '未知房间';
    } else {
      room_id += '房间';
    }

    return subdistrict+building_name+floor_name+room_id+' '+device_model_name+'发生报警';
  }


}
</script>

<style lang="less">
@import url("../../../assets/less-css/flexible.less");
.AlarmHistoryInfo {
  height: 100%;
  background: #f2f2f2;
  .alarm-title{
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    .px2rem(min-height, 140);
    .px2rem(padding-top,15);
    .px2rem(padding-bottom,15);
    box-sizing: border-box;
    display: flex;
    p.icon{
      .w(120);
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        .w(80);
        .h(80);
      }
    }
    p:last-child{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 1;
      .px2rem(padding-right, 20); 
      span{
        display: block;
      }
      span:first-child{
        .fs(29);
        .px2rem(margin-bottom, 6);
      }
      span:last-child{
        color: #999999;
        .fs(25);
      }
    }
  }
  .DetailsShow{
    .value{
      justify-content: flex-start !important;
      color: #999999 !important;
    }
  }
}
</style>
