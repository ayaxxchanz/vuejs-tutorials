<template>
    <h1>Counter B</h1>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment +1</button>
    <button @click="counter.decrement">Decrement -1</button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>