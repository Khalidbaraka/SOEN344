import React, { Component } from 'react';
import './NurseLogin.css';


class NurseLogin extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center m-5"> Welcome to the Nurse Login page </h1>

                <div class="container">
                    <div class="row">
                        <div class="col-md-offset-5 col-md-3">
                            <div class="form-login">
                            <h4>Welcome Nurse</h4>
                            <input type="text" id="userName" class="form-control input-sm chat-input top-buffer" placeholder="username" />
                        
                            <input type="text" id="userPassword" class="form-control input-sm chat-input top-buffer" placeholder="password" />
                            
                            <div class="wrapper">
                            <span class="group-btn">     
                                <a href="#" class="btn btn-primary btn-md top-buffer">login <i class="fa fa-sign-in"></i></a>
                            </span>
                            </div>
                            </div>
                        
                        </div>
                        <div class="col-md-offset-5 col-md-3">
                            <div class="form-login">
                            <h4>Sign Up</h4>
                            <input type="text" id="userName" class="form-control input-sm chat-input top-buffer" placeholder="username" />
                        
                            <input type="text" id="userPassword" class="form-control input-sm chat-input top-buffer" placeholder="password" />
                            
                            <div class="wrapper">
                            <span class="group-btn">     
                                <a href="#" class="btn btn-primary btn-md top-buffer">Sign Up <i class="fa fa-sign-in"></i></a>
                            </span>
                            </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default NurseLogin;