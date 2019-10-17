import { mount } from 'enzyme'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'

let wrapper

beforeEach(() => {
  wrapper = mount(
    <Router>
      <Home />
    </Router>
  )
})

afterEach(() => {
  wrapper.unmount()
})

it('should render', () => {
  const div = wrapper.find('BottomNav')
  expect(div.exists()).toBeTruthy()
})
