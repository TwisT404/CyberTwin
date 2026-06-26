<template>
    <section class="hero">
        <h1>CyberTwin</h1>
        <p class="tagline">Simulateur de risque cyber pour PME</p>
        <p class="description">
            CyberTwin vous permet de modéliser une entreprise fictive, de gérer ses actifs
            informatiques et leurs vulnérabilités, puis d'évaluer automatiquement son niveau
            de risque cyber.
        </p>

        <div class="actions">
            <router-link to="/entreprises" class="card-link">
                <h2>Entreprises</h2>
                <p>Gérer les entreprises modélisées</p>
            </router-link>

            <router-link to="/actifs" class="card-link">
                <h2>Actifs</h2>
                <p>Gérer les actifs informatiques</p>
            </router-link>

            <router-link to="/vulnerabilites" class="card-link">
                <h2>Vulnérabilités</h2>
                <p>Associer des vulnérabilités aux actifs</p>
            </router-link>

            <router-link to="/" class="card-link">
                <h2>Tableau de bord</h2>
                <p>Visualiser le niveau de risque global</p>
            </router-link>

            <router-link to="/rapport" class="card-link">
                <h2>Rapport</h2>
                <p>Générer un rapport de synthèse</p>
            </router-link>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
@import url('./../../assets/css/Accueil/Accueil.css');
</style>
