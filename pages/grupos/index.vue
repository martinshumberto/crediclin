<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-size-5">
        Listagem dos grupos
      </h1>
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
          @page-change="onPageChange"
        >
          <b-table-column v-slot="props" field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column v-slot="props" field="first_name" sortable label="Primeiro nome">
            {{ props.row.first_name }}
          </b-table-column>

          <b-table-column v-slot="props" field="last_name" label="Sobrenome">
            {{ props.row.last_name }}
          </b-table-column>

          <b-table-column v-slot="props" field="cpf" label="CPF">
            {{ props.row.cpf }}
          </b-table-column>

          <b-table-column v-slot="props" field="birth" label="Data de nascimento">
            {{ props.row.birth }}
          </b-table-column>

          <b-table-column v-slot="props" field="date" label="Data de criação" centered>
            <span class="tag is-success">
              {{ new Date(props.row.created_at).toLocaleDateString() }}
            </span>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ListClients',
  data () {
    return {
      data: [],
      perPage: 1,
      page: 1,
      lastPage: 1,
      total: 0,
      isEmpty: true,
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
      const params = [
        `page=${this.page}`,
        `search=${this.page}`
      ].join('&')

      this.isLoading = true

      await this.$store
        .dispatch('ads/fetchAds', params)
        .then(({ data }) => {
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
