import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { NavBar, HomePage, DeliveryCarList } from './components';
import { AddCarToBlockChain, ShowCarDetails, SearchPart, ChargeCoin, ShowCarList, UpdateCarPostInfo} from './components';
import { CarMaintenancePage, CarMaintenanceDetails, CarReceipt} from './components';
import { LogIn, SignUp } from './components';
import './App.css';

import CreateBook from './components/CreateBook.js';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import ShowBlockChainDetails from './components/ShowBlockChainDetails'

import {SellPage} from './components';
import MaintenanceReceipt from './components/MaintenanceReceipt';



class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <hr/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/buy-car/:id' component={CarReceipt}/>
          <Route path='/buy-car' component={ShowCarList} />
          <Route exact path="/show-car/:id" component={ShowCarDetails}/>
          <Route path="/show-car/maintenance-receipt/:id" component={MaintenanceReceipt}/>
          <Route path='/sell-car' component={AddCarToBlockChain} />
          <Route path='/edit-car/:id' component={UpdateCarPostInfo} />
          <Route path='/search-part' component={SearchPart} />
          <Route path='/add-coin' component={ChargeCoin} />
          <Route exact path='/maintenance-car' component={CarMaintenancePage}/>
          <Route exact path='/maintenance-car/:id' component={CarMaintenanceDetails}/>
          <Route path='/login' component={LogIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/delivery-car' component = {DeliveryCarList}/>


          <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route exact path='/show-book/:id' component={ShowBookDetails} />
          <Route path='/book-list' component={ShowBookList}/>
        </Switch>
      </Router>
    ) 
  }
}

export default App;
