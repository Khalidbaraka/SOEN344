import React, { Component } from 'react';
import axios from 'axios';

class DoctorLogin extends Component{
	render(){
		console.log("Logging Doctor");
		return(
            <div className="container">
                <h1 className="text-center my-4"> Login as Doctor</h1>

            </div>

        );
	}
}

export default DoctorLogin;