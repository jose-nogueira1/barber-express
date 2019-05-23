import React from "react";
import {  Link } from "react-router-dom";
import api from "./api";



export default class MainFooter extends React.Component {

  componentDidMount() {
    api.isLoggedIn()
  }
  
  render() {
    return (
      <div className="footer">
        <footer>
          {<Link  to="/appointments"><img src="/img/calendar.png" alt=""/></Link>}
          <Link  to="/barbershop"><img src="/img/add.png" alt=""/></Link>
          <Link to="/"><img src="/img/home.png" alt=""/></Link>
          <Link to="/searchmap"><img src="/img/search.png" alt=""/></Link>
          <Link to="/login"><img src="/img/login.png" alt=""/></Link>
          <Link  to="/logout"><img src="/img/logout.png" alt=""/></Link>
        </footer>
      </div>
    )
  }
}