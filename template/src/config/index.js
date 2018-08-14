import menu from "./menu";

// 网站标题
export const TITLE = "后台管理系统"

//Api 图片接口的前缀
let apiPrefix = 'http://0.0.0.0:8008/api' //线上APi接口
if (process.env.NODE_ENV=='development') {
  apiPrefix = 'http://127.0.0.1:4001/api' //本地APi接口
}
export const API_PREFIX = apiPrefix;

// axios 默认的配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 6000,
  maxContentLength: 2000,
  headers: {},
  withCredentials: true,
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: '',
  mock: false,
  debug: false,
  sep: '/'
}
//侧边栏导航菜单配置
export const SIDE_NAV_MENU = menu;

//是否开启权限认证
export const AUTH_DEBUG = true;