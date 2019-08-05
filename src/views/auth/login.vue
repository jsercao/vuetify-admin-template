<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-2">
          <v-toolbar color="primary" flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.username"
                label="Login"
                name="login"
                prepend-inner-icon="mdi-account"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="form.password"
                :append-icon="showPwd ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPwd ? 'text' : 'password'"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                @click:append="showPwd = !showPwd"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin123'
      },
      showPwd: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.form).then(res => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      }).catch((err) => {
        console.log(err)
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
