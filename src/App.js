import React, { Component } from 'react';
import './App.css';
import EventContainer from './EventContainer';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Register';
import Header from './Header';
import EventShow from './EventShow';
import CreateEvent from './CreateEventForm';
import NavBar from './NavBar'


console.log(EventContainer)

const My404 = () => {
  return (
    <div>
      You are lost lil buddy : /
    </div>
    )
};

class App extends Component {
  state = {
    currentUser: {},
    eventsCreated: [],
    sport: '',
    teams: '',
    date: '',
    time: '',
    location: '',
    tickets: '',
    id: ''
  }

  doUpdateCurrentUser = (user) => { 
    this.setState({
      currentUser : user
    })
  }

  componentDidMount(){
    this.getEvents();
  }

  getEvents = async () => {
    try {
      const events = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`);
      const parsedEvents = await events.json();
      console.log(parsedEvents);
      this.setState({
        eventsCreated: parsedEvents.data
      })
    } catch(err){
      console.log(err);
    }
  }

  addEvent = async (e, eventFromForm) => {
    e.preventDefault();
    console.log(eventFromForm)

    try {
      const createdEventResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`, { 
          method: 'POST',
          body: JSON.stringify(eventFromForm),
          headers: {
              'Content-Type': 'application/json'
          }
      })
     
      const parsedResponse = await createdEventResponse.json();
      console.log(parsedResponse, ' im a response')

      this.setState({events: [...this.state.eventsCreated, parsedResponse.data]})
      this.props.history.push('/')

  } catch(err){
      console.log('error')
      console.log(err)
  }
}

  render() {
  return ( 
    <main> 
      <Header currentUser = {this.state.currentUser} />
      <Switch> 
        <Route exact path='/' render={() => <EventContainer eventsCreated={this.state.eventsCreated}/>} />
        <Route exact path='/events/new' render={() => <CreateEvent  addEvent={this.addEvent}/>} />
        <Route exact path='/register' render={() => <Register doUpdateCurrentUser = {this.doUpdateCurrentUser} />} />
        <Route exact path='/events/:id' component={EventShow} />
        <Route component={My404} />
      </Switch>
    </main>
    )
  }
}

export default withRouter(App);
