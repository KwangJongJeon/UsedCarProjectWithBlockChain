import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import { NavBar } from './components';

import logo from './logo.svg';
import './App.css';

import CreateBook from './components/CreateBook.js';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import AddCarToBlockChain from './components/AddCarToBlockChain'

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <hr/>
        <Switch>
          <Route exact path='/' component={ShowBookList} />
          <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} />
          <Route path='/create-car' component={AddCarToBlockChain} />
        </Switch>
      </Router>
    )
  }
}

export default App;
