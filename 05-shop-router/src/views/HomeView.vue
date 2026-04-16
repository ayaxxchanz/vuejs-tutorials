<template>
    <h1>Welcome to Home Route!</h1>
    <h2>List of Products:</h2>
    <ul>
        <li v-for="product in products" :key="product.id">
            {{ product.name }}
            <button @click="gotToDetails(product.id)" >Got to Details</button>
        </li>
    </ul>
    <p><RouterLink to="/admin">Admin Dashboard</RouterLink></p>
</template>
<script setup>
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const products = [
    {
        id: 1,
        name: "laptop"
    },
    {
        id: 2,
        name: "smartphone"
    },
    {
        id: 3,
        name: "tablet"
    }
]

const gotToDetails = (id) => {
    router.push({name: "product", params: { id }})
}
</script>