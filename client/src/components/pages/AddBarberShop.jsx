import React, { Component } from 'react';
import api from '../../api';


export default class AddBarberShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      streetAddress: "",
      city: "",
      country: "",
      location: [],
      workingHours: {
        workingHourMonBegin: null,
        workingHourMonEnd: null,
        workingHourTueBegin: null,
        workingHourTueEnd: null,
        workingHourWedBegin: null,
        workingHourWedEnd: null,
        workingHourThuBegin: null,
        workingHourThuEnd: null,
        workingHourFriBegin: null,
        workingHourFriEnd: null,
        workingHourSatBegin: null,
        workingHourSatEnd: null,
        workingHourSunBegin: null,
        workingHourSunEnd: null,
      },
      logo: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      country: this.state.country,
      location: this.state.location,
      workingHours: this.state.workingHours,
      logo: this.state.logo,
    }
    api.addBarberShop(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          streetAddress: "",
          city: "",
          country: "",
          location: "",
          workingHours: "",
          logo: "",
          message: `Your Barbershop '${this.state.name}' has been created`
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
      <div className="AddBarberShop">
        <h2>Add Barber Shop</h2>
        <form>
          Logo: <input type="file" name="logo" /><br/>
          Name: <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          Street: <input type="text" value={this.state.streetAddress} name="streetAddress" onChange={this.handleInputChange} /> <br />
          City: <input type="text" value={this.state.city} name="city" onChange={this.handleInputChange} /> <br />
          Country: <input type="text" value={this.state.country} name="country" onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Create Barber Shop</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}