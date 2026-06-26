<template>
  <section>
    <h1>Tableau de Bord</h1>

    <div v-if="store.loading">Chargement...</div>
    <div v-else-if="store.error">{{ store.error }}</div>

    <template v-else-if="store.dashboard">
        <div>
            <h2>Statistiques</h2>
            <div id="content">
                <div class="block">
                    <p>{{ store.dashboard.nombre_actifs }}</p>
                    <p>Nombre d'actifs</p>
                </div>
                <div class="block">
                    <p>{{ store.dashboard.nombre_vulnerabilites }}</p>
                    <p>Nombre de vulnérabilités</p>
                </div>
                <div class="block" :class="classeNiveau">
                    <p>{{ store.dashboard.score_risque_global }}</p>
                    <p>Score de risque global ({{ store.dashboard.niveau_risque_global }})</p>
                </div>
            </div>
        </div>
        <div>
            <h2>Répartition des actifs par type</h2>
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
    </template>

  </section>

</template>
<style scoped>
    section{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }

    section>div{

        width: 100%;
    }

    section>div:nth-child(2){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    section>div:nth-child(2)>h2{
        padding: 15px 0 15px 0;
    }

    #content{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .block{
        border: 2px solid black;
        border-radius: 20px;
        width: 25%;
        min-width: 150px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .block>p:first-child{
        font-size: xxx-large;
    }

    section>div:last-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #my-chart-id{
        max-width: 1000px;
        max-height: 550px;
    }

    .niveau-critique{
        border-color: red;
        background-color: rgba(255, 0, 0, 0.1);
    }

    .niveau-eleve{
        border-color: orange;
        background-color: rgba(255, 165, 0, 0.1);
    }

    .niveau-moyen{
        border-color: gold;
        background-color: rgba(255, 215, 0, 0.1);
    }

    .niveau-faible{
        border-color: green;
        background-color: rgba(0, 128, 0, 0.1);
    }
</style>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useRisqueStore } from '@/stores/risque'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Dashboard',
  components: { Bar },

  setup() {
    const store = useRisqueStore()
    return { store }
  },

  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  },

  computed: {
    chartData() {
      const repartition = this.store.dashboard?.repartition_par_type || {}
      return {
        labels: Object.keys(repartition),
        datasets: [{ label: "Nombre d'actifs", data: Object.values(repartition) }]
      }
    },

    classeNiveau() {
      const correspondance = {
        'Critique': 'niveau-critique',
        'Élevé': 'niveau-eleve',
        'Moyen': 'niveau-moyen',
        'Faible': 'niveau-faible'
      }
      return correspondance[this.store.dashboard?.niveau_risque_global] || ''
    }
  },

  mounted() {
    this.store.fetchDashboard()
  }
}
</script>
