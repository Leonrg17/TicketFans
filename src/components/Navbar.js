import React, { Component } from 'react';
import './Navbar.css'
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a id='rolling' 
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          TicketFans
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small class="acc"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;