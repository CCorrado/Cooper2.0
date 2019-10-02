import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Login from './components/Login';
import MyGrid from './components/mygrid';
import ExploreCourses from './components/ExploreCourses';
import MyCourses from './components/MyCourses';
import CourseInfo from './components/CourseInfo';
import { Provider } from 'react-redux';
import store from './store/index';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
        <div>
            <Route path='/' exact={true} component={MyGrid} />
            <Route path='/dashboard' exact={true} component={DashBoard}/>
            <Route path='/login' exact={true} component={Login}/>
            <Route path="/grid" component={MyGrid} />
            <Route path="/explore" component={ExploreCourses} />
            <Route path="/courses" component={MyCourses} />
            <Route path="/moreinfo/:course_name" component={CourseInfo} />
        </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
