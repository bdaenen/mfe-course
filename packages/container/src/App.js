import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Progress from './components/Progress'
import {
    StylesProvider,
    createGenerateClassName,
} from '@material-ui/core/styles'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
    productionPrefix: 'ct',
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => {
                                    setIsSignedIn(true)
                                }}/>
                            </Route>
                            <Route component={MarketingLazy} path="/" />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}
