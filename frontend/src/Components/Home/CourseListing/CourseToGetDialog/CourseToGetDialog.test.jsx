import { mount } from 'enzyme'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Autocomplete } from '@material-ui/lab'
import CourseToGetDialog from './CourseToGetDialog'
import { NavigationContext } from '../../../Navigation/NavigationContext'
import { UserContext } from '../../../common/UserContext'

let wrapper

const nav = { goBackToPrevious: jest.fn() }
const user = {
  userId: 'testID',
  token: {
    accessToken: 'test'
  }
}

beforeEach(() => {
  wrapper = mount(
    <Router>
      <NavigationContext.Provider value={nav}>
        <UserContext.Provider value={user}>
          <CourseToGetDialog courseIdToOffer='0' />
        </UserContext.Provider>
      </NavigationContext.Provider>
    </Router>
  )
})

describe('Course to get dialog Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.dialog')
    expect(div.exists()).toBeTruthy()
  })

  it('should render empty state text', () => {
    const title = wrapper.find('.title')
    expect(title.text()).toBe('Select course to receive on swap')
  })

  it('should render close button', () => {
    const close = wrapper.find('button').at(0)
    expect(close.text()).toBe('')
    close.simulate('click')
    expect(nav.goBackToPrevious).toHaveBeenCalledTimes(1)
  })

  it('should render autocomplete', () => {
    const autocomplete = wrapper.find(Autocomplete)
    const { options, className } = autocomplete.props()
    expect(autocomplete.exists()).toBeTruthy()
    expect(options).toStrictEqual([])
    expect(className).toBe('autocomplete')
  })
})
