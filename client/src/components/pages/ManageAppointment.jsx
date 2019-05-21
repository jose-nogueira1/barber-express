import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class ManageAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="ManageAppointment">
        <MainNavBar canGoBack>Manage Appointments</MainNavBar>
        <MainFooter />
      </div>
    );
  }
}