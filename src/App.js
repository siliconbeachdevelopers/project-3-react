import React, { Component } from 'react';
import './App.css';
import EventContainer from './EventContainer';
import { Route, Switch } from 'react-router-dom';
import Register from './Register';
import Header from './Header';
import EventShow from './EventShow';

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
    currentUser: {}
  }

  doUpdateCurrentUser = (user) => { 
    this.setState({
      currentUser : user
    })
  }

  render() {
  return ( 
    <main> 
      <Header currentUser = {this.state.currentUser} />
      <Switch> 
        <Route exact path='/' render={() => <Register doUpdateCurrentUser = {this.doUpdateCurrentUser} />} />
        <Route exact path='/events' component={EventContainer} />
        <Route exact path='/events/:id' component={EventShow} />
        <Route component={My404} />
      </Switch>
    </main>
    )
  }
}

export default App;
