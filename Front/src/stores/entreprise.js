import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config/api'

export const useEntrepriseStore = defineStore('entreprise', () => {
  const entreprises = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchEntreprises = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_BASE_URL}/companies`)

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des entreprises')
      }

      entreprises.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchEntrepriseById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`)

    if (!response.ok) {
      throw new Error("Erreur lors du chargement de l'entreprise")
    }

    return await response.json()
  }

  const ajouterEntreprise = async (entreprise) => {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entreprise)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de l'ajout de l'entreprise")
    }

    return await response.json()
  }

  const modifierEntreprise = async (id, entreprise) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entreprise)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de la modification de l'entreprise")
    }

    return await response.json()
  }

  const supprimerEntreprise = async (id) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }

    entreprises.value = entreprises.value.filter(
      (entreprise) => entreprise.entreprise_id !== id
    )
  }

  return {
    entreprises,
    loading,
    error,
    fetchEntreprises,
    fetchEntrepriseById,
    ajouterEntreprise,
    modifierEntreprise,
    supprimerEntreprise
  }
})
