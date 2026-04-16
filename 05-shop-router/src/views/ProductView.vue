<template>
    <h1>Product Details: {{ route.params.id }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>