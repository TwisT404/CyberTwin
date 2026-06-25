<template>
    <h1>Ajouter une vulnerabilite :</h1>

    <section>
        <form @submit.prevent="ajouterVulnerabilite">

            <label>
                <p>Nom de la vulnerabilite</p>
                <input type="text" v-model="vulnerabilite.vul_nom" required>
            </label>

            <label>
                <p>Description</p>
                <input type="text" v-model="vulnerabilite.description" required>
            </label>

            <label>
                <p>Gravité</p>

                <div class="radio-group">
                    <label class="radio-item">
                        <input type="radio" v-model="vulnerabilite.gravite" value="faible" required>
                        Faible
                    </label>

                    <label class="radio-item">
                        <input type="radio" v-model="vulnerabilite.gravite" value="moyenne" required>
                        Moyenne
                    </label>

                    <label class="radio-item">
                        <input type="radio" v-model="vulnerabilite.gravite" value="élevée" required>
                        Élevée
                    </label>

                    <label class="radio-item">
                        <input type="radio" v-model="vulnerabilite.gravite" value="critique" required>
                        Critique
                    </label>
                </div>
            </label>

            <div>
                <button type="submit">Ajouter</button>

                <a href="/vulnerabilites">
                    Retour
                </a>
            </div>

        </form>
    </section>
</template>

<script>
export default {

    data() {
        return {
            vulnerabilite: {
                vul_nom: '',
                description: '',
                gravite: ''
            }
        }
    },


    methods: {

        async ajouterVulnerabilite() {

            try {

                const response = await fetch(
                    'http://localhost:3006/api/vulnerabilites',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(this.vulnerabilite)
                    }
                );

                if (response.ok) {

                    alert('Vulnerabilite ajoutée');

                } else {

                    alert('Erreur lors de l\'ajout');

                }

            } catch (error) {

                console.error(error);

                alert('Erreur de connexion');

            }

        }

    }

}
</script>

<style scoped>
@import url('./src/assets/css/Vulnerabilite/AjoutVulnerabilite.css');
</style>