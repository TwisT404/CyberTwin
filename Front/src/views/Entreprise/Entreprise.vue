<template>
    <h1>Entreprises</h1>
    <router-link to="/entreprises/add" id="addComp">Ajouter une entreprise</router-link>
    <section>
        <div v-if="store.loading">Chargement...</div>

        <div v-else-if="store.error">
            {{ store.error }}
        </div>
            <div class="block" v-else v-for="company in store.entreprises" :key="company.entreprise_id">
                <h2>{{ company.entreprise_nom }}</h2>
                <p>{{ company.secteur }}</p>
                <p>Nombre d'employé : {{ company.employes }}</p>
                <p>Nombre de serveurs : {{ company.serveurs }}</p>
                <p>Nombre de postes clients : {{ company.postes_clients }}</p>
                <p>Services exposés sur Internet : {{ company.services_exposes }}</p>
                <div class="link">
                    <router-link :to="`/entreprises/${company.entreprise_id}/edit`">Modifier</router-link>
                    <a @click="supprimerEntreprise(company.entreprise_id)">Supprimer</a>
                </div>
                
            </div>

    </section>
    
</template>

<style scoped>
@import url('./../../assets/css/Entreprise/Entreprise.css');
</style>
<script setup>
import { onMounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entreprise'

const store = useEntrepriseStore()

const supprimerEntreprise = async (id) => {
  if (!confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
    return
  }

  try {
    await store.supprimerEntreprise(id)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

onMounted(() => {
  store.fetchEntreprises()
})
</script>