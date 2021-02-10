import React from "react";
import {Home} from "./views/home";
import {Layout} from "./components/layout";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import {store} from "./store";
import {Theme} from "./theme";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App: React.FunctionComponent = () => (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path={`${process.env.AppUrl}`} component={Home} />
                            <Route exact path={`${process.env.AppUrl}rpg`} component={Home} />
                            <Route exact path={`${process.env.AppUrl}arcade`} component={Home} />
                            <Route
                                exact
                                path={`${process.env.AppUrl}brain-games`}
                                component={Home}
                            />
                            <Route exact path={`${process.env.AppUrl}support`} component={Home} />
                            <Route
                                exact
                                path={`${process.env.AppUrl}contact-us`}
                                component={Home}
                            />
                        </Switch>
                    </Layout>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

export default App;
