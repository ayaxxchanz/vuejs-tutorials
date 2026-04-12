<template>
    <div>
        <button @click="$emit('tekan')"
            :class="['rounded-full border px-4 cursor-pointer duration-100', variants[variant] ?? variants.default]">
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
const variants = {
    default: 'border-gray-200 hover:bg-gray-200',
    danger: 'border-red-200 bg-red-200 text-red-900 hover:bg-red-100'
}

defineProps({
    variant: {
        type: String,
        default: 'default'
    }
})

defineEmits(['tekan'])
</script>