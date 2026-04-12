<template>
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonEnrolledItem v-for="i in 3" :key="i" class="animate-pulse" />
    </div>
    <div v-if="enrolled.length === 0 && !loading">
        <CardTemplate class="text-center italic text-gray-600">You haven't enrolled in any courses.</CardTemplate>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <EnrolledItem v-for="course in enrolled" :key="course.id" :title="course.title" :status="course.status"
            @report="reportCourse(course.id)" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

import SkeletonEnrolledItem from '@/components/SkeletonEnrolledItem.vue'
import EnrolledItem from '@/components/EnrolledItem.vue'
import CardTemplate from '@/components/CardTemplate.vue'

import useEnroll from '@/composables/useEnroll'

const { loading, enrolled, fetchEnrolled, reportCourse } = useEnroll()

onMounted(() => {
    fetchEnrolled()
})
</script>