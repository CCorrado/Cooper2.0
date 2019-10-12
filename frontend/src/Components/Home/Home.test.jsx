import { mount } from 'enzyme'
import React from 'react'
import Home from './Home'

let wrapper

beforeEach(() => {
  wrapper = mount(
    <Home />
  )
})

afterEach(() => {
  wrapper.unmount()
})

it('should render', () => {
  const div = wrapper.find('NavBar')
  expect(div.exists()).toBeTruthy()
})
