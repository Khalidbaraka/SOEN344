import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

const PatientRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        localStorage.getItem('userToken') ? (
            JSON.parse(localStorage.getItem('userToken')).healthCardNumber ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/error',
                    state: {
                        message: "Sorry, you do not have permission to access this page. You are not logged in as a Patient. Please log out first and try again"
                    }
                }} />
            )) : (
                <Redirect to={{
                pathname: '/login',
                state: {
                    message: "You are not logged in. Please log in with your health card number and try again",
                    fromPath: props.location
                }
            }} />
        )
    )} />
);

export default PatientRoute;