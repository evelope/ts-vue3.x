import axios from 'axios';
import Vue from './main';
// import {axios_before_data} from './assets/js/yuanzifengzhang.js';
// CancelToken 取消ajax
// 全局的配置的默认值/defaults
const axiosConfig = () => {
    // axios.defaults.baseURL = '/wechat';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.timeout = 60000;
};
axiosConfig();
axios.interceptors.request.use((config: any): any => {
    const url: string = '?' + location.href.split('?')[1]; // 获取url中"?"符后的字串
    const theRequest: any = new Object();
    if (url.indexOf('?') !== -1) {
        const str: string = url.substr(1);
        const strs: any = str.split('&');
        for (const item of strs) {
            theRequest[item.split('=')[0]] = unescape(item.split('=')[1]);
        }
    }
    config.params = {
        open_id: theRequest.open_id,
        view_type: 'h5',
        ...config.params,
    };
    // if (config.method === 'post' || config.method === 'put') {
    //     config.data = {
    //         open_id: location.href.match(/open_id=(\S*)&/) ? (location as any).href.match(/open_id=(\S*)&/)[1] : '',
    //         ...config.data,
    //     };
    // }
    return config;
});
/*** 在数据请求回来之后的公共判断 */
const ajaxAftet = (result: any) => {
    return new Promise((resolve, reject) => {
        if (result.status === 200) {
            if (result.data.code === 0) {
                resolve(result.data);
            } else {
                // (Vue as any).$message({
                //     value: result.data.msg,
                // });
                reject(result.data);
            }
        } else {
            console.log('网络错误');
            (Vue as any).$message({
                value: result.data.msg,
            });
            reject(result.data);
        }
    });
};
/****
 * get 请求   用于请求列表，请求详情
 */
export const ajaxGet = (url: string, data: object) => {
    return axios.get(url, {
        params: data,
    }).then((result: object) => ajaxAftet(result));
};
/****
 * post 请求   用于新增
 */
export const ajaxPost = (url: string, data: object) => {
    return axios.request({
        url,
        method: 'post',
        data,
    }).then((result: object) => ajaxAftet(result));
};
/****
 * put 请求   用于新增
 */
export const ajaxPut = (url: string, data: object) => {
    return axios.request({
        url,
        method: 'put',
        data,
    }).then((result: object) => ajaxAftet(result));
};
/**
 * delete 请求   用于删除
 */
export const ajaxDelete = (url: string, data: object) => {
    return axios.request({
        url,
        method: 'delete',
        params: data,
    }).then((result: object) => ajaxAftet(result));
};

// 绑定报警****************
/** 检测是否已绑定账号 */
export const ajaxUserCheckWechatUser = (data: object) => ajaxGet('/api/api_proxy/user/check_wechat_user/', data);

/** 绑定账号 */
export const ajaxUserBindWechatUser = (data: object) => ajaxPost('/api/api_proxy/user/bind_wechat_user/', data);

/** 解绑账号 */
export const ajaxUserUnBindWechatUser = (data: object) => ajaxDelete('/api/api_proxy/user/bind_wechat_user/', data);

/** 报警查询列表 */
export const ajaxEventWechatEventList = (data: object) => ajaxGet('/api/api_proxy/event/wechat_event_list/', data);





// 社区模块****************

// 个人信息 **
// 验证账号是否存在
export const ajaxHasCompany = (data: object) => ajaxGet('/api/api_proxy/user/check_account/', data);

/** 微信社区 用户注册 */
export const ajaxUserWechatRegister = (data: object) => ajaxPost('/api/api_proxy/user/wechat_register/', data);

/** 微信社区 用户修改 */
export const ajaxPutUserInfo = (data: object) => ajaxPut('/wechat/fe/api_proxy/user/info/', data);

/** 微信社区 用户信息查询 */
export const ajaxUserInfo = (data: object) => ajaxGet('/wechat/fe/api_proxy/user/info_by_open_id/', data);

/** 微信社区 删除与业主的关联 */
export const ajaxDeleteUser= (data: object) => ajaxPost('/wechat/fe/api_proxy/wechat/cancel_relation/', data);



// 群组 **
/** 微信社区 新建群组 */
export const ajaxWechatGroup = (data: object) => ajaxPost('/wechat/fe/api_proxy/wechat/group/info/', data);

/** 微信社区 群组详情 */
export const ajaxWechatGroupInfo = (data: object) => ajaxGet('/wechat/fe/api_proxy/wechat/group/info/', data);

/** 微信社区 群组删除 */
export const ajaxWechatGroupDelete = (data: object) => ajaxDelete('/wechat/fe/api_proxy/wechat/group/info/', data);

/** 微信社区 群组编辑 */
export const ajaxWechatGroupPut = (data: object) => ajaxPut('/wechat/fe/api_proxy/wechat/group/info/', data);

/** 微信社区 群组成员 */
export const ajaxWechatGroupMembers = (data: object) => ajaxGet('/wechat/fe/api_proxy/wechat/group/members/', data);






// 物联网平台 **
/** 微信社区 小区列表 */
export const ajaxSubdistrictList = (data: object) => ajaxPost('/wechat/fe/api_proxy/subdistrict/list/', data);









// 报警历史 **
/** 报警历史 报警列表 */
export const ajaxEventList = (data: object) => ajaxGet('/wechat/fe/api_proxy/event/household_event_list/', data);

/** 报警历史 报警详情 */
export const ajaxEventInfo = (data: object) => ajaxGet('/wechat/fe/api_proxy/event/info_by_uuid/', data);





// 设备 **
/** 设备列表 */
export const ajaxDeviceList = (data: object) => ajaxGet('/wechat/app/api/device_list/', data);

/** 设备详情 */
export const ajaxDeviceInfo = (data: object) => ajaxGet('/wechat/fe/api_proxy/device/info/', data);

/** 摄像头详情 */
export const ajaxDeviceVideoInfo = (data: object) => ajaxGet('/api/api_proxy/device/device_video_by_monitor/', data);

/** 设备下 小部件列表 */
export const ajaxComponentListByDtu = (data: object) => ajaxGet('/api/api_proxy/device/component_list_by_dtu_id/', data);

