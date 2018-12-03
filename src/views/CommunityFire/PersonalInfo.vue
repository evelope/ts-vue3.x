<template>
  <div v-if="$store.state.user_info.info_user.user_id" class="PersonalInfo">
    <!-- 群组信息 -->
    <!-- <GroupMessage :groupShow.sync="groupShow"/>
    <CreateInfo v-if="!groupShow" :data="dataList[0]"/> -->

    <!-- 个人信息  -->
    <StateInfo v-if="userData.show" :data="userData"/>
    <NoData v-else/>
    <!-- <CreateInfo v-else :data="dataList[1]"/> -->

    <!-- 物联网平台 -->
    <!-- <StateInfo :data="associated"/> -->
    <!-- <CreateInfo :data="dataList[2]"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GroupMessage from './MyHome/GroupMessage.vue';
import make_offline from '../../assets/image/make_offline.png';
import { ajaxUserInfo, ajaxDeleteUser } from '@/server';

// 声明组件*****************
@Component({
  components: {
    GroupMessage
  }
})
export default class PersonalInfo extends Vue {
  // 属性*****************
  private groupShow: boolean = false;
  private dataList: Array<any> = [
    {
      title: '创建群组',
      path: '/weixin/communityfire/myhome/creategroup',
      show: true,
    },
    {
      title: '添加个人信息',
      path: '/weixin/communityfire/myhome/addusermessage',
      show: true,
    },
    {
      title: '关联物联网平台',
      path: '/weixin/communityfire/myhome/associated',
      show: true,
    },
  ];
  private userData: object = {
    title: '个人信息',
    show: false,
    list: [
      {
        id: 'user_name',
        name: '业主姓名',
        value: ''
      },
      {
        id: 'user_phone',
        name: '联系电话',
        value: ''
      },
    ],
    opera: '解除关联',
    operaIcon: make_offline,
    operaMethod: this.deleteAssociated,
    // operaPath: '/weixin/communityfire/myhome/userdetail',
  };
  private associated: object = {
    title: '物联网平台',
    list: [
      {
        id: 'belong_subdistrict',
        name: '小区名称',
        value: '',
        status: '已关联'
      },
      {
        id: 'subdistrict_address',
        name: '详细地址',
        value: ''
      },
      {
        id: 'subdistrict_phone',
        name: '联系电话',
        value: ''
      },
      {
        id: 'building_name',
        name: '建筑名称',
        value: ''
      },
      {
        id: 'floor_unit_room',
        name: '住址',
        value: '白价格收购'
      },
    ],
    // operaIcon: make_offline,
    // opera: '解除关联',
  };
  

  activated ():void {
    document.title = '个人信息';
  }
  mounted ():void {
    this['$indicator'].open({
      text: '加载中...',
    });
    ajaxUserInfo({
      open_id: this['$route']['query']['open_id'],
      role_status: 0,
    }).then((res: object) => {
      const { account, name } = res['data']['info_user'];
      for(let item of this.userData['list']){
        item.value = this['$getObjectValue'](res['data'],(res['ui'][0].data.find(x=>x.fb_id == item['id'])||{}).jpath||'');
      }

      for(let item of this.associated['list']){
        item.value = this['$getObjectValue'](res['data'],(res['ui'][0].data.find(x=>x.fb_id == item['id'])||{}).jpath||'');
        if(item['id'] === 'floor_unit_room'){
          item.value = this['$getObjectValue'](res['data'],(res['ui'][0].data.find(x=>x.fb_id == 'floor_number')||{}).jpath||'')
                      +'层'
                      +this['$getObjectValue'](res['data'],(res['ui'][0].data.find(x=>x.fb_id == 'unit_id')||{}).jpath||'')
                      +'单元'
                      +this['$getObjectValue'](res['data'],(res['ui'][0].data.find(x=>x.fb_id == 'room_id')||{}).jpath||'')
        }
      }
      this.userData['show'] = true;
    }).catch((error: object) => {
      this.userData['show'] = false;
      console.log(error)
    }).finally(res=>{
      this['$indicator'].close();
    })
  }

  // 方法*****************
  private deleteAssociated(): void {
    this['$messagebox'].confirm('确定要解除账号为'+this.$store['state']['user_info']['info_user']['account']+'的绑定吗？','').then(action => {
      this['$indicator'].open({
        text: '正在解除',
      });
      ajaxDeleteUser({
        info_user_wechat:{
          open_id: this.$route['query']['open_id']
        }
      }).then(res=>{
        this['$toast']({
          message: '解除成功',
          iconClass: 'iconfont icon-chenggong'
        });
        setTimeout(()=>{
          location.reload();
        },1000)
      }).catch(error=>{
        
      }).finally(data=>{
        this['$indicator'].close();
      })

    }).catch(error=>{
      console.log(error)
    })
  }
}
</script>

<style lang="less">
@import url("../../assets/less-css/flexible.less");
.PersonalInfo {
  height: 100%;
}
.mint-toast.is-placemiddle{
  min-width: 40%;
  .iconfont{
    .fs(120); 
  }
}
</style>
