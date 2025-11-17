import { createApp } from 'vue'
import MessageContainer from './MessageContainer.vue'

let seed = 1

const container = document.createElement('div')
document.body.appendChild(container)

const app = createApp(MessageContainer)
const instance = app.mount(container)

function show(text: string, type: string, duration = 2500) {
    const id = seed++

    const count = (instance as any).getCount()
    const offset = count * 60

    ;(instance as any).add({
        id,
        text,
        type,
        duration,
        offset
    })
}

export const message = {
    info(text: string, duration?: number) {
        show(text, 'info', duration)
    },
    success(text: string, duration?: number) {
        show(text, 'success', duration)
    },
    warning(text: string, duration?: number) {
        show(text, 'warning', duration)
    },
    error(text: string, duration?: number) {
        show(text, 'error', duration)
    },
    loading(text: string, duration?: number) {
        show(text, 'loading', duration)
    }
}
