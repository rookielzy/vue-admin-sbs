import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { Message } from 'element-ui'
import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log(to, from)
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    if (to.path === '/login') {
      next({ path: '/' })
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          console.log('check the roles', res.data.roles)
          // TODO: 动态生成路由
          // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
        }).catch(() => {
          // TODO: 获取用户信息失败，要求重新登录
          // FIXME: 请求成功了，但总是捕捉到错误
          console.log('Get User Info Fail')
          // Message({
          //   message: 'Get User Info Fail',
          //   type: 'error',
          //   duration: 2000
          // })
          NProgress.done()
          // store.dispatch('FedLogOut').then(() => {
          //   Message.error(err || 'Verification failed, please login again')
          //   next({ path: '/' })
          // })
        })
      } else {
        next()
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
