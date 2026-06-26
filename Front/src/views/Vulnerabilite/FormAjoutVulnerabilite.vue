<template>
    <h1>Associer une vulnérabilité :</h1>

    <section>
        <form @submit.prevent="ajouterVulnerabilite">

            <label>
                <p>Actif concerné</p>
                <select v-model.number="association.actif_id" required>
                    <option disabled value="">-- Sélectionner un actif --</option>
                    <option
                        v-for="actif in actifs"
                        :key="actif.actif_id"
                        :value="actif.actif_id"
                    >
                        {{ actif.actif_nom }}
                    </option>
                </select>
            </label>

            <label>
                <p>Vulnérabilité existante</p>
                <select v-model.number="association.vulnerabilite_id">
                    <option value="">-- Créer une nouvelle vulnérabilité --</option>
                    <option
                        v-for="vuln in vulnerabilitesExistantes"
                        :key="vuln.vulnerabilite_id"
                        :value="vuln.vulnerabilite_id"
                    >
                        {{ vuln.vulnerabilite_nom }}
                    </option>
                </select>
            </label>

            <template v-if="!association.vulnerabilite_id">
                <label>
                    <p>Nom de la vulnerabilite</p>
                    <input type="text" v-model="vulnerabilite.vulnerabilite_nom" required>
                </label>

                <label>
                    <p>Description</p>
                    <input type="text" v-model="vulnerabilite.description" required>
                </label>

                <label>
                    <p>Gravité</p>

                    <div class="radio-group">
                        <label class="radio-item">
                            <input type="radio" v-model="vulnerabilite.gravite" value="Faible" required>
                            Faible
                        </label>

                        <label class="radio-item">
                            <input type="radio" v-model="vulnerabilite.gravite" value="Moyenne" required>
                            Moyenne
                        </label>

                        <label class="radio-item">
                            <input type="radio" v-model="vulnerabilite.gravite" value="Élevée" required>
                            Élevée
                        </label>

                        <label class="radio-item">
                            <input type="radio" v-model="vulnerabilite.gravite" value="Critique" required>
                            Critique
                        </label>
                    </div>
                </label>
            </template>

            <div>
                <button type="submit">Ajouter</button>

                <router-link to="/vulnerabilites">
                    Retour
                </router-link>
            </div>

        </form>
    </section>
</template>

<script>
import { useVulnerabiliteStore } from '@/stores/vulnerabilite'
import { useActifStore } from '@/stores/actif'

export default {

    data() {
        return {
            vulnerabilite: {
                vulnerabilite_nom: '',
                description: '',
                gravite: ''
            },
            association: {
                actif_id: '',
                vulnerabilite_id: ''
            },
            actifs: [],
            vulnerabilitesExistantes: []
        }
    },

    methods: {

        async chargerActifs() {
            const actifStore = useActifStore()

            try {
                await actifStore.fetchActifs()
                this.actifs = actifStore.actifs
            } catch (err) {
                console.error(err)
            }
        },

        async chargerVulnerabilites() {
            const vulnerabiliteStore = useVulnerabiliteStore()

            try {
                await vulnerabiliteStore.fetchVulnerabilites()
                this.vulnerabilitesExistantes = vulnerabiliteStore.vulnerabilites
            } catch (err) {
                console.error(err)
            }
        },

        async ajouterVulnerabilite() {
            const vulnerabiliteStore = useVulnerabiliteStore()
            const actifChoisi = this.actifs.find(a => a.actif_id === this.association.actif_id)

            if (!actifChoisi) {
                alert('Veuillez sélectionner un actif')
                return
            }

            try {
                let vulnerabiliteId = this.association.vulnerabilite_id

                // Si aucune vulnérabilité existante n'est sélectionnée, on en crée une nouvelle
                if (!vulnerabiliteId) {
                    const nouvelleVulnerabilite = await vulnerabiliteStore.ajouterVulnerabilite(this.vulnerabilite)
                    vulnerabiliteId = nouvelleVulnerabilite.id
                }

                await vulnerabiliteStore.associerVulnerabilite(
                    actifChoisi.actif_id,
                    vulnerabiliteId,
                    actifChoisi.entreprise_id
                )

                alert('Vulnérabilité associée')
                this.$router.push('/vulnerabilites')

            } catch (error) {

                console.error(error);

                alert(error.message || 'Erreur de connexion');

            }

        }

    },

    mounted() {
        this.chargerActifs()
        this.chargerVulnerabilites()
    }

}
</script>

<style scoped>
@import url('./../../assets/css/Vulnerabilite/AjoutVulnerabilite.css');
</style>
