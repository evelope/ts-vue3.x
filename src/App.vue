<template>
  <div id="app">
    <!-- <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </transition> -->

    <!-- <transition :name="transitionName"> -->
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <!-- </transition> -->
    <!-- <keep-alive> -->
     <router-view></router-view>
    <!-- </keep-alive> -->

    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
      <!-- <router-link tag="p" to="/weixin/datastatistics">数据报告</router-link> -->
    <!-- <div class="wx">
      <router-link exact tag="p" to="/weixin/bindjupiter">账号绑定</router-link>
      <router-link tag="p" to="/weixin/firealarm">报警历史</router-link>
      <router-link tag="p" to="/weixin/alarmdetails">报警详情</router-link>
      <router-link exact tag="p" :to="{path:'/weixin/communityfire/device',query:$route.query}">社区消防</router-link>
      <router-link exact tag="p" :to="{path:'/weixin/communityfire/addcamera',query:$route.query}">添加摄像头</router-link>
    </div> -->
  </div>
</template>
<!-- https://segmentfault.com/a/1190000012361988 -->

<script>
export default {
  name: "Login",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  mounted () {
    this.$nextTick(()=>{
      if(!this.$route.query.open_id){
        // alert('open_id 不存在');
        return;
      }
    })
  },
  methods: {},
  watch: {
    $route(to, from) {
      if (to.path == "/weixin/bindjupiter") {
        this.transitionName = "slide-right";
      } else if (to.path == "/weixin/datastatistics") {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>


<style lang="less">
@import url("./assets/less-css/flexible.less");
#app {
  background: #fff;
  height: 100%;
  overflow: auto;
  position: relative;
}
.mint-msgbox-wrapper .mint-msgbox{
  .br(20);
}
#app .wx {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  box-shadow: 0 0 10px #ccc;
}
#app .wx p {
  flex: 1;
  color: #333;
  text-align: center;
  background: #fff;
}
#app .wx p:active {
  background: #ccc;
}
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
#app .wx p.router-link-active{
  background: #ccc;
}
</style>
