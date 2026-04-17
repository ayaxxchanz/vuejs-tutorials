<template>
    <div>
        <h2 class="text-2xl mb-4">Privacy</h2>
        <form class="space-y-4 mx-auto" @submit.prevent="save">
            <div class="flex items-center gap-1">
                <input type="checkbox" v-model="privacy.searchIndexing" id="searchIndex"/>
                <label for="searchIndex">Search engine indexing</label>
            </div>

            <div>
                <label class="mb-1">Visibility</label>
                <select v-model="privacy.visibility">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>
            </div>

            <button type="submit" class="btn-primary">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useSettings } from '@/composables/useSettings'
import { useToasts } from '@/composables/useToasts'

const { privacy } = useSettings()
const { addToasts } = useToasts()

const save = () => {
    addToasts("Privacy Settings Saved.")
}


</script>