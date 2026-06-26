<template>
    <h1>Rapport de risque cyber</h1>

    <section class="select-entreprise">
        <label>
            <p>Entreprise à analyser</p>
            <select v-model.number="entrepriseId" @change="genererRapport">
                <option disabled value="">-- Sélectionner une entreprise --</option>
                <option
                    v-for="entreprise in entrepriseStore.entreprises"
                    :key="entreprise.entreprise_id"
                    :value="entreprise.entreprise_id"
                >
                    {{ entreprise.entreprise_nom }}
                </option>
            </select>
        </label>
    </section>

    <div v-if="loading">Génération du rapport...</div>
    <div v-else-if="error">{{ error }}</div>

    <article v-else-if="rapport" class="rapport">

        <section class="bloc">
            <h2>1. Présentation de l'entreprise</h2>
            <p><strong>Nom :</strong> {{ entreprise.entreprise_nom }}</p>
            <p><strong>Secteur :</strong> {{ entreprise.secteur }}</p>
            <p><strong>Employés :</strong> {{ entreprise.employes }}</p>
            <p><strong>Serveurs :</strong> {{ entreprise.serveurs }}</p>
            <p><strong>Postes clients :</strong> {{ entreprise.postes_clients }}</p>
            <p><strong>Services exposés sur Internet :</strong> {{ entreprise.services_exposes }}</p>
        </section>

        <section class="bloc">
            <h2>2. Inventaire des actifs</h2>
            <p>{{ rapport.nombre_actifs }} actif(s) recensé(s).</p>
            <ul>
                <li v-for="actif in rapport.details.details_par_actif" :key="actif.actif_id">
                    <strong>{{ actif.actif_nom }}</strong> ({{ actif.type }}) —
                    criticité {{ actif.criticite }} —
                    {{ actif.expose_internet ? 'exposé sur Internet' : 'non exposé sur Internet' }}
                </li>
            </ul>
        </section>

        <section class="bloc">
            <h2>3. Vulnérabilités détectées</h2>
            <p>{{ rapport.nombre_vulnerabilites }} vulnérabilité(s) détectée(s) au total.</p>
            <ul>
                <li v-for="actif in rapport.details.details_par_actif" :key="`v-${actif.actif_id}`">
                    <template v-if="actif.vulnerabilites.length">
                        <strong>{{ actif.actif_nom }}</strong> :
                        {{ actif.vulnerabilites.map(v => v.vulnerabilite_nom).join(', ') }}
                    </template>
                </li>
            </ul>
        </section>

        <section class="bloc">
            <h2>4. Niveau de risque</h2>
            <p class="score" :class="classeNiveau(rapport.niveau_risque)">
                Score global : {{ rapport.score_risque }} / 100 — Niveau {{ rapport.niveau_risque }}
            </p>
        </section>

        <section class="bloc">
            <h2>5. Recommandations de sécurité</h2>
            <ul>
                <li v-for="(recommandation, index) in recommandations" :key="index">
                    {{ recommandation }}
                </li>
            </ul>
        </section>

    </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entreprise'
import { useRisqueStore } from '@/stores/risque'

const entrepriseStore = useEntrepriseStore()
const risqueStore = useRisqueStore()

const entrepriseId = ref('')
const rapport = ref(null)
const loading = ref(false)
const error = ref('')

const entreprise = computed(() =>
    entrepriseStore.entreprises.find(e => e.entreprise_id === entrepriseId.value) || {}
)

const classeNiveau = (niveau) => {
    const correspondance = {
        'Critique': 'niveau-critique',
        'Élevé': 'niveau-eleve',
        'Moyen': 'niveau-moyen',
        'Faible': 'niveau-faible'
    }
    return correspondance[niveau] || ''
}

const recommandations = computed(() => {
    if (!rapport.value) return []

    const recommandationsParGravite = {
        'Critique': new Set(),
        'Élevée': new Set(),
        'Moyenne': new Set(),
        'Faible': new Set()
    }

    rapport.value.details.details_par_actif.forEach(actif => {
        actif.vulnerabilites.forEach(v => {
            if (recommandationsParGravite[v.gravite]) {
                recommandationsParGravite[v.gravite].add(v.vulnerabilite_nom)
            }
        })
    })

    const liste = []

    if (recommandationsParGravite['Critique'].size) {
        liste.push(
            `Traiter en priorité les vulnérabilités critiques : ${[...recommandationsParGravite['Critique']].join(', ')}.`
        )
    }
    if (recommandationsParGravite['Élevée'].size) {
        liste.push(
            `Planifier la correction des vulnérabilités à gravité élevée : ${[...recommandationsParGravite['Élevée']].join(', ')}.`
        )
    }

    const actifsExposes = rapport.value.details.details_par_actif.filter(a => a.expose_internet)
    if (actifsExposes.length) {
        liste.push(
            `Renforcer la surveillance des actifs exposés sur Internet (${actifsExposes.map(a => a.actif_nom).join(', ')}).`
        )
    }

    liste.push('Mettre en place une politique de mots de passe robustes et le renouvellement régulier des accès.')
    liste.push('Maintenir à jour les systèmes et applications afin de corriger les failles connues.')
    liste.push('Mettre en place une journalisation et une supervision permettant de détecter rapidement un incident.')

    return liste
})

const genererRapport = async () => {
    if (!entrepriseId.value) return

    loading.value = true
    error.value = ''
    rapport.value = null

    try {
        rapport.value = await risqueStore.calculerRisque(entrepriseId.value)
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await entrepriseStore.fetchEntreprises()
})
</script>

<style scoped>
@import url('./../../assets/css/Rapport/Rapport.css');
</style>
