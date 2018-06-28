import menu from "./menu";

//api接口的前缀
export const API_PREFIX = 'http://127.0.0.1:4001/api'

// axios 默认的配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 2000,
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