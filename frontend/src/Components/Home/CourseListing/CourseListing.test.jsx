import { shallow } from 'enzyme'
import React from 'react'
import CourseListing from './CourseListing'

let wrapper

const course = {
  building: 'X',
  call_number: '10006',
  currentEnrollment: '38',
  endDate: '2019-12-20Z',
  endTime: '16:45:00Z',
  instructor: 'Mai F',
  maxCredit: '3',
  maxEnrollment: '40',
  meetingDay: 'M',
  minCredit: '3',
  room: '218B',
  section: 'BIA 652A',
  startDate: '2019-08-26Z',
  startTime: '14:15:00Z',
  status: 'O',
  term: '2019F',
  title: 'Multivariate Data Analysis I'
}

beforeEach(() => {
  wrapper = shallow(<CourseListing course={course} />)
})

describe('Course Listing Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.card')
    expect(div.exists()).toBeTruthy()
  })

  it('should render course title', () => {
    const courseTitle = wrapper.find('.course-title')
    expect(courseTitle.text()).toBe('Course: Multivariate Data Analysis I')
  })

  it('should not render the buttons', () => {
    expect(wrapper.find('.swap-icon').length).toBe(0)
  })

  it('should render instruction, section, term', () => {
    expect(wrapper.find('.course-instructor').text()).toBe('Instructor: Mai F')
    expect(wrapper.find('.course-section').text()).toBe('Section: BIA 652A')
    expect(wrapper.find('.course-term').text()).toBe('Term: 2019F')
  })

  it('should render the course times', () => {
    expect(wrapper.find('.course-start').at(0).text()).toBe('Start Time: 2:15 pm')
    expect(wrapper.find('.course-start').at(1).text()).toBe('End Time: 4:45 pm')
  })

  it('should render course credits', () => {
    expect(wrapper.find('.course-credits').at(0).text()).toBe('Day(s): M')
    expect(wrapper.find('.course-credits').at(1).text()).toBe('Credits: 3')
  })
})
