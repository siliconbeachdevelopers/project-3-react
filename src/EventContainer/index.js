import React, { Component } from 'react';
import { Grid, Image, } from 'semantic-ui-react';
import './EventContainer.css'

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
      const events = await fetch('https://api.seatgeek.com/2/events?taxonomies.name=sports&postal_code=90015&per_page=50&client_id=MTk1NTE3OTF8MTU3NDIzMTU5Ni4wMw');
      const parsedEvents = await events.json();
      console.log(parsedEvents);
      parsedEvents.events.map(event => {
        const prettyDate = new Date(event.datetime_local)
        event.datetime_local = prettyDate.toDateString()
      })
      this.setState({
       events: parsedEvents.events
      })
    } catch(err){
      console.log(err);
    }
  }
  
  addEvent = async (e, eventFromTheForm) => {
    e.preventDefault();
    console.log(eventFromTheForm)
  }
  
  render() {
    return (
     <Grid >
          {
           
           this.state.events.map(e => 
              <Grid.Row className='border'>
                <Grid.Column width={3}>
                  <Image src={e.strSportThumb} />
                  <span id='datetime'> {e.datetime_local } </span>
                </Grid.Column>
                <Grid.Column  width={10}>
                <span id='headtitle'> {e.title} </span>
                <span id='venuename'> {e.venue.name} </span>
                <span id='city'> {e.venue.city} </span>
                
                </Grid.Column>                
                <Grid.Column width={3}>
                  <Image src={e.performers[0].image} />
                </Grid.Column>
              </Grid.Row>
            )
          }
      </Grid>
      )
  
    }
  
}

export default EventContainer;