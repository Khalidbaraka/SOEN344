import {Button, ButtonGroup, Table} from 'react-bootstrap';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class AppointmentList extends Component {
    constructor(props) {
        super(props);
    }

    formatType = (duration) => {
        let type = '';
        console.log("Duration", duration);

        if (duration === "20") {
            type = "Walk-in";
        } else {
            type = "Annual";
        }
        console.log("Type", type);
        return type;
    }

    formatDate = (date) => {
        let d = new Date(date);

        let fdate = ("0" + d.getDate().toString()).slice(-2);
        let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
        let year = d.getUTCFullYear().toString();
        let hour = ("0" + (d.getUTCHours() - 4).toString()).slice(-2);
        let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);

        date = fdate + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;

        return  date;
    }

    render (){

    let appointments = this.props.appointments;
    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <div>
            <Table responsive bordered hover style={{color: "#344955"}} className="text-center my-0">
                    <thead style={{backgroundColor: "#344955", color: "#fff"}}>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"> Doctor </th>
                            <th scope="col"> Type </th>
                            <th scope="col"> Room N° </th>
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
                                                onClick={() => this.props.onUpdateAppointment(appointment)}
                                                type="button"
                                                variant="outline-light"
                                                size="sm">
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </Button>

                                            <Button
                                                onClick = {() => this.props.deleteItem(appointment._id)}
                                                type="button"
                                                variant="outline-light"
                                                size="sm">
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                    <td> {appointment.doctor } </td>
                                    <td> {this.formatType(appointment.duration)} </td>
                                    <td> {appointment.room} </td>
                                    <th> {this.formatDate(appointment.start)} </th>
                                    <td> {appointment.duration + " minutes"} </td>
                                    <td> {appointment.duration+ "$"} </td>
                                </tr>
                            )
                        })
                    ) : (
                        <td colSpan="8">
                            <div className="my-3 font-weight-bold"> No appointment.
                                <Link className="primary-color text-decoration-none mx-3 font-weight-bold"
                                      to="/homepage/patient/scheduleAppointment"> Schedule an Appointment ? </Link>
                            </div>
                        </td>
                    )
            }
            </tbody>

        </Table>
     </div>
    )}
}

export default AppointmentList;