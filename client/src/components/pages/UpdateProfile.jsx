import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="UpdateProfile">
        <MainNavBar canGoBack>Update Profile</MainNavBar>
        <MainFooter />
      </div>
    );
  }
}