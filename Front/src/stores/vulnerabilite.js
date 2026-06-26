import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config/api'

export const useVulnerabiliteStore = defineStore('vulnerabilite', () => {
  const vulnerabilites = ref([])
  const associations = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchVulnerabilites = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_BASE_URL}/vulnerabilities`)

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des vulnérabilités')
      }

      vulnerabilites.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchAssociations = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_BASE_URL}/vulnerabilities/associations`)

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des associations')
      }

      associations.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchVulnerabilitesByActif = async (actifId) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/actif/${actifId}`)

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des vulnérabilités de cet actif')
    }

    return await response.json()
  }

  const ajouterVulnerabilite = async (vulnerabilite) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vulnerabilite)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de l'ajout de la vulnérabilité")
    }

    return await response.json()
  }

  const modifierVulnerabilite = async (id, vulnerabilite) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vulnerabilite)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Erreur lors de la modification de la vulnérabilité')
    }

    return await response.json()
  }

  const supprimerVulnerabilite = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la vulnérabilité')
    }

    vulnerabilites.value = vulnerabilites.value.filter(
      (vulnerabilite) => vulnerabilite.vulnerabilite_id !== id
    )
  }

  // Associe une vulnérabilité existante à un actif d'une entreprise
  const associerVulnerabilite = async (actif_id, vulnerabilite_id, entreprise_id) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/associer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif_id, vulnerabilite_id, entreprise_id })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || "Erreur lors de l'association de la vulnérabilité")
    }

    return await response.json()
  }

  const dissocierVulnerabilite = async (actif_id, vulnerabilite_id) => {
    const response = await fetch(
      `${API_BASE_URL}/vulnerabilities/dissocier/${actif_id}/${vulnerabilite_id}`,
      { method: 'DELETE' }
    )

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'association")
    }
  }

  return {
    vulnerabilites,
    associations,
    loading,
    error,
    fetchVulnerabilites,
    fetchAssociations,
    fetchVulnerabilitesByActif,
    ajouterVulnerabilite,
    modifierVulnerabilite,
    supprimerVulnerabilite,
    associerVulnerabilite,
    dissocierVulnerabilite
  }
})
