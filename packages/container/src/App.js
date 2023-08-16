import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Progress from './components/Progress'
import {
    StylesProvider,
    createGenerateClassName,
} from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
    productionPrefix: 'ct',
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
const history = createBrowserHistory()

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard')
        } else {
            history.push('/')
        }
    }, [isSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header
                        isSignedIn={isSignedIn}
                        onSignOut={() => setIsSignedIn(false)}
                    />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy
                                    onSignIn={() => {
                                        setIsSignedIn(true)
                                    }}
                                />
                            </Route>
                            {isSignedIn ? (
                                <Route path="/dashboard">
                                    <DashboardLazy />
                                </Route>
                            ) : null}
                            <Route component={MarketingLazy} path="/" />
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}
