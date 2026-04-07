<template>
    <main>
        <section>
            <p>First, solve the problem. Then, write the code. </p>
            <span>John Johnson</span>
        </section>
        <button>Another! </button>
        <!-- v-bind: can also be written as just : -->
        <button :disabled="isBtnDisabled">Share </button>
        <section>
            <h2>{{ facts[0].adjective }}</h2>
            <p>{{ facts[0].description }}</p>
        </section>
        <section>
            <h2>{{ facts[1].adjective }}</h2>
            <p>{{ facts[1].description }}</p>
        </section>
        <section>
            <h2>{{ facts[2].adjective }}</h2>
            <p>{{ facts[2].description }}</p>
        </section>
        <section>
            <!-- Absolute path to /public folder -->
             <img src="/images/catmeme1_a.jpg" alt="Cat Meme 1 A">
             <img src="/images/catmeme1_b.jpg" alt="Cat Meme 1 B">
        </section>

        <section>
            <!-- Relative path to /assets folder -->
             <img src="@/assets/images/catmeme2_a.jpg" alt="Cat Meme 2 A">
             <img src="@/assets/images/catmeme2_b.jpg" alt="Cat Meme 2 B">
        </section>
        
        <section>
            <!-- Import asset into component -->
             <img v-bind:src="catmeme3_a" alt="Cat Meme 3 A">
             <img v-bind:src="catmeme3_b" alt="Cat Meme 3 B">
        </section>

    </main>
</template>

<script setup>
    import { ref } from 'vue'
    import catmeme3_a from "@/assets/images/catmeme3_a.jpg"
    import catmeme3_b from "@/assets/images/catmeme3_b.jpg"
    const isBtnDisabled = ref(true)
    const facts = ref([
        {
            "adjective": "Documentation",
            "description": "Vue’s official documentation provides you with all information you need to get started.Vue’s official documentation provides you with all information you need to get started."
        },
        
        {
            "adjective": "Tooling",
            "description": "This project is served and bundled with Vite. The recommended IDE setup is VSCode + Vue - Official. If you need to test your components and web pages, check out Vitest and Cypress / Playwright. More instructions are available in README.md."
        },
        {
            "adjective": "Ecosystem",
            "description": "Get official tools and libraries for your project: Pinia, Vue Router, Vue Test Utils, and Vue Dev Tools. If you need more resources, we suggest paying Awesome Vue a visit."
        },

    ])

</script>

<style scoped>
main {
    background: #CCD6D9;
    max-width: 90%;
    border-radius: 0 15px 0 15px;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

section {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 25px;

}

p {
    font-weight: bold;
    font-style: italic;
    font-size: 2rem;
    text-align: left;

}

p ::before {
    content: '"'
}

p::after {
    content: '"'
}

span {
    align-self: end;
    color: #406473;
}

span::before {
    content: "- "
}

button {
    background: #406473;
    color: white;
    padding: 10px;
    border: 0;
    font-size: 1.2rem;
    border-radius: 0 5px 0 5px;
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.05);
}
button:disabled {
    background: #406473;
    opacity: 0.5;
    cursor: not-allowed;
}
section p{
    font-size: 1.2rem;
}
</style>