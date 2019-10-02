import React, { Component } from 'react';
import moment from 'moment';
import {toPng} from 'html-to-image';
import Timetable from 'react-timetable-events';
import download from 'downloadjs';
import Link from '@material-ui/core/Link';
// make all possible cases of combination
function allPossibleCases(arr) {
  if (arr.length < 2 ) {
    var x = [];
    for (var i = 0; i < arr[0].length ; i++) {
      x.push([arr[0][i]]);
    }
    return x;
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {

        result.push(allCasesOfRest[i].concat(arr[0][j]));
      }
    }
    return result;
  }
}

// make the all lists of possible section combination from the given courselist
function makeSectionListfromCourseList(selClist) {
  var initialList = [];
  for (var i = 0; i < selClist.length; i++ ) {
    initialList.push(selClist[i].sections);
  }
  return allPossibleCases(initialList);
}

// set and modify the time range for the given schedule
function setTabletime(courselistT) {
  let tableSt = 9;
  let tableEt = 18;
  for (let t = 0; t < courselistT.length; t++) {
    if (parseInt(courselistT[t].start_time.slice(0,3)) > 0) {
      tableSt = tableSt > parseInt(courselistT[t].start_time.slice(0,3)) ? parseInt(courselistT[t].start_time.slice(0,3)) : tableSt;
      tableEt = tableEt < parseInt(courselistT[t].end_time.slice(0,3)) ? parseInt(courselistT[t].end_time.slice(0,3)) : tableEt;
    }
  }
  return [tableSt,tableEt];
}

// convert the course(sections) list to the event list proper to the timetable
function courselistTOeventlist(courselist) {
  let eventlist = [];
  let courseNum;
  eventlist = courselist.map(course => {
    const event = {};
    event.id = course.id;
    event.tooltip = course.section + '\n CN: ' + course.call_number + '\n' + course.Activity;
    event.name = course.section;
    event.cn = 'CN: ' + course.call_number;
    event.times = course.start_time.slice(0,5) + '-' + course.end_time.slice(0,5);
    event.startTime = '2018-02-23T' + course.start_time;
    event.endTime = '2018-02-23T' + course.end_time;
    event.day = course.Meeting_day;
    event.color = '#'+Math.floor(0.001*course.course_number*16777215).toString(16);
    return event;
  });
  return eventlist;
}

// check the time conflict of the given schedule list and new event
function checkTime(oldeventlist, newevent) {
  for (let j = 0; j < oldeventlist.length; j++) {
    const oldStart = new Date(oldeventlist[j].startTime);
    const oldEnd = new Date(oldeventlist[j].endTime);
    const newStart = new Date(newevent.startTime);
    const newEnd = new Date(newevent.endTime);

    if (((oldStart <= newStart)&&(newStart <= oldEnd))||((oldStart <= newEnd)&&(newEnd <= oldEnd))||((oldStart <= newStart)&&(newEnd <= oldEnd))||((oldStart >= newStart)&&(newEnd >= oldEnd))) {
      return false;
    }
  }
  return true;
}

