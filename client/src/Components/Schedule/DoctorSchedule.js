import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler';
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
        };

        let resources = [
            {
                id: 't',
                name: 'Doctor'
            },
        ];

        schedulerData.setResources(resources);

        let events = [
            {
                id: 1,
                start: '2019-03-10 14:30:00',
                end: '2019-03-10 15:30:00',
                resourceId: 't',
                title: 'I am finished',
                bgColor: '#D9D9D9'
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
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            viewModel: schedulerData
        })
    }


    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    render() {
        const { viewModel } = this.state;
        console.log(viewModel);

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
                                 viewEventClick={this.ops1}
                                 viewEventText="Ops 1"
                                 viewEvent2Text="Ops 2"
                                 viewEvent2Click={this.ops2}
                                 updateEventStart={this.updateEventStart}
                                 updateEventEnd={this.updateEventEnd}
                                 moveEvent={this.moveEvent}
                                 newEvent={this.newEvent}
                                 onScrollLeft={this.onScrollLeft}
                                 onScrollRight={this.onScrollRight}
                                 onScrollTop={this.onScrollTop}
                                 onScrollBottom={this.onScrollBottom}
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






export default DragDropContext(HTML5Backend)(DoctorSchedule);