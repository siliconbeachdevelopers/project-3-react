import React, { Component } from 'react';
import EventList from '../EventList';
import EditEventModal from '../EditEventModal'
import Moment from 'react-moment';
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import './EventContainer.css'

function toStandardTime(militaryTime) {
  militaryTime = militaryTime.split(':');
  return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ':' + militaryTime[2] + ' P.M.' : militaryTime.join(':') + ' A.M.'
}
class EventContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      events: [],
      eventToEdit: {
        title: '',
        venueName: '',
        city: '',
        // time: '',
        // location: '',
        // tickets: '',
        id: ''
    },
      showEditModal: false 
    }
  }
  
  componentDidMount(){
    this.getEvents();
  }


  showEachEvent = async () => {
    try {
      const eachEvent = await fetch(`https://api.seatgeek.com/2/events?taxonomies.name=sports&postal_code=90015&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`);
      const parsedEachEvent = await eachEvent.json();
      console.log(parsedEachEvent)
        this.setState({
        eachEvent: parsedEachEvent.eachEvent
    })
  } catch(err){
    console.log(err);
  }
}

  getEvents = async () => {
    try {
      const events = await fetch(`https://api.seatgeek.com/2/events?taxonomies.name=sports&postal_code=90015&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`);
      const parsedEvents = await events.json();
      parsedEvents.events.map(event => {
        console.log(event.datetime_local)
        const prettyDate = new Date(event.datetime_local)
        event.time = event.datetime_local
        event.datetime_local = prettyDate.toDateString()
      })
      this.setState({
        events: parsedEvents.events
      })
    } catch(err){
      console.log(err);
    }
  }
      
// DELETE ROUTE

    deleteEvent = async (id) => {
        console.log(id)

        const deleteEventResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${id}`, {
          method:'DELETE',
          credentials: 'include'
        }); 

        const deleteEventParsed = await deleteEventResponse.json();
        this.setState({events: this.state.events.filter((event) => event.id !== id)})
    }

// EDIT ROUTE

    openAndEdit = eventFromTheList => {
        this.setState({
            showEditModal: true,
            eventToEdit: {
                ...eventFromTheList,
                id: eventFromTheList
            }
        })
    }

    handleEditChange = e => 
        this.setState({
            eventToEdit: {
                ...this.state.eventToEdit,
                [e.currentTarget.name] : e.currentTarget.value 
            }
        })

    closeAndEdit = async e => {
        e.preventDefault()
        console.log('working')
        this.props.editEvent(this.state.eventToEdit)
        this.setState({
          showEditModal: false
        })
}

  render(){
    const dateToFormat = '1976-04-19T12:59-0500';
    return (
    <div className='uigrid'>

      <Grid >
          {
           this.state.events.map(e => 
              <Grid.Row className='border'>

                <Grid.Column width={3}>
                  
                  <Image src={e.strSportThumb} />

                  
                  <Icon id="Icon" name="bookmark outline" size="huge" corner="bottom left" eventid={e.id} onClick={(eventlistener, e) => this.props.saveEvent(e.eventid)}/>
                <Grid.Column width={9}>
                  {/* <Button onClick={() => this.deleteEvent(e.id)}>Delete Event</Button> */}
                </Grid.Column>   

                </Grid.Column>
                
                <Grid.Column  width={10}>

                <div className="centeritems">
                <span id='headtitle'> {e.short_title} </span> <br></br>
                <br></br>
                <span id='datetime'> {e.datetime_local } </span><br></br>
                <Moment className='time'  format={"hh:mm"}>
                {new Date(e.time).toString()}
                </Moment>pm
                <br></br>
                <br></br>
                <span id='lowprice'> Lowest Price $ {e.stats.lowest_price} </span>
                <div className="button">
                <Button onClick={() => this.props.showEachEvent()} className="button1" color="black" size='big'>Go</Button>
                </div>
                
                <span id='venuename'> {e.venue.name} </span>
                <span id='city'> {e.venue.display_location} </span>
                </div>

                </Grid.Column>                
                <Grid.Column width={3}>
                <Image id='imagecover' src={e.performers[0].image} />
                  
                </Grid.Column>
              </Grid.Row>
            )
          }
          {
          this.props.eventsCreated.map((e, i) =>
            <div>
            <Grid.Row>
              <Grid.Column width={3}>
              <Image src={e.image} />
              </Grid.Column>
              <Button onClick={() => this.props.deleteEvent(e.id)}>Delete Event</Button>
              <Button onClick={() => this.openAndEdit(e.id)}>Edit Event</Button>
              <Grid.Column width={10}>
              <span id='headtitle'> {e.title} </span>
              </Grid.Column>
              <Grid.Column width={3}>
              <span id='venuename'> {e.venueName} </span>
              <Grid.Column>
              <span id='city'> {e.city} </span>
              </Grid.Column>
              </Grid.Column>
              {/* {e.time}
              </Grid.Column>
              {e.location} */}
              {/* <Grid.Column>
              {e.tickets}
              </Grid.Column> */}
            </Grid.Row>
            </div>
           )
         }
      </Grid>
      <EventList 
      events={this.state.events} 
      deleteEvent={this.deleteEvent}
      openAndEdit={this.openAndEdit}
      /> 
      <EditEventModal 
      eventToEdit={this.state.eventToEdit}
      showEditModal={this.state.showEditModal}
      handleEditChange={this.handleEditChange}
      closeAndEdit={this.closeAndEdit}
      />
    </div>
    )
  }
}

export default withRouter(EventContainer)