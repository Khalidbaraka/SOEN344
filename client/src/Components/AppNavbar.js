import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        isOpen: false,
      }
    }

    toggle = (e) => {
      e.preventDefault();
      const isOpen = this.state.isOpen;

      this.setState({
        isOpen: !isOpen
      });
    };
    
    render() {
        const { isOpen } = this.state; 
        const user = JSON.parse(localStorage.getItem('userToken'));
    
        return (
            <div clas>
                <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 rounded" style={{backgroundColor: "#344955"}}>
                <button className="navbar-toggler" onClick={this.toggle} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={(!isOpen ? 'collapse' : '') + ' navbar-collapse'} id="navbarTogglerDemo01">
                  <a className="navbar-brand text-light" href="#"> Clinic </a>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    { localStorage.getItem('userToken') ? (
                      user.healthCardNumber ? (
                        <li className="nav-item">
                          <Link to={'/homepage/patient'} className="nav-link text-light"> Home </Link>
                        </li> 
                      ) : user.accessID ? (
                        <li className="nav-item">
                          <Link to={'/homepage/nurse'} className="nav-link text-light"> Home </Link>
                        </li>  
                      ) : user.permitNumber ? ( 
                        <li className="nav-item">
                          <Link to={'/homepage/doctor'} className="nav-link text-light"> Home </Link>
                        </li> 
                      ) : (
                        <li className="nav-item active">
                          <Link to={'/'} className="nav-link text-light"> Home </Link>
                        </li>
                      )
                    ) : ''}

                </ul>
                  { localStorage.getItem('userToken') ? (
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                      <li className="nav-item">
                        <span className="nav-link text-light"> { user.firstName } { user.lastName } </span>
                      </li>
                        {user.healthCardNumber ? (
                            <li className="nav-item">
                                <Link to={'/cart'} className="nav-link text-light"> Cart </Link>
                            </li>
                            )
                            : ""
                        }
                      <li className="nav-item">
                        <Link to={'/logout'} className="nav-link text-light"> Logout </Link>
                      </li>
                    </ul>   
                  ) : ( 
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                      <li className="nav-item">
                        <Link to={'/login'} className="nav-link text-light"> Login </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/signup'} className="nav-link text-light"> Sign Up </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </nav>
            </div>
        );
    }
}

export default AppNavbar;