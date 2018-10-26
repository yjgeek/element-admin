import { Message } from "element-ui";
import { API_PREFIX } from "config/index";

export function requestSuccessFunc(requestObj) {
  requestObj.url = API_PREFIX + requestObj.url
  return requestObj;
}
//请求错误 比如断网
export function requestFailFunc(requestError) {
  return Promise.reject(requestError);
}

//响应成功
export function responseSuccessFunc(responseObj) {
  let { data } = responseObj;
  let code = data.code;
  switch (code) {
    case 200:
      return data.data;
    case 401:
      Message.error("请登录!");
      window.location.href = `${window.location.origin}/#/login`;
      return Promise.reject(data);
    default:
      let status = responseObj.config._code; //特殊code需要下发到业务方,就不用弹框提示
      if (responseObj.config.data) { //处理post请求方式的参数
        let data = JSON.parse(responseObj.config.data);
        status = data._code;
      }
      if (status && status instanceof Array) {
        if (status.includes(code)) {
          return Promise.reject(data);
        }
      }
      Message.error(data.message);
      return Promise.reject(data);
  }
}

//响应错误
export function responseFailFunc(responseError) {
  Message.error("服务器出错，请联系管理员!");
  return Promise.reject(responseError);
}