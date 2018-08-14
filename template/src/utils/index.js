import {API_PREFIX} from 'config/index';

// 导出excel
export function exportExcel(params,api){
    window.open(`${API_PREFIX}${api}?${serialGetParams(params)}`);
}

//序列化GET参数
export function serialGetParams(params){
    let data='';
    Object.keys(params).forEach(item=>{
      if (params[item] instanceof Array) {
        params[item].forEach(val=>{
          data=`${data}&${item}[]=${val}`;
        })
      }else{
        data=`${data}&${item}=${params[item]}`;
      }
    })
    return data.substring(1);
}

// 解析带有#{}的内容
export function analysisStr(value, data){
  let obj = false;
  if (typeof value == 'object') {
    obj = true;
    value = JSON.stringify(value);
  }
  if (value.includes("#{")) {
    value = value.replace(/#{(.+?)}/g, function (a, key) {
      // 判断是否是对象
      if (typeof data == 'object') {
        if (data[key]) {
          return data[key];
        } else {
          return "";
        }
      }
      return data;
    });
  }
  if (obj || array) {
    return JSON.parse(value);
  } else {
    return value;
  }
}
