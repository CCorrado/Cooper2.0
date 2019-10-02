import React from 'react';

class Indiv extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: "",
            courses: [],
            exchanges: []
        };

        this.setStudentId = this.setStudentId.bind(this);
        this.loadLists = this.loadLists.bind(this);
    }

    setStudentId(e) {
        this.state.studentId = e.target.value;
        this.forceUpdate();
    }

    loadLists() {
        fetch(`http://localhost:3200/individualcourses/${this.state.studentId}`)
            .then(response => response.json())
            .then(response => {
                this.state.courses = response
                this.forceUpdate();
            })
            .catch(err => console.error(err));


        fetch(`http://localhost:3200/individualexchange/${this.state.studentId}`)
            .then(response => response.json())
            .then(response => {
                this.state.exchanges = response
                this.forceUpdate();
            })
            .catch(err => console.error(err));
    }
    render() {
        return (

            <div className="container bg-white" style={{ margin: "50px 0px 10px 0px", borderRadius: 10, padding: "10px 20px 10px 20px" }}>
                <h3 className="text-center"> Student Course Details</h3>
                <hr />
                <input className="border border-primary" style={{ margin: "5px", borderRadius: 10 }} onChange={this.setStudentId} placeholder="Student ID" />
                <button className="button" type="submit" onClick={this.loadLists}>Load</button>
                <h4 className="text-center"> Courses Register </h4>
                <ul>{this.state.courses.map(item => <li key={[item.student_id, '-', item.course_id].join()}>{item.course_id}</li>)}</ul>;
                <h4 className="text-center"> Courses Exchange </h4>
                <ul>{this.state.exchanges.map(item => <li key={item.ex_id}>student ID: <b>{item.student_id}</b> looking to exchange Course-ID: <b>{item.ex_g_course_id}</b> for Course-ID: <b>{item.ex_w_course_id}</b></li>)}</ul>
            </div>

        )
    }
}

export default Indiv;