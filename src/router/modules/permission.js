const routes = {
  path: '/permission',
  name: 'Permission',
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    hasMulSub: true,
    hidden: false,
    icon: 'mdi-axis-arrow-lock'
  },
  children: [
    {
      path: 'page',
      name: 'permission_page',
      component: () => import('@/views/permission/'),
      meta: {
        icon: ''
      }
    }
  ]
}

export default routes
