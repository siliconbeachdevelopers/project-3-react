import React, { Component } from 'react';
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
        email: ''
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
    const parsedResponse = await registerResponse.json();

        if(parsedResponse.status.message === 'Success'){
            this.props.doUpdateCurrentUser(parsedResponse.data) 
            this.props.history.push('/');
        }
    }
    
      render() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Label> Username</Label>
            <Form.Input type='text' name="username" onChange={this.handleChange} />
            <Label> Email</Label>
            <Form.Input type='text' name="email" onChange={this.handleChange} />
            <Label> Password</Label>
            <Form.Input type='password' name="password" onChange={this.handleChange} />
            <Button type="Submit" color="green">Register</Button>
          </Form>
        )
    }
}


export default withRouter(Register);
