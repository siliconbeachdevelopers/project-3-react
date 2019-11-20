import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div class='navbar'>
            <br></br>
            <NavLink class='homelink' exact to="/" >Home</NavLink>
            <br></br>
            <NavLink exact to="/form" >Form</NavLink>
        </div>
    )
}

export default NavBar