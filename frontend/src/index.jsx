import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import Header from './components/Header'
import Error from './components/Error'
import Home from './pages/Home/Home';
import Survey from './pages/Survey/Survey'
import Results from './pages/Results/Results'
import Portfolio from './pages/Portfolio/Portfolio'
import PortfolioExample from './pages/PortfolioExample/PortfolioExample'
import Prestation from './pages/Prestation/Prestation'
import Languages from './pages/Languages/Languages'
import Footer from './components/Footer'


import { ThemeProvider, SurveyProvider } from './utils/context'
import GlobalStyle from './utils/style/GlobalStyle'



ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider>
                <SurveyProvider>
                    <GlobalStyle />
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/votre-projet/:questionNumber">
                            <Survey />
                        </Route>
                        <Route path="/resultats">
                            <Results />
                        </Route>
                        <Route path="/portfolio">
                            <Portfolio />
                        </Route>
                        <Route
                            path="/example/:id"
                            render={(props) => <PortfolioExample {...props} />}
                        />
                        <Route
                            path="/prestation/:id"
                            render={(props) => <Prestation {...props} />}
                        />
                        <Route path="/competences">
                            <Languages />
                        </Route>
                        <Route>
                            <Error />
                        </Route>
                    </Switch>
                    <Footer />
                </SurveyProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
