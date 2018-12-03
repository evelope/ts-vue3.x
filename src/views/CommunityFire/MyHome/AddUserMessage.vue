<template>
  <div class="AddUserMessage">
    <NewForm :data="formData" @submit="submit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ajaxHasCompany, ajaxUserWechatRegister, ajaxPutUserInfo, ajaxUserInfo } from "@/server";
import axios from "axios";

// mixins
import MyHomeMixins from '../MixinsFunc/MyHomeMixins'; 
// 声明组件*****************
@Component({
  components: {},
  mixins: [MyHomeMixins],
})
export default class AddUserMessage extends Vue {
  // 属性*****************
  // private type: string = 'loading';
  private formData: Array<any> = [
    {
      id: "name",
      name: "业主姓名",
      value: "",
      placeholder: "请填写业主姓名",
      check_type: "required",
      jpath: "info_user.name"
    },
    {
      id: "mobile",
      name: "联系电话",
      value: "",
      inputType: "number",
      placeholder: "请填写联系电话",
      check_type: "required|mobilephone",
      right_button: "获取验证码",
      button_method: this.getSms,
      button_disabled: false,
      jpath: "info_user.mobile"
    },
    {
      id: "sms_code",
      name: "短信验证",
      value: "",
      inputType: "number",
      placeholder: "请填写短信验证码",
      check_type: "required|smscode",
      jpath: "verify_code.sms_code"
    }
  ];

  created () {
    if(this.$route.query.type === 'edit'){
      document.title = '编辑个人信息';
      this.formData = this.formData.filter(x=>x.id === 'name');
    }else{
      document.title = '添加个人信息';
    }
  }
  mounted () {
    if(this.$route.query.type === 'edit'){
      ajaxUserInfo({
        open_id: this['$route']['query']['open_id'],
        role_status: 0,
      }).then((res: object) => {
        const { name } = res['data']['info_user'];
        this.formData[0].value = name;
      }).catch((error: object) => {
        console.log(error)
      })
      
    }
  }
  // 方法*****************
  // 提交信息
  private submit(data): void {
    let obj = this["$postDataInit"](data);
    this["$setObjectValue"](obj, "info_user.user_id", this.$store.state.user_info.info_user.user_id);
    this["$setObjectValue"](obj, "info_user.account", this.$store.state.user_info.info_user.account);
    if(this.$route.query.type === 'edit'){
      ajaxPutUserInfo(obj).then( async(res)=>{
        await this['getUserInfo']();
        this["$message"]({
          value: "个人信息修改成功"
        });
        this.$router.go(-1);
        console.log(res);
      }).catch(error=>{
        console.log(error)
      })
    }else{
      this["$setObjectValue"](
        obj,
        "verify_code.mobile",
        this.formData.find(x => x.id === "mobile").value
      );
      this["$setObjectValue"](
        obj,
        "info_user_wechat.open_id",
        this['$route']['query']['open_id']
      );
      ajaxUserWechatRegister(obj).then( async(res) => {
        await this['getUserInfo']();
        this["$message"]({
          value: "个人信息添加成功"
        });
        this.$router.push({
          path:'/weixin/communityfire/personalinfo',
          query: {
            open_id: this.$route['query']['open_id']
          }
        });
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  // 发送验证码
  private async getSms() {
    const phone = this.formData.find(x => x.id === "mobile") || {};
    if (phone.value.length == 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(phone.value)) {
    let result = await this.hasCompany(phone);
    if (result.data.is_ok == 1) {
        phone.button_disabled = true;
        let sendSms = axios.create({
          baseURL: "",
          timeout: 6000,
          headers: { "X-Custom-Header": "foobar" }
        });
        sendSms.get("/send/sms_send", {
            params: {
              mobile: phone.value
            }
          }).then(res => {
            if (res.data.code == 1) {
              this["$message"]({
                value: res.data.data
              });
            } else {
              this["$message"]({
                value: "验证码已发送"
              });
              let timer = 60;
              let id = setInterval(() => {
                --timer;
                phone.right_button = timer + "秒后重新发送";
                if (timer <= 0) {
                  phone.right_button = "重新发送";
                  phone.button_disabled = false;
                  clearInterval(id);
                }
              }, 1000);
            }
          }).catch(error => {
            phone.button_disabled = false;
            console.log(error);
            this["$message"]({
              value: error
            });
          });
      } else {
        this["$message"]({
          value: "该账号已存在"
        });
      }
    } else {
      this["$message"]({
        value: "请输入正确的手机号码"
      });
    }
  }
  // 验证手机号码是否已被注册
  private hasCompany(phone: object): any {
    return ajaxHasCompany({
      account: phone["value"]
    }).then((res: object) => {
      return res;
    }).catch((error: object) => {
      console.log(error);
    });
  }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.AddUserMessage {
  background: #f2f2f2;
  height: 100%;
}
</style>