// finally make the schedule
function eventsBuilder(elist) {
    const events = {};
    events.mon = [];
    events.tue = [];
    events.wen = [];
    events.thu = [];
    events.fri = [];
    events.sat = [];
    events.sun = [];

   for (let i = 0; i < elist.length; i++) {
     switch(elist[i].day) {
       case 'F':
          if ((events.fri.length < 1)||checkTime(events.fri, elist[i])) {
             elist[i].startTime = moment(elist[i].startTime);
             elist[i].endTime = moment(elist[i].endTime);
             events.fri = events.fri.concat(elist[i]);
          }
          else {
            return {};
          }
          break;
       case 'M':
          if ((events.mon.length < 1)||checkTime(events.mon, elist[i])) {
             elist[i].startTime = moment(elist[i].startTime);
             elist[i].endTime = moment(elist[i].endTime);
             events.mon = events.mon.concat(elist[i]);
          }
          else {
            return {};
          }
          break;
       case 'MF':
          if ((events.mon.length < 1) || (checkTime(events.mon, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.mon = events.mon.concat(elist[i]);
          }
          else
            return {};
          if ((events.fri.length < 1) || (checkTime(events.fri, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.fri = events.fri.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'MR':
         if ((events.mon.length < 1) || (checkTime(events.mon, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.mon = events.mon.concat(elist[i]);
         }
         else
           return {};
         if ((events.thu.length < 1) || (checkTime(events.thu, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.thu = events.thu.concat(elist[i]);
         }
         else
           return {};

         break;
       case 'MW':
          if ((events.mon.length < 1) || (checkTime(events.mon, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.mon = events.mon.concat(elist[i]);
          }
          else
           return {};

          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.wen = events.wen.concat(elist[i]);
          }
          else
           return {};

          break;
       case 'MWF':
          if ((events.mon.length < 1) || (checkTime(events.mon, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.mon = events.mon.concat(elist[i]);
          }
          else
            return {};

          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.wen = events.wen.concat(elist[i]);
          }
          else
            return {};

          if ((events.fri.length < 1) || (checkTime(events.fri, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.fri = events.fri.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'MWR':
          if ((events.mon.length < 1) || (checkTime(events.mon, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.mon = events.mon.concat(elist[i]);
          }
          else
           return {};

          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.wen = events.wen.concat(elist[i]);
          }
          else
           return {};

          if ((events.thu.length < 1) || (checkTime(events.thu, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.thu = events.thu.concat(elist[i]);
          }
          else
           return {};

          break;
      case 'R':
         if ((events.thu.length < 1) || (checkTime(events.thu, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.thu = events.thu.concat(elist[i]);
         }
         else
           return {};

         break;
       case 'S':
          if ((events.sat.length < 1) || (checkTime(events.sat, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.sat = events.sat.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'T':
          if ((events.tue.length < 1) || (checkTime(events.tue, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.tue = events.tue.concat(elist[i]);
          }
          else
           return {};

          break;
       case 'TBA':
          break;
       case 'TR':
          if ((events.tue.length < 1) || (checkTime(events.tue, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.tue = events.tue.concat(elist[i]);
          }
          else
            return {};

          if ((events.thu.length < 1) || (checkTime(events.thu, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.thu = events.thu.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'TW':
          if ((events.tue.length < 1) || (checkTime(events.tue, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.tue = events.tue.concat(elist[i]);
          }
          else
            return {};

          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.wen = events.wen.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'TWF':
          if ((events.tue.length < 1) || (checkTime(events.tue, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.tue = events.tue.concat(elist[i]);
          }
          else
            return {};

          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.wen = events.wen.concat(elist[i]);
          }
          else
            return {};

          if ((events.fri.length < 1) || (checkTime(events.fri, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.fri = events.fri.concat(elist[i]);
          }
          else
            return {};

          break;
       case 'U':
          if ((events.sun.length < 1) || (checkTime(events.sun, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.sun = events.sun.concat(elist[i]);
          }
          else
           return {};

         break;
       case 'W':
          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
            elist[i].startTime = moment(elist[i].startTime);
            elist[i].endTime = moment(elist[i].endTime);
            events.wen = events.wen.concat(elist[i]);
          }
          else
            return {};

         break;
       case 'WF':
          if ((events.wen.length < 1) || (checkTime(events.wen, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.wen = events.wen.concat(elist[i]);
          }
          else
           return {};

          if ((events.fri.length < 1) || (checkTime(events.fri, elist[i]))) {
           elist[i].startTime = moment(elist[i].startTime);
           elist[i].endTime = moment(elist[i].endTime);
           events.fri = events.fri.concat(elist[i]);
         }
          else
           return {};

          break;
     }
   }
   return events;
}

// check if the object is emty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class MySchedule extends Component {
  state = {
    indexOfschedule: 0,
    scheduleNum: 1
  }

  handleClick =(e) => {
    if (e =='up') {
      if ((this.props.data.length >= 1)&&(this.state.indexOfschedule < makeSectionListfromCourseList(this.props.data).length-1)) {
          this.setState({indexOfschedule:this.state.indexOfschedule + 1});
      }
    }
    if (e=='down') {
      if (this.state.indexOfschedule > 0) {
          this.setState({indexOfschedule:this.state.indexOfschedule - 1});
      }
    }
    if (e=='download') {
      toPng(document.getElementById('myTimetable'))
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
      });
    }
  };

  myRender = (event, defaultAttributes, styles) => {
    return (
      <div
        {...defaultAttributes}
        title={event.tooltip}
        key={event.id}
      >
      <div  style={{
        backgroundColor: event.color,
        top: '0px',
        width:'100%',
        position:'absolute',
        height:'100%',
        display:'flex'
      }}>
      <div style={{margin:'auto auto'}}>
        <div className={styles.event_info}>{ event.name }</div>
        <div className={styles.event_info}>{ event.cn}</div>
        <div className={styles.event_info}>{ event.times}</div>
        <span className={styles.event_info}>{ event.location}</span>
      </div>
      </div>
    </div>
    )
  }
  render () {
    console.log(this.props.data);
    const sectionList = this.props.data.length < 1 ? []: makeSectionListfromCourseList(this.props.data)[this.state.indexOfschedule];
    const timeInterval = setTabletime(sectionList);
    const rawEventList = courselistTOeventlist(sectionList);
    const readyEventList = eventsBuilder(rawEventList);
    const myTimetable = <div>
                          <button
                            onClick={() => this.handleClick('down')}
                          >backward</button>
                          <label> {this.state.indexOfschedule + 1}</label>
                          <label> of </label>
                          <label> {this.props.data.length < 1 ? 0 : makeSectionListfromCourseList(this.props.data).length}</label>
                          <button
                            onClick={() => this.handleClick('up')}
                          >forward</button>
                          <button
                            onClick={() => this.handleClick('download')}
                          >Save my Schedule</button>
                          <Link href={'/courses'}  underline={'none'} color={'textSecondary'}> Profile </Link>
                          <div id="myTimetable">
                            <Timetable hoursInterval={[4,19]} events={readyEventList} renderEvent={this.myRender}/>
                          </div>
                        </div>;
    const errAlert = <div>
                        <div>
                            <button
                              onClick={() => this.handleClick('down')}
                            >backward</button>
                            <label> {this.state.indexOfschedule + 1}</label>
                            <label> of </label>
                            <label> {this.props.data.length < 1 ? 0 : makeSectionListfromCourseList(this.props.data).length}</label>
                            <button
                              onClick={() => this.handleClick('up')}
                            >forward</button>
                          </div>
                          NO SUCH SCHEDUE !
                        </div>;
    const selSchedule = <button />
    if (isEmpty(readyEventList)) {
      return(errAlert);
    }
    else {
      return (myTimetable);
    }
  }
}
export default (MySchedule)
