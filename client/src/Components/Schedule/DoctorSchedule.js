import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from 'react-big-scheduler';
import DoctorHomepage from '../Homepage/DoctorHomepage';
import 'react-big-scheduler/lib/css/style.css';
import Button from 'react-bootstrap/Button';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);


        this.state = {
            permitNumber: '',
            appointments: '',
            schedules: [],
            timeslot: '',
            isAuthenticated: true,
            viewModel: schedulerData
        }

        let resources = [
            {
                id: 'r1',
                name: 'Doctor'
            },
        ];

        schedulerData.setResources(resources);

        let events = [
            {
                id: 1,
                start: '2017-12-18 09:30:00',
                end: '2017-12-19 23:30:00',
                resourceId: 'r1',
                title: 'I am finished',
                bgColor: '#D9D9D9'
            },
            {
                id: 2,
                start: '2017-12-18 12:30:00',
                end: '2017-12-26 23:30:00',
                resourceId: 'r2',
                title: 'I am not resizable',
                resizable: false
            },
            {
                id: 3,
                start: '2017-12-19 12:30:00',
                end: '2017-12-20 23:30:00',
                resourceId: 'r3',
                title: 'I am not movable',
                movable: false
            },
            {
                id: 4,
                start: '2017-12-19 14:30:00',
                end: '2017-12-20 23:30:00',
                resourceId: 'r1',
                title: 'I am not start-resizable',
                startResizable: false
            },
            {
                id: 5,
                start: '2017-12-19 15:30:00',
                end: '2017-12-20 23:30:00',
                resourceId: 'r2',
                title: 'R2 has recurring tasks every week on Tuesday, Friday',
                rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
                bgColor: '#f759ab'
            }
        ];
        schedulerData.setEvents(events);
    }

    componentDidMount() {
        let string = localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        //store schedules in an array of timeslots that is compatible with timeslots below
        axios.get(`/api/doctors/${jsonToken['permitNumber']}/schedule/get`)
            .then((res) => {
                this.setState({
                    schedules: res.data
                })
            }).catch(err =>
                console.log(err)
            );

    }


    prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }


    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    render() {
        const { viewModel } = this.state;

        let stylePosition = {
            top: 0,
            left: 0,
            padding: 0,
            verticalAlign: "top",
            height: 100,
        };


        return (




            <div>
                <table>
                    <tbody>
                    <tr>
                        <td style={stylePosition}>
                            <nav className="navbar-user navbar-expand-lg navbar-dark bg-dark">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link to={'/homepage/doctor/schedule'} className="nav-link"> My Schedule </Link>
                                    </li>
                                </ul>
                            </nav>
                        </td>
                        <td style={stylePosition}>
                            <Scheduler schedulerData={viewModel}
                                prevClick={this.prevClick}
                                nextClick={this.nextClick}
                                onSelectDate={this.onSelectDate}
                                onViewChange={this.onViewChange}
                                eventItemClick={this.eventClicked}
                            />
                            <Button type="submit">Add Availability</Button>
                        </td>
                    </tr>
                    </tbody>






                </table>

            </div>

        );
    }



}






export default DoctorSchedule;