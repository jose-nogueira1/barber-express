import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddBarberShop from './pages/AddBarberShop';
import BarberShopProfile from "./pages/BarberShopProfile";
import ManageAppointment from "./pages/ManageAppointment";

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/barbershop/:barberShopId" component={BarberShopProfile} />
          <Route path="/barbershop" component={AddBarberShop} />
          <Route path="/appointments" component={ManageAppointment} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}