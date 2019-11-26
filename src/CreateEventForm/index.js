import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { 
  Form, 
  Button, 
  Label, 
  Segment 
} from 'semantic-ui-react';

class CreateEvent extends Component {
    state = {
      title:'',
      venueName:'',
      city:'',
    }
    
  handleChange = (e) => {
      this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  render(){
    return (
      <div class="form">
      <Segment>
        <h2>Create Event</h2>
        <Form onSubmit={(e) => this.props.addEvent(e, this.state)}>
          
        <Label>What's The Event?:</Label>
        <Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
        
        <Label>Venue:</Label>
        <Form.Input type='text' name='venueName' value={this.state.venueName} onChange={this.handleChange}/>
        
        <Label>City:</Label>
        <Form.Input type='text' name='city' value={this.state.city} onChange={this.handleChange}/>
        <Button type='Submit' color='black'>Create Event</Button>
        </Form>
      </Segment>
      </div>
      )
  }
}

export default withRouter(CreateEvent);
