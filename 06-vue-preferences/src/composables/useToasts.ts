import { ref } from 'vue'

interface ToastNotifications{
    id: number,
    message: string
}

const notifications = ref<ToastNotifications[]>([])

const addToasts = (message: string) => {
    const id = Date.now()

    notifications.value.push({
        id,
        message
    })

    setTimeout(() => removeToasts(id), 3000)
}

const removeToasts = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id != id)
}

export function useToasts(){
    return { notifications, addToasts, removeToasts }
}