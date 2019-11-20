import React, { Component } from 'react';
import EventList from '../EventList';
import EditEventModal from '../EditEventModal'
import { Grid, Image } from 'semantic-ui-react'

class EventContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      events: [],
      eventToEdit: {
        sport: '',
        teams: '',
        date: '',
        time: '',
        location: '',
        tickets: '',
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
        const deleteEventResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/events/' + id, {method:'DELETE'}); 

        const deleteEventParsed = await deleteEventResponse.json();
        console.log(deleteEventParsed)
        this.setState({events: this.state.events.filter((event) => event.id !== id)})
    }

// EDIT ROUTE

    openAndEdit = eventFromTheList => {
        this.setState({
            showEditModal: true,
            eventToEdit: {
                ...eventFromTheList 
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
        try {
            const editResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${this.state.eventToEdit.id}`, {
                method: "PUT",
                body: JSON.stringify(this.state.eventToEdit),
                headers: {
                    'Content-Type': 'application/json'
            }
        })
        const editResponseParsed = await editResponse.json()
        const newEventArrayWithEdit = this.state.events.map(event => {
            if(event.id === editResponseParsed.data.id) {
                event = editResponseParsed.data
            }
            return event
        })
        this.setState({
            showEditModal: false,
            events: newEventArrayWithEdit
        })
    } catch (err) {
        console.log(err)
    }
}

  render(){
    return (
    <div>
      <Grid>
         {
          this.state.events.map((e, i) =>
             <Grid.Row key={i}>
               <Grid.Column width={3}>
                 <Image src={e.strSportThumb} />
               </Grid.Column>
               <Grid.Column width={10}>
                 {e.title}
               </Grid.Column>
               <Grid.Column width={3}>
                 <Image src={e.performers[0].image} />
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
              <Grid.Column width={10}>
              {e.sport}
              </Grid.Column>
              <Grid.Column width={3}>
              {e.teams}
              <Grid.Column>
              {e.date}
              </Grid.Column>
              {e.time}
              </Grid.Column>
              {e.location}
              <Grid.Column>
              {e.tickets}
              </Grid.Column>
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

export default EventContainer