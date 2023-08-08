import  { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'

export default function MarketingAppWrapper() {
    const ref = useRef(null)

    useEffect(() => {
        mount(ref.current)
    }, [ref])

    return <div ref={ref} />
}