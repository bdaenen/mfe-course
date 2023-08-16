import { mount } from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function AuthAppWrapper({onSignIn}) {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const mountedApp = mount(ref.current, {
            onNavigate: nextLocation => {
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
            initialLocation: history.location,
            onSignIn
        })

        history.listen(mountedApp.onParentNavigate)
    }, [ref, history])

    return <div ref={ref} />
}
