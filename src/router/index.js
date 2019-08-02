import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/login.vue'
import Layout from '@/components/layouts/AppLayout.vue'
import components from './modules/components'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
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
            icon: 'mdi-view-dashboard'
          }
        },
        components
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { token } = store.getters
  if (to.path === '/login') {
    store.dispatch('auth/logout')
    next()
    NProgress.done()
  } else if (!token) {
    next(`/login?redirect=${to.fullPath}`)
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
