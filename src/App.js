import React, { Component } from 'react';
import './App.css';
import EventContainer from './EventContainer';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import NavHeader from './Header';
import EventShow from './EventShow';
import CreateEvent from './CreateEventForm';



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
    logged: false,
    is_admin: false,
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
    console.log(user)
    this.setState({
      currentUser : user
    })
  }

  componentDidMount(){
    this.getEvents();
    const user = localStorage.getItem('user')
    if(user){
      const currentUser = JSON.parse(user)
      this.setState({
        currentUser
      })
      if(currentUser.username === 'admin'){
        this.setState({
          is_admin: true
        })
        console.log(currentUser.username)
      }
    }
  }

  saveEvent = async(id) => {
    try {
      const my_events = await fetch(`${process.env.REACT_APP_API_URL}/user/${this.state.currentUser.id}/my_events`, {
        method: "PUT",
        credentials: 'include',
        body: JSON.stringify(id),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('WE ARE HERERERE')
      const myEvents = await my_events.json();
    } catch(err){
      console.log(err);
    }
  }

  login = async(e, loginFromForm) => {
    console.log(this.state.currentUser)
    e.preventDefault();
    try {
      const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(loginFromForm),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
      const parsedResponse = await loginResponse.json();
          if(parsedResponse.status.code === 200){
              this.setState({
                session: parsedResponse.session.username,
                logged: true
              })
              localStorage.setItem('user', JSON.stringify(parsedResponse.session))
              this.doUpdateCurrentUser(parsedResponse.data)
              this.props.history.push('/');
    }
    } catch(err){
      console.log(err)
    }
  }
 logout = async () => {
   console.log('im logging out')
     const user = localStorage.removeItem("user")
     const logoutResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
       method: "GET",
       credentials: "include",
       headers: {
         "Content-Type": "application/json"
       }
     })
     const parsedResponse = await logoutResponse.json();
     console.log(parsedResponse)
     if (parsedResponse.status.code === 
      200) {
        this.setState({
          currentUser: {
            user: ''
          },
          logged: false
        })
        this.props.history.push('/')
      }
  }
  getEvents = async () => {
    try {
      const events = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`);
      const parsedEvents = await events.json();
      this.setState({
        eventsCreated: parsedEvents.data
      })
    } catch(err){
      console.log(err);
    }
  }

  addEvent = async (e, eventFromForm) => {
    e.preventDefault();
    try {
      const createdEventResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`, { 
          method: 'POST',
          body: JSON.stringify(eventFromForm),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const parsedResponse = await createdEventResponse.json();
      this.setState({eventsCreated: [...this.state.eventsCreated, parsedResponse.data]})
      this.props.history.push('/')
  } catch(err){
      console.log(err)
  }
}

deleteEvent = async (id) => {
  const deleteEventResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${id}`, {
    method:'DELETE',
    credentials: 'include'
  }); 

  const deleteEventParsed = await deleteEventResponse.json();
  this.setState({eventsCreated: this.state.eventsCreated.filter((event) => event.id !== id)})
}

closeAndEdit = async e => {
  try {
      const editResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${e.id}`, {
          method: "PUT",
          body: JSON.stringify(e),
          headers: {
              'Content-Type': 'application/json'
      }
    })
  const editResponseParsed = await editResponse.json()
  const newEventArrayWithEdit = this.state.eventsCreated.map(event => {
      if(event.id === editResponseParsed.data.id) {
          event = editResponseParsed.data
      }
      return event
  })
  this.setState({
      eventsCreated: newEventArrayWithEdit,
      
  })
} catch (err) {
  console.log(err)
}
}

  render() {
  return ( 
    <main> 
      <NavHeader currentUser = {this.state.currentUser} logout={this.logout}/>
      <Switch> 
        <Route exact path='/' render={() => <EventContainer deleteEvent={this.deleteEvent} eventsCreated={this.state.eventsCreated} editEvent={this.closeAndEdit} saveEvent={this.saveEvent}/>} />
        <Route exact path='/events/new' render={() => <CreateEvent  addEvent={this.addEvent}/>} />
        <Route exact path='/register' render={() => <Register doUpdateCurrentUser = {this.doUpdateCurrentUser} />} />
        <Route exact path='/login' render={() => <Login login = {this.login} />} />
        <Route exact path='/events/:id' component={EventShow} />
        <Route component={My404} />
      </Switch>
    </main>
    )
  }
}

export default withRouter(App);