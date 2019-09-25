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
  const div = wrapper.find('div')
  expect(div.exists()).toBeTruthy()
})
