<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('toggleSidebar')" />

    <v-toolbar-title class="hidden-sm-and-down">
      <router-link :to="{ name : 'Dashboard' }">
        <span>ADMIN</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text @click="changeTheme"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
      <language-switch />
      <account-icon />
    </v-toolbar-items>

  </v-app-bar>
</template>
<script>
import AccountIcon from './AccountIcon'
import LanguageSwitch from '@/components/widgets/LanguageSwitch'
export default {
  name: 'AppToolbar',
  components: {
    AccountIcon,
    LanguageSwitch
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
