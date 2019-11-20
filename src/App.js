import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import Register from './Register'
import EventContainer from './EventContainer'
import NavBar from './NavBar'
import CreateEventForm from './CreateEventForm';

class App extends Component {

  state = {
    events: [],
    sport: '',
    teams: '',
    date: '',
    time: '',
    location: '',
    tickets: ''
  }

  componentDidMount(){
    this.getEvents();
  }
  getEvents = async () => {

    try {
      const events = await fetch(process.env.REACT_APP_API_URL + '/api/v1/events/');
      const parsedEvents = await events.json();
      console.log(parsedEvents);
      this.setState({
      Events: parsedEvents.data
      })
    } catch(err){
      console.log(err);
    }
  }

  // addEvent = async (e, eventFromTheForm) => {
  //   e.preventDefault();
  //   console.log(eventFromTheForm)
  // }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={EventContainer} />
          <Route exact path="/form" render={() => <CreateEventForm addEvent={this.addEvent} />} />
        </Switch>
      </div>
    );

  }
}

export default withRouter(App);
