import { createApp } from 'vue'
import Dashboard from './components/Dashboard.vue'

export function mount(el) {
    const app = createApp(Dashboard)
    app.mount(el)
}

if (process.env.NODE_ENV !== 'production') {
    const el = document.getElementById('__dashboard-dev-root')
    if (el) {
        mount(el)
    }
}
