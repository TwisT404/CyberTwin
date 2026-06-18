import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../App.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Entreprises = () => import('../views/Entreprise/Entreprise.vue')
const Actifs = () => import('../views/Actif/Actif.vue')
const Vulnerabilite = () => import('../views/Vulnerabilite/Vulnerabilite.vue')



const routes = [
    { path: '/', component: Dashboard },
    { path: '/entreprises', component: Entreprises },
    {
        path: '/actifs',
        component: Actifs,
    },
    {
        path: '/vulnerabilites',
        component: Vulnerabilite,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
