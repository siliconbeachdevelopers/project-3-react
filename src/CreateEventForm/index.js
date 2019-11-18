import React, { Component } from 'react';
import { Image, Form, Label, Segment, Button } from 'semantic-ui-react';

class CreateEvent extends Component {
  constructor(){
    super();

    this.state = {
      sport:'',
      teams:'',
      date:'',
      time:'',
      location:'',
      tickets:'',
      image:''
    }
  }

  handleChange = (e) => {
    // es6 computed properties [e.currentTarget.name]
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  
  render(){
    return (
      <Segment>
        <h4>Create Event</h4>
        <Form onSubmit={(e) => this.props.addEvent(e, this.state)}>
          
          <Label>Sport:</Label>
          <Form.Input type='text' name='sport' value={this.state.sport} onChange={this.handleChange}/>
          
          <Label>Teams:</Label>
          <Form.Input type='text' name='teams' value={this.state.teams} onChange={this.handleChange}/>
          
          <Label>Date:</Label>
         <Form.Input type='text' name='date' value={this.state.date} onChange={this.handleChange}/>

         <Label>Time:</Label>
         <Form.Input type='text' name='time' value={this.state.time} onChange={this.handleChange}/>

          <Label>Location:</Label>
          <Form.Input type='text' name='location' value={this.state.location} onChange={this.handleChange}/>

          <Label>Tickets:</Label>
          <Form.Input type='text' name='tickets' value={this.state.tickets} onChange={this.handleChange}/>

          <Label>image:</Label>
          <Form.Input type='text' name='image' value={this.state.image} onChange={this.handleChange}/>
          
          <Button type='Submit'>Create Dog</Button>
        </Form>
      </Segment>
      )
  }
}

export default CreateEvent
