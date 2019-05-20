import React from "react";
import { Route, Link } from "react-router-dom"

export default class MainFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <Link to="">Appointments</Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}