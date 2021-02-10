import React from "react";
import {Home} from "./views/home";
import {Layout} from "./components/layout";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import {store} from "./store";
import {Theme} from "./theme";
import {BrowserRouter as Router, Route, HashRouter} from "react-router-dom";

const App: React.FunctionComponent = () => (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router>
                    <Layout>
                        <HashRouter basename={process.env.AppUrl}>
                            <Route exact path={""} component={Home} />
                            <Route exact path={"rpg"} component={Home} />
                            <Route exact path={"arcade"} component={Home} />
                            <Route exact path={"brain-games"} component={Home} />
                            <Route exact path={"support"} component={Home} />
                            <Route exact path={"contact-us"} component={Home} />
                        </HashRouter>
                    </Layout>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

export default App;
