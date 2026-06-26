import { createRouter, createWebHistory } from 'vue-router'
const Accueil = () => import('../views/Accueil/Accueil.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Entreprises = () => import('../views/Entreprise/Entreprise.vue')
const Actifs = () => import('../views/Actif/Actif.vue')
const Vulnerabilite = () => import('../views/Vulnerabilite/Vulnerabilite.vue')
const Rapport = () => import('../views/Rapport/Rapport.vue')
const AjoutEntreprise = () => import('../views/Entreprise/FormAjoutEntreprise.vue')
const ModifEntreprise = () => import('../views/Entreprise/FormModifEntreprise.vue')
const AjoutActif = () => import('../views/Actif/FormAjoutActif.vue')
const ModifActif = () => import('../views/Actif/FormModifActif.vue')
const AjoutVulnerabilite = () => import('../views/Vulnerabilite/FormAjoutVulnerabilite.vue')


const routes = [
    { path: '/', component: Accueil },
    { path: '/dashboard', component: Dashboard },
    { path: '/entreprises', component: Entreprises },
    { path: '/entreprises/add', component: AjoutEntreprise },
    { path: '/entreprises/:id/edit', component: ModifEntreprise },
    {
        path: '/actifs',
        component: Actifs,
    },
    {
        path: '/actifs/add',
        component: AjoutActif,
    },
    {
        path: '/actifs/:id/edit',
        component: ModifActif,
    },
    {
        path: '/vulnerabilites',
        component: Vulnerabilite,
    },
    {
        path: '/vulnerabilites/add',
        component: AjoutVulnerabilite,
    },
    {
        path: '/rapport',
        component: Rapport,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
