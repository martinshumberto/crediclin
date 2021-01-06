<template>
  <section class="section">
    <div class="box">
      <div class="title" style="display:flex;">
        <h1 class="title is-size-5" style="flex: 1;">
          Listagem dos clientes
        </h1>
        <div class="is-right">
          <b-button
            size="is-small"
            type="is-primary"
            icon-left="plus"
            @click="modalNewCustomer = true"
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

          <b-table-column v-slot="props" field="cpf" label="CPF">
            {{ props.row.cpf ? $options.filters.maskCPF(props.row.cpf) : '-' }}
          </b-table-column>

          <b-table-column v-slot="props" field="birth" label="Data de nascimento">
            {{ props.row.birth ? $options.filters.date(props.row.birth) : '-' }}
          </b-table-column>

          <b-table-column v-slot="props" field="locale" label="Cidade / UF">
            {{ props.row.city ? (props.row.city + '/' + props.row.state) : '-' }}
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
            <b-tooltip type="is-success" label="Negociações">
              <b-button
                size="is-small"
                type="is-success"
                icon-right="animation"
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
    <b-modal v-model="modalNewCustomer" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">
                Adicionar cliente
              </p>
              <p class="subtitle is-6">
                Preencha as informações abaixo para cadastrar um novo cliente.
              </p>
            </div>
          </div>

          <div class="content content-newcustomer">
            <form ref="newcustomer" @submit.prevent="newCustomer()">
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Primeiro nome">
                    <b-input v-model="customer.firstname" />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Sobrenome">
                    <b-input v-model="customer.lastname" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8">
                  <b-field label="E-mail">
                    <b-input v-model="customer.email" />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Aniversário">
                    <b-datepicker
                      v-model="customer.birth"
                      :show-week-number="false"
                      locale="pt-BR"
                      icon="calendar-today"
                      trap-focus
                    />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Telefone">
                    <b-input v-model="customer.phone" />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Celular">
                    <b-input v-model="customer.cell" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="CPF">
                    <b-input v-model="customer.cpf" />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="RG">
                    <b-input v-model="customer.rg" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Data emissão RG">
                    <b-datepicker
                      v-model="customer.rg_issue_date"
                      :show-week-number="false"
                      locale="pt-BR"
                      icon="calendar-today"
                      trap-focus
                    />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Orgão emissor RG">
                    <b-input v-model="customer.rg_organ_emitter" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="CEP">
                    <b-input v-model="customer.cep" maxlength="9" @input="findCEP()" />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Endereço">
                    <b-input v-model="customer.address" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8">
                  <b-field label="Complemento">
                    <b-input v-model="customer.complement" />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Número">
                    <b-input v-model="customer.number" />
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Bairro">
                    <b-input v-model="customer.neighborhood" />
                  </b-field>
                </div>
                <div class="column is-2">
                  <b-field label="Estado">
                    <b-select v-model="customer.state" @change.native="selectState()">
                      <option
                        v-for="item in states"
                        :key="item['ID']"
                        :value="item.Uf"
                      >
                        {{ item.Uf }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Cidade" style="width: 100%;">
                    <b-select v-model="customer.city">
                      <option value="" disabled selected>
                        {{ selectedCities && selectedCities.length === 0 ? 'Selecione um estado' : 'Selecione uma cidade' }}
                      </option>
                      <option
                        v-for="item in selectedCities"
                        :key="item['ID']"
                        :value="item.Nome"
                      >
                        {{ item.Nome }}
                      </option>
                    </b-select>
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
                    value="Cadastrar"
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
import { cities } from '~/mocks/cities'
import { states } from '~/mocks/states'
import { cep } from '~/services/http'

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
      modalNewCustomer: false,
      customer: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        phone: undefined,
        cell: undefined,
        cpf: undefined,
        rg: undefined,
        rg_issue_date: undefined,
        rg_organ_emitter: undefined,
        birth: undefined,
        cep: undefined,
        address: undefined,
        complement: undefined,
        number: undefined,
        neighborhood: undefined,
        city: undefined,
        state: undefined
      },
      selectedCities: [],
      cities,
      states
    }
  },
  mounted () {
    this.loadAsyncData()
  },
  methods: {
    newCustomer () {
      this.$store
        .dispatch('customers/addCustomer', this.customer)
        .then(({ data }) => {
          this.modalNewCustomer = false
          this.$buefy.notification.open({
            duration: 3000,
            message: data.msg,
            position: 'is-bottom-right',
            type: 'is-success'
          })
        })
        .catch((err) => {
          this.$buefy.notification.open({
            duration: 3000,
            message: err.response.data.errors[0],
            position: 'is-bottom-right',
            type: 'is-danger'
          })
        })
    },
    findCEP (value) {
      if (this.customer.cep.length >= 8) {
        cep.get(`${this.customer.cep.replace(/[^\d]+/g, '')}/json`).then(({ data }) => {
          this.customer.address = data.logradouro
          this.customer.complement = data.complemento
          this.customer.neighborhood = data.bairro
          this.customer.state = data.uf
          this.selectState()
          this.customer.city = data.localidade
        })
      }
    },
    selectState () {
      const self = this
      this.cities.forEach(filterCities)

      function filterCities (value, index, array) {
        if (value.Uf === self.customer.state) {
          self.selectedCities.push(value)
        }
      }
    },
    async loadAsyncData () {
      this.isLoading = true

      await this.$store
        .dispatch('customers/getCustomers', { page: this.page })
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
.content-newcustomer {
  & .column {
    padding: 5px 0.75rem !important;
    & label {
      font-size: 9px !important;
    }
  }
}
</style>
