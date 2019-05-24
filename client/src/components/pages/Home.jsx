import React, { Component } from 'react';
import MainNavbar from "../../MainNavbar"
import MainFooter from '../../Mainfooter';
import { Link } from "react-router-dom";
import api from "../../api";
import "./Home.css"
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barberShops: []
    }
    this.mapRef = React.createRef()
    this.map = null
    this.marker = null
  }

  initMap(barberShops) { // NEW METHOD
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-9.1406,38.7085568],
      zoom: 10
    })

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())



    for (let i = 0; i < barberShops.length; i++) {
      var popup = new mapboxgl.Popup()
      .setHTML(`
        <div class="barbershop">
          <img src=${barberShops[i].logo} alt="" />
          <div class="barbershopinfo">
            <strong>Name: </strong>${barberShops[i].name} <br />
            <strong>Address: </strong>${barberShops[i].address.placename} <br />
            <a href="/barbershop/${barberShops[i]._id}">Check Barbershop</a>
          </div>
        </div>
      `)
      this.marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(barberShops[i].address.location.coordinates)
        .setPopup(popup)
        .addTo(this.map)
    }
    // Create a marker on the map with the coordinates ([lng, lat])
  }


  render() {                
    return (
      <div className="Home">
        <MainNavbar>Barber Express</MainNavbar>
        <div className="map" ref={this.mapRef}></div>
        <MainFooter />
      </div>
    );
  }

  componentDidMount() {
    api.getBarberShops()
    .then(barberShops => {
      this.setState({
        barberShops: barberShops
      })
      let [lng, lat] = barberShops[0].address.location.coordinates
      this.initMap(barberShops)
    })
    .catch(err => console.log(err))
  }
}
