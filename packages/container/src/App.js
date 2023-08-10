import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MarketingAppWrapper from './components/MarketingApp'
import Header from './components/Header'

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <MarketingAppWrapper />
            </div>
        </BrowserRouter>
    )
}