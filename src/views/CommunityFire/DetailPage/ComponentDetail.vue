<template>
  <div class="ComponentDetail">
    <Electricity v-if="!$route.query.page_type" :value="electricity"/>
    <DetailsShow v-if="detailsShowData.length" v-for="(item,index) in detailsShowData" :key="index" :data="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxDeviceInfo } from "@/server";
// 声明组件*****************
@Component({
  components: {
    
  }
})
export default class ComponentDetail extends Vue {
  // 属性*****************
  private type: string = "loading";
  private electricity: number = 0;
  private detailsShowData: Array<any> = [
    [
      {
        id: "device_name",
        name: "设备名称",
        value: '',
        jpath: 'info_device.name'
      },
      {
        id: "compos_specific",
        name: "位置",
        value: '',
        jpath: 'info_device.specific'
      },
      {
        id: "device_status",
        name: "状态",
        value: '',
        jpath: 'info_device.enum_device_status.name'
      },
    ]
  ];
  created(): void {
    document.title = "设备详情";
  }
  mounted(): void {
    this.getDeviceInfo();

  }
  // 方法*****************
  private getDeviceInfo(): void {
    this['$indicator'].open({
        text: '加载中...',
    });
    ajaxDeviceInfo({
        uid: this.$store.state.user_info.info_user.user_id,
        device_id: this["$getObjectValue"](this["$route"], "query.device_id"),
        device_type: this["$getObjectValue"](this["$route"], "query.device_type")
    }).then(res => {
        this['$getDataInit'](this.detailsShowData, res.data);
        this.detailsShowData[0].find(x=>{
            if(x.id=='device_name'){
                x.value = this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                        ?this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_name')||{}).jpath||'')
                        :this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'model_name')||{}).jpath||'');
                return true
            }

        })
        this.electricity = this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_electricity')||{}).jpath||'')==-1
                          ?0
                          :this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == 'device_electricity')||{}).jpath||'');
    }).catch(error => {
        console.log(error);
    }).finally(res=>{
      this['$indicator'].close();
    });
  }


}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.ComponentDetail {
  height: 100%;
  background: #f2f2f2;
  
}
</style>
