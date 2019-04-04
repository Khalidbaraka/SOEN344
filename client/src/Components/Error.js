import React, {Component} from 'react';
import {Alert} from "react-bootstrap";

class Error extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    componentDidMount = () => {
        const { message }  = this.props.location.state ? this.props.location.state : '';

        this.setState({
            message: message
        });
    }

    render() {
        const { message } = this.state;

        return (
            <div className="container">
                { message ?
                    <Alert variant="light" className="mt-4">
                        <h5 style={{color: "#800020"}} className="text-monospace text-center">{ message }</h5>
                    </Alert>
                    : ''}
            </div>
        );
    }
}

export default Error;