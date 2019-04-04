import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

const DoctorRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        localStorage.getItem('userToken') ? (
            JSON.parse(localStorage.getItem('userToken')).accessID ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/error',
                    state: {
                        message: "Sorry, you do not have permission to access this page. You are not logged in as a Nurse. Please log out first and try again"
                    }
                }} />
            )) : (
            <Redirect to={{
                pathname: '/login',
                state: {
                    message: "You are not logged in. Please log in with with your access ID and try again",
                    fromPath: props.location,
                    tab: 'nurse'
                }
            }} />
        )
    )} />
);

export default DoctorRoute;