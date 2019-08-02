<template>
  <v-menu bottom left offset-y max-height="calc(100% - 16px)">
    <template #activator="{ on: menu }">
      <v-btn
        text
        style="min-width: 48px"
        v-on="menu"
      >
        <v-img :src="require(`@/assets/${currentLang}.png`)" width="26px" />
      </v-btn>

    </template>
    <v-list dense nav class="px-0">
      <template v-for="(item, index) in items">
        <v-list-item
          :key="index"
          class="ma-0"
          @click="translateI18n(item.id)"
        >
          <v-list-item-avatar
            tile
            size="24px"
          >
            <img :src="require(`@/assets/${item.id}.png`)">
          </v-list-item-avatar>
          <v-list-item-title v-text="item.name" />
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
      items: [{
        id: 'en',
        name: 'Enslish'
      },
      {
        id: 'zh',
        name: '简体中文'
      }]
    }
  },
  computed: {
    currentLang() {
      return this.$i18n.locale
    }
  },
  methods: {
    translateI18n(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
