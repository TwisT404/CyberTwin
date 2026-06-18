<template>
    <!-- <p v-if="loading" class="loading">
        Chargement...
    </p> -->
    <h1>Entreprises</h1>

</template>

<script>
    const { createApp } = Vue
    createApp({
        data() {
            return {
                // products: [],
                // newTitle: '',
                // newPrice: '',
                // loading: false,
                // error: ""
            }
        },
        methods: {
            
            async loadProducts() {

                // const response = await fetch('https://fakestoreapi.com/products')
                // const data = await response.json()
                // this.products = data
            },

        },
        mounted() {
            this.loadProducts()
        }
    }).mount('#app');
    

    
</script>