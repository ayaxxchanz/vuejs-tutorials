<template>
    <div>
        <h2 class="text-2xl mb-4">Notifications</h2>
        <form class="space-y-4 mx-auto" @submit.prevent="save">
            <div class="flex items-center gap-1">
                <input type="checkbox" v-model="notifications.email" id="email" />
                <label for="email">Email notifications</label>
            </div>
            <div class="flex items-center gap-1">
                <input type="checkbox" v-model="notifications.sms" id="sms"/>
                <label for="sms">SMS Notifications</label>
            </div>

            <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useSettings } from '@/composables/useSettings'
import { useToasts } from '@/composables/useToasts'

const { notifications } = useSettings()
const { addToasts } = useToasts()

const save = () => {
    addToasts("Notifications Settings Saved.")
}

</script>