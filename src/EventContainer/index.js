import React, { Component } from 'react';
import { Grid, Image, } from 'semantic-ui-react';

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
  
  addEvent = async (e, eventFromTheForm) => {
    e.preventDefault();
    console.log(eventFromTheForm)
  }
  
  render() {
    return (
     <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
  
    }
  }

export default EventContainer;