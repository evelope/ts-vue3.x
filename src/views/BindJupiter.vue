<template>
  <div class="BindJupiter">
    <template v-if="!pageType">
      <div class="input-box">
        <input type="number" v-model="bingData.account" :placeholder="bingData.accountPlaceholder"/>
        <input type="password" v-model="bingData.password" :placeholder="bingData.passwordPlaceholder"/>
        <div v-if="bingData.password" class="empty" @click="emptyPassword"><i class="iconfont icon-guanbi"></i></div>
      </div>
      <div class="button-box">
        <button @click="bind">绑定</button>
      </div>
    </template>
    <div v-else class="is-binding">
      <p>{{bingData.account}}</p>
      <button @click="isBind">解除绑定</button>
    </div>
    <WeuiToast v-if="WeuiToastMessage" :type="type"></WeuiToast>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ajaxUserBindWechatUser, ajaxUserUnBindWechatUser, ajaxUserCheckWechatUser } from '@/server';
import WeuiToast from '@/components/WeuiToast.vue';
import { MessageBox } from 'mint-ui';
// 定义接口*****************
interface Message {
  account: string;
  accountPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
}
// 声明组件*****************
@Component({
  components: {
    WeuiToast
  }
})
export default class BindJupiter extends Vue {
  // 属性*****************
  private wx: any = (window as any).wx;
  private bingData: Message = {
    account: '',
    accountPlaceholder: '请输入您的账号/手机号',
    password: '',
    passwordPlaceholder: '请输入您的密码',
  };
  private pageType: boolean = true;
  private WeuiToastMessage: boolean = false;
  private type: string = 'loading';
  created ():void {
    ajaxUserCheckWechatUser({
      open_id: this['$route']['query']['open_id']
    }).then((res: any)=>{
      if(res.data&&res.data.info_user&&res.data.info_user.account){
        this.pageType = true;
        this.bingData.account = res.data.info_user.account;
        document.title = '解除绑定';
      }else{
        this.pageType = false;
        document.title = '绑定账号';
      }
    }).catch((error: object)=>{
      this.pageType = false;
      document.title = '绑定账号';
      console.log(error)
    })
  };
  // 挂载完成*****************
  mounted ():void {
  }

  // 方法*****************
  // 提交绑定
  private bind(): void {
    if(this['bingData']['account']&&this['bingData']['password']){
      this['type'] = 'loading';
      this.WeuiToastMessage = true;
      if(this['pageType']){// 已经绑定 处理解绑
        this.unBindAccount();
      }else{// 绑定
        this.bindAccount();
      }
    }else{
      this['$message']({
        value:'请填写完整'
      })
    }
  }

  // 提示是否解绑
  private isBind(): void {
    MessageBox.confirm('确定要解除账号为'+this['bingData']['account']+'的绑定吗？','').then(action => {
    this.passwordInit();
    }).catch(error=>{
      console.log(error)
    })
  }
  // 密码输入框

  private passwordInit(): void {
    MessageBox.prompt('输入账号密码,解除账号为'+this['bingData']['account']+'的绑定',{
      title: '',
      inputType: 'password',
    }).then(({ value, action }) => {
      if(value){
        this['bingData']['password'] = value;
        this.bind();
      }else{
        this['$message']({
          value:'请填写密码'
        })
        this.passwordInit();
      }
    });
  }
  // 绑定账号
  private bindAccount(): void {
      ajaxUserBindWechatUser({
        info_user_wechat:{
          account: this['bingData']['account'],
          password: this['bingData']['password'],
          open_id: this['$route']['query']['open_id']
        }
      }).then((res: object)=>{
        this.WeuiToastMessage = false;
        this.pageType = !this.pageType;
        MessageBox.alert('您已成功绑定'+this['bingData']['account']+'的账号，您将收到实时报警信息推送并可查看报警详情','');
      }).catch((error: any)=>{
        if(error['code'] === 6994){
          this['$message']({
            value:'密码错误，请重新输入'
          })
          this.WeuiToastMessage = false;
        }else if(error['code'] === 6993){
          this['$message']({
            value:'对不起，您输入的账号不存在，请前往官网注册后，再进行绑定'
          })
          this.WeuiToastMessage = false;
        }else if(error['code'] === 6987){
          this['$message']({
            value:'此账号已绑定微信'
          })
          this.WeuiToastMessage = false;
        }else{
          this.WeuiToastMessage = false;
        }
        console.log('error:',error)
      })
  }

  // 解绑账号
  private unBindAccount(): void {
      ajaxUserUnBindWechatUser({
          account: this['bingData']['account'],
          password: this['bingData']['password'],
          open_id: this['$route']['query']['open_id']
      }).then((res: object)=>{
        this.WeuiToastMessage = false;
        this.pageType = !this.pageType;
        MessageBox.alert('解除绑定成功','');
      }).catch((error: any)=>{
        if(error['code'] === 6994){
          this['$message']({
            value:'密码错误，请重新输入'
          })
          this.passwordInit();
          this.WeuiToastMessage = false;
        }else{
          this.WeuiToastMessage = false;
        }
        console.log('error:',error)
      })
  }

  // 清空密码
  private emptyPassword(): void {
    this.bingData.password = '';
  }

}
</script>

<style lang="less" scoped>
@import url("../assets/less-css/flexible.less");
.BindJupiter {
  .input-box {
    display: flex;
    flex-direction: column;
    position: relative;
    .lh(57);
    input {
      .m(60);
      .px2rem(margin-left,30);
      .px2rem(margin-right,30);
      .px2rem(margin-bottom,0);
      .p(16);
      .px2rem(padding-left,0);
      .px2rem(padding-right,0);
      .fs(30);
      border: none;
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    input:last-of-type {
      .px2rem(padding-right,40);
    }
    .empty {
      color: #fff;
      background: rgb(199, 199, 199);
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      .w(34);
      .h(34);
      .br(20);
      .r(33);
      .b(18);
      i {
        margin: 0 auto;
        display: inline-block;
        .fs(18);
        transform: scale(0.7);
      }
    }
  }
  .button-box {
    .p(63);
    .px2rem(padding-left,30);
    .px2rem(padding-right,30);
    button {
      width: 100%;
      background: rgb(56, 163, 240);
      border: none;
      .h(88);
      .lh(88);
      .fs(34);
      .br(10);
      color: #fff;
      &:active {
        background: rgb(22, 64, 95);
      }
    }
  }
  .is-binding{
    .px2rem(margin-top,50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fs(30);
    .lh(80);
    border-bottom: 1px solid rgb(233, 233, 233);
    .px2rem(padding-left,30);
    .px2rem(padding-right,30);
    button {
      .w(180);
      background: rgb(56, 163, 240);
      border: none;
      .h(60);
      .fs(26);
      .br(10);
      color: #fff;
      &:active {
        background: rgb(22, 64, 95);
      }
    }
  }
}
</style>
