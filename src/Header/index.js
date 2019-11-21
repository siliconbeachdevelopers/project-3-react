import React from 'react';
import { Header, List } from 'semantic-ui-react';
import { NavLink }from 'react-router-dom';

const NavHeader = props => {
    return ( 
        <Header>
            <List>
             <List.Item>
                <NavLink to='/'> Home </NavLink>
                <NavLink to='/events/new'> Create Event </NavLink>
                <NavLink to='/register'> Register </NavLink>
                {
                    props.currentUser 
                    ? <div>Hello {props.currentUser.username}</div>
                    : null
                }
             </List.Item>
            </List>
        </Header>
    )
}

export default NavHeader