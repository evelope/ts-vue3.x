import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 绑定木星云
const BindJupiter = () => import('@/views/BindJupiter.vue');
// 火警报警
const FireAlarm = () => import('@/views/FireAlarm.vue');
// 数据统计
const DataStatistics = () => import('@/views/DataStatistics.vue');
// 火警详情
const AlarmDetails = () => import('@/views/AlarmDetails.vue');



// ***社区消防********************************
// 社区消防父组件
const CommunityFire = () => import('@/views/CommunityFire/CommunityFire.vue');
// 社区消防--设备列表
const Device = () => import('@/views/CommunityFire/Device.vue');
// 社区消防--设备详情
const DeviceDetail = () => import('@/views/CommunityFire/DetailPage/DeviceDetail.vue');

// 社区消防--设备详情
const ComponentDetail = () => import('@/views/CommunityFire/DetailPage/ComponentDetail.vue');


// 社区消防--摄像头详情
const DameraDetail = () => import('@/views/CommunityFire/DetailPage/DameraDetail.vue')

// 社区消防--摄像头详情 -- 基本信息列表
const DameraDetailInfo = () => import('@/views/CommunityFire/DetailPage/DameraDetailInfo.vue')



// 社区消防--设置
const SetUp = () => import('@/views/CommunityFire/SetUp.vue');
// 社区消防--新增摄像头
const AddCamera = () => import('@/views/CommunityFire/AddCamera.vue');




// 社区消防--报警历史
const AlarmHistory = () => import('@/views/CommunityFire/AlarmHistory.vue');

// 社区消防--报警历史详情
const AlarmHistoryInfo = () => import('@/views/CommunityFire/DetailPage/AlarmHistoryInfo.vue');







// 社区消防--个人信息
const PersonalInfo = () => import('@/views/CommunityFire/PersonalInfo.vue');
// 社区消防--添加*编辑 个人信息
const AddUserMessage = () => import('@/views/CommunityFire/MyHome/AddUserMessage.vue');
// 社区消防--个人信息 详情
const UserDetail = () => import('@/views/CommunityFire/MyHome/UserDetail.vue');


// 社区消防--创建群组
const CreateGroup = () => import('@/views/CommunityFire/MyHome/CreateGroup.vue');
// 社区消防--群组人员列表
const GroupList = () => import('@/views/CommunityFire/MyHome/GroupList.vue');
// 社区消防--添加*编辑 物联网平台
const Associated = () => import('@/views/CommunityFire/MyHome/Associated.vue');





// 社区消防--二维码
const Erweima = () => import('@/views/CommunityFire/MyHome/Erweima.vue');









// 消防培训
const FireTraining = () => import('@/views/FireTraining/FireTraining.vue');







export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/weixin/communityfire',
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin',
      redirect: '/weixin/firealarm',
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/bindjupiter',
      name: 'BindJupiter',
      component: BindJupiter,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/firealarm',
      name: 'FireAlarm',
      component: FireAlarm,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/datastatistics',
      name: 'DataStatistics',
      component: DataStatistics,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/alarmdetails',
      name: 'AlarmDetails',
      component: AlarmDetails,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire',
      name: 'CommunityFire',
      redirect: '/weixin/communityfire/device',
      component: CommunityFire,
      meta: {
        keepAlive: false,
      },
      children: [
        {
          path: '/weixin/communityfire/device',
          name: 'Device',
          component: Device,
          meta: {
            keepAlive: false,
          },
        },
        {
          path: '/weixin/communityfire/alarmhistory',
          name: 'AlarmHistory',
          component: AlarmHistory,
          meta: {
            keepAlive: false,
          },
        },
        {
          path: '/weixin/communityfire/personalinfo',
          name: 'PersonalInfo',
          component: PersonalInfo,
          meta: {
            keepAlive: false,
          },
        },
      ],
    },
    {
      path: '/weixin/communityfire/devicedetail',
      name: 'DeviceDetail',
      component: DeviceDetail,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/componentdetail',
      name: 'ComponentDetail',
      component: ComponentDetail,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/dameradetail',
      name: 'DameraDetail',
      component: DameraDetail,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/dameradetailInfo',
      name: 'DameraDetailInfo',
      component: DameraDetailInfo,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/alarmhistoryinfo',
      name: 'AlarmHistoryInfo',
      component: AlarmHistoryInfo,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/setup',
      name: 'SetUp',
      component: SetUp,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/addcamera',
      name: 'AddCamera',
      component: AddCamera,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/creategroup',
      name: 'CreateGroup',
      component: CreateGroup,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/grouplist',
      name: 'GroupList',
      component: GroupList,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/erweima',
      name: 'Erweima',
      component: Erweima,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/addusermessage',
      name: 'AddUserMessage',
      component: AddUserMessage,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/userdetail',
      name: 'UserDetail',
      component: UserDetail,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/weixin/communityfire/myhome/associated',
      name: 'Associated',
      component: Associated,
      meta: {
        keepAlive: false,
      },
    },


    {
      path: '/weixin/firetraining',
      name: 'FireTraining',
      component: FireTraining,
      meta: {
        keepAlive: false,
      },
    },

    
  ],
});
