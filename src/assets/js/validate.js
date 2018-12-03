import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
const config = {
  locale: 'zh_CN',
  // events:'input',
};
Vue.use(VeeValidate, config);
//身份证
function IdentityCodeValid(code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var tip = "";
  var pass = true;
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  // if (!pass) console.log(tip);
  return pass;
}
//自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => "请填写完整",
      max: (field, num) => "不能大于" + num + "个字符",
      min: (field, num) => "不能小于" + num + "个字符",
      in: () => "请选择正确值",
      numeric: () => "该选项必须为数字"
    },
    attributes: {
      email: '邮箱',
      before: '日期',
      password: '密码',
      name: '账号',
      phone: '手机'
    }
  }
};
Validator.localize(dictionary);

Validator.extend('smscode', {
  getMessage: field => '请输入正确格式的验证码',
  validate: value => {
    return ((value.length == 6) && /^[0-9]*$/.test(value));
  }
});
Validator.extend('mobilephone', {
  getMessage: field => '请输入正确的手机号码',
  validate: value => {
    return (value.length == 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value));
  }
});









Validator.extend('fbphone', {
  getMessage: field => '请输入正确的电话号码',
  validate: value => {
    return (/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)) || (/^0\d{2,3}-?\d{7,8}$/.test(value));
  }
});
Validator.extend('liuliangka', {
  // getMessage: field => '请输入正确的SIM卡号',
  // validate: value => {
  //   return (/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)||/^((1)\d{12})$/.test(value)||(/^[a-zA-Z0-9]{20}$/.test(value)));
  // }
  getMessage: () => '请输入30位以内的字母数字或组合',
  validate: value => {
    return (/^[a-zA-Z0-9]{1,30}$/.test(value));
  }
});

/** 限制最大数值 */
Validator.extend('maxnumber', {
  getMessage: (field,params,data) =>{
    return data;
  },
  validate: (value,num) => {
    return new Promise(resolve=>{
      let _float_result=true;
      let _message=''
      if(isNaN(Number(value))){
        _float_result=false;
        _message='请输入数字';
      }
      else{ 
          _float_result= (Number(value)<=Number(num[0]))
          _message='限制取值范围为:'+ num[0]+'~'+num[1]
      }
      resolve({
        valid:_float_result,
        data:_message
      })
    })
    // return /^-?\d+\.\d{0,2}$/.test(value)||/^-?\d+$/.test(value);
  }
});
/** 限制最小数值 */
Validator.extend('minnumber', {
  getMessage: (field,params,data) =>{
    return data;
  } ,
  validate: (value,num) => {
    return new Promise(resolve=>{
      let _float_result=true;
      let _message=''
      if(isNaN(Number(value))){
        _float_result=false;
        _message='请输入数字';
      }
      else{ 
          _float_result= Number(value)>=Number(num[0])
          _message='限制最小数值为:'+num[0]
      }
      resolve({
        valid:_float_result,
        data:_message
      })
    })
    // return /^-?\d+\.\d{0,2}$/.test(value)||/^-?\d+$/.test(value);
  }
});

/** 限制在某一个数值范围 */
Validator.extend('minmaxnumber', {
  getMessage: (field,params,data) =>{
    return data;
  },
  validate: (value,num) => {
    return new Promise(resolve=>{
      let _float_result=true;
      let _message=''
      if(isNaN(Number(value))){
        _float_result=false;
        _message='请输入数字';
      }
      else{ 
          _float_result= (Number(value)>=Number(num[0])&&Number(value)<=Number(num[1]))
          _message='限制取值范围为:'+ num[0]+'~'+num[1]
      }
      resolve({
        valid:_float_result,
        data:_message
      })
    })
    // return /^-?\d+\.\d{0,2}$/.test(value)||/^-?\d+$/.test(value);
  }
});


