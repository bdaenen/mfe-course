import { mount } from 'dashboard/DashboardApp'
import React, { useRef, useEffect } from 'react'

export default function DashboardAppWrapper() {
    const ref = useRef(null)

    useEffect(() => {
        mount(ref.current)
    }, [ref, history])

    return <div ref={ref} />
}
