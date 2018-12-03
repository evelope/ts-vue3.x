<template>
  <div class="AddCamera">
    <NewForm :data="formData"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class AddCamera extends Vue {
  // 属性*****************
  private type: string = 'loading';
  private formData: Array<any> = [
    {
        name: '账号',
        value: '',
        placeholder: '请填写账号',
    },
    {
        name: '密码',
        value: '',
        placeholder: '请填写密码',
    },
    {
        name: 'IP地址',
        value: '',
        placeholder: '请填写IP地址',
    },
    {
        name: '安装位置',
        value: '',
        placeholder: '请填写安装位置',
    }
  ];
    activated ():void {
        document.title = '添加摄像头';
    }
  // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.AddCamera {
  background: #f2f2f2;
  height: 100%;
}
</style>
