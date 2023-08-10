import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import MarketingAppWrapper from './components/MarketingApp'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
    productionPrefix: 'ct'
})

export default function App() {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header />
                    <MarketingAppWrapper />
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}