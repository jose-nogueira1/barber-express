import React from "react";
import "./MainNavBar.css";
import { Link } from "react-router-dom"

export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
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