import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/auth/login.vue'
import Layout from '@/components/layouts/AppLayout.vue'
import components from './modules/components'
import permissions from './modules/permission'
import charts from './modules/charts'

import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

Vue.use(Router)

export const Routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    redirect: { name: 'Dashboard' },
    meta: {
      hidden: true
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Layout,
    redirect: { name: 'Dashboard' },
    meta: {
      hidden: false,
      hasMulSub: false
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          keepAlive: true,
          icon: 'mdi-view-dashboard'
        }
      },
      charts,
      components,
      permissions
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: Routes
})

const router = createRouter()

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 缓存控制
  if (to.meta.keepAlive) {
    store.commit('global/keepAlive', to.name)
  }
  const { token } = store.getters
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        store.dispatch('auth/getAuthInfo', { token })
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
