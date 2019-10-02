import {CHANGE_SELECTED_SUBJECT, COURSES_LOADED, CHANGE_SELECTED_COURSE, GENERATE_SCHEDULE, DELETE_COURSE, GET_COURSES_FROM_OFFSET} from '../constants/action-types';

export function changeSelectedSubject(sub_id) {
	return { type: CHANGE_SELECTED_SUBJECT, sub_id }
}

export function changeSelectedCourse(course) {
	return { type: CHANGE_SELECTED_COURSE, course }
}

export function getCoursesBySubID(sub_id) {
	return function (dispatch) {
		return fetch('http://localhost:3200/groupBySubject/' + sub_id)
		      	.then(response => response.json())
		      	.then(courses => {
		      		dispatch( { type: COURSES_LOADED, courses } );
		      	});
	};
}

export function getCoursesFromOffset(offset) {
	console.log(offset);
	return function (dispatch) {
		return fetch('http://localhost:3200/limited_courses/' + offset)
				.then(response => response.json())		
				.then(courses => {
					dispatch( {type: GET_COURSES_FROM_OFFSET, courses} );
				});
	}
}

export function getGroupedCoursesFromOffset(offset) {
	console.log(offset);
	return function (dispatch) {
		return fetch('http://localhost:3200/grouped_courses/' + offset)
				.then(response => response.json())		
				.then(courses => {
					dispatch( {type: GET_COURSES_FROM_OFFSET, courses} );
				});
	}
}

export function generate() {
	return { type: GENERATE_SCHEDULE, }
}

export function deleteCourse(course_name) {
	return { type: DELETE_COURSE, course_name }
}