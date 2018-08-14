export default [{
  name: 'login',
  method: 'POST',
  desc: '登录',
  path: '/admin/auth/login',
  mockPath: '',
  params: {
    account: '',
    password: '',
    code: ''
  }
}, {
  name: 'verificationCode',
  method: 'GET',
  desc: '获取验证码',
  path: '/admin/auth/verificationCode',
  mockPath: '',
  params: {}
}, {
  name: 'logout',
  method: 'GET',
  desc: '退出登录',
  path: '/admin/auth/logout',
  mockPath: '',
  params: {}
},{
  name: 'permissionList',
  method: 'GET',
  desc: '获取权限',
  path: '/admin/auth/permissionList',
  mockPath: '',
  params: {}
}]