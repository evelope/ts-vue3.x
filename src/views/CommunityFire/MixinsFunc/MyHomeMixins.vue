<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ajaxWechatGroupInfo, ajaxWechatGroupMembers, ajaxUserInfo } from '@/server';
import group_bg from '../../../assets/image/group_bg.png';
import invite from '../../../assets/image/invite.png';
import fubang from '../../../assets/image/fubang.png';
import fenxiang from '../../../assets/image/fenxiang.png';

// 声明组件*****************
@Component
export default class GroupMessage extends Vue {
  // 属性*****************
    private wx: any = (window as any).wx;
    private group_bg: string = group_bg;
    private invite: string = invite;
    private wxParams: Object = { 
        title: '富邦智慧消防', // 分享标题
        desc: '富邦智慧消防服务号', // 分享描述
        link: 'http://wx.fubangyun.cn/#/weixin/communityfire/myhome/erweima', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://wx.fubangyun.cn/img/fubang.772fea40.png', // 分享图标
        success() {
            console.log('ok')
            // 设置成功
        }
    };

    private groupInfo: Object = {
        wechat_group_id: '',
        name: '',
    };

    private groupListData: Array<any> = [];
    private groupData: Array<any> = [
        {
            name: '群成员',
            value: '0人',
            nameStyle:{
                color: '#333333'
            },
            valueStyle:{
                color: '#999999'
            },
            style:{
                marginBottom: '0'
            },
            textAlign: 'right',
            enterShow: true,
        },  
    ];
    
    // 方法*****************
    // 微信分享
    private invitation():void{
        this.wx.ready(()=> {   // 需在用户可能点击分享按钮前就先调用
            if(this.wx.onMenuShareAppMessage){ //微信文档中提到这两个接口即将弃用，故判断
                this.wx.onMenuShareAppMessage(this.wxParams);//1.0 分享到朋友
                this.wx.onMenuShareTimeline(this.wxParams);//1.0分享到朋友圈
            }else{
                this.wx.updateAppMessageShareData(this.wxParams);//1.4 分享到朋友
                this.wx.updateTimelineShareData(this.wxParams);//1.4分享到朋友圈
            }
        });
    };
    // 获取用户信息并存储 VUEX
    private getUserInfo(): void {
        return ajaxUserInfo({
            open_id: this['$route']['query']['open_id'],
            role_status: 0,
        }).then((res: object) => {
            console.log('vuex',res);
            this.$store.commit('save_user_info',res['data']);
            return res['code'];
        }).catch((error: object) => {
            // this.$router.push({path:'/weixin/communityfire/myhome/addusermessage',query:this.$route['query']})
            console.log(error);
            return error['code'];
        })
    }
    // 获取群组详情
    private getGroupInfo():void{
        return ajaxWechatGroupInfo({
            wechat_group_id: this.$store.state.user_info.info_user_wechat.wechat_group_id
        }).then(res=>{
            for(let key in this.groupInfo){
                this.groupInfo[key] = this['$getObjectValue'](res.data,(res.ui[0].data.find(x=>x.fb_id == key)||{}).jpath||'');
            }
            return res
        }).catch(error=>{
            console.log(error)
        })
    };
    // 获取群组成员
    private getGroupMembers():void{
        return ajaxWechatGroupMembers({
            wechat_group_id: this.$store.state.user_info.info_user_wechat.wechat_group_id,
            page_no: 0,
            page_size: 5
        }).then(res=>{
            if(res.data.list.length){
                this.groupListData = res.data.list.map(item=>({
                    id: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'open_id')||{}).jpath||''),
                    name: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'nick_name')||{}).jpath||''),
                    src: this['$getObjectValue'](item,(res.ui[0].data.find(x=>x.fb_id == 'head_img_url')||{}).jpath||''),
                }));
                this.groupData[0].value = res.data.total + '人';
            }
        }).catch(error=>{
            console.log(error)
        })
    };
  
}
</script>
