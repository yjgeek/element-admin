## 首先通过```vue-cli```来下载模板
```JavaScript
//安装全局的vue-cli
$ npm install vue-cli -g

//下载模板
$ vue init yuanjie007/element-admin TestDemo(项目名字)

```
<small style="color: red">然后按照对应的提示的来操来就好了！！！</small>

如果出现运行的出现**Module build failed: Error: Cannot find module node-sass**错误，这个一般是因为天朝的网络的原因，导致没有下载成功,代理去下载就好了，具体的去网上找方法吧!

**小提示:**
&nbsp;&nbsp;&nbsp;&nbsp;用webpack我觉得有一个功能特别有用，那就是配置路径别名，这样子就不用再考虑什么相对路径了，所以我把src下的目录都配置别名，别名就是文件夹的名字，大家可以打开```/build/webpack.base.conf.js```里面的```resolve```属性来看下

## 目录的结构
```json
├─build ----------------------------------------vue-cli的配置文件
├─config----------------------------------------vue-cli的配置文件
├─src
│  ├─assets--------------------------------------存放静态文件(可变的)
│  │  └─scss----------------------------------------存放全局scss变量，以及公共的样式文件，用sass-resources-loader引入
│  ├─components-------------------------------存放公共的组件
│  ├─config--------------------------------------全局的一些配置
│  │  │  index.js----------------------------------配置入口文件
│  │  │  menu.js----------------------------------左侧导航栏的菜单
│  │  └─interceptors-----------------------------全局的拦截器
│  ├─layouts--------------------------------------布局命名规范统一用Layout结尾大驼峰写法如UserLayout
│  ├─plugins-------------------------------------存放插件
│  │      api.js-------------------------------------封装的API插件
│  │      axios.js-----------------------------------对axios的封装
│  │      indect.js----------------------------------全局的注入文件
│  │      directive.js----------------------------------全局的自定义指令
│  │      mixin.js-----------------------------------全局的mixin,通过indect注入
│  │      router.js-----------------------------------路由的插件
│  ├─routers--------------------------------------存放路由模块的文件
│  │  └─module----------------------------------------存放路由模块，index会自动遍历这个文件夹所有文件
│  │    index.js----------------------------------------路由文件的入口文件
│  ├─service---------------------------------------服务层
│  │  └─api----------------------------------------所有的api接口配置
│  │    └─module----------------------------------------api模块，index会自动遍历这个文件夹所有文件
│  │      index.js----------------------------------------api文件的入口文件
│  │  └─mock----------------------------------------mock(模拟接口数据)
│  │    └─module----------------------------------------mock模块，index会自动遍历这个文件夹所有文件
│  │      index.js----------------------------------------mock文件的入口文件
│  ├─store-----------------------------------------存放vuex的模块文件
│  ├─utils------------------------------------------存放一些公共的工具
│  └─views-----------------------------------------存放的页面文件
└─static--------------------------------------------存放静态资源文件(不可变的)
│  main.js-------------------------------------------主入口文件
```
## 接下来是我封装的一些功能
###  菜单栏(SideNavigation和HeaderNavigation):
这里主要说下左侧边栏的菜单配置,打开```src/config/menu.js```来看下格式:
```js
export default [{
  text: "菜单名字",
  icon: '图标',
  api: 'api接口', //我用他来校验是否有权限访问这个菜单
  path: '/user', //路由 没有childs 则必填
  route: {}, //路由的参数对象，选填
  childs: [ //代表有下级菜单，只能两层
    {
      text: '用户列表',
      icon: 'list',
      path: '/user'
    }
  ]
}]
```
### API请求(service/api)
>如果要切换成真正的接口请在```config/index.js```下的```AXIOS_DEFAULT_CONFIG:{mock: false}```默认开发环境是用mock来搞的，生产环境默认真实地址

