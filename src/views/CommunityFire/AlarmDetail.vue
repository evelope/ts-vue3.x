<template>
  <div class="AlarmDetail">
    <DetailsShow v-for="(item,index) in detailsShowData" :key="index" :data="item"/>
    <div class="set-up" @click="$router.push('/weixin/communityfire/setup')">设置</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class AlarmDetail extends Vue {
    // 属性*****************
    private type: string = 'loading';
    
    private detailsShowData: Array<any> = [
        [
            {
                name: '设备ID',
                value: '8456647',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '设备类型',
                value: '嘀咕嘀咕的风格',
                textAlign: 'right',
                enterShow: true,
            },
            {
                name: '设备分类',
                value: '圣诞氛围人',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '设备型号',
                value: '士大夫啥的',
                textAlign: 'right',
                enterShow: true,
            }
        ],
        [
            {
                name: '安装位置',
                value: '8456647',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '所属楼层',
                value: '嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格嘀咕嘀咕的风格',
                textAlign: 'right',
                enterShow: true,
            },
            {
                name: '设备分类',
                value: '圣诞氛围人',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '设备型号',
                value: '士大夫啥的',
                textAlign: 'right',
                enterShow: true,
            }
        ],
        [
            {
                name: '设备ID',
                value: '8456647',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '设备类型',
                value: '嘀咕嘀咕的风格',
                textAlign: 'right',
                enterShow: true,
            },
            {
                name: '设备分类',
                value: '圣诞氛围人',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '设备型号',
                value: '士大夫啥的',
                textAlign: 'right',
                enterShow: true,
            }
        ],
    ]
    activated ():void {
        document.title = '报警详情';
    }
    // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.AlarmDetail {
    height: 100%;
    background: #f2f2f2;
    .set-up{
        position: fixed;
        width: 100%;
        .b(0);
        .h(88);
        background: #fff;
        border-top: solid 1px #e7e7e7;
        border-bottom: solid 1px #e7e7e7;
        text-align: center;
        .lh(88);
        .fs(36);
        color: #36a3f4;
        .px2rem(margin-top,-0.26666667rem)
    }
}
</style>
