<template>
    <h1>Les différentes vulnérabilités :</h1>
    <router-link to="/vulnerabilites/add" id="addVul">Associer une vulnérabilité</router-link>
    <section>
        <div v-if="store.loading">Chargement...</div>

        <div v-else-if="store.error">
            {{ store.error }}
        </div>

        <div v-else-if="!store.associations.length">
            Aucune vulnérabilité associée pour le moment.
        </div>

        <div
            class="block"
            v-else
            v-for="association in store.associations"
            :key="`${association.actif_id}-${association.vulnerabilite_id}`"
        >
            <h2>Type d'actif : {{ association.actif_type }}</h2>
            <p>Vulnérabilité : {{ association.vulnerabilite_nom }}</p>
            <p>Niveau de gravité : {{ association.gravite }}</p>
            <p>Actif concerné : {{ association.actif_nom }}</p>
            <p>Entreprise concernée : {{ association.entreprise_nom }}</p>
            <div class="link">
                <a @click="dissocier(association)">Supprimer</a>
            </div>      
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVulnerabiliteStore } from '@/stores/vulnerabilite'

const store = useVulnerabiliteStore()

const dissocier = async (association) => {
  if (!confirm("Voulez-vous vraiment retirer cette vulnérabilité de l'actif ?")) {
    return
  }

  try {
    await store.dissocierVulnerabilite(association.actif_id, association.vulnerabilite_id)
    await store.fetchAssociations()
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

onMounted(() => {
  store.fetchAssociations()
})
</script>

<style scoped>
@import url('./../../assets/css/Vulnerabilite/Vulnerabilite.css');
</style>