接口请求的库是axios，[点击查看文档](https://www.kancloud.cn/yunye/axios/234845)
在```config/interceptors/axios```里面可以配置一些拦截，比如请求成功、请求错误、响应成功、响应错误等等。
我们可以在响应成功的时候处理一些特殊的状态码，比如未登录(401)，没有这个接口(404)等等。
```js
//响应成功的一些处理
export function responseSuccessFunc(responseObj){
//假如接口的数据格式如下:
  {
      code: 200, //状态码
      message: '', //对应的提示文本
      data: Array || Object | String //响应的内容
  }

  let { data } = responseObj;
  let code = data.code; 
  switch (code) {
    case 200: //假如200代表正常返回数据
      return data.data;
      break;
    case 401:
      message.error("请登录!"); //弹框提示 并且跳转到登录页面
      window.location.href = `${window.location.origin}/#/login`;
      return Promise.reject(data);
      break;
    default:
      let status = responseObj.config._code; //特殊code需要下发到业务方,就不用弹框提示
      if (status) {
        if (!(status instanceof Array)) status = [status];
        if (status.includes(code)) return Promise.reject(data);
      }
      Message.error(data.message);
      return Promise.reject(data);
  }
}
```
然后在```service/api/module```下面添加对应的请求接口，可以按功能来划分模块，这样子也比较好找，来看下代码:
```js
//比如这个是用户模块，新建一个user.js导入下面的代码
export default [{
  name: 'index', //接口的名字
  method: 'GET', //接口请求的方式
  desc: '用户列表', //接口描述
  path: '/admin/user/index', //接口路径
  mockPath: '', //mock的地址，默认和path一样
  params: { //要请求的参数，必须要填写，如果这里没有填，则不会携带参数
    name: '',
    phone: ''
  }
}]

// service/api/index.js 会自动导入./module的所有文件，并且用文件名来做key
```
然后就可以在Vue的实例里面可以这样子调用我们刚添加的用户列表的接口：
``` javascript
  this.$api['userIndex']({参数: '值'}, {axios的一些配置，比如header}).then(res=>{
    //处理正常的逻辑
  }, error=>{
    //捕捉接口的错误
  })
```
在没有Vue的实例也可以用，直接引入```plugins/api```
```js
  //比如在主入口main调用接口
  import API form 'plugins/api'；
  API['userIndex']({参数: '值'}, {axios的一些配置，比如header}).then(res=>{
    //处理正常的逻辑
  }, error=>{
    //捕捉接口的错误
  })
```
大家可能会有点疑惑究竟是怎么搞的，应该有点懵逼了，别着急，去看下```plugins/api```代码应该就能懂了，我就不贴代码了，都有注释的。然后通过```plugins/inject```注入到Vue的实例里面：
```js
import api from "./api";
export default {
  //通过vue提供的install插件接口
  install: (Vue)=>{
    Vue.prototype.$api = api;
  }
}
//在主入口文件main.js 添加下面的代码
import Vue from 'vue'
import inject from 'plugins/inject'
Vue.use(inject)
```
#### Mock
&nbsp;&nbsp;模拟接口数据，在```service/mock/```目录下,详细的语法规范请移步到mock的官方文档查看[Mock文档](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)

我在```service/mock/util.js```文件里添加了几个工具方法:

| 名称 | 描述 | 返回值 | 默认值 |
| ------ | ------ | ------ | ------ |
| Mock   | Mock的实例方法 | 具体的详细方法请移步官方文档 | - |
| resSend | 正常响应接口的数据 |{code: 200, data: 任何类型, message: ''} | {code: 200, data: null, message: 'success'}|
| resSendList | 响应列表的接口数据(包含分页) | {current_page: 1,from: 1,last_page: 1,per_page: 15,to: 3,total: 15,data: [{}]} 如果你真正的接口不是这些，可以改成你们的，这里只是做一个演示 | {current_page: 1,from: 1,last_page: 1,per_page: 15,to: 3,total: 15,data: [{}]} |

### 路由(router)
路由也可以和api接口一样划分模块，里面的配置都是和[vue-router](https://router.vuejs.org/zh/)一样的。比如要搞一个用户管理(user)
在```router/module/下面新建一个user.js
```js
//这里用到了异步加载,可以根据需求来引入
const User = r => require.ensure([], () => r(require('views/user/Index')), 'user')
const AssignRole = r => require.ensure([], () => r(require('views/user/children/AssignRole')), 'user')
export default {
  path: 'user', //用户跳转的路径
  component: User, //对应组件
  meta: {
    auth： false,  //校验 默认为true，为false这不用校验
    bread: ['用户管理'] //生成面包屑导航 =>  首页 / 用户管理
  },
  children: [{	//子路由
    path: '',
    name: 'user', 
    meta: {
      bread: ['可以多个', {url: '/user', text: '用户列表'}] //如果为Object，这可以点击跳转
    }
  }]
}
// router/index.js 会自动导入./module的所有文件
```
#### meta属性说明
| 名称 | 类型 | 描述 | 默认值 |
| ------ | ------ | ------ | ------ |
| auth   | Boolean | 路由鉴权，设置为false则鉴权 | true |
| layout | String |对应layouts里面的布局，如要用BlankLayout这个布局，只需要写blank就好了 | general |
| bread | Array | 面包屑导航的数据，如果数组的值有两种Object和String， Object格式:{ text: '用户管理(显示的文本)', url: 'user(跳转的url)' }; String: '用户管理' | - |



