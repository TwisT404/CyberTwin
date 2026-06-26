import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config/api'

export const useRisqueStore = defineStore('risque', () => {
  const dashboard = ref(null)
  const loading = ref(false)
  const error = ref('')

  const fetchDashboard = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_BASE_URL}/risk/dashboard`)

      if (!response.ok) {
        throw new Error('Erreur lors du chargement du tableau de bord')
      }

      dashboard.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Calcule le score de risque d'une entreprise donnée
  const calculerRisque = async (entreprise_id) => {
    const response = await fetch(`${API_BASE_URL}/risk/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entreprise_id })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.erreur || 'Erreur lors du calcul du risque')
    }

    const data = await response.json()
    return data.donnees
  }

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
    calculerRisque
  }
})
