<template>
    <h1>Gestion des actifs :</h1>
    <router-link to="/actifs/add" id="addActif">Ajouter un actif</router-link>
    <section>
        <div v-if="store.loading">Chargement...</div>

        <div v-else-if="store.error">
            {{ store.error }}
        </div>
        <div class="block" v-else v-for="actif in store.actifs" :key="actif.actif_id">
            <h2>{{ actif.actif_nom }}</h2>
            <p> Criticité : {{ actif.criticite }}</p>
            <p>Entreprise concernée : {{ nomEntreprise(actif.entreprise_id) }}</p>
            <p>Type : {{ actif.type }}</p>
            <p>Exposé sur Internet : {{ actif.est_expose_internet ? 'Oui' : 'Non' }}</p>
            <div class="link">
                <router-link :to="`/actifs/${actif.actif_id}/edit`">Modifier</router-link>
                <a @click="supprimerActifs(actif.actif_id)">Supprimer</a>
            </div>   
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useActifStore } from '@/stores/actif'
import { useEntrepriseStore } from '@/stores/entreprise'

const store = useActifStore()
const entrepriseStore = useEntrepriseStore()

const nomEntreprise = (entreprise_id) => {
    const entreprise = entrepriseStore.entreprises.find(
        (entreprise) => entreprise.entreprise_id === entreprise_id
    )
    return entreprise ? entreprise.entreprise_nom : entreprise_id
}

const supprimerActifs = async (id) => {
  if (!confirm("Voulez-vous vraiment supprimer cet actif ?")) {
    return
  }

  try {
    await store.supprimerActif(id)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

onMounted(() => {
  store.fetchActifs()
  entrepriseStore.fetchEntreprises()
})
</script>


<style scoped>
@import url('./../../assets/css/Actifs/Actif.css');
</style>