可以在```config/interceptors/router```设置路由的拦截器
```js
//路由鉴权
export function beforeEach(to, from, next) {
  //meta 带有auth: false 就是不用验证的
  if (to.meta.auth === false) {
    next()
  } else {
    //验证是通过localStorage的用户信息来保存的
    if (!localStorage.user) {
      next('/login')
      return false
    } else {
      next()
      return false
    }
  }
  next()
}
```
### store(Vuex)状态管理
这个就没有什么好说的了，照着[vuex文档](http://vuex.vuejs.org/zh-cn/)撸就行了。

### 绑定在Vue原型链上的api方法
这些都是在```plugins/inject.js```里面注入的
```
$config //在config/index 里面的配置
$api 	//api的请求方法 详细请见上面的 API请求(service/api)
$auth   //权限列表 是在登录之后请求回来的权限列表，详见views/login/Login.vue下的getPermissionList方法 有保存到localStorage
```
<font color="#f54228">获取上面的属性如 配置(\$config): this.$config 就好了</font>

### 其他
1.```plugins/mixin``` 有对localStorage存储的封装

计算属性(computed):
```js
windowSize   窗口的大小，只要窗口变化就会更新, 窗口监听是在components/HeaderNavigation.vue 下面的changeWindow方法，可以用这个值来做页面的响应式 
```
方法(methods):
```js
//检查传过来的api是否有权限，参数为String|Array 数组的话只要有一个有权限就返回true, api的前缀都是/api/admin/，具体怎么认证，可以自行修改它的逻辑
checkAuth(["user/update","user/delete"]) 

//获取值
getLocalStorage('key', true) //第一个是key，第二个是否要转成Object

//存储值
setLocalStorage('key', data) //会把Array，Object 转换成String
```
2. ```views``` 页面的组件都写到这里面
3. 全局的指令 ```v-auth``` 用来做按钮级权限,具体的权限认证逻辑可自行修改
```js
  //如果有权限就会显示，没有就会把他移除。注意api一定要''用单引号括起来
  <el-button type="primary" v-auth="'user/add'">添加用户</el-button>
```

其他的应该没有什么了，大家可以自行扩展吧~~~

最后在分享一篇文章[https://juejin.im/post/5b29c3bde51d45588d4d7110](https://juejin.im/post/5b29c3bde51d45588d4d7110)我就是看了这篇文章以后，然后根据自身的一些经验搞出来的，肯定会有很多的不足，我会去慢慢的完善它，比如加[mock](http://mockjs.com/)等等。