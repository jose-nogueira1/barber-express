import React from "react";
import { Link } from "react-router-dom"

export default class MainNavbar extends React.Component {
  
  render() {
    return (
      <div className="navbar">
        <nav>
          {this.props.canGoBack && 
          <button><Link to={"/"}>{"<"}</Link></button>}
          <h1>{this.props.children}</h1>
        </nav>
      </div>
    )
  }
}