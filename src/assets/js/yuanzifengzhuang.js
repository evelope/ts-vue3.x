// import Base64 from 'js-base64'
import md5 from './md5.js'
import Vuex from 'vuex'
console.log(Vuex,"88888");
export const axios_before_data=(type,data)=>{
    if (typeof data === 'undefined') {
        data = {};
    }
    else if(typeof data.sign!='undefined'){
        delete data.sign;
    }
    let obj = {
        uid: '',
        view_type: 'web',
        cc: 'G1000',
        cv: 'FB2.1.1.00_W1.0',
        ua: 'WebKit',
        sign_time: '1520931947',
        sign_random: 'Y2zX0ZNi',
        imei: '1520931947',
        imsi: '222222222',
        // sign_keys: '',
        // sign: ''
    }
    let temp_obj = {
        uid: '',
        cv: 'FB2.1.1.00_W1.0',
        sign_time: '1520931947',
        sign_random: 'Y2zX0ZNi',
    }

    temp_obj.uid = Vuex.state.user_info.uid || '';
    temp_obj.sign_time = Math.ceil((new Date()).getTime() * 1000 / (1000 * 1000));
    temp_obj.sign_random = Math.ceil(Math.random() * 10000000);
    // obj.sign_keys = Base64.Base64.toBase64(`, uid cv sign_time sign_random`);

    let md5_before = `&uid=${temp_obj.uid}&cv=${temp_obj.cv}&sign_time=${temp_obj.sign_time}&sign_random=${temp_obj.sign_random}`;

    // obj.sign = md5.md5_32(`method=${type}sign_key=Fubang.119*(${md5_before}`);

    for (let index in temp_obj) {
        obj[index] = temp_obj[index];
    }
    if (Vue.$i18n.locale == 'en-US') {
        obj['lang'] = 'eng';
    }
    if (type === 'get' || type === 'delete') {
        for (let index in data) {
            if (data[index] === '') {
                delete data[index];
            }
        }
        for (let index in obj) {
            data[index] = obj[index];
        }

        let href='';
        for(let index in data){
            href+='&'+index+'='+encodeURIComponent(data[index]);
        }

        // console.log(`method=${type}&sign_key=Fubang.119*(${href}`);


        data.sign = md5.md5_32(`method=${type}&sign_key=Fubang.119*(${href}`);

        return data;
    } else {
        let href='';
        for(let index in obj){
            href+='&'+index+'='+obj[index];
        }
        obj.sign=md5.md5_32(`method=${type}&sign_key=Fubang.119*(${href}`);
        return {
            params: obj,
            data: data,
        }
    }

}