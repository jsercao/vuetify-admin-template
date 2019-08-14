
const routes = {
  path: '/components',
  name: 'Components',
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    hasMulSub: true,
    hidden: false,
    icon: 'mdi-buffer'
  },
  children: [
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/components/video'),
      meta: {
        icon: ''
      }
    },
    {
      path: 'snackbar',
      name: 'snackbar',
      component: () => import('@/views/components/snackbar'),
      meta: {
        icon: ''
      }
    },
    {
      path: 'form',
      name: 'form',
      component: () => import('@/views/components/form'),
      meta: {
        icon: ''
      }
    }
  ]
}

export default routes
