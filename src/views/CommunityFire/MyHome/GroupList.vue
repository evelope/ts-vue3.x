<template>
  <div class="GroupList">
        <p class="group-top-bg">
            <img class="bg" :src="group_bg">
            <span @click="$router.push({path:'/weixin/communityfire/myhome/creategroup',query:routeQuery})">{{groupInfo.name}}<img :src="bianjibai"/></span>
        </p>
        <mt-cell-swipe
        :right="[
        {
            content: '移除',
            style: { background: '#f3544a', color: '#fff', display: 'flex', alignItems: 'center', fontSize:'0.38666667rem', width:'1.23333333rem', justifyContent: 'center'},
            handler: deleteMessage
        }
        ]" v-for="(item,index) in groupListData" :key="index">
        <div class="user-message">
            <p v-if="item.src" style="background:#f2f2f2">
                <img :src="item.src"/>
            </p>
            <p v-else>{{item.type||'成员'}}</p>
            <!-- {{item}} -->
            <p>{{item.name}}</p>
        </div></mt-cell-swipe>
        <div class="set-up" @click="deleteGroup">
            <span>
            解散群组
            </span>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MessageBox } from 'mint-ui';
import { ajaxWechatGroupDelete, ajaxUserInfo } from '@/server';
import bianjibai from '../../../assets/image/bianjibai.png';
// mixins
import MyHomeMixins from '../MixinsFunc/MyHomeMixins'; 
// 声明组件*****************
@Component({
  components: {

  },
  mixins: [MyHomeMixins]
})
export default class GroupList extends Vue {
    // 属性*****************
    private bianjibai: string = bianjibai;
    created ():void {
        
    }
    async mounted () {
        // 如果 有群组 就请求群列表
        if(this.$store.state.user_info.info_user_wechat.wechat_group_id >=0 ){
            let data = await this['getGroupInfo']();
            document.title = this['$getObjectValue'](data,'data.info_wechat_group.name');
            await this['getGroupMembers']();
        }
    }
  
    // 方法*****************
    //移除群员
    private deleteMessage(): void {
        MessageBox.confirm('是否移除该成员?','').then(action => {
            console.log('888')
        }).catch(error=>{
            console.log(error)
        })
    }
    // 解散群组
    private deleteGroup(): void {
        MessageBox.confirm('请确认是否解散群组?解散后组内成员将无法接收相关设备报警以及无法查看设备信息','').then(action => {
            ajaxWechatGroupDelete({
                wechat_group_id: this.$store.state.user_info.info_user_wechat.wechat_group_id,
            }).then( async(res)=>{
                await this['getUserInfo']();
                this['$message']({
                    value: '解散群组成功'
                })
                this.$router.go(-1);
            }).catch(error=>{
                console.log(error)
            })
        }).catch(error=>{
            console.log(error)
        })
    }


    // computed
    get routeQuery(): object {
        return {
            ...this.$route.query,
            type: 'edit'
        }
    }
    
}
</script>

<style lang="less">
@import url("../../../assets/less-css/flexible.less");
.GroupList {
    height: 100%;
    background: #f2f2f2;
    .group-top-bg{
        .h(135);
        position: relative;
        img.bg{
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
        }
        span{
            .lh(160);
            .px2rem(margin-left,20);
            color: #fff;
            .fs(36); 
            position: absolute;
            z-index: 10;
            .px2rem(padding-right,40); 
            img{
                position: absolute;
                right: 0;
                .t(70);
                .w(26);
                .h(26);
            }
        }
    }
    .mint-cell.mint-cell-swipe{
        .h(109);
        .mint-cell-title{
            display: none;
        }
        .mint-cell-value{
            width: 100%;
            height: 100%;
        }
        .mint-cell-wrapper{
            padding: 0;
        }
        .user-message{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            p:first-child{
                .w(80);
                .h(80);
                border-radius: 50%;
                display: block;
                .px2rem(margin-right,20);
                .px2rem(margin-left,20);
                background: #38a1f0;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                .fs(22);
                .lh(80);
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%; 
                }
            }
            p:last-child{
                flex: 1;
                .h(109);
                .lh(109);
            }
        }
    }
    .mint-cell.mint-cell-swipe+.mint-cell.mint-cell-swipe{
        .user-message p{
            border-top: 1px solid #e7e7e7; 
        }
    }
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
