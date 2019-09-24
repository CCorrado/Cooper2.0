import { mount } from 'enzyme'
import React from 'react'
import Registration from './Registration'

let wrapper

beforeEach(() => {
  wrapper = mount(
    <Registration onSubmit={jest.fn()} />
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
  const firstNameField = wrapper.find('input').first()
  expect(firstNameField.props().id).toBe('firstName')
  const lastNameField = wrapper.find('input').at(1)
  expect(lastNameField.props().id).toBe('lastName')
  const emailField = wrapper.find('input').at(2)
  expect(emailField.props().id).toBe('email')
  const passwordField = wrapper.find('input').at(3)
  expect(passwordField.props().id).toBe('password')
})
