<script setup>
    const currentYear = new Date().getFullYear();
</script>

<template>
    <footer>
        <p>Copyright © {{ currentYear }} Your Company. All rights reserved.</p>
    </footer>
</template>

<style scoped>
footer {
  line-height: 1.5;
  color: green;
}
</style>