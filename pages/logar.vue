<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <form @submit.prevent="login()">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <div class="field">
                  <label for="" class="label">E-mail</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="email"
                      type="email"
                      placeholder="ex. suporte@crediclin.com.br"
                      class="input"
                      required
                    >
                    <span class="icon is-small is-left">
                      <b-icon icon="email" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Senha</label>
                  <div class="control has-icons-left">
                    <b-input
                      v-model="password"
                      type="password"
                      placeholder="*******"
                      password-reveal
                      required
                    />
                    <span class="icon is-small is-left">
                      <b-icon icon="lock" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox">
                    Lembrar-me
                  </label>
                </div>
                <div class="field">
                  <b-button
                    class="is-primary"
                    tag="input"
                    native-type="submit"
                    value="Logar"
                    @click="login()"
                  />
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Login',
  layout: 'blank',
  data () {
    return {
      email: undefined,
      password: undefined
    }
  },
  methods: {
    async login () {
      return await this.$auth.loginWith('users', {
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((res) => {
          this.$router.push('/')
        })
        .catch((err) => {
          this.$buefy.notification.open({
            duration: 3000,
            message: err.response.data.errors[0],
            position: 'is-bottom-right',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
