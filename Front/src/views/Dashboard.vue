<template>
  <section>
    <h1>Tableau de Bord</h1>
    <div>
        <h2>Statistiques</h2>
        <div id="content">
            <div class="block">
                <p>23</p>
                <p>Nombre d'actifs</p>
            </div>
            <div class="block">
                <p>23</p>
                <p>Nombre de vulnérabilités</p>
            </div>
        </div>
    </div>
    <div>
        <h2>Nombre d'entreprises par vulnérabilités</h2>
        <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
        />
    </div>

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
</style>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>