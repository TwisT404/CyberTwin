import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config/api'

export const useActifStore = defineStore('actif', () => {
  const actifs = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchActifs = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_BASE_URL}/assets`)

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

  const fetchActifById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`)

    if (!response.ok) {
      throw new Error("Erreur lors du chargement de l'actif")
    }

    return await response.json()
  }

  const fetchActifsByEntreprise = async (entreprise_id) => {
    const response = await fetch(`${API_BASE_URL}/assets/entreprise/${entreprise_id}`)

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des actifs de cette entreprise')
    }

    return await response.json()
  }

  const ajouterActif = async (actif) => {
    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actif)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de l'ajout de l'actif")
    }

    return await response.json()
  }

  const modifierActif = async (id, actif) => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actif)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de la modification de l'actif")
    }

    return await response.json()
  }

  const supprimerActif = async (id) => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'actif")
    }

    actifs.value = actifs.value.filter((actif) => actif.actif_id !== id)
  }

  return {
    actifs,
    loading,
    error,
    fetchActifs,
    fetchActifById,
    fetchActifsByEntreprise,
    ajouterActif,
    modifierActif,
    supprimerActif
  }
})
