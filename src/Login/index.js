import React, { Component } from 'react';
import { 
    Form, 
    Label, 
    Button 
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    state = {
        username: '',
        password: '',
        is_admin: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
    const parsedResponse = await loginResponse.json();
        if(parsedResponse.status.code === 200){
            this.props.doUpdateCurrentUser(parsedResponse.data)
            this.props.history.push('/');
        }
    }
    render(){
        return(
        <Form onSubmit={this.handleSubmit}>
            <Label> Username</Label>
            <Form.Input type='text' name="username" onChange={this.handleChange} />
            <Label> Password</Label>
            <Form.Input type='password' name="password" onChange={this.handleChange} />
            <Button type="Submit" color="green">Login</Button>
          </Form>
        )
    }

}

export default withRouter(Login)