<template>
  <div class="CreateGroup">
    <NewForm :data="formData" @submit="submit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ajaxWechatGroup, ajaxUserInfo, ajaxWechatGroupPut } from "@/server";

// mixins
import MyHomeMixins from '../MixinsFunc/MyHomeMixins'; 
// 声明组件*****************
@Component({
  components: {
      
  },
  mixins: [MyHomeMixins]
})
export default class CreateGroup extends Vue {
  // 属性*****************
  // private type: string = 'loading';
  private formData: Array<any> = [
    {
      name: '',
      value: '',
      placeholder: '快给你的群组取一个响亮的名字吧',
      jpath: 'info_wechat_group.name'
    },
  ];
  created (): void {
    document.title = '创建群组';
  };
  async mounted () {
    // 如果 有群组 就请求群列表
    if(this.$store.state.user_info.info_user_wechat.wechat_group_id >=0 ){
      let data = await this['getGroupInfo']();
      this.formData[0].value = this['$getObjectValue'](data,'data.info_wechat_group.name');
    }
  }
  // 方法*****************
  private submit(data): void {
    if(data.some(x=>x.value)){
      let obj = this["$postDataInit"](data);

      if(this.$route.query.type === 'edit'){
        this["$setObjectValue"](obj, "info_wechat_group.wechat_group_id", this.$store.state.user_info.info_user_wechat.wechat_group_id);
        ajaxWechatGroupPut(obj).then( async(res)=>{
          this["$message"]({
            value: "修改群组名字成功"
          });
          await this.getUserInfo();
          this.$router.go(-1);
        }).catch(error=>{
          console.log(error);
        })
      }else{
        this["$setObjectValue"](obj, "info_wechat_group.creater_open_id", this.$route.query.open_id);
        ajaxWechatGroup(obj).then( async(res)=>{
          this["$message"]({
            value: "新建群组成功"
          });
          await this.getUserInfo();
          this.$router.go(-1);
        }).catch(error=>{
          console.log(error);
        })
      }

    }else{
      this["$message"]({
        value: "请填写完整"
      });
    }
  }
  // 获取用户存储本地
  private getUserInfo(): void {
      return ajaxUserInfo({
          open_id: this['$route']['query']['open_id'],
          role_status: 0,
      }).then((res: object) => {
          console.log(res);
          this.$store.commit('save_user_info',res['data']);
      }).catch((error: object) => {
          this.$router.push({path:'/weixin/communityfire/myhome/addusermessage',query:this.$route['query']})
          console.log(error)
      })
  }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.CreateGroup {
}
</style>
