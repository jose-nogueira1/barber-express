import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class ManageAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: []
    }
  }

  deleteAppointment(appointmentId) {
    api.deleteAppointment(appointmentId)
      .then(appointment => {
        this.componentDidMount() 
      })
      .catch(err => console.log(err))
      // this.setState()
  }

  convertToReadbleHour(hourAndMinutes) {
    let h = Math.floor(hourAndMinutes / 60);
    let m = hourAndMinutes % 60;
    if (m < 10) m = "0"+m
    return h + ":" + m;
  }

  render() {
    return (
      <div className="ManageAppointment">
        <MainNavBar canGoBack>My Appointments</MainNavBar>
        {this.state.appointments.map(appointment =>
          <div className="appointment" key={appointment._id}>
            <p><strong>Barber Shop:</strong> {appointment._barberShop.name}</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString("fr-FR").substr(0,10)}</p>
            <p><strong>Time:</strong> {this.convertToReadbleHour(appointment.hourAndMinutes)}</p>
            <button onClick={()=> this.deleteAppointment(appointment._id)}>Delete</button>
          </div>)}
        <MainFooter />
      </div>
    );
  }

  componentDidMount() {
    api.getAppointments()
    .then(appointments => {
      this.setState({
        appointments: appointments,
      })
    })
    .catch(err => console.log(err))
  }
}