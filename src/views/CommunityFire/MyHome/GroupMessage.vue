<template>
  <div v-if="groupShow" class="GroupMessage">
    <p class="group-top-bg">
        <img :src="group_bg">
        <span>{{groupInfo.name}}</span>
    </p>
    <div class="group">
        <DetailsShow :data="groupData" @click.native="$router.push({path:'/weixin/communityfire/myhome/grouplist',query:$route.query})"/>
        <div class="group-list">
            <div v-for="(item,index) in groupListData.slice(0,5)" :key="index">
                <p v-if="item.src" style="background:#f2f2f2">
                    <img :src="item.src"/>
                </p>
                <p v-else>{{item.type||'成员'}}</p>
                <span>{{item.name}}</span>
            </div>
            <div @click="zhezhaoShow=true">
                <p><img :src="invite"/></p>
                <span>邀请</span>
            </div>
        </div>
    </div>
    <div v-if="zhezhaoShow" class="zhezhao" @click="zhezhaoShow=false">
        <img :src="fenxiang"/>
        <button>我知道了</button>
    </div>
    <img :src="fubang" style="display:none"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import fubang from '../../../assets/image/fubang.png';
import fenxiang from '../../../assets/image/fenxiang.png';

// mixins
import MyHomeMixins from '../MixinsFunc/MyHomeMixins'; 
// 声明组件*****************
@Component({
    mixins: [MyHomeMixins]
})
export default class GroupMessage extends Vue {
  // 属性*****************
  private fubang: string = fubang;
  private fenxiang: string = fenxiang;
  private zhezhaoShow: boolean = false;
    
    // props
    @Prop({ default:()=>false }, Object) 
    private groupShow!: boolean
    async mounted () {
        this['invitation']();
        // 如果 有群组 就请求群列表
        if(this.$store.state.user_info.info_user_wechat.wechat_group_id >=0 ){
            await this['getGroupInfo']();
            await this['getGroupMembers']();
            this.$emit("update:groupShow", true);
        }
        
    };
    // 方法*****************
  
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.GroupMessage {
    .group-top-bg{
        .h(135);
        position: relative;
        img{
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
        }
    }
    .group{
        .group-list{
            .px2rem(margin-top, -20);
            width: auto;
            .h(200);
            background: #fff;
            overflow-x: scroll;
			overflow-y: hidden;
			white-space:nowrap;
            display: flex;
            &>div{
                height: 100%;
                .w(120);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .fs(22);
                .px2rem(padding-top,20);
                .px2rem(padding-bottom,20);
                box-sizing: border-box;
                p{
                    .w(80);
                    .h(80);
                    background: #38a1f0;
                    color: #fff;
                    border-radius: 50%;
                    .px2rem(margin-bottom,10); 
                    text-align: center;
                    .lh(80);
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                } 
                span{
                    color: #666666;
                    .nowrap;
                    width: 100%;
                    text-align: center;
                }
            }
            &>div:last-child{
                p{
                    background: #fff;
                }
            }
        }
    }
    .zhezhao{
        position: fixed;
        animation: fadeInUp .5s 1;
        z-index: 100;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .7);
        img{
            position: absolute;
            right: 0;
            transform: scaleX(.8);
            transform-origin: 100% 0;
            .w(500);
        }
        button{
            border: 1px solid #fff;
            .br(5);
            background: transparent;
            width: 60%;
            .h(80);
            .lh(80);
            .fs(30);
            color: #fff;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            .b(500)
        }
    }
}
</style>
