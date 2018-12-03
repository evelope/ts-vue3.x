<template>
  <div class="SetUp">
    <ul>
        <li>
            <p class="name">报警屏蔽时间</p>
            <p class="value" @click="popupVisible=!popupVisible">{{alarmDate[0]+'-'+alarmDate[1]}}</p>
            <img :src="enter_into"/>
        </li>
        <li>安装门磁设备后，门打开时将会收到报警信息，门关闭后报警恢复。为减少误报，可屏蔽日常进出时间段的报警。</li>
    </ul>
    <ul>
        <li>
            <p class="name">是否同步至物联网平台</p>
            <mt-switch v-model="value" color="#ff0000"></mt-switch>
        </li>
        <li>系统默认门磁信息不同步至物联网平台，如您选择同步，小区物业将会收到您门磁的报警信息，如无特殊情况，请不要选择同步。</li>
    </ul>

    <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import enter_into from '../../assets/image/enter_into.png';
// 声明组件*****************
@Component({
  components: {

  }
})
export default class SetUp extends Vue {
  // 属性*****************
  private enter_into: string = enter_into;
  private value: boolean = true;
  private popupVisible: boolean = false;
  private alarmDate: Array<string> = [];
  private slots: Array<any> = [
        {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
        }, {
            divider: true,
            content: '-',
            className: 'slot2'
        }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
        }
    ]
    created ():void {
        document.title = '设置';
    }
  // 方法*****************
   private onValuesChange(vue: Object,data: Array<string>): void{
       this.alarmDate = data;
   }
}
</script>

<style lang="less">
@import url("../../assets/less-css/flexible.less");
.SetUp {
    height: 100%;
    background: #f2f2f2;
    .mint-switch-input:checked + .mint-switch-core{
        border-color: #4cd964;
        background-color: #4cd964;
    }
    ul{
        background: #fff;
        .px2rem(padding-left,20);
        .px2rem(margin-bottom,20);
        &>li{
            .px2rem(padding-right,20);
        }
        &>li:first-child{
            position: relative;
            border-bottom: 1px solid #e7e7e7; 
            .h(82);
            .lh(82);
            .fs(28);
            color: #999999;
            display: flex;
            justify-content: space-between;
            .name{
                color: #333333;
            }
            .value{
                text-align: right;
                .px2rem(padding-right,20); 
            }
            img{
                position: absolute;
                right: 0;
                .w(12);
                top: 50%;
                transform: translateY(-50%);
                .r(20);
            }
        }
        &>li:last-child{
            .fs(20);
            .lh(36);
            color: #aaaaaa;
            .p(10);
            padding-left:0;
            padding-right:0; 
        }
    }
    .mint-popup.mint-popup-bottom{
        width: 100%;
    }
}
</style>
