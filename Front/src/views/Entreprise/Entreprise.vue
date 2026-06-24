<template>
    <h1>Entreprises</h1>
    <a href="/entreprises/add" id="addComp">Ajouter une entreprise</a>
    <section>
        <div v-if="loading">Chargement...</div>

        <div v-else-if="error">
            {{ error }}
        </div>
            <div class="block" v-else v-for="company in entreprise" :key="company.id">
                <h2>{{ company.entreprise_nom }}</h2>
                <p>{{ company.secteur }}</p>
                <p>Nombre d'employé : {{ company.employes }}</p>
                <p>Nombre de serveurs : {{ company.serveurs }}</p>
                <p>Nombre de postes clients : {{ company.postes_clients }}</p>
                <p>Services exposés sur Internet : {{ company.services_exposes }}</p>
                <div class="link">
                    <a>Modifier</a>
                    <a>Supprimer</a>
                </div>
                
            </div>

    </section>
    
</template>

<style scoped>
@import url('./../../assets/css/Entreprise/Entreprise.css');
</style>

<script setup>
    import { ref, onMounted } from 'vue'

    const entreprise = ref([])
    const loading = ref(false)
    const error = ref('')

    async function loadCompanies() {
    loading.value = true

    try {
        const response = await fetch(
        'http://localhost:3006/api/companies'
        )

        if (!response.ok) {
        throw new Error('Erreur lors du chargement des entreprises')
        }

        entreprise.value = await response.json()


    } catch (err) {
        error.value = err.message

    } finally {
        loading.value = false
    }
    }

    onMounted(() => {
    loadCompanies()
    })
</script>