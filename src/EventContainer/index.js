import React, { Component } from 'react';
import EventList from '../EventList';
import CreateEventForm from '../CreateEventForm';
import EditEventModal from '../EditEventModal'


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
      const events = await fetch(process.env.REACT_APP_API_URL + '/api/v1/events/',{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
          }
      }); 
  
      const parsedEvents = await events.json();
      this.setState({
        events: parsedEvents.data 
      })
    } catch(err){
      console.log(err);
    }
  }


// POST REQUEST (here's where we connect with Flask)

    addEvent = async (e, eventFromForm) => {
      e.preventDefault();
      console.log(eventFromForm)

      try {
        const createdEventResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/events/', { 
            method: 'POST',
            body: JSON.stringify(eventFromForm),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       
        const parsedResponse = await createdEventResponse.json();
        console.log(parsedResponse, ' im a response')

        this.setState({events: [...this.state.events, parsedResponse.data]})
    } catch(err){
        console.log('error')
        console.log(err)
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
      console.log(this.state, 'this is state container')
    return (
    <div>
      <EventList 
      events={this.state.events} 
      deleteEvent={this.deleteEvent}
      openAndEdit={this.openAndEdit}
      /> 
      <CreateEventForm 
      addEvent={this.addEvent}
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