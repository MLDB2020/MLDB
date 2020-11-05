import React from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/App.css';
import SignIn from './SignIn';

function App() {
  return (
    <div className="App">
        <NavBar />
        <SignIn />
    </div>
  );
}

export default App;
