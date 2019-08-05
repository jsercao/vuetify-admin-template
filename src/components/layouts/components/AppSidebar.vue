<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app width="260" disanle-resize-watcher>
    <vue-perfect-scrollbar class="sidebar-menu--scroll" :settings="scrollSettings">
      <v-list class="ma-0 pa-0">
        <template v-for="(route, index) in routes">
          <template v-if="route.meta && route.meta.hasMulSub">
            <v-list-group
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
            <v-list-item :key="index" ripple :to="{ name: route.name }">
              <v-list-item-icon>
                <v-icon>{{ route.meta && route.meta.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ generateTitle(route.name) }}</v-list-item-title>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

const filterRoutes = (routes, roles) => {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  name: 'AppSidebar',
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      drawer: this.$vuetify && this.$vuetify.breakpoint.mdAndUp,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }
  },
  computed: {
    ...mapGetters(['roles']),
    routes() {
      const routeName = this.$route.name
      const routes = filterRoutes(this.$router.options.routes, this.roles)
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
    }
  }
}
</script>
<style lang="scss">
.sidebar-menu--scroll {
  height: 100%;
  overflow: auto;
}
</style>
