<template>
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonCardItem v-for="i in 3" :key="i" class="animate-pulse" />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <CardItem v-for="course in courses" :key="course.id" :title="course.title" :price="course.price"
            :description="course.description" @purchase="registerCourse(course)" />
    </div>
</template>
<script setup>
import CardItem from '@/components/CardItem.vue'
import SkeletonCardItem from '@/components/SkeletonCardItem.vue'

import { ref, onMounted } from 'vue'

import useEnroll from '@/composables/useEnroll'
const { registerCourse } = useEnroll()

const courses = ref([])
const loading = ref(false)

defineEmits(['purchase'])

const fetchCourses = async () => {

    loading.value = true
    try {
        const response = await fetch('http://localhost:3001/courses')
        courses.value = await response.json()
    }
    finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCourses()
})
</script>