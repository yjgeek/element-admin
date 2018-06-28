export default function (value, data){
  let obj = false;
  let array = false;
  if (isArray(value)) {
    array = true;
  } else if (typeof value == 'object' ){
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
// 判断是否是数组
function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}