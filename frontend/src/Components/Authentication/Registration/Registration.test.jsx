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
