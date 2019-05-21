import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class AddAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      hourAndMinutes: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      date: this.state.date,
      hourAndMinutes: this.state.hourAndMinutes,
    }
    api.addAppointment(data)
      .then(result => {
        console.log("SUCCESS!")
        this.setState({
          date: new Date(),
          hourAndMinutes: "",
          message: `Your Appointment has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
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