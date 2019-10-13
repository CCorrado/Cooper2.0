import {CHANGE_SELECTED_SUBJECT, COURSES_LOADED, CHANGE_SELECTED_COURSE, GENERATE_SCHEDULE, DELETE_COURSE, GET_COURSES_FROM_OFFSET} from '../constants/action-types';

const initialState = {
	subjects: [],
	selectedSubject: 0,
	courses: [],
	selectedCourses: [],
	selectedCoursesTitle: [],
	commitedCourses: [],
	ajaxCourses: [],
	studentInfo: {},
};

function rootReducer (state = initialState, action) {

	if (action.type === CHANGE_SELECTED_SUBJECT) {

		const obj = Object.assign( {}, state, { selectedSubject: action.sub_id } );

		return obj; 
	}
	
	if (action.type === CHANGE_SELECTED_COURSE) {

		// if (!state.selectedCourses.length) {
		// 	const obj = Object.assign( {}, state, { selectedCourses: state.selectedCourses.concat(action.course), selectedCoursesTitle: state.selectedCoursesTitle.concat(action.course.title) } );
		// 	return obj;	
		// }

		// for (let i = 0; i < state.selectedCourses.length; i++) {

		// 	if (state.selectedCourses[i].id === action.course.id) {
		// 		return state;
		// 	}
		// }

		// const obj = Object.assign( {}, state, { selectedCourses: state.selectedCourses.concat(action.course), selectedCoursesTitle: state.selectedCoursesTitle.concat(action.course.title) } );
		
		// return obj;

		const obj = Object.assign( {}, state, { selectedCourses: state.selectedCourses.concat(action.course) } );
		console.log(obj);

		return obj;
	}	
	
	if (action.type === COURSES_LOADED) {
		
		const obj = Object.assign( {}, state, { courses: action.courses } );

		return obj; 
	}

	if (action.type === GET_COURSES_FROM_OFFSET) {

		const obj = Object.assign( {}, state, { ajaxCourses: state.ajaxCourses.concat(action.courses) } );

		return obj;

	}

	if (action.type === GENERATE_SCHEDULE) {
		
		const obj = Object.assign( {}, state, { commitedCourses: state.selectedCourses } );

		return obj; 
	}

	if ( action.type === DELETE_COURSE ) {
		const selectedCourses = state.selectedCourses.filter(course => course.course_name !== action.course_name);

		const obj = Object.assign({}, state, { selectedCourses: selectedCourses });
		return obj;
	}


	return state;
}

export default rootReducer;