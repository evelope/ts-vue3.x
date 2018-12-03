<template>
  <div class="UserDetail">
    <DetailsShow v-for="(item,index) in detailsShowData" :key="index" :data="item"/>
    <div class="set-up" @click="$router.push({path:'/weixin/communityfire/myhome/addusermessage',query:routeQuery})">
        <img :src="bianji"/>
        <span>
        编辑
        </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import bianji from '../../../assets/image/bianji.png';
import { ajaxUserInfo } from '@/server';
// 声明组件*****************
@Component({
  components: {

  }
})
export default class UserDetail extends Vue {
  // 属性*****************
    private type: string = 'loading';
    private bianji: string = bianji;
    private detailsShowData: Array<any> = [
        [
            {
                name: '业主姓名',
                value: '',
                textAlign: 'right',
                enterShow: false,
            },
            {
                name: '联系电话',
                value: '',
                textAlign: 'right',
                enterShow: false,
            },
        ]
    ]

    activated ():void {
        document.title = '用户详情';
    }
    mounted ():void {
        ajaxUserInfo({
            open_id: this['$route']['query']['open_id'],
            role_status: 0,
        }).then((res: object) => {
            const { account, name } = res['data']['info_user'];
            this.detailsShowData[0][0].value = name;
            this.detailsShowData[0][1].value = account;
        }).catch((error: object) => {
            console.log(error)
        })
    }
    // 方法*****************



    // computed
    get routeQuery(): object {
        return {
            ...this.$route.query,
            type: 'edit'
        }
    }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.UserDetail {
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
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            .w(30);
            .h(30);
            .px2rem(margin-right,10);
        }
    }
}
</style>
