const crypto_js=require('crypto-js');

const CryptoJSAES = crypto_js.AES; 
const encutf8=crypto_js.enc.Utf8;

const miyao = 'PmsEK1XZdmsILoqe';
/* 储存localStorage */
 const setStore = (name, value) => {
  if (!name) {
    return false;
  }
  if (typeof value !== 'string') {
     value = JSON.stringify(value);
  }
  // window.localStorage.setItem(name, value);

  //加密
  let string_value = CryptoJSAES.encrypt(value, miyao);
  window.localStorage.setItem(name, string_value);
}
/*
获取指定的localstorage */
 const getStore = (name) => {
  if (!name) return false;
  try {
    if (window.localStorage.getItem(name) && window.localStorage.getItem(name).length > 1) {
      let return_string = CryptoJSAES.decrypt(window.localStorage.getItem(name), miyao);
      return_string=return_string.toString(encutf8);
      try {
        return JSON.parse(return_string);
      } catch (error) {
        return return_string;
      }
      //解密
    }
  } catch (error) {
    console.log(error);
  }

  return false;

}

/* 删除指定的localStorage */
 const removeStore = (name) => {
  if (!name || !window.localStorage.getItem(name)) return false;
  window.localStorage.removeItem(name);
}

export default {
    setStore,
    getStore,
    removeStore
}
