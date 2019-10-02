import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    
    sessionOut = (sessionStorage) => (e) => {
        if (sessionStorage.getItem('Access')) {
            sessionStorage.removeItem('Access');
            sessionStorage.removeItem('Username');
        }
    }

    render() {
        let sessionvalue = "Login";
        if (sessionStorage.getItem('Access')) {
            sessionvalue = 'Log Out'
        }
        return (
            <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-transparent mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mr. Cooper</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link font-weight-normal text-white" to="/grid"> Scheduler </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link font-weight-normal text-white" to="/explore"> Explore Course </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link font-weight-normal text-white" to="/courses"> My Course </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link font-weight-normal text-white" to="/dashboard"> Swapper </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link font-weight-normal text-light" to="/login" onClick= {this.sessionOut(sessionStorage)}> {sessionvalue} </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };
};

export default NavBar;
