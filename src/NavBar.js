import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return(
        <ul>
            <li> <Link to="/"> Home </Link></li>
            <li> <Link to="/reports"> Reports </Link></li>
            <li> <Link to="/messages"> Messages </Link></li>
            <li> <Link to="/appointments"> Appointments </Link></li>
            <li> <Link to="/recordings"> Recordings </Link></li>
        </ul>
        
    );
}

export default NavBar;