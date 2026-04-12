<template>
    <CardSection>
        <div class="flex justify-between aligns-center">
            <h3>{{ title }}</h3>
            <div :class="{'animate-pulse': pending}">
                <component :is="icon" :class="{'animate-spin': pending}"></component>
            </div>
            <RoundedButton @click="$emit('report')" variant="danger">Report</RoundedButton>
        </div>
    </CardSection>
</template>

<script setup>
import { computed } from 'vue'

import CardSection from '@/components/CardTemplate.vue'
import RoundedButton from '@/components/RoundedButton.vue'

import { Loader, Check } from '@lucide/vue'

const props = defineProps({
    title: String,
    status: String
})

defineEmits(['report'])

const pending = computed(() => props.status === 'pending')
const icon = computed(() => pending.value ? Loader : Check)
</script>
