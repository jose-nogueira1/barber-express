import React, { Component } from 'react';
import MainNavbar from "../../MainNavbar"
import api from "../../api";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import MainFooter from '../../Mainfooter';

mapboxgl.accessToken = "pk.eyJ1IjoiaWFtYWxpdHRsZWtpZCIsImEiOiJjanVsMWR0dDkxdnF0M3lxamM5cGltajhpIn0.HKbAc83dAXOzVDvmO9Qy3Q"

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
      this.marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(barberShops[i].address.location.coordinates)
        .addTo(this.map)
    }
    // Create a marker on the map with the coordinates ([lng, lat])
  }


  render() {                
    return (
      <div className="Home">
        <MainNavbar>Barber Express</MainNavbar>
        <div className="map" ref={this.mapRef} style={{ height: 400}}></div>
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
      console.log(" barberShops", barberShops)
      console.log(" barberShops", barberShops.address)
      let [lng, lat] = barberShops[0].address.location.coordinates
      this.initMap(barberShops)
    })
    .catch(err => console.log(err))
  }
}
