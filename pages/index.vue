<template>
  <section class="section">
    <div class="columns is-mobile">
      <card
        title="Total de clientes"
        footer="Todo o período desde o início"
      >
        <b class="has-text-grey">
          280
        </b>
      </card>

      <card
        title="Total de cobranças"
        footer="Todo o período desde o início"
      >
        <b class="has-text-grey">
          350
        </b>
      </card>

      <card
        title="Taxa de administração"
        footer="Taxa dos financiamentos"
      >
        <b class="has-text-grey">
          10%
        </b>
      </card>

      <card
        title="Vencimento próx. fatura"
        footer="Assinatura do plano mensal"
      >
        <b class="has-text-grey">
          10/02/2021
        </b>
      </card>
    </div>
    <div class="columns is-mobile">
      <!-- <div class="column is-6">
        <ChartBar />
      </div>
      <div class="column is-6">
        <ChartDoughnut />
      </div> -->
      <div class="column is-12">
        <ChartLine />
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'HomePage'
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
