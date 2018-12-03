<template>
  <div class="CommunityFire" :style="{height:userDataOk==0?'':'100%'}">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    
    <keep-alive v-if="userDataOk==0">
      <router-view></router-view>
    </keep-alive>


    <NoData v-else-if="userDataOk==-1"/>
    <NoData value="暂未关联家庭消防app账号，如需关联，请在app端发送开通微信服务邀请。" v-else/>
    <BottomNav v-if="userDataOk==0"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BottomNav from './BottomNav.vue';

// mixins
import MyHomeMixins from './MixinsFunc/MyHomeMixins'; 
// 声明组件*****************
@Component({
  components: {
      BottomNav
  },
  mixins: [MyHomeMixins]
})
export default class CommunityFire extends Vue {
  // 属性*****************
  private userDataOk: number = -1;
  async mounted () {
    const status = await this['getUserInfo']();
    this.userDataOk = status;
  }
  // 方法*****************
  
}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.CommunityFire {
    // height: 100%;
    height: calc(100% - 1.30666667rem);
    overflow-y: scroll;
    background: #f2f2f2;
    box-sizing: border-box;
    // .px2rem(margin-bottom, 118);
}
</style>
