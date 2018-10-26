export default [{
  name: 'index',
  method: 'GET',
  desc: '用户列表',
  path: '/admin/user/index',
  mockPath: '',
  params: {
    name: '',
    phone: '',
    status: '',
    create_time: [],
    page: 1,
    limit: 15
  }
}, {
  name: 'detail',
  method: 'GET',
  desc: '用户详情',
  path: '/admin/user/detail',
  mockPath: '',
  params: {
    id: ''
  }
}, {
  name: 'add',
  method: 'POST',
  desc: '用户添加',
  path: '/admin/user/add',
  mockPath: '',
  params: {
    name: '',
    phone: '',
    email: '',
    weixin: '',
    qq: '',
    password: '',
    organization_path: '',
    confirm_pw: '',
    status: '',
  }
}, {
  name: 'update',
  method: 'POST',
  desc: '更改用户数据',
  path: '/admin/user/update',
  mockPath: '',
  params: {
    id: null,
    name: '',
    phone: '',
    email: '',
    weixin: '',
    qq: '',
    organization_path: '',
    status: ''
  }
}, {
  name: 'updateStatus',
  method: 'POST',
  desc: '更改用户状态',
  path: '/admin/user/update',
  mockPath: '',
  params: {
    id: null,
    status: null
  }
}, {
  name: 'delete',
  method: 'POST',
  desc: '删除用户',
  path: '/admin/user/delete',
  mockPath: '',
  params: {
    id: null
  }
}, {
  name: 'resetPwd',
  method: 'POST',
  desc: '重置密码',
  path: '/admin/user/resetPwd',
  mockPath: '',
  params: {
    id: null
  }
}]