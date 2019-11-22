import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateEvent extends Component {
    state = {
      title:'',
      venueName:'',
      city:'',
      // time:'',
      // location:'',
      // tickets:'',
      // image:''
    }

  handleChange = (e) => {
      this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  render(){
    return (
      <Segment>
        <h4>Create Event</h4>
        <Form onSubmit={(e) => this.props.addEvent(e, this.state)}>
          
        <Label>What's The Event?:</Label>
        <Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
        
        <Label>Venue:</Label>
        <Form.Input type='text' name='venueName' value={this.state.venueName} onChange={this.handleChange}/>
        
        <Label>City:</Label>
        <Form.Input type='text' name='city' value={this.state.city} onChange={this.handleChange}/>
{/* 
        <Label>Time:</Label>
        <Form.Input type='text' name='time' value={this.state.time} onChange={this.handleChange}/>

        <Label>Location:</Label>
        <Form.Input type='text' name='location' value={this.state.location} onChange={this.handleChange}/>

        <Label>Tickets:</Label>
        <Form.Input type='text' name='tickets' value={this.state.tickets} onChange={this.handleChange}/>

        <Label>image:</Label>
        <Form.Input type='text' name='image' value={this.state.image} onChange={this.handleChange}/> */}
        
        <Button type='Submit'>Create Event</Button>
        </Form>
        
      </Segment>
      )
  }
}

export default withRouter(CreateEvent);
