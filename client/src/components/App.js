import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import SignIn from './SignIn';
import Register from './Register';
import NavBar from './NavBar';
import Footer from './Footer';
import Movies from './Movies';

const API_Key = process.env.REACT_APP_TMDB_API_KEY;
const API_NowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}&language=en-US`;
const API_Query = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=`;

function App() {
  const [ nowPlaying, setNowPlaying ] = useState([]);
  const [ search, setSearch ] = useState([]);
  const [ isQuery, setIsQuery ] = useState(false);
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  
  // const [ user, setUser ] = useState({
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   userName: "",
  // });
  
  const getNowPlaying = () => {
    fetch(API_NowPlaying)
    .then(res => res.json())
    .then(data => {
      setNowPlaying(data.results);
      console.log(data.results);
    });
  };

  const getSearch = (query) => {
    fetch(API_Query + query)
    .then(res => res.json())
    .then(data => {
      setSearch(data.results);
    });
  };

  useEffect((onSearch) => {
    getNowPlaying();
    getSearch(onSearch); 
  }, []);

  const onSearch = e => {
    e.preventDefault();
    const query = e.target.value;
    if (query) {
      setIsQuery(true);
      getSearch(query);
    } else {
      setIsQuery(false);
    }
  };

  // const loadUser = data => {
  //   setUser({
  //     id: data.id,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     userName: data.userName,
  //   })
  // };

  const onSignChange = route => {
    if (route === "loggedIn") {
      setIsSignedIn(true);
    } else if (route === "loggedOut") {
      setIsSignedIn(false);
    }
  }

  return (
    <div className="app">
      <NavBar onSearch={ onSearch } isSignedIn={ isSignedIn } setIsSignedIn={ setIsSignedIn }/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Movies movies={ isQuery ? search : nowPlaying }/>
          </Route>
          <Route exact path="/signin">
            <SignIn onSignChange={ onSignChange } isSignedIn={ isSignedIn } />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
