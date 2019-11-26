import React, { Component } from 'react';
import EventList from '../EventList';
import EditEventModal from '../EditEventModal'
import Moment from 'react-moment';
import { Grid, Image, Button, Icon, Pagination } from 'semantic-ui-react'
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
      const events = await fetch(`https://api.seatgeek.com/2/events?taxonomies.name=sports&postal_code=90015&per_page=20&client_id=${process.env.REACT_APP_API_KEY}`);
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
    return (
    <div className='uigrid'>
      <Grid >
          {
           this.state.events.map(e => 
              <Grid.Row className='border' >
                <Grid.Column width={3}>                  
                  <Image src={e.strSportThumb} />                 
                  <Icon id="Icon" name="bookmark outline" size="huge" corner="bottom left" />
                <Grid.Column width={9}>
                  {/* <Button onClick={() => this.deleteEvent(e.id)}>Delete Event</Button> */}
                </Grid.Column>   
                </Grid.Column>
                
                <Grid.Column className="grid"  width={10}>
              
                <div className="centeritems">
                <span id='headtitle'> {e.title} </span> <br></br>
                <br></br>
                <span id='datetime'> {e.datetime_local } </span>
                <br></br>
                <span id='lowprice'> Lowest Price $ {e.stats.lowest_price} </span>

                <span id='venuename'> {e.venue.name} </span>
                <span id='city'> {e.venue.display_location} </span>
                </div>
                
                <button className="buytickets">
                  <a href={e.url}target="_blank">Buy Tickets</a>
                </button>

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
          <button class='deletebutton' onClick={() => this.props.deleteEvent(e.id)}>Delete Event</button>
          <button class='editbutton' onClick={() => this.openAndEdit(e.id)}>Edit Event</button>
            <Grid.Row>
              <Grid.Column width={3}>
              <Image src={e.image} />
              </Grid.Column>
              <Grid.Column width={10}>
              <span id='headtitle'> {e.title} </span>
              </Grid.Column>
              <Grid.Column width={3}>
              <span id='venuename'> {e.venueName} </span>
              <Grid.Column>
              <span id='city'> {e.city} </span>
              </Grid.Column>
              <div className="vieweventbutton">
                  <button onClick={(click) => this.props.doUpdateEvent(click, e)}>View Event</button>
              </div>
              </Grid.Column>
            </Grid.Row>
            </div>
           )
         }
      </Grid>
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