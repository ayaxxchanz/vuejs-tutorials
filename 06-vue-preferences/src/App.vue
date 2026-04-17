<template>
  <div class="max-w-2xl mx-auto p-4">
    <nav class="text-center border-b border-gray-400 text-lg mb-4">
      <ul class="flex flex-wrap">
        <li v-for="tab in tabs" :key="tab.key">
          <TabButton @click="currentTab = tab.key" :tab="tab" :current-tab="currentTab" />
        </li>
      </ul>
    </nav>

    <FadeTransition>
      <component :is="currentActiveComponent"></component>
    </FadeTransition>

    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Tab, TabKey } from '@/types';
import TabButton from '@/components/TabButton.vue';
import GeneralSettings from '@/components/GeneralSettings.vue';
import NotificationsSettings from '@/components/NotificationsSettings.vue';
import PrivacySettings from '@/components/PrivacySettings.vue';
import FadeTransition from '@/components/FadeTransition.vue';
import ToastNotifications from '@/components/ToastNotifications.vue';

const currentTab = ref<TabKey>('General')

const tabs: Tab[] = [
  {
    key: 'General',
    label: 'General',
    component: GeneralSettings
  },
  {
    key: 'Notifications',
    label: 'Notifications',
    component: NotificationsSettings
  },
  {
    key: 'Privacy',
    label: 'Privacy',
    component: PrivacySettings
  }
]

const currentActiveComponent = computed(
  () => tabs.find((tab) => tab.key === currentTab.value)?.component
)
</script>

