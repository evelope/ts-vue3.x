// 截取url 信息 转换为对象
// export const GetRequest = () => {
//     const url: string = '?' + location.href.split('?')[1]; // 获取url中"?"符后的字串
//     const theRequest: any = new Object();
//     if (url.indexOf('?') !== -1) {
//         const str: string = url.substr(1);
//         const strs: any = str.split('&');
//         for (const item of strs) {
//             theRequest[item.split('=')[0]] = unescape(item.split('=')[1]);
//         }
//     }
//     return theRequest;
// };

import axios from 'axios';
import Vue from 'vue';


// 获取签名 APPid 等
export const GetRequest = (): any => {
    const ajaxGetScan = axios.create({
        baseURL: '',
        timeout: 60000,
        headers: { 'X-Custom-Header': 'foobar' },
    });
    return ajaxGetScan.get('http://wx.fubangyun.cn/scan', {
        params: { url: location.href.split('#')[0] },
    }).then((res: any) => {
        const { appid: appId, noncestr: nonceStr, sig: signature, timestamp } = res.data.data;
        return {
            appId,
            nonceStr,
            signature,
            timestamp,
        };
    });
};

/*******
 * 判断类型
 */
export const typeOf = (obj: any) => {
    const toString: any = Object.prototype.toString;
    const map: any = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
};

// 获取对象的值
export const getObjectValue = (obj: any, text: string) => {
    try {
        if ((typeOf(obj) === 'object' || typeOf(obj) === 'array') && text) {
            const textArrays = text.split('.');
            const getValue = (tempObj: any, textArray: string[]): any => {
                let key: any = textArray.shift();
                if (key.length < 5 && parseInt(key)) {
                    key = parseInt(key);
                }
                if (typeof tempObj[key] === 'undefined' || tempObj[key] == null) {
                    return '';
                }
                if (textArray.length === 0) {
                    return tempObj[key];
                }
                tempObj = tempObj[key];
                return getValue(tempObj, textArray);
            }
            return getValue(obj, textArrays);
        }
        return '';
    } catch (error) {
        // debugger
        console.log(error);
    }
};

// 设置对象的值
export const setObjectValue = (obj: any, text: string, value: any) => {
    try {
        if (text === '') {
            return obj;
        }
        const textArrays = text.split('.');
        const setValue = (tempObj: any, textArray: any): any => {
            const key = textArray.shift();
            if (!tempObj[key]) {
                tempObj[key] = {};
            }
            if (textArray.length === 0) {
                tempObj[key] = value;
                return obj;
            }
            return setValue(tempObj[key], textArray);
        }
        return setValue(obj, textArrays);
    } catch (error) {
        console.log(error);
    }
};

// 数据填充
export const postDataInit = (list: any): object => {
    const obj: any = {};
    if (list.length) {
        list.forEach((x: any) => {
            setObjectValue(obj, x.jpath, x.value);
        });
    }
    return obj;
};


// form 表单 数据填充
export const getDataInit = (list: any, result: object): void => {
    list.forEach((item: any)=>{
        item.forEach((x: any)=>{
            x.value = getObjectValue(result, x.jpath)||'--';
        });
    })
};

export const getBuild_unit_room_num = (looper_num: any, component_num: any) => {
    let obj: any = {};
    obj.room_num = component_num;
    let looper_num10 = parseInt(looper_num).toString(16);
    looper_num10 = looper_num10.length == 3 ? '0' + looper_num10 : looper_num10;
    obj.unit_num = parseInt(looper_num10.substring(0, 2), 16);
    obj.building_num = parseInt(looper_num10.substring(2, 4), 16);
    return obj;
};


Vue.prototype.$getObjectValue = getObjectValue;
Vue.prototype.$setObjectValue = setObjectValue;
Vue.prototype.$postDataInit = postDataInit;
Vue.prototype.$getBuild_unit_room_num = getBuild_unit_room_num;
Vue.prototype.$getDataInit = getDataInit;
