<template>
  <div class="Associated">
    <NewForm :data="formData"/>
    <ChooseAssociated v-if="associatShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChooseAssociated from '../../../components/ChooseAssociated.vue';

// 声明组件*****************
@Component({
  components: {
      ChooseAssociated,
  }
})
export default class Associated extends Vue {
  // 属性*****************
  private associatShow: boolean = false;
  private formData: Array<any> = [
    {
        name: '小区名称',
        value: '',
        label: '2',
        placeholder: '请选择您所在的小区',
        check_type: 'required',
        enterShow: true,
        enter_method: this.chooseAssociat
    },
    {
        name: '建筑名称',
        value: '',
        placeholder: '请填写建筑名称',
        check_type: 'required'
    },
    {
        box:true,
    },
    {
        name: '单元号',
        value: '',
        placeholder: '请填写单元号',
        check_type: ''
    },
    {
        name: '层数',
        value: '',
        placeholder: '请选择所属楼层',
        check_type: 'required'
    },
    {
        name: '房间号',
        value: '',
        placeholder: '请填写房间号',
        check_type: ''
    },
  ];

  // 方法*****************
    private chooseAssociat(): void {
        console.log(54545)
        this.associatShow = true;
    }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.Associated {
    background: #f2f2f2;
    height: 100%;
}
</style>
