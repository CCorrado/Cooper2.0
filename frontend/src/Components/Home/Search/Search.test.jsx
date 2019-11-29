import { shallow } from 'enzyme'
import React from 'react'
import Search from './Search'

let wrapper

beforeEach(() => {
  wrapper = shallow(<Search />)
})

describe('Search Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.container')
    expect(div.exists()).toBeTruthy()
  })

  it('should render empty text', () => {
    const text = wrapper.find('.text')
    expect(text.text()).toBe('No courses currently selected for Registration')
  })

  it('should render reg button', () => {
    const regButton = wrapper.find('button')
    expect(regButton.text()).toBe('Register For Courses')
  })
})
