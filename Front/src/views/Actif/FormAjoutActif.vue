<template>
  <div class="page">
    <section class="card">
      <h1>Ajouter un actif</h1>
      <p class="subtitle">
        Renseignez les informations de l'actif à enregistrer.
      </p>

      <form @submit.prevent="ajouterActif()">
        <div class="form-group">
          <label for="nom">Nom de l'actif</label>
          <input
            id="nom"
            type="text"
            v-model="actifs.actif_nom"
            placeholder="Ex : Serveur Web"
            required
          />
        </div>

        <div class="form-group">
        <label for="type">Type d'actif</label>

        <select
            id="type"
            v-model="actifs.type"
            required
        >
            <option disabled value="">-- Sélectionner un type --</option>

            <option value="Serveur Web">Serveur Web</option>
            <option value="Base de données">Base de données</option>
            <option value="Poste utilisateur">Poste utilisateur</option>
            <option value="Routeur">Routeur</option>
            <option value="Pare-feu">Pare-feu</option>
            <option value="Application métier">Application métier</option>
        </select>
        </div>

        <div class="form-group">
        <label for="criticite">Criticité</label>

        <select
            id="criticite"
            v-model="actifs.criticite"
            required
        >
            <option disabled value="">-- Sélectionner une criticité --</option>

            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Élevée">Élevée</option>
            <option value="Critique">Critique</option>
        </select>
        </div>

        <div class="form-group">
          <label for="expose">Exposé sur Internet</label>
          <select id="expose" v-model="actifs.est_expose_internet">
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
          </select>
        </div>

        <div class="form-group">
          <label for="entreprise">Entreprise concernée</label>
          <select id="entreprise" v-model.number="actifs.entreprise_id" required>
            <option disabled value="">-- Sélectionner une entreprise --</option>

            <option
            v-for="entreprise in entreprises"
            :key="entreprise.entreprise_id"
            :value="Number(entreprise.entreprise_id)"
            >
              {{ entreprise.entreprise_nom }}
            </option>
          </select>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">
            Ajouter
          </button>

          <router-link to="/actifs" class="btn-secondary">
            Retour
          </router-link>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { useActifStore } from '@/stores/actif'
import { useEntrepriseStore } from '@/stores/entreprise'

export default {

  data() {
    return {
      actifs: {
        actif_nom: '',
        type: '',
        criticite: '',
        est_expose_internet: true,
        entreprise_id: ''
      },
      entreprises: []
    }
  },
  methods: {
    async ajouterActif() {
      const actifStore = useActifStore()

      try {
        await actifStore.ajouterActif(this.actifs)
        alert('Actif ajouté');
        this.$router.push('/actifs')

      } catch (error) {
        console.error(error);
        alert(error.message || 'Erreur de connexion');
      }
    },

    async loadCompanies() {
        const entrepriseStore = useEntrepriseStore()

        try {
            await entrepriseStore.fetchEntreprises()
            this.entreprises = entrepriseStore.entreprises
        } catch (err) {
            console.error(err)
        }
    }

  },

  mounted() {
    this.loadCompanies()
  }

}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f4f7fb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: #1e293b;
}

.subtitle {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  color: #64748b;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.4rem;
}

input,
select {
  padding: 0.9rem 1rem;
  border: 1px solid #dbe3ee;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #fff;
}

input:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  text-decoration: none;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn-primary {
  border: none;
  cursor: pointer;
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #e2e8f0;
  color: #334155;
}

.btn-secondary:hover {
  background: #cbd5e1;
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>