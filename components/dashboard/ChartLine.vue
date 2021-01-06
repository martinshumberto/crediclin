<template>
  <b-card title="Line">
    <div class="card">
      <div class="card-content">
        <div class="title is-size-5" style="display: flex;">
          <p style="flex: 1;">
            Cobranças ({{ radio === 'month' ? 'mensais' : 'anual' }})
          </p>
          <b-dropdown position="is-bottom-left" aria-role="list">
            <b-button slot="trigger" slot-scope="{ active }" size="is-small" class="button is-primary" style="display: flex;">
              <span style="font-weight: 900;">Filtro</span>
              <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
            </b-button>

            <b-radio
              v-for="(item, index) in btn"
              :key="index"
              v-model="radio"
              :name="item.label"
              :value="item.value"
              :native-value="item.value"
              style="font-size: 14px; padding: 5px 10px;"
              @change.native="updateChart"
            >
              {{ item.label }}
            </b-radio>
          </b-dropdown>
        </div>
        <ChartLineBase :height="300" :chart-data="chartData" />
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'ChartLine',
  data () {
    return {
      btn: [
        { label: 'Mês atual', value: 'month' },
        { label: 'Ano atual', value: 'year' }
      ],
      chartData: null,
      data: {
        month: [1, 3, 5, 3, 1, 6, 8],
        year: [12, 150, 16, 18, 11, 13, 15, 200, 50, 38, 40, 25]
      },
      labels: {
        month: [1, 5, 10, 15, 20, 25, 30],
        year: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      radio: 'month'
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.chartData = {
        labels: this.labels[this.radio],
        datasets: [
          {
            borderColor: '#1498ea',
            data: this.data[this.radio],
            label: 'Cobranças'
          }
        ]
      }
    },
    updateChart () {
      this.$nextTick(() => {
        this.fillData()
      })
    }
  }
}
</script>
