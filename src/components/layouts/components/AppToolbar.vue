<template>
  <v-app-bar clipped-left light fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('toggleSidebar')" />

    <v-toolbar-title class="hidden-sm-and-down">
      <router-link :to="{ name : 'Dashboard' }">
        <span>ADMIN</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <account-icon />
    </v-toolbar-items>

  </v-app-bar>
</template>
<script>
import AccountIcon from './AccountIcon'
export default {
  name: 'AppToolbar',
  components: {
    AccountIcon
  }
}
</script>
