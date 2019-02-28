import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Login from './Login/Login';

class AppNavbar extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        isOpen: false,
      }
    }

    toggle = (e) => {
      e.preventDefault();
      var isOpen = this.state.isOpen;

      this.setState({
        isOpen: !isOpen
      })
    }
    
    render() {
        const { isOpen } = this.state; 

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" onClick={this.toggle} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={(!isOpen ? 'collapse' : '') + ' navbar-collapse'} id="navbarTogglerDemo01">
                  <a className="navbar-brand" href="#">SOEN 344</a>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                      <Link to={'/'} className="nav-link"> Home </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/about'} className="nav-link"> About </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/items'} className="nav-link"> Items </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to={'/login'} className="nav-link"> Login </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/signup'} className="nav-link"> Sign Up </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
        );
    }
}

export default AppNavbar;