const data = require.context('./module', true, /\.js$/)
let temArray = [];
data.keys().forEach(item => {
  item = data(item).default;
  item && temArray.push(item)
})
const Welcome = r => require.ensure([], () => r(require('components/Welcome')), 'welcome');
const RouterView = r => require.ensure([], () => r(require('components/RouterView')), 'routerView')
const Index = r => require.ensure([], () => r(require('views/index/Index')), 'index')
const Login = r => require.ensure([], () => r(require('views/login/Login')), 'login')

const ROUTES = [{
  path: '/',
  component: RouterView,
  meta: {
    bread: ['首页']
  },
  children: [
    {
      path: '',
      name: 'index',
      component: Index
    },
    ...temArray
  ]
}, {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { auth: false, layout: 'blank' }
}, {
  path: '/welcome',
  component: Welcome,
  meta: {
    bread: ['欢迎页面']
  },
}, {
  path: '**',
  redirect: '/'
}];
export default ROUTES;