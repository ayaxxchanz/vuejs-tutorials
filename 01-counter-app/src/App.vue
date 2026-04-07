<script setup>
import { ref } from 'vue'

const counter = ref(0);

// or can use function but need to use .value
const decrement = () => {
  counter.value--;
}

</script>

<template>
  <h1>Counter: {{ counter }}</h1>

  <button @click="counter++">Increment +1</button>
  <button @click="counter--">Decrement -1</button>
</template>

<style scoped></style>
