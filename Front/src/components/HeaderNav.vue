<script setup>
import imageUrl from '@/assets/img/logo_cybertwin.png'
</script>

<template>
    <header>
        <div>
            <router-link to="/">Accueil</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/entreprises">Entreprise</router-link>
            <router-link to="/actifs">Actifs</router-link>
            <router-link to="/vulnerabilites">Vulnérabilités</router-link>
            <router-link to="/rapport">Rapport</router-link>
        </div>
        <div>
                <img :src=imageUrl alt="Logo CyberTwin" style="width: 125px;height: auto;">
        </div>
    </header>
</template>

<style scoped>
header{
    width: 100%;
    /* border-bottom: 2px solid black; */

    /* Position */
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

header>div:first-child{
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px 0 15px 0;
    gap: 15px;
}
header>div:first-child a{
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
    background-color: #66dfe1;
    border-radius: 50px;
}

header>div:first-child a:hover{
    transform: translateX(5px);
    box-shadow: -1px 1px 1px rgba(3, 7, 18, 0.01),
    -5px 3px 6px rgba(3, 7, 18, 0.02),
    -12px 6px 13px rgba(3, 7, 18, 0.02),
    -20px 11px 23px rgba(3, 7, 18, 0.03),
    -32px 17px 36px rgba(3, 7, 18, 0.04);
    transition: 0.25s ease-in-out;
}


header>div:last-child{
    width: 25%;
    display: flex;
    justify-content: end;
    align-items: center;
}

header>div:last-child>a{
    margin-top: 15px;
}
</style>