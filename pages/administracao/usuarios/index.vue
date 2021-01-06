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

          <b-table-column v-slot="props" field="privilegios" label="Nível do usuário">
            {{ props.row.role === 0 ? 'Adminstrador' : 'Moderador' }}
          </b-table-column>

          <b-table-column v-slot="props" field="date" label="Data da criação" centered>
            <span class="tag is-success">
              {{ props.row.created_at | datetime }}
            </span>
          </b-table-column>

          <b-table-column field="actions" label="Ações" centered>
            <b-tooltip type="is-primary" label="Editar">
              <b-button
                size="is-small"
                type="is-primary"
                icon-right="lead-pencil"
              />
            </b-tooltip>
            <b-tooltip type="is-danger" label="Excluir">
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
              />
            </b-tooltip>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ListUsers',
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
      hasMobileCards: true
    }
  },
  mounted () {
    this.loadAsyncData()
  },
  methods: {
    async loadAsyncData () {
      this.isLoading = true

      await this.$store
        .dispatch('users/getUsers', { page: this.page })
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
