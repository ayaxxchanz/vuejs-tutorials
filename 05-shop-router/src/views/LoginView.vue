<template>
    <h1>Login Page</h1>
    <div>
        <input v-model="username" type="text" placeholder="Enter admin username...">
        <button @click="login">Login</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { router, makeLogin } from '@/router/index'

const username = ref('')

const login = () => {
    if(username.value.toLocaleLowerCase() === "admin"){
        makeLogin()
        router.push({name: 'admin'})
    } else {
        alert("Wrong credential")
    }
}
</script>