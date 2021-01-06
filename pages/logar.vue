<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">E-mail</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="ex. suporte@crediclin.com.br" class="input" required>
                  <span class="icon is-small is-left">
                    <b-icon icon="email" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Senha</label>
                <div class="control has-icons-left">
                  <b-input
                    type="password"
                    placeholder="*******"
                    password-reveal
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
                <button class="button is-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Login',
  layout: 'blank'
}
</script>
