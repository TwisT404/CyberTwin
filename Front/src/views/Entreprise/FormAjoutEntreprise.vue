<template>
  <h1>Ajouter une entreprise :</h1>

  <section>
    <form @submit.prevent="ajouterEntreprise">

      <label>
        <p>Nom de l'entreprise</p>
        <input type="text" v-model="entreprise.entreprise_nom" required>
      </label>

      <label>
        <p>Secteur</p>
        <input type="text" v-model="entreprise.secteur" required>
      </label>

      <label>
        <p>Nombre d'employés</p>
        <input type="number" v-model="entreprise.employes" required>
      </label>

      <label>
        <p>Nombre de serveurs</p>
        <input type="number" v-model="entreprise.serveurs" required>
      </label>

      <label>
        <p>Nombre de postes clients</p>
        <input type="number" v-model="entreprise.postes_clients" required>
      </label>

      <label>
        <p>Services exposés sur Internet</p>
        <input type="text" v-model="entreprise.services_exposes">
      </label>

      <div>
        <button type="submit">Ajouter</button>

        <router-link to="/entreprises">
          Retour
        </router-link>
      </div>

    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useEntrepriseStore } from '@/stores/entreprise'

const router = useRouter()
const store = useEntrepriseStore()

const entreprise = reactive({
  entreprise_nom: '',
  secteur: '',
  employes: '',
  serveurs: '',
  postes_clients: '',
  services_exposes: ''
})

const ajouterEntreprise = async () => {
  try {
    await store.ajouterEntreprise(entreprise)
    alert('Entreprise ajoutée')
    router.push('/entreprises')
  } catch (error) {
    console.error(error)
    alert(error.message || 'Erreur de connexion')
  }
}
</script>

<style scoped>
@import url('./../../assets/css/Entreprise/AjoutEntreprise.css');
</style>