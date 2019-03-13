import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';

const CartList = (props) => {
    
    const appointments = props.appointments;

    function formatType(duration) {

        let type = '';

        if (duration == 20) {
            type = "Walk-in";
        } else {
            type = "Annual";
        }
        return type;
    }

    function formatDate(date) {
            let d = new Date(date);

            let fdate = ("0" + d.getDate().toString()).slice(-2);
            let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
            let year = d.getUTCFullYear().toString();
            let hour = ("0" + (d.getUTCHours() - 4).toString()).slice(-2);
            let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);

            date = fdate + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;

        return  date;
    }

    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <Table striped bordered hover variant="dark my-0">
            <thead>
            <tr>
                <th scope="col"> Type </th>
                <th scope="col"> Date </th>
                <th scope="col"> Duration </th>
                <th scope="col"> Price </th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {
                appointments && appointments.length > 0 ?
                    (
                        appointments.map(appointment => {
                            return (
                                <tr key={appointment._id}>
                                    <td> {formatType(appointment.duration)} </td>
                                    <td> {formatDate(appointment.start)} </td>
                                    <td> {appointment.duration + " minutes"} </td>
                                    <td> {appointment.duration+ "$"} </td>
                                    <td> 
                                        <Button onClick={() => props.handleShow(appointment)} type="button" variant="outline-success" className="mr-3">Checkout</Button> 
                                        <Button onClick={() => props.handleDelete(appointment)} type="button" variant="danger">Delete</Button> 
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        ''                        
                    )
            }
            </tbody>

        </Table>
    )
}

export default CartList;