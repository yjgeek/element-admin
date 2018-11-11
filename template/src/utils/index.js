import { isArray, isObject } from 'lodash'

// 解析带有#{}的内容
export function analysisParams (value, data) {
  let isJson = false
  if (isArray(value) || isObject(value)) {
    isJson = true
    value = JSON.stringify(value)
  }
  if (value.includes('#{')) {
    value = value.replace(/#{(.+?)}/g, function (a, key) {
      // 判断是否是对象
      if (isObject(data)) {
        if (Reflect.has(data, key)) {
          return Reflect.get(data, key)
        }
        return ''
      }
      return data
    })
  }
  if (isJson) {
    return JSON.parse(value)
  } else {
    return value
  }
}
