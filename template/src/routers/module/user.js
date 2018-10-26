const RouterView = r => require.ensure([], () => r(require('components/RouterView')), 'routerView')
const User = r => require.ensure([], () => r(require('views/user/Index')), 'user')
export default {
  path: 'user',
  component: RouterView,
  meta: {
    bread: [{ text: '用户管理', url: 'user' }]
  },
  children: [
    {
      path: '',
      component: User,
      name: 'user',
      meta: {
        bread: ['用户列表']
      }
    }]
}