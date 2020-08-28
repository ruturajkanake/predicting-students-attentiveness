import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './css/navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state= {};
        this.logout = this.logout.bind(this);
    }

    logout() {
        const user = this.props.user;
        const token = localStorage.authToken;
        axios({
            url: `/${user}/logout`,
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`}
        }).then(()=> {
            localStorage.removeItem('authToken');
            localStorage.removeItem('name');
        }).catch((err) => {
            console.log('Unable to Logout', err);
        })
    }

    render() {
        const user = this.props.user;
        const id = this.props.id;
        const route = `/${user}`;
        const lectureRoute = `/${user}-lecture/${id}`;
        return(
            <>
                <h2 className='nav'>Welcome {this.props.name}</h2>
                <ul className='navbar nav'>
                    <Link to={route} className='links'>HOME</Link>
                    {id && <Link to={lectureRoute} className='links'>lectures</Link>}
                    <Link to='/' onClick={this.logout} className='links'>LOGOUT</Link>
                </ul>
            </>
        )
    }
}

export default Navbar;