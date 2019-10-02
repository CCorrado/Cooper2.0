import React from 'react';
import Navbar from './NavBar';
import '../style/home.css';

class Home extends React.Component {

    render() {

        return (
            <div className="container">
                <Navbar />
                <div className="Main">
                    <h2 className="text-center">Objective</h2>
                    <h4 className="text-center"> "We aim to make the task of choosing and registering for classes as smooth as possible." </h4>
                    <hr />
                    <h2 className="text-center">Meet The Team</h2>
                    <hr />
                    <div className="row">
                        <div className="column">
                            <div className="card">
                                <img src="aditya1.jpg" alt="Aditya Munot" style={{width:"100%"}}/>
                                <div className="container">
                                    <h3>Aditya Munot</h3>
                                    <p className="title">Co - Founder</p>
                                    <p><button className="button">Contact</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <img src="dariel.jpg" alt="Dariel Bobadilla" style={{width:"100%"}}/>
                                <div className="container">
                                    <h3>Dariel Bobadilla</h3>
                                    <p className="title">Co - Founder</p>
                                    <p><button className="button">Contact</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <img src="vineet.jpg" alt="Vineet Singh" style={{width:"100%"}}/>
                                <div className="container">
                                    <h3>Vineet Singh</h3>
                                    <p className="title">Co - Founder</p>
                                    <p><button className="button">Contact</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <img src="srikanth.jpg" alt="Srikanth Kamath" style={{width:"100%"}}/>
                                <div className="container">
                                    <h3>Srikanth Kamath</h3>
                                    <p className="title">Co - Founder</p>
                                    <p><button className="button">Contact</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        );
    };
};

export default Home