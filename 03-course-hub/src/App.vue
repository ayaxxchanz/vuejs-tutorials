<template>
  <div class="bg-slate-100 p-4">
    <h1 class="text-4xl font-medium">Course Hub</h1>
    <h2 class="text-2xl font-medium">All Courses</h2>
    <CourseSection />
    <h2 class="text-2xl font-medium">Your Courses</h2>
    <EnrolledSection />
  </div>
</template>

<script setup>
import CourseSection from '@/components/CourseSection.vue'
import EnrolledSection from '@/components/EnrolledSection.vue'
</script>

<style scoped></style>