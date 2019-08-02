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
      path: 'snackbar',
      name: 'snackbar',
      component: () => import('@/views/components/snackbar.vue'),
      meta: {
        icon: ''
      }
    }
  ]
}

export default routes
