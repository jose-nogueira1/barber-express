import React, { Component } from "react";
import MainNavBar from "../../MainNavbar";
import MainFooter from "../../Mainfooter";
import "./Barbershop.css";
import api from "../../api";

export default class BarberShopProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barbershop: null,
      date: new Date(),
      availableTimes: []
    };
  }
  convertToReadbleHour(hourAndMinutes) {
    let h = Math.floor(hourAndMinutes / 60);
    let m = hourAndMinutes % 60;
    if (m < 10) m = "0"+m
    return h + ":" + m;
  }
  bookAppoitment(hourAndMinutes) {
    console.log(this.state.date, hourAndMinutes)
    let body = {
      _barberShop: this.props.match.params.barberShopId,
      date: this.state.date,
      hourAndMinutes
    }
    api.addAppointment(body) 
      .then(data => {
        console.log("TCL: BarberShopProfile -> bookAppoitment -> data", data)
        this.componentDidMount()
      })
  }
  incrementDate(delta) {
    let copyDate = new Date(this.state.date)
    copyDate.setDate(copyDate.getDate()+delta)
    this.setState({
      date: copyDate
    }, () => {
      this.componentDidMount()
    })
  }
  render() {
    return (
      <div className="BarberShopProfile">
        <MainNavBar>BarberShop</MainNavBar>
        <div className="barbershop-info">
          {this.state.barbershop && (
            <div>
              <img src={this.state.barbershop.logo} alt="" height="150px;" />
              <div>
                <h1>{this.state.barbershop.name}</h1>
                <p>
                  <strong>Address:</strong>{" "}
                  {this.state.barbershop.address.placename}
                </p>
                <ul>
                  <li>
                    <strong>Monday - Friday:</strong>{" "}
                    {this.state.barbershop.workingHours.workingHourMonBegin}:00 -{" "}
                    {this.state.barbershop.workingHours.workingHourMonEnd}:00
                  </li>
                  <li>
                    <strong>Saturday:</strong>{" "}
                    {this.state.barbershop.workingHours.workingHourSatBegin}:00 -{" "}
                    {this.state.barbershop.workingHours.workingHourSatEnd}:00
                  </li>
                  <li>
                    <strong>Sunday:</strong>{" "} Not Open
                  </li>
                </ul>
              </div>

              <div>
                <h2>Book an appointment</h2>
                <button className="day" onClick={()=>this.incrementDate(-1)}>{"<"}</button>
                {this.state.date.toLocaleDateString()}
                <button className="day" onClick={()=>this.incrementDate(1)}>{">"}</button>

                <ul>
                  {this.state.availableTimes.map(time => time.status === "Available" && (
                    <li key={time.hourAndMinutes}>
                      {this.convertToReadbleHour(time.hourAndMinutes)} -{" "}
                      {/* {" "}  */}
                      {time.status === "Available" && <button className="book" onClick={()=>this.bookAppoitment(time.hourAndMinutes)}> Book </button>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <MainFooter />
      </div>
    );
  }

  componentDidMount() {
    Promise.all([
      api.getBarberShop(this.props.match.params.barberShopId),
      api.getAvailableTimes(this.props.match.params.barberShopId, this.state.date)
    ])
      .then(([barbershop, availableTimes]) => {
        this.setState({
          barbershop: barbershop,
          availableTimes: availableTimes
        });
      })
      .catch(err => console.log(err));
  }
}
