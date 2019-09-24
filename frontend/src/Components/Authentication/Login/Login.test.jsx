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

it('should render fields', () => {
  const emailField = wrapper.find('input').at(0)
  expect(emailField.props().id).toBe('email')
  const passwordField = wrapper.find('input').at(1)
  expect(passwordField.props().id).toBe('password')
})
