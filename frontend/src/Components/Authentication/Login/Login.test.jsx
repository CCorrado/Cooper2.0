import { mount } from 'enzyme'
import React from 'react'
import Login from './Login'

let wrapper

beforeEach(() => {
  wrapper = mount(
    <Login onSubmit={jest.fn()} />
  )
})

afterEach(() => {
  wrapper.unmount()
})

it('should render', () => {
  const div = wrapper.find('div')
  expect(div.exists()).toBeTruthy()
})
