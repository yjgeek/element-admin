
const Welcome = r => require.ensure([], () => r(require('components/Welcome')), 'welcome');
const RouterView = r => require.ensure([], () => r(require('components/RouterView')), 'routerView')
const Login = r => require.ensure([], () => r(require('views/login/Login')), 'login')

import user from './user'

const ROUTES = [{
  path: '/',
  name: 'index',
  component: RouterView,
  meta: {
    bread: ['首页']
  },
  children: [
    user
  ]
}, {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { auth: false }
}, {
  path: '/welcome',
  component: Welcome
}, {
  path: '**',
  redirect: '/'
}];
export default ROUTES;