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
  
  addEvent = async (e, eventFromTheForm) => {
    e.preventDefault();
    console.log(eventFromTheForm)
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