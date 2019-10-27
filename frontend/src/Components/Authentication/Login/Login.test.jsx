import { mount } from 'enzyme'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import { Navigation } from '../../Navigation/NavigationContext'

let wrapper

beforeEach(() => {
  wrapper = mount(
    <BrowserRouter>
      <Navigation>
        <Login onSubmit={jest.fn()} />
      </Navigation>
    </BrowserRouter>
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
