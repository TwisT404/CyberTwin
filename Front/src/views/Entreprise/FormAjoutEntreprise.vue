<template>
  <h1>Ajouter une entreprise :</h1>

  <section>
    <form @submit.prevent="ajouterEntreprise">

      <label>
        <p>Nom de l'entreprise</p>
        <input type="text" v-model="entreprise.name" required>
      </label>

      <label>
        <p>Secteur</p>
        <input type="text" v-model="entreprise.entreprise_nom" required>
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

        <a href="/entreprises">
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
      entreprise: {
        entreprise_nom: '',
        secteur: '',
        employes: '',
        serveurs: '',
        postes_clients: '',
        services_exposes: ''
      }
    }
  },

  methods: {

    async ajouterEntreprise() {

      try {

        const response = await fetch(
          'http://localhost:3006/api/companies',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.entreprise)
          }
        );

        if (response.ok) {

          alert('Entreprise ajoutée');

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
@import url('./../../assets/css/Entreprise/AjoutEntreprise.css');
</style>