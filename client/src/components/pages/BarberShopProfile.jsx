import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar"
import MainFooter from "../../Mainfooter"
import api from '../../api';


export default class BarberShopProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barbershop: []
    }
  }
  render() {
    return (
      <div className="BarberShopProfile">
        <MainNavBar canGoBack>BarberShop</MainNavBar>

        <MainFooter />
      </div>
    );
  }

  componentDidMount() {
    console.log("this.props", this.props)
    console.log("this.props.match.params.barbershopId", this.props.match.params.barberShopId)
    api.getBarberShop(this.props.match.params.barberShopId)
    .then(barbershop => {
      this.setState({
        barbershop: barbershop
      })
    })
    .catch(err => console.log(err))
  }
}