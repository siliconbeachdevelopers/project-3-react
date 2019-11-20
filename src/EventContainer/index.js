import React, { Component } from 'react';
import { Grid, Image, } from 'semantic-ui-react';
import CreateEventForm from '../CreateEventForm'
import MyEvent from '../MyEvent'

class EventContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      events: [],
      sport: '',
      teams: '',
      date: '',
      time: '',
      location: '',
      tickets: ''
    }
  }

  componentDidMount(){
    this.getEvents();
  }
  getEvents = async () => {

    try {
      const events = await fetch('https://www.thesportsdb.com/api/v1/json/1/all_sports.php');
      const parsedEvents = await events.json();
      console.log(parsedEvents);
      this.setState({
       events: parsedEvents.sports
      })
    } catch(err){
      console.log(err);
    }
  }
  
  // POST REQUEST (connecting with FLASK)

  addEvent = async (e, eventFromTheForm) => {
    e.preventDefault();
    console.log(eventFromTheForm, '<---eventform')
  
    try {
      const createdEventResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/events/', { // this is a request from our Flask app
          method: 'POST',
          body: JSON.stringify(eventFromTheForm), // stringify the object (which is in JS) to JSON adn we want to send over which is dog from the form
          headers: {
              'Content-Type': 'application/json'
          }
      })
      // turing the response from Flask into an object we can use
      const parsedResponse = await createdEventResponse.json();
      console.log(parsedResponse, ' hi im a response')

      this.setState({events: [...this.state.events, parsedResponse.data]}) // ... is like payload in Flask and we're using our new array (events), empties it, and adds in the object we add in the response into our data property. .data
  } catch(err){
      console.log('error')
      console.log(err)
  }
}
  
  
  render() {
    return (
     <Grid celled>

          {
            this.state.events.map(e => 
              <Grid.Row>
                <Grid.Column width={3}>
                  <Image src={e.strSportThumb} />
                </Grid.Column>
                <Grid.Column width={10}>
                  {e.strSportDescription}
                </Grid.Column>
                <Grid.Column width={3}>
                  <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                </Grid.Column>
              </Grid.Row>
            )
          }
        </Grid>
      )
  
    }
  }

export default EventContainer;