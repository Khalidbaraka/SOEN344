import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

const DoctorRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        localStorage.getItem('userToken') ? (
            JSON.parse(localStorage.getItem('userToken')).permitNumber ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        message: "Sorry, you do not have permission to access this page. You are not logged in as a Doctor. Please try again",
                        fromPath: props.location,
                        tab: 'doctor'
                    }
                }} />
            )) : (
            <Redirect to={{
                pathname: '/login',
                state: {
                    message: "You are not logged in. Please log in with with your permit number and try again",
                    fromPath: props.location,
                    tab: 'doctor'
                }
            }} />
        )
    )} />
);

export default DoctorRoute;