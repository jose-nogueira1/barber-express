import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class AddAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="AddAppointment">
        <MainNavBar canGoBack>Book Appointment</MainNavBar>
        <MainFooter />
      </div>
    );
  }
}