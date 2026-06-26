<template>
  <h1>Modifier l'entreprise :</h1>

  <section>
    <div v-if="loading">Chargement...</div>

    <form v-else @submit.prevent="modifierEntreprise">

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
        <button type="submit">Enregistrer</button>

        <router-link to="/entreprises">
          Retour
        </router-link>
      </div>

    </form>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEntrepriseStore } from '@/stores/entreprise'

const route = useRoute()
const router = useRouter()
const store = useEntrepriseStore()

const loading = ref(true)

const entreprise = reactive({
  entreprise_nom: '',
  secteur: '',
  employes: '',
  serveurs: '',
  postes_clients: '',
  services_exposes: ''
})

const chargerEntreprise = async () => {
  try {
    const data = await store.fetchEntrepriseById(route.params.id)
    Object.assign(entreprise, data)
  } catch (error) {
    console.error(error)
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const modifierEntreprise = async () => {
  try {
    await store.modifierEntreprise(route.params.id, entreprise)
    alert('Entreprise modifiée')
    router.push('/entreprises')
  } catch (error) {
    console.error(error)
    alert(error.message || 'Erreur de connexion')
  }
}

onMounted(() => {
  chargerEntreprise()
})
</script>

<style scoped>
@import url('./../../assets/css/Entreprise/AjoutEntreprise.css');
</style>
