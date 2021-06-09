import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar, HomePage } from './components';
import { Sell, SearchPart, ChargeCoin } from './components';
import { LogIn, SignUp } from './components';
import './App.css';

import CreateBook from './components/CreateBook.js';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import AddCarToBlockChain from './components/AddCarToBlockChain'
import AddCarToBlockChainProto from './components/AddCarToBlockChainProto'

import {SellPage} from './components';



class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <hr/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/create-car' component={AddCarToBlockChain} />
          <Route path='/create-car-proto' component={AddCarToBlockChainProto} />

          <Route path='/sell-car' component={Sell} />
          <Route path='/search-part' component={SearchPart} />
          <Route path='/add-coin' component={ChargeCoin} />
          <Route path='/login' component={LogIn} />
          <Route path='/sign-up' component={SignUp} />

          <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} />
          <Route path='/book-list' component={ShowBookList}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
