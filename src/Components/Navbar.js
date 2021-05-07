import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_1.svg"
              height={200}
            />
          </a>
          
        </div>
        
      </nav>
    );
  }
}

export default Navbar;
