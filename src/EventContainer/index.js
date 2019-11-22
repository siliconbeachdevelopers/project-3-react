import React, { Component } from 'react';
import EventList from '../EventList';
import EditEventModal from '../EditEventModal'

import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import './EventContainer.css'


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
  getEvents = async () => {
    try {
      const events = await fetch(`https://api.seatgeek.com/2/events?taxonomies.name=sports&postal_code=90015&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`);
      const parsedEvents = await events.json();
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
    console.log(this.props.editEvent, 'this is edit')
    return (
    <div className='uigrid'>
      <Grid >
          {
           this.state.events.map(e => 
              <Grid.Row className='border'>
                
                
                <Grid.Column width={3}>
                  
                  <Image src={e.strSportThumb} />

                  
                  <Icon id="Icon" name="bookmark outline" size="huge" corner="bottom left" />

                <Grid.Column width={9}>
                  {/* <Button onClick={() => this.deleteEvent(e.id)}>Delete Event</Button> */}
                </Grid.Column>
                 
                </Grid.Column>
                
                <Grid.Column  width={10}>

                <div className="centeritems">
                <span id='headtitle'> {e.title} </span> <br></br>
                <br></br>
                <span id='datetime'> {e.datetime_local } </span>
                <br></br>
                <span id='lowprice'> LowestPrice $ {e.stats.lowest_price} </span>
          
                <div className="button">
                <Button className="button1" color="black" size='massive'>Go</Button>
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