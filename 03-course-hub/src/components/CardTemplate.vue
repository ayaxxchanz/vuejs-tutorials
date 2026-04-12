<template>
    <RoundedCard>
        <!-- If <template #header> exists, render the slot named header -->
        <div v-if="$slots.header" class="text-xl font-medium border-b border-gray-200 p-2">
            <slot name="header"></slot>
        </div>

        <!-- If slots footer exists, then add the border class. If not exist, just add padding -->
        <div :class="{'p-2':true, 'border-b border-gray-200':$slots.footer}">
            <slot></slot>
        </div>

        <!-- If <template #footer> exists, render the slot named footer -->
        <div v-if="$slots.footer" class="p-2">
            <slot name="footer"></slot>
        </div>
    </RoundedCard>
</template>

<script setup>
import RoundedCard from '@/components/RoundedCard.vue';
</script>