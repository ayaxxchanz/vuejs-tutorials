import { ref, watch } from "vue"

const init = <T>(key: string, defaults: T) => {
    const stored = localStorage.getItem(key)

    return stored != null ? JSON.parse(stored) : defaults
}

interface GeneralSettings {
    username: string,
    email: string,
    about: string,
    gender: 'male',
    country: 'USA'
}


interface NotificationsSettings {
    email: boolean,
    sms: boolean
}

type Visibility = 'private' | 'public'

interface PrivacySettings {
    searchIndexing: boolean,
    visibility: Visibility
}

const general = ref<GeneralSettings>(
    init<GeneralSettings>('general', {
        username: '',
        email: '',
        about: '',
        gender: 'male',
        country: 'USA'
    })
)

watch(general, (value) => localStorage.setItem('general', JSON.stringify(value)), { deep: true })


const notifications = ref<NotificationsSettings>(
    init<NotificationsSettings>('notifications', {
        email: false,
        sms: false
    })
)

watch(notifications, (value) => localStorage.setItem('notifications', JSON.stringify(value)), { deep: true })

const privacy = ref<PrivacySettings>(
    init<PrivacySettings>('privacy', {
        searchIndexing: false,
        visibility: 'public'
    })
)

watch(privacy, (value) => localStorage.setItem('privacy', JSON.stringify(value)), { deep: true })

export function useSettings() {
    return { general, notifications, privacy }
}