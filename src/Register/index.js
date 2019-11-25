import React, { Component } from 'react';
import './style.css';
import { 
    Form, 
    Label, 
    Button 
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        is_admin: false
      }
    handleChange = (e) => { // allows us to see the state change in components 
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
      }

    handleSubmit = async (e) => {
      e.preventDefault();
      const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(this.state),
          headers: {
              'Content-Type' : 'application/json'
          }
      })
      console.log('<_____---------------------------')
      const parsedResponse = await registerResponse.json();
      console.log(parsedResponse, '<-_-__---------------------------------')
      if(parsedResponse.status.message === 'Success'){
          this.props.doUpdateCurrentUser(parsedResponse.data) 
          this.props.history.push('/');
      }
    }
    
      render() {
        return (
            <div>
              <h2>Register</h2>
            <Form onSubmit={this.handleSubmit}>
            <Label> Username</Label>
            <Form.Input type='text' name="username" onChange={this.handleChange} />
            <Label> Email</Label>
            <Form.Input type='text' name="email" onChange={this.handleChange} />
            <Label> Password</Label>
            <Form.Input type='password' name="password" onChange={this.handleChange} />
            <Button type="Submit" color="black">Register</Button>
            </Form>
            </div>
            
        )
    }
}


export default withRouter(Register);
