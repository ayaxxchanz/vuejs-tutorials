<template>
    <button @click="$emit('click')"
        :class="{ 'p-4 border-b-3 cursor-pointer': true, 'border-transparent': !isActive, 'border-blue-600 text-blue-600': isActive }">
        {{ tab.label }}
    </button>
</template>

<script setup lang="ts">
import type { Tab } from '@/types'
import { computed } from 'vue';

const isActive = computed(() => prop.currentTab === prop.tab.key)

const prop = defineProps<{
    currentTab: string,
    tab: Tab
}>()

defineEmits<{
    click: []
}>()
</script>