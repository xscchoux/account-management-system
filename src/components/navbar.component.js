import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-success navbar-expand-lg">
            <Link to="/" className="navbar-brand">Account Management System</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Payment History</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Add Payment History</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create User</Link>
                    </li>
                </ul>
            </div>
            </nav>
        );
    }
}

