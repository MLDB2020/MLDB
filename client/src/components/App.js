import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/App.css';
import SignIn from './SignIn';
import Register from './Register';
import NoMatch from './NoMatch';
import Layout from './Layout';

function App() {
  return (
    <React.Fragment>
        <NavBar />
        <Layout>
            <Router>
                <Switch>
                    <Route path="/signin" component={ SignIn }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/nomatch" component={ NoMatch }/>
                </Switch>
            </Router>
        </Layout>
    </React.Fragment>
  );
}

export default App;
