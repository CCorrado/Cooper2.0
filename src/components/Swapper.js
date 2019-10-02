import React from 'react';

class Swapper extends React.Component {
    constructor(props) {
        super(props);

        this.setStudentId = this.setStudentId.bind(this);
        this.setFromClassId = this.setFromClassId.bind(this);
        this.setToClassId = this.setToClassId.bind(this);

        this.submitExchange = this.submitExchange.bind(this);

        this.state = {
            studentId: "",
            fromClassId: "",
            toClassId: "",
        };
    }
    submitExchange() {
        fetch(`http://localhost:3200/swap/add?student_id=${this.state.studentId}&ex_g_course_id=${this.state.fromClassId}&ex_w_course_id=${this.state.toClassId}`)
            .then(response => {
                this.setState({
                    studentId: "",
                    fromClassId: "",
                    toClassId: "",
                });

                alert("Added");
            })
            .catch(err => console.error(err));
    }
    setStudentId(e) {
        this.state.studentId = e.target.value;
        this.forceUpdate();
    }
    setFromClassId(e) {
        this.state.fromClassId = e.target.value;
        this.forceUpdate();
    }
    setToClassId(e) {
        this.state.toClassId = e.target.value;
        this.forceUpdate();
    }
    render() {
        return (
            <div className="container bg-white" style={{ margin: "72px 0px 10px 0px", borderRadius: 10, padding: "10px 20px 10px 20px" }}>

                <h3 className="text-center"> Course Swapper</h3>
                <hr />
                <input className="border border-primary" style={{ margin: "5px", borderRadius: 10 }} value={this.state.studentId} onChange={this.setStudentId} placeholder="Student ID" />
                <input className="border border-primary" style={{ margin: "5px", borderRadius: 10 }} value={this.state.fromClassId} onChange={this.setFromClassId} placeholder="From Course ID" />
                <input className="border border-primary" style={{ margin: "5px", borderRadius: 10 }} value={this.state.toClassId} onChange={this.setToClassId} placeholder="To Course ID" />
                <button className="button" type="submit" onClick={this.submitExchange}>Submit</button>

            </div>
        );
    };
};

export default Swapper;