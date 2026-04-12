<template>
    <CardSection>
        <template #header>
            {{ title }}
        </template>
        <template #default>
            {{ price }}
        </template>
        <template #footer>
            <p>{{ description }}</p>
            <div class="flex justify-end">
                <RoundedButton @click="$emit('purchase')">Purchase</RoundedButton>
            </div>
        </template>
    </CardSection>
</template>

<script setup>
import CardSection from '@/components/CardTemplate.vue'
import RoundedButton from '@/components/RoundedButton.vue'

defineProps({
    title: String,
    price: Number,
    description: String
})

defineEmits(['purchase'])
</script>