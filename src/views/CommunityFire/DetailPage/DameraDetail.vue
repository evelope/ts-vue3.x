<template>
  <div class="DameraDetail">
      <div class="video-box">
        <p class="video-top-box">
            <button @click="goVideoInfo">
                <img :src="video_title"/>
                <span>基本信息</span>
            </button>
        </p>
        <Yinshiyun :data="yinshiyunData"/>
      </div>
      <DetailsShow :data="itemData[0]"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxDeviceVideoInfo } from "@/server";
import video_title from '../../../assets/image/video_title.png';
import Yinshiyun from '@/components/yinshiyun_video/Yinshiyun.vue';
// 声明组件*****************
@Component({
  components: {
    Yinshiyun
  }
})
export default class DameraDetail extends Vue {
  // 属性*****************
  private type: string = "loading";
  private video_title: string = video_title;
  private yinshiyunData: object = {

    type: '2',
    data: '',
    ip: '172.16.12.102',
    port: 80,
    username: 'admin',
    password: 'fubang123',
    ip_port:'',

    device_code: '180027271',
    rtmp_url: '',
    hls_url: '',
    yingshi_token: 'at.0p7nmpvraqt71oao3tkjk89z4sqgbmah-99qyusdgpi-1cz2cm0-svkcu3bta',

    company: '北京富邦智慧物联科技有限公司',
    address: '安装在研发部那个角落',
    click_status:false,
    ak: "0b8c404eb4214958b074287a1687be32" // 公有云平台注册即可获得accessKey



  };
  private itemData: any = [
    [
      {
        id: "desc",
        name: "安装位置",
        value: '',
        jpath: 'info_device_video.desc'
      },
    ]
  ]
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
        let {rtmp, hls} = JSON.parse(res.data.info_device_video.trademark_url);
        this.yinshiyunData['rtmp_url'] = rtmp;
        this.yinshiyunData['hls_url'] = hls;
        this['$getDataInit'](this.itemData, res.data);
    }).catch(error => {
        console.log(error);
    }).finally(res=>{
      this['$indicator'].close();
    });
  }
  // 详情列表进入
  private goVideoInfo(): void {
      this.$router.push({
          path: '/weixin/communityfire/dameradetailInfo',
          query: this.$route['query']
      })
  }

}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.DameraDetail {
    height: 100%;
  background: #f2f2f2;
  .video-box{
    background: #fff;
  }
  .video-top-box{
    .lh(72);
    .h(72);
    .fs(22);
    display: flex;
    align-items: center;
    .px2rem(padding-left,20);
    position: relative;
    button{
        display: flex;
        align-items: center;
        position: absolute;
        .r(20);
        background: #fff;
        border: 1px solid #cccccc;
        color: #333;
        .br(30);
        .p(5);
        .px2rem(padding-left,20);
        .px2rem(padding-right,20);
    }
    img{
      .w(30);
      .h(30);
      .px2rem(margin-right,12);
    }
  }
}
</style>
