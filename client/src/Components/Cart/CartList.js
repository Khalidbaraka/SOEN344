import {Button, ButtonGroup, Table} from 'react-bootstrap';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

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

    function formatRoom(clinicName) {
        let formatClinicName = clinicName.toString().slice("_");
        return formatClinicName[0];
    }

    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <Table responsive bordered hover style={{color: "#344955"}} className="text-center shadow p-3 mb-5 bg-white rounded">
            <thead style={{backgroundColor: "#344955", color: "#fff"}}>
            <tr>
                <th scope="col"></th>
                <th scope="col"> Clinic </th>
                <th scope="col"> Room </th>
                <th scope="col"> Type </th>
                <th scope="col"> Date </th>
                <th scope="col"> Duration </th>
                <th scope="col"> Price </th>
            </tr>
            </thead>
            <tbody>
            {
                appointments && appointments.length > 0 ?
                    (
                        appointments.map(appointment => {
                            return (
                                <tr key={appointment._id}>
                                    <td style={{backgroundColor: "#344955"}}>
                                        <ButtonGroup>
                                            <Button
                                                onClick={() => props.handleShow(appointment)}
                                                type="button"
                                                variant="outline-light"
                                                size="sm">
                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                            </Button>
                                            <Button
                                                onClick={() => props.handleDelete(appointment)}
                                                type="button"
                                                variant="outline-light"
                                                size="sm">
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                    <td> {appointment.clinic} </td>
                                    <td> {formatRoom(appointment.room)} </td>
                                    <td> {formatType(appointment.duration)} </td>
                                    <th> {formatDate(appointment.start)} </th>
                                    <td> {appointment.duration + " minutes"} </td>
                                    <td> {appointment.duration+ "$"} </td>
                                </tr>
                            )
                        })
                    ) : (
                        <td colSpan="8">
                            <div className="my-3 font-weight-bold"> Your Cart is Empty.
                            <Link className="primary-color text-decoration-none mx-3 font-weight-bold"
                                  to="/homepage/patient/scheduleAppointment"> Schedule an Appointment ? </Link>
                            </div>
                        </td>
                    )
            }
            </tbody>

        </Table>
    )
}

export default CartList;