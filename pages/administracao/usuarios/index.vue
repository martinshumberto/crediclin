<template>
  <section class="section">
    <div class="box">
      <div class="title" style="display:flex;">
        <h1 class="title is-size-5" style="flex: 1;">
          Listagem dos usuários
        </h1>
        <div class="is-right">
          <b-button
            size="is-small"
            type="is-primary"
            icon-left="plus"
            @click="modalUser = true"
          >
            Adicionar
          </b-button>
        </div>
      </div>

      <div class="container">
        <b-table
          :data="isEmpty ? [] : data"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :loading="isLoading"
          :focusable="isFocusable"
          :mobile-cards="hasMobileCards"
          paginated
          backend-pagination
          :total="total"
          :per-page="perPage"
          aria-next-label="Próxima página"
          aria-previous-label="Página anterior"
          aria-page-label="Página"
          aria-current-label="Página atual"
          pagination-size="is-small"
          @page-change="onPageChange"
        >
          <b-table-column v-slot="props" field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column v-slot="props" field="firstname" sortable label="Primeiro nome">
            {{ props.row.firstname }}
          </b-table-column>

          <b-table-column v-slot="props" field="lastname" label="Sobrenome">
            {{ props.row.lastname }}
          </b-table-column>

          <b-table-column v-slot="props" field="email" label="E-mail">
            {{ props.row.email }}
          </b-table-column>

          <b-table-column v-slot="props" field="role" label="Permissão">
            {{ props.row.role === 0 ? 'Administrador' : 'Moderador' }}
          </b-table-column>

          <b-table-column v-slot="props" field="date" label="Data da criação" centered>
            <span class="tag is-success">
              {{ props.row.created_at | datetime }}
            </span>
          </b-table-column>

          <b-table-column v-slot="props" field="actions" label="Ações" centered>
            <b-tooltip type="is-primary" label="Editar">
              <b-button
                size="is-small"
                type="is-primary"
                icon-right="lead-pencil"
                @click="openEditUser(props.row.id)"
              />
            </b-tooltip>
            <b-tooltip type="is-danger" label="Excluir">
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
                @click="delUser(props.row.id)"
              />
            </b-tooltip>
          </b-table-column>
        </b-table>
      </div>
    </div>
    <b-modal v-if="modalUser" v-model="modalUser" :on-cancel=" () => { user = copyUser; editActive = false }" :width="800" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">
                {{ editActive ? `Editar usuário: ${user.firstname} ${user.lastname}` : 'Adicionar usuário' }}
              </p>
              <p class="subtitle is-6">
                {{
                  editActive
                    ?
                      'Abaixo você encontrará os dados pessoais referentes ao usuário selecionado.' :
                      'Preencha as informações abaixo para cadastrar um novo usuário.'
                }}
              </p>
            </div>
          </div>

          <div class="content content-modal-customer">
            <form ref="formuser" @submit.prevent="editActive ? editUser() : addUser()">
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Primeiro nome *">
                    <b-input v-model="user.firstname" required />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Sobrenome *">
                    <b-input v-model="user.lastname" required />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8">
                  <b-field label="E-mail *">
                    <b-input v-model="user.email" required />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Permissão">
                    <b-select v-model="user.role" placeholder="Selecione a permissão">
                      <option
                        v-for="(item, index) in roles"
                        :key="index"
                        :value="index"
                      >
                        {{ item }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Senha *">
                    <div class="control has-icons-left">
                      <b-input
                        v-model="user.password"
                        type="password"
                        placeholder="*******"
                        password-reveal
                        required
                      />
                      <span class="icon is-small is-left">
                        <b-icon icon="lock" />
                      </span>
                    </div>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Confirmar senha *">
                    <div class="control has-icons-left">
                      <b-input
                        v-model="user.password_confirmation"
                        type="password"
                        placeholder="*******"
                        password-reveal
                        required
                      />
                      <span class="icon is-small is-left">
                        <b-icon icon="lock" />
                      </span>
                    </div>
                  </b-field>
                </div>
              </div>
              <div class="columns" style="margin-top: 20px;">
                <div class="column is-12">
                  <b-button
                    class="is-right"
                    type="is-primary"
                    tag="input"
                    native-type="submit"
                    :value="editActive ? 'Salvar' : 'Cadastrar'"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script>
export default {
  name: 'ListClients',
  data () {
    return {
      data: [],
      total: 0,
      page: 1,
      perPage: 1,
      lastPage: 1,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      modalUser: false,
      user: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined,
        password_confirmation: undefined,
        role: undefined
      },
      roles: {
        0: 'Administrador',
        1: 'Moderador'
      },
      copyUser: undefined,
      editActive: false,
      dateParser: date => new Date(Date.parse(date)),
      dateCreator: () => new Date()
    }
  },
  async mounted () {
    await this.loadAsyncData()
    this.copyUser = { ...this.user }
  },
  methods: {
    openEditUser (id) {
      this.$store
        .dispatch('users/show', id)
        .then((data) => {
          this.user = { ...data }
          this.editActive = true
          this.modalUser = true
        })
    },
    editUser () {
      const user = this.$options.filters.clearObject(this.user)
      this.$store
        .dispatch('users/update', user)
        .then((data) => {
          this.modalUser = false
          this.user = this.copyUser
          this.loadAsyncData()
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: data.msg
          })
        })
    },
    addUser () {
      this.$store
        .dispatch('users/store', this.user)
        .then((data) => {
          this.modalUser = false
          this.user = this.copyUser
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: data.msg
          })
        })
    },
    delUser (id) {
      this.$store
        .dispatch('users/delete', id)
        .then((data) => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: data.msg
          })
        })
    },
    async loadAsyncData () {
      this.isLoading = true

      await this.$store
        .dispatch('users/index', { page: this.page })
        .then((data) => {
          this.data = data.data
          this.perPage = data.per_page
          this.page = data.current_page
          this.total = data.total
          this.lastPage = data.last_page
          this.isLoading = false
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.isLoading = false
          throw error
        })
    },
    onPageChange (page) {
      this.page = page
      this.loadAsyncData()
    }
  }
}
</script>
<style lang="scss" scoped>
.content-modal-customer {
  & .column {
    padding: 5px 0.75rem !important;
    & label {
      font-size: 9px !important;
    }
  }
}
</style>
