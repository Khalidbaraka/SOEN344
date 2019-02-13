import React, { Component } from 'react';

import logo from '../logo.svg';

class About extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to SOEN344-W2019 Project
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <a 
                    className="App-link"
                    href="https://appdividend.com/2018/11/11/react-crud-example-mern-stack-tutorial/">
                    MERN stack tutorial
                </a>
                </header>
            </div>
        );
    }
}

export default About;