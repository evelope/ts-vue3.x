<template>
  <div class="DeviceDetail">
    <DeviceMessage class="devicemessage" :touch="false" :data="deviveData"></DeviceMessage>
    <p class="device-id">
      <button>ID:{{deviveData.id}}</button>
    </p>
    <div v-if="componentData.length" class="info">
      <p>实时线路数据</p>
      <ul>
        <li v-for="(item,index) in componentData" :key="index">
          <p><span>{{item.name+item.type}}</span></p>
          <p class="image"><img :src="item.src"/></p>
          <p><span :style="{color:item.abnormal?'#f3544a':'#38a2f0'}">{{item.value}}</span></p>
        </li>
          <!-- <img src="/image/dian_blue.png"/>
          <img src="/image/dian_red.png"/>
          <img src="/image/wen_blue.png"/>
          <img src="/image/wen_red.png"/> -->

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxDeviceInfo, ajaxComponentListByDtu } from "@/server";
// 声明组件*****************
@Component({
  components: {
    
  }
})
export default class DeviceDetail extends Vue {
  // 属性*****************
  private type: string = "loading";
 
  private deviveData: object = {
    id: '',
    device_name: '',
    status: '',
    type: '',
    address: '',
  };
  private componentData: Array<any> = [
    // {
    //   name: "id",
    //   type,
    //   src: "---",
    //   value: '22',
    //   abnormal,
    // },
  ];

  
  created(): void {
    document.title = "设备详情";
  }
  async mounted() {
    await this.getDeviceInfo();
    this.getComponentInfo();
  }
  // 方法*****************
  // 设备详情
  private getDeviceInfo(): void {
    this['$indicator'].open({
        text: '加载中...',
    });
    return ajaxDeviceInfo({
      uid: this.$store.state.user_info.info_user.user_id,
      device_id: this["$getObjectValue"](this["$route"], "query.device_id"),
      device_type: this["$getObjectValue"](this["$route"], "query.device_type")
    }).then(res => {
      this.deviveData = {
        id: this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'thing_id')||{}).jpath||''),
        device_name: this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                    ?this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                    :this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_model_name')||{}).jpath||''),
        status: this['$getObjectValue'](res.data,'info_device.enum_device_status.name'),
        type: this.showType(this['$getObjectValue'](res.data,'info_device.enum_device_status.status_category')),
        address: this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'compos_specific')||{}).jpath||'') || ' --',
      };
    }).catch(error => {
      console.log(error);
    })
  };

  // 设备下的 小部件详情
  private getComponentInfo(): void {
    ajaxComponentListByDtu({
      uid: this.$store.state.user_info.info_user.user_id,
      thing_id: this.$store.state.user_info.info_user.company_id,
      thing_type: this.$store.state.user_info.info_user.company_type,
      dtu_id: this["$getObjectValue"](this["$route"], "query.device_id"),
    }).then(res => {
      this.componentData = res.data.list.map(x=>{
        let obj = {};
        let currentVal = this['$getObjectValue'](x.info_sense[0],(res.ui[0].data.find(x=>x.fb_id == 'sense_latest_analog')||{}).jpath||'');
        let upper_limit = this['$getObjectValue'](x.info_sense[0],(res.ui[0].data.find(x=>x.fb_id == 'upper_limit')||{}).jpath||'');
        let lower_limit = this['$getObjectValue'](x.info_sense[0],(res.ui[0].data.find(x=>x.fb_id == 'lower_limit')||{}).jpath||'');
        
        obj['name'] = '回路'+this['$getObjectValue'](x,(res.ui[0].data.find(x=>x.fb_id == 'loop_number')||{}).jpath||'');
        if(this['$getObjectValue'](x.info_sense[0],(res.ui[0].data.find(x=>x.fb_id == 'enum_analog_type')||{}).jpath||'')==129){//电流
            obj['type']='电流';
            obj['value'] = currentVal+'mA';
            obj['src'] = '/image/dian_red.png';
            if(currentVal>upper_limit){
              obj['abnormal'] = true;
            }else if(currentVal<upper_limit && currentVal>lower_limit){
              obj['abnormal'] = false;
              obj['src'] = '/image/dian_blue.png';
            }else{
              obj['abnormal'] = true;
            }
          }else if(this['$getObjectValue'](x.info_sense[0],(res.ui[0].data.find(x=>x.fb_id == 'enum_analog_type')||{}).jpath||'')==3){//温度
            obj['type']='温度';
            obj['value'] = currentVal+'℃';
            obj['src'] = '/image/wen_red.png';
            if(currentVal>upper_limit){
              obj['abnormal'] = true;
            }else if(currentVal<=upper_limit && currentVal>=lower_limit){
              obj['abnormal'] = false;
              obj['src'] = '/image/wen_blue.png';
            }else{
              obj['abnormal'] = true;
            }
          }else{
            obj['type']='';
          }
        return obj;
      })

    }).catch(error => {
      console.log(error);
    }).finally(res=>{
      this['$indicator'].close();
    });
  };

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
@import url("../../../assets/less-css/flexible.less");
.DeviceDetail {
  height: 100%;
  background: #f2f2f2;
  .devicemessage{
    .px2rem(margin-top, 16);
  }
  .device-id{
    .px2rem(padding-bottom, 25);
    background: #fff;
    button{
      background: #ebf5fd;
      border: 1px solid #91cbf6;
      color: #91cbf6;
      .px2rem(padding-left,30);
      .px2rem(padding-right,30);
      position: relative;
      .px2rem(margin-left, 20);
      &::before{
        content: '';
        position: absolute;
        .w(9);
        .h(9);
        border: 1px solid #91cbf6;
        border-top-color: transparent;
        border-left-color: transparent; 
        border-radius: 50%; 
        background: #fff;
        .l(-8);
        top: 50%;
        transform: translateY(-50%) rotateZ(-45deg);
      }
      &::after{
        content: '';
        position: absolute;
        .w(9);
        .h(9);
        border: 1px solid #91cbf6;
        border-top-color: transparent;
        border-left-color: transparent; 
        border-radius: 50%; 
        background: #fff;
        .r(-8);
        top: 50%;
        transform: translateY(-50%) rotateZ(135deg);
      }
    }
  }
  .info{
    background: #fff;
    .px2rem(margin-top, 20);
    &>p{
      position: relative;
      .fs(28);
      .h(90);
      .lh(89);
      .px2rem(padding-left, 20);
      border-bottom: 1px solid #d8d8d8;
      &::before{
        content: '';
        position: absolute;
        .w(16);
        .h(16);
        background: #fff;
        border: 1px solid #d8d8d8;
        .l(50);
        .b(0);
        border-bottom-color: transparent;
        border-right-color: transparent; 
        transform: translateY(55%) rotateZ(45deg);
      } 
    }
    ul {
      .lh(130);
      li{
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .px2rem(padding-left,20);
        .px2rem(padding-right,20);
        p{
          flex: 1;
          display: flex;
          align-items: center;
        }
        p:first-child{
          justify-content: flex-start;
        }
        p.image{
          justify-content: center;
        }
        p:last-child{
          justify-content: flex-end;
        }
        img{
          .w(90);
        }
      }
    }
  }
}
</style>
<style>
  .DeviceDetail .DeviceMessage{
    border: none !important;
  }
</style>

