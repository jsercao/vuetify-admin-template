<template>
  <v-container fluid class="ma-0 pa-0">
    <!-- 左侧导航 -->
    <app-sidebar ref="sidebar" />
    <!-- 顶部工具栏 -->
    <app-toolbar @toggleSidebar="toggleSidebar" />
    <!-- 页面主体区域 -->
    <v-content class="main-content">
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-content>

    <!-- Go to top -->
    <app-fab />
  </v-container>
</template>
<script>
import AppSidebar from './components/AppSidebar'
import AppToolbar from './components/AppToolbar'
import AppFab from './components/AppFab'

export default {
  components: {
    AppSidebar,
    AppToolbar,
    AppFab
  },
  data() {
    return {
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$refs.sidebar) {
        this.$refs.sidebar.toggleSidebar()
      }
    }
  }
}
</script>
