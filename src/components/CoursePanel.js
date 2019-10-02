import React, {Component} from 'react';
import SectionList from './SectionList';
// import CourseReview from './CourseReview';

class CoursePanel extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: 'panel1' };
  }


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    return (
      <div>
          {this.props.courses.map( course => (
            <SectionList key={course.course_name} data={course}/>
            // <CourseReview key={course.course_name} data={course}/>
          ))}
      </div>
    );
  }
}

export default CoursePanel;
