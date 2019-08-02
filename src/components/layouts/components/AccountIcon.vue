<template>
  <v-menu bottom left offset-y max-height="calc(100% - 16px)">
    <template #activator="{ on: menu }">
      <v-btn text v-on="menu">
        <v-img src="@/assets/logo.png" width="40px" class="account-icon" />
      </v-btn>
    </template>
    <v-list dense nav class="px-0">
      <template v-for="(item, index) in items">
        <v-list-item
          :key="index"
          class="ma-0"
          @click="item.click"
        >
          <v-list-item-avatar
            tile
            size="24px"
          >
            <v-icon size="24">{{ item.icon }}</v-icon>

          </v-list-item-avatar>
          <v-list-item-title v-text="item.title" />
        </v-list-item>
        <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`" />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-github-circle',
          title: 'Github',
          click: () => {
            window.open('https://github.com/jsercao/vuetify-admin-template')
          }
        },
        {
          icon: 'mdi-exit-to-app',
          title: 'Logout',
          click: () => {
            this.$store.dispatch('auth/logout').then(res => {
              this.$router.push({ name: 'Login' })
            })
          }
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.account-icon {
  border-radius: 50%;
}
</style>

