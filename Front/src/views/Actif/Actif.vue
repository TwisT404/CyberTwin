<template>
    <h1>Gestion des actifs :</h1>
    <a href="/actifs/add" id="addActif">Ajouter un actif</a>
    <section>
        <div v-if="loading">Chargement...</div>

        <div v-else-if="error">
            {{ error }}
        </div>
        <div class="block" v-else v-for="actif in actifs" :key="actif.actif_id">
            <h2>{{ actif.actif_nom }}</h2>
            <p> Criticité : {{ actif.criticite }}</p>
            <p>Entreprise concernée : {{ actif.entreprise_id }}</p>
            <p>Type : {{ actif.type }}</p>
            <div class="link">
                <a>Modifier</a>
                <a @click="supprimerActifs(actif.actif_id)">Supprimer</a>
            </div>   
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

const actifs = ref([])
const loading = ref(false)
const error = ref('')

const loadActifs = async () => {
  loading.value = true

  try {
    const response = await fetch('http://localhost:3006/api/assets')

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des actifs')
    }

    actifs.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }

}

const supprimerActifs = async (id) => {
     loading.value = true
  if (!confirm("Voulez-vous vraiment supprimer cet actif ?")) {
    return
  }

  try {
    const response = await fetch(
      `http://localhost:3006/api/assets/${id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression")
    }

    actifs.value = actifs.value.filter(
      actif => actifs.actif_id !== id
    )

  } catch (err) {
    console.error(err)
  }finally{
     loading.value = false
  }
}



onMounted(() => {
  loadActifs()
})
</script>


<style scoped>
@import url('./../../assets/css/Actifs/Actif.css');
</style>