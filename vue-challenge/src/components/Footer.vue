<script setup>
    import { ref } from 'vue'
    const href = ref("https://google.com")
</script>

<template>
    <footer>
        <!-- v-bind: can also be written as just : but for href, if the variable name is 'href', then can be used directly -->
        Created by <span><a :href target="_blank">Professor Pickle</a></span> &copy; 2025
    </footer>
</template>

<style scoped>
footer {
    position: fixed;
    margin: 0 auto;
    bottom: 0;
    text-align: center;
    color: #CCD6D9;
    padding-bottom: 20px;
}

span {
    font-family: cursive;

}

a{
    color: white;
}
</style>