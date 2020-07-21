import React, { Component } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Home from './Container/Home';
import Header from './ui/Header';
import FilterSearch from './Container/SearchPage/searchPage';
import ResDetails from './Container/ResDetails/ResDetails';
class App extends Component {
  render(){

    return (
      <BrowserRouter>
        <Switch>
           <Route exact path='/' render={()=>(
             <Redirect to='/home'/>
           )}/>
           <Route exact path='/home' component={Home}/>
           <Route exact path='/restaurantSearchPage' component={FilterSearch}/>
           <Route exact path='/restaurant/:id' component={ResDetails}/>
        </Switch>
      </BrowserRouter>
    );

  } 
}

export default App;
