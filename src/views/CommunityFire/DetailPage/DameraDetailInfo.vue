<template>
  <div class="DameraDetailInfo">
    <DetailsShow v-if="videoData.length" v-for="(item,index) in videoData" :key="index" :data="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxDeviceVideoInfo } from "@/server";
// 声明组件*****************
@Component({
  components: {}
})
export default class DameraDetailInfo extends Vue {
  // 属性*****************
  // private type: string = "loading";
  private videoData = [
    [
      {
        id: "enum_video_trademark",
        name: "摄像头品牌",
        value: '',
        jpath: "info_device_video.enum_video_trademark.name"
      },
      {
        id: "model",
        name: "摄像头型号",
        value: '',
        jpath: "info_device_video.model"
      }
    ],
    [
      {
        id: "device_code",
        name: "设备序列号",
        value: '',
        jpath: 'info_device_video.device_code'
      },
      {
        id: "video_code",
        name: "设备验证码",
        value: '',
        jpath: 'info_device_video.video_code'
      },
      {
        id: "video_name",
        name: "名称",
        value: '',
        jpath: 'info_device_video.video_name'
      },
      {
        id: "enum_video_type",
        name: "类型",
        value: '',
        jpath: 'info_device_video.enum_video_type.name'
      },
      {
        id: "desc",
        name: "安装位置",
        value: '',
        jpath: 'info_device_video.desc'
      },
    ]
  ];

    created(): void {
        document.title = "摄像头详情";
    }
  mounted(): void {
    this.getDeviceInfo();
  }

  // 方法*****************
  private getDeviceInfo(): void {
    this['$indicator'].open({
        text: '加载中...',
    });
    ajaxDeviceVideoInfo({
      uid: this.$store.state.user_info.info_user.user_id,
      device_id: this["$getObjectValue"](this["$route"], "query.device_id"),
    }).then(res => {
        this['$getDataInit'](this.videoData, res.data);
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
.DameraDetailInfo {
  height: 100%;
  background: #f2f2f2;
}
</style>