Validator.extend('fixedphone', {
  getMessage: field => '请输入正确的固定号码',
  validate: value => {
    let aa=new RegExp("^(0[0-9]{2,3}/-)?([2-9][0-9]{6,7})+(/-[0-9]{1,4})?$")
    return /^0\d{2,3}-?\d{7,8}$/.test(value);
  }
});
Validator.extend('fixed_mobile_phone', {
  getMessage: field => '请输入正确的固定号码或电话号码',
  validate: value => {
    return (/^0\d{2,3}-?\d{7,8}$/.test(value)) || (value.length == 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)) || (/^0\d{2,3}-?\d{7,8}$/.test(value));
  }
});

Validator.extend('required_username', {
  getMessage:  () => '账号不能为空',
  validate: value => {
  }
});
Validator.extend('password', {
  getMessage: () => '密码为6-20位，字母、数字或符号的组合',
  validate: value => {
    return /^[0-9a-zA-Z.!@#$^]{6,20}$/.test(value)||value=='********'
  }
});
Validator.extend('jingdu', {
  getMessage: () => '经度范围为0-180',
  validate: value => {
    let val = parseFloat(value);
    return val <= 180 && val >= 0
  }
})
Validator.extend('weidu', {
  getMessage: () => '纬度范围为0-90',
  validate: value => {
    let val = parseFloat(value);
    return val <= 90 && val >= 0
  }
})
Validator.extend('postcode', {
  getMessage: () => '请输入正确的邮政编码',
  validate: value => {
    let val = parseFloat(value);
    return /^[0-9]{6}$/.test(value);
  }
})
Validator.extend('idcard', {
  getMessage: () => '请输入合法的身份证号码',
  validate: value => {
    let val = IdentityCodeValid(value);
    return val;
  }
})
Validator.extend('companycode', {
  getMessage: () => '请输入合法的组织机构代码',
  validate: value => {
    return /^[a-zA-Z0-9\-]{1,18}$/.test(value);
    // return (/^\d{8}-\d{1}$/.test(value)||/^[0-9a-zA-Z]{18}$/.test(value));
  }
})
Validator.extend('float',{
  getMessage: (field,params,data) =>{
    return data;
  } ,
  validate: value => {
    return new Promise(resolve=>{
      let _float_result=true;
      let _message=''
      if(isNaN(Number(value))){
        _float_result=false;
        _message='请输入数字';
      }
      else{
        let a=value.toString().split('.');
        if(typeof(a[1])!='undefined'){
          if(a[1]==''){
            _float_result=false;
            _message='请输入正确的小数';
          }
          if(a[1].length>2){
            _float_result=false;
            _message='小数位数不能超过2位';
          }
        }
      }
      resolve({
        valid:_float_result,
        data:_message
      })
    })
    // return /^-?\d+\.\d{0,2}$/.test(value)||/^-?\d+$/.test(value);
  }
});

Validator.extend('float1',{
  getMessage: (field,params,data) =>{
    return data;
  } ,
  validate: value => {
    return new Promise(resolve=>{
      let _float_result=true;
      let _message=''
      if(isNaN(Number(value))){
        _float_result=false;
        _message='请输入数字';
      }
      else{
        let a=value.toString().split('.');
        if(typeof(a[1])!='undefined'){
          if(a[1]==''){
            _float_result=false;
            _message='请输入正确的小数';
          }
          if(a[1].length>1){
            _float_result=false;
            _message='小数位数不能超过1位';
          }
        }
      }
      resolve({
        valid:_float_result,
        data:_message
      })
    })
    // return /^-?\d+\.\d{0,2}$/.test(value)||/^-?\d+$/.test(value);
  }
})

Validator.extend('floatthree', {
  getMessage: () => '请输入3位及以下数字',
  validate: value => {
    return ((value.length <= 3) && /^[0-9]*$/.test(value));
  }
})

Validator.extend('devicecode', {
  getMessage: () => '请输入30位以内的字母数字或组合',
  validate: value => {
    return (/^[a-zA-Z0-9]{1,30}$/.test(value));
  }
})

Validator.extend('macaddress', {
  getMessage: () => '请输入正确的主机地址(例:0A-0B-0C-0D-0E-0F)',
  validate: value => {
    return (/^[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}$/.test(value));
  }
})