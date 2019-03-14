import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day);

        this.routeChange = this.routeChange.bind(this);
        this.eventClicked = this.eventClicked.bind(this);

        this.state = {
            permitNumber: '',
            appointments: '',
            schedules: [],
            timeslot: [],
            isAuthenticated: true,
            viewModel: schedulerData
        };

        let resources = [
            {
                id: 't',
                name: 'Doctor'
            },
        ];

        schedulerData.setResources(resources);
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
        for (let i = 0; i < this.state.schedules.length; i++) {
            var timeSlotObject = {
                id: this.state.schedules[i]['_id'],
                start: moment(this.state.schedules[i]['start']).format("YYYY-MM-D h:mm:ss A"),
                end: moment(this.state.schedules[i]['end']).format("YYYY-MM-D h:mm:ss A"),
                resourceId: 't',
                title: 'Reserved (click timeslot to modify)',
                bgColor: '#FF0000'
            }
            this.state.timeslot.push(timeSlotObject);
        }
        schedulerData.setEvents(this.state.timeslot);

        this.setState({
            viewModel: schedulerData,
            timeslot: []
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        for (let i = 0; i < this.state.schedules.length; i++) {
            var timeSlotObject = {
                id: this.state.schedules[i]['_id'],
                start: moment(this.state.schedules[i]['start']).format("YYYY-MM-D h:mm:ss A"),
                end: moment(this.state.schedules[i]['end']).format("YYYY-MM-D h:mm:ss A"),
                resourceId: 't',
                title: 'Reserved (click timeslot to modify)',
                bgColor: '#FF0000'
            }
            this.state.timeslot.push(timeSlotObject);
        }
        schedulerData.setEvents(this.state.timeslot);

        this.setState({
            viewModel: schedulerData,
            timeslot: []
        })
    }



    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        //in for loop set timeslot object values
        //push these objects to events array
        for (let i = 0; i < this.state.schedules.length; i++) {
            var timeSlotObject = {
                id: this.state.schedules[i]['_id'],
                start: moment(this.state.schedules[i]['start']).format("YYYY-MM-D h:mm:ss A"),
                end: moment(this.state.schedules[i]['end']).format("YYYY-MM-D h:mm:ss A"),
                resourceId: 't',
                title: 'Reserved (click timeslot to modify)',
                bgColor: '#FF0000'
            }
            this.state.timeslot.push(timeSlotObject);
        }
        console.log(this.state.timeslot);
        schedulerData.setEvents(this.state.timeslot);
        this.setState({
            viewModel: schedulerData,
            timeslot:[]
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        for (let i = 0; i < this.state.schedules.length; i++) {
            var timeSlotObject = {
                id: this.state.schedules[i]['_id'],
                start: moment(this.state.schedules[i]['start']).format("YYYY-MM-D h:mm:ss A"),
                end: moment(this.state.schedules[i]['end']).format("YYYY-MM-D h:mm:ss A"),
                resourceId: 't',
                title: 'Reserved (click timeslot to modify)',
                bgColor: '#FF0000'
            }
            this.state.timeslot.push(timeSlotObject);
        }
        schedulerData.setEvents(this.state.timeslot);

        this.setState({
            viewModel: schedulerData,
            timeslot: []
        })
    }

    //should redirect to add timeslot page here 
    routeChange() {
        let path = `/timeslot/doctor`;
        this.props.history.push(path);
    }

    //open a modal, remove this function and use eventItemClick to open a modal in render function once clicked
    eventClicked() {
        let path = `/homepage/doctor/`;
        this.props.history.push(path);

    };

    render() {
        const { viewModel } = this.state;

        let stylePosition = {
            top: 0,
            left: 0,
            padding: 0,
            verticalAlign: "top",
            height: 100,
            width: 100,
        };

        //in for loop set timeslot object values
        //push these objects to events array
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day);
        for (let i = 0; i < this.state.schedules.length; i++) {
            var timeSlotObject = {
                id: this.state.schedules[i]['_id'],
                start: moment(this.state.schedules[i]['start']).format("YYYY-MM-D h:mm:ss A"),
                end: moment(this.state.schedules[i]['end']).format("YYYY-MM-D h:mm:ss A"),
                resourceId: 't',
                title: 'Timeslot',
                bgColor: '#FF0000'
            }
            this.state.timeslot.push(timeSlotObject);
        }
        schedulerData.setEvents(this.state.timeslot);
        this.state.timeslot = [];


        return (
            <div>
                <div className = "test">
                <table>
                    <tbody>
                        <tr>
                        <td style={stylePosition}>
                                <nav className="navbar-user navbar-dark bg-dark">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-user active">
                                            <Link to={'/homepage/doctor/schedule'} className="nav-link"> My Schedule </Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link to={'/timeslot/doctor'} className="nav-link"> Add Availability </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </td>
                            <td className="scheduler">
                                <Scheduler schedulerData={viewModel}
                                    prevClick={this.prevClick}
                                    nextClick={this.nextClick}
                                    onSelectDate={this.onSelectDate}
                                    onViewChange={this.onViewChange}
                                    eventItemClick={this.eventClicked}
                                />

                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>

        );
    }
}
export default DragDropContext(HTML5Backend)(DoctorSchedule);