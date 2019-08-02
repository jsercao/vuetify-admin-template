<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    app
    width="280"
    disanle-resize-watcher
  >
    <v-list class="ma-0 pa-0">
      <template v-for="(route, index) in routes">
        <template v-if="route.meta && route.meta.hasMulSub">

          <v-list-group
            v-if="roleShow(route)"
            :key="index"

            :prepend-icon="route.meta && route.meta.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ generateTitle(route.name) }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(cRoute, idx) in route.children"
              :key="idx"
              ripple
              :to="{ name: cRoute.name }"
              link
            >
              <v-list-item-content>
                <v-list-item-title>{{ generateTitle(cRoute.name, route) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

        </template>
        <!-- 无子菜单时 -->
        <template v-else>
          <v-list-item v-if="roleShow(route)" :key="index" ripple :to="{ name: route.name }">
            <v-list-item-icon>
              <v-icon>{{ route.meta && route.meta.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ generateTitle(route.name) }}</v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      drawer: this.$vuetify && this.$vuetify.breakpoint.mdAndUp
    }
  },
  computed: {
    routes() {
      const routeName = this.$route.name
      const { routes } = this.$router.options

      for (let i = 0, len = routes.length; i < len; i += 1) {
        if (routes[i].children) {
          for (let j = 0, len = routes[i].children.length; j < len; j += 1) {
            const child = routes[i].children[j]
            if (child.name === routeName) {
              return routes[i].children
            }
          }
        } else if (routes[i].name === routeName) {
          return routes[i]
        }
      }

      return routes[2].children
    }
  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer
    },
    generateTitle(title, route) {
      return title ? this.$t(`sidebar.${title.toLowerCase()}`) : ''
    },
    roleShow(route) {
      return true
      // if (!route.meta) {
      //   return true
      // }

      // if (!this.user || route.meta.hidden) {
      //   return false
      // }

      // const { auth } = route.meta
      // return auth ? (!auth.length && !this.user.role) || auth.includes(this.user.role) : !auth
    }
  }
}
</script>
