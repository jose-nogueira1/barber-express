import React from "react";
import { NavLink as NLink } from "react-router-dom"

export default class MainNavbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          {this.props.canGoBack && 
          <button tag={NLink} to={"/"}>{"<"}</button>}
          <h1>{this.props.children}</h1>
        </nav>
      </div>
    )
  }
}