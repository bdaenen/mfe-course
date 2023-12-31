import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

export function mount(el, { onNavigate, history = null, initialLocation }) {
    if (!history) {
        history = createMemoryHistory({
            initialEntries: [initialLocation]
        })
    }
    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDOM.render(<App history={history} />, el)

    return {
        onParentNavigate(nextLocation) {
            const {
                pathname: nextPathname,
                hash: nextHash,
                search: nextSearch,
            } = nextLocation
            const { pathname, search, hash } = history.location
            if (
                pathname !== nextPathname ||
                hash !== nextHash ||
                search !== nextSearch
            ) {
                history.push(nextLocation)
            }
        },
    }
}

if (process.env.NODE_ENV !== 'production') {
    const el = document.getElementById('__marketing-dev-root')
    if (el) {
        mount(el, { history: createBrowserHistory() })
    }
}
