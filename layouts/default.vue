<template>
  <div class="layout-default">
    <section class="main-content columns" style="padding: 0; min-height: 95%;">
      <aside class="column is-2 is-sidemenu">
        <nav
          class="navbar header has-shadow is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <a class="navbar-item navbar-brand__logo" href="/">
            CredClin
          </a>
          <div class="navbar-brand">
            <div class="navbar-burger">
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>
        <div class="is-sidemenu-itens">
          <div v-for="(item, key) of items" :key="key">
            <p class="menu-label is-hidden-touch is-sidemenu-toplevel">
              {{ item.topLevel }}
            </p>
            <ul class="menu-list">
              <li v-for="(subitem, subkey) of item.items" :key="subkey">
                <nuxt-link
                  :to="subitem.to"
                  exact-active-class="is-active"
                >
                  <b-icon size="is-small" :icon="subitem.icon" /> {{ subitem.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div class="container column is-10 is-content">
        <nav
          class="navbar header has-shadow is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-start has-background-primary">
            <a class="navbar-item">
              <b style="font-weight: 900;">Empresa:</b> <span style="padding-left: 5px;">Consilio</span>
            </a>
          </div>

          <div class="navbar-end">
            <a class="navbar-item">
              <b-icon icon="fullscreen" />
            </a>
            <a class="navbar-item">
              <b-icon icon="bell" />
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                <figure class="image">
                  <img style="margin-right: 5px;" class="image is-24x24 is-rounded" :src="require('@/assets/img/samples/humberto.jpeg')">
                </figure>
                <div>
                  Humberto Martins
                </div>
              </a>

              <div class="navbar-dropdown is-right">
                <a class="navbar-item">
                  Meus dados
                </a>
                <a class="navbar-item">
                  Faturamento
                </a>
                <a class="navbar-item">
                  Alterar senha
                </a>
                <a class="navbar-item">
                  Sair
                </a>
                <hr class="navbar-divider">
                <div class="navbar-item">
                  Versão 0.9.1
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nuxt />
      </div>
    </section>
    <footer class="main-content columns">
      <div class="column is-2">
        <span>Versão: 1.0</span>
      </div>
      <div class="column is-10">
        <span>
          Todos os direitos reservados © CrediClin - Desenvolvido por:
          <a href="https://consilio.com.br" target="_new">Consilio</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          topLevel: 'Geral',
          items: [
            {
              title: 'Dashboard',
              icon: 'home',
              to: '/'
            },
            {
              title: 'Clientes',
              icon: 'account-multiple',
              to: '/clientes/listar'
            },
            {
              title: 'Grupos',
              icon: 'account-supervisor',
              to: '/grupos/listar'
            },
            {
              title: 'Serviços',
              icon: 'apps',
              to: '/servicos/listar'
            }
          ]
        },
        {
          topLevel: 'Configurações',
          items: [
            {
              title: 'Comissões',
              icon: 'tune-vertical',
              to: '/configuracoes/comissoes'
            },
            {
              title: 'Gerais',
              icon: 'cogs',
              to: '/configuracoes/gerais'
            },
            {
              title: 'Gateway',
              icon: 'cellphone-cog',
              to: '/configuracoes/gateway'
            }
          ]
        },
        {
          topLevel: 'Administração',
          items: [
            {
              title: 'Empresas',
              icon: 'domain',
              to: '/administracao/empresas/listar'
            },
            {
              title: 'Usuários',
              icon: 'account-multiple',
              to: '/administracao/usuarios/listar'
            },
            {
              title: 'Configurações',
              icon: 'cog',
              to: '/administracao/configuracoes'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content {
  padding: 0;
  margin: 0;
}
.layout-default {
  height: 100%;
}
.navbar {
  &-brand {
    &__logo {
      color: #fff;
      font-size: 21px;
      font-weight: 600;
      padding-left: 30px;
    }
  }
}
.is-sidemenu {
  padding: 0px;
  &-itens {
    padding: 30px;
    & div {
      margin-top: 20px;
    }
    & div:first-child {
      margin-top: 0px;
    }
  }
}
.is-content {
  padding: 0px;
}
@media only screen and (max-width: 600px) {
  nav {
    display: flex;
  }
  .navbar {
    &-brand {
      &__logo {
        display: flex;
        flex: 1;
      }
    }
  }
}
footer {
  display: flex;
  padding: 5px;
  background-color: #f5f9fb;
  justify-content: center;
    z-index: 99;
  & span {
    text-align: center;
    font-size: 12px;
    display: flex;
    justify-content: center;
  }
}
</style>
