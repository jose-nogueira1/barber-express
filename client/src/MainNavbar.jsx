import React from "react";

export default class MainNavbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          {this.props.canGoBack && <button>{"<"}</button>}
          <h1>{this.props.children}</h1>
        </nav>
      </div>
    )
  }
}