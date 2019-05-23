import React, { Component } from "react";
import MainNavBar from "../../MainNavbar";
import MainFooter from "../../Mainfooter";
import Autocomplete from "../../AutocompletePlace";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import { NavLink as NLink } from "react-router-dom";
import api from "../../api";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

export default class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barberShops: []
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.marker = null;
  }

  initMap(barberShops) {
    // NEW METHOD
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-9.1406, 38.7085568],
      zoom: 10
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl());

    for (let i = 0; i < barberShops.length; i++) {
      var popup = new mapboxgl.Popup()
      .setHTML(
        <div className="barbershop">
          <img src="" alt="" />
          <div className="barbershopinfo">
            <p>Name: </p>
            <p>Address: </p>
            <p>Distance: </p>
          </div>
        </div>
      );
      this.marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(barberShops[i].address.location.coordinates)
        .setPopup(popup)
        .addTo(this.map);
    }
    // Create a marker on the map with the coordinates ([lng, lat])
  }

  render() {
    return (
      <div className="SearchMap">
        <MainNavBar canGoBack>Search Map</MainNavBar>
        <Autocomplete onSelect={place => console.log(place)} />
        <div className="map" ref={this.mapRef} style={{ height: 400 }} />
        <MainFooter />
      </div>
    );
  }

  componentDidMount() {
    api
      .getBarberShops()
      .then(barberShops => {
        this.setState({
          barberShops: barberShops
        });
        let [lng, lat] = barberShops[0].address.location.coordinates;
        this.initMap(barberShops);
      })
      .catch(err => console.log(err));
  }
}
