import React from 'react';
import NavBar from './NavBar';
import Swapper from './Swapper';
import Indiv from './Indiv';
import '../style/dashboard.css';

class DashBoard extends React.Component {
    
    render() {
        if (sessionStorage.getItem('Access')) {
            return (
                <div className="container">
                    <div className="container">
                        <NavBar />
                    </div>
                    <div className="container" >
                        <Swapper />
                    </div>
                    <div className="container">
                        <Indiv />
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="container" >
                    <NavBar />
                </div>
                <div className="container bg-white border border-warning" style= {{ margin: "72px 0px 10px 0px", borderRadius: 10, padding: "10px 20px 10px 20px"}}>
                <h4 className="text-warning text-center">Message</h4>    
                <h1 className="text-center">Authentication required</h1>
                <h5 className="text-warning text-center">Please login first to access Swapper Functionality</h5>
                </div>
            </div>
        );
    };
};

export default DashBoard