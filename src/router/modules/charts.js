
const routes = {
  path: '/charts',
  name: 'Charts',
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    hasMulSub: true,
    hidden: false,
    icon: 'mdi-chart-bar-stacked'
  },
  children: [
    {
      path: 'echarts',
      name: 'echarts',
      component: () => import('@/views/charts/echarts'),
      meta: {
        icon: ''
      }
    }
  ]
}

export default routes
